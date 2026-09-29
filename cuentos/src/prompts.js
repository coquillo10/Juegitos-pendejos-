// Exporta los prompts usados para generar las ilustraciones (por si quieres regenerar alguna escena).
const fs = require('fs'); const path = require('path'); const stories = require('./stories');
const STYLE = "Children's picture-book illustration, kawaii cartoon style, soft rounded shapes, bright cheerful flat colors, thick clean outlines, no text.";
const LINE = 'Convert the reference illustration into a coloring book page for young children, keeping the same composition, characters and poses. STRICTLY black and white line art: crisp clean black outlines of uniform thickness on a pure white background, no color, no gray, no shading, no gradients, no fills, large simple shapes easy to color, no text.';
let md = `# Prompts de las ilustraciones (Higgsfield · GPT Image 2.5)\n\nCada escena a color se generó con la ficha del personaje como imagen de referencia. La página para colorear se generó a partir de la escena a color con este prompt:\n\n> ${LINE}\n\n`;
for (const s of stories) { md += `## ${s.id} · ${s.title}\n\n`; s.pages.forEach((p, i) => { md += `${i + 1}. ${p.img}. ${STYLE}\n`; }); md += '\n'; }
const dir = path.join(__dirname, '..', 'prompts-higgsfield'); fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'prompts.md'), md); console.log('prompts listos');
