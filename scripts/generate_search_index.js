import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const modulesDir = './src/content/modules';
const files = fs.readdirSync(modulesDir);

const searchIndex = files.filter(f => f.endsWith('.md')).map(file => {
    const content = fs.readFileSync(path.join(modulesDir, file), 'utf8');
    const { data, content: body } = matter(content);
    
    // Simple regex to extract headers if I don't want to use a heavy parser
    const headers = [];
    const headerRegex = /^(#{1,6})\s+(.*)$/gm;
    let match;
    while ((match = headerRegex.exec(body)) !== null) {
        const text = match[2].trim();
        // slugify
        const slug = text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim();
        
        headers.push({
            text,
            slug,
            depth: match[1].length
        });
    }

    return {
        id: data.id || file.replace('.md', ''),
        title: data.title,
        icon: data.icon,
        headings: headers
    };
});

fs.writeFileSync('./src/data/search_index.json', JSON.stringify(searchIndex, null, 2));
console.log('Search index generated!');
