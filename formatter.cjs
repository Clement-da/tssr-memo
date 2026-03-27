const fs = require('fs');

const srcFile = "content2/Services_Microsoft_clean.md";
const destFile = "src/content/modules/services-microsoft.md";

const text = fs.readFileSync(srcFile, 'utf8').replace(/\r\n/g, '\n');
const lines = text.split('\n');

const frontmatter = `---
id: "services-microsoft"
title: "Services Microsoft (AD, DNS, DHCP)"
icon: "🪟"
---

`;

let tocHtml = `<!-- SOMMAIRE FLOTTANT -->
<nav class="lesson-toc" aria-label="Sommaire de la leçon">
<div class="lesson-toc__tab" aria-hidden="true">
<span class="lesson-toc__tab-icon">📋</span>
Plan du cours
</div>
<div class="lesson-toc__body">
<h3 class="lesson-toc__title">Sommaire</h3>
<ol class="lesson-toc__list">
`;

let bodyHtml = "";
let sectionCount = 0;
let inSection = false;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Detect ## Main Sections
    let h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
        if (inSection) {
            bodyHtml += "\n</section>\n\n";
        }
        sectionCount++;
        inSection = true;
        let titleFull = h2Match[1];
        let titleClean = titleFull.replace(/[^\w\sàâäéèêëîïôöùûüç-]/gi, '').trim();
        let slug = "sec-" + sectionCount;
        
        tocHtml += `<li><a href="#${slug}">${titleClean}</a></li>\n`;
        
        bodyHtml += `<section id="${slug}-content">\n\n<h2 id="${slug}">${titleFull}</h2>\n\n`;
        continue;
    }

    // Convert ### to <h3> without indent to avoid code block
    let h3Match = line.match(/^###\s+(.+)$/);
    if (h3Match) {
        let titleFull = h3Match[1];
        let slug = "sub-" + sectionCount + "-" + Math.floor(Math.random()*1000);
        bodyHtml += `\n<h3 id="${slug}">${titleFull}</h3>\n\n`;
        continue;
    }

    // Blockquotes for 👉 and 🧠
    if (line.trim().startsWith('👉')) {
        let content = line.trim().substring(1).trim();
        bodyHtml += `\n<blockquote style="background: var(--bg-card); padding: var(--space-4); border-left: 4px solid var(--primary-main); border-radius: 4px;"><strong>Note :</strong> ${content}</blockquote>\n\n`;
        continue;
    }
    if (line.trim().startsWith('🧠')) {
        let content = line.trim().substring(1).trim();
        bodyHtml += `\n<blockquote style="background: var(--bg-card); padding: var(--space-4); border-left: 4px solid var(--accent); border-radius: 4px;"><strong>Important :</strong> ${content}</blockquote>\n\n`;
        continue;
    }

    // Insert Images dynamically
    let pathPrefix = "../../../image/Service microsoft/";
    if (line.includes('🌍 Hiérarchie DNS')) {
        bodyHtml += line + "\n\n![Hiérarchie DNS](" + pathPrefix + "Hiérarchie%20DNS.png)\n\n";
        continue;
    }
    if (line.toLowerCase().includes('unité d\'organisation')) {
        bodyHtml += line + "\n\n![Unité d'organisation](" + pathPrefix + "Unité%20d'organisation.png)\n\n";
        continue;
    }
    if (line.toLowerCase().includes('forêt et domaines')) {
        bodyHtml += line + "\n\n![Composant d'un domaine](" + pathPrefix + "Composant%20d'un%20domaine.png)\n\n";
        continue;
    }
    if (line.toLowerCase().includes('étendue dhcp')) {
        bodyHtml += line + "\n\n![Etendue DHCP](" + pathPrefix + "Etendue%20DHCP.png)\n\n";
        continue;
    }
    if (line.toLowerCase().includes('autorisations ntfs')) {
        bodyHtml += line + "\n\n![Privilège](" + pathPrefix + "Privilège.png)\n\n";
        continue;
    }
    
    // Normal lines
    bodyHtml += line + "\n";
}

if (inSection) {
    bodyHtml += "\n</section>\n";
}

tocHtml += `</ol>\n</div>\n</nav>\n\n`;

const finalFile = frontmatter + tocHtml + bodyHtml;

fs.writeFileSync(destFile, finalFile, 'utf8');
console.log('File successfully generated. Size in chars:', finalFile.length);
