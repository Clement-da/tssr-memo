import fs from 'fs';
import path from 'path';

const dir = 'src/content/modules';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let out = "";
files.forEach(f => {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    
    // Find where the toc starts and ends realistically
    const startIdx = content.indexOf('<ol class="lesson-toc__list">');
    if (startIdx !== -1) {
        // Find the END of the toc block.
        // Usually it ends where </nav> is.
        const endIdx = content.indexOf('</nav>', startIdx);
        out += `\n=== ${f} ===\n`;
        out += content.substring(startIdx, endIdx).trim() + '\n';
    } else {
        out += `\n=== ${f} === NO TOC FOUND\n`;
    }
});
fs.writeFileSync('toc_output_full.txt', out, 'utf-8');
