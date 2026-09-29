// Genera 20 PDFs: 10 cuentos a color + 10 versiones para colorear.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { setMode, scene, character, isLine } = require('./shapes');
const stories = require('./stories');

const OUT = path.join(__dirname, '..', 'pdf');
const FONTS = 'file://' + path.join(__dirname, 'fonts');
const CSS = `
@font-face{font-family:'Fredoka';font-weight:500;src:url('FONTS/Fredoka-Medium.ttf')}
@font-face{font-family:'Fredoka';font-weight:700;src:url('FONTS/Fredoka-Bold.ttf')}
@font-face{font-family:'Nunito';font-weight:600;src:url('FONTS/Nunito-SemiBold.ttf')}
@font-face{font-family:'Nunito';font-weight:800;src:url('FONTS/Nunito-ExtraBold.ttf')}
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
body { margin: 0; font-family: 'Nunito', 'DejaVu Sans', sans-serif; color: #2b2b2b; }
.page { width: 210mm; height: 297mm; page-break-after: always; padding: 12mm; display: flex; flex-direction: column; position: relative; overflow: hidden; }
.page:last-child { page-break-after: auto; }
.frame { border: 3px solid var(--acc); border-radius: 18px; padding: 8mm; flex: 1; display: flex; flex-direction: column; background: var(--bg); }
.art { border-radius: 14px; overflow: hidden; border: 3px solid var(--acc); background: #fff; }
.art svg { display: block; width: 100%; height: auto; }
.text { font-size: 21pt; line-height: 1.45; font-weight: 800; padding: 6mm 4mm 2mm; text-align: center; }
.line .text { font-size: 19pt; }
.num { position: absolute; bottom: 7mm; right: 12mm; font-family: 'Fredoka'; font-size: 13pt; color: var(--acc); }
.cover { justify-content: center; align-items: center; text-align: center; }
.cover h1 { font-family: 'Fredoka', 'DejaVu Sans', sans-serif; font-weight: 700; font-size: 40pt; color: var(--acc); margin: 6mm 0 2mm; line-height: 1.1; }
.cover .kind { font-family: 'Fredoka'; font-size: 16pt; color: #666; letter-spacing: 2px; text-transform: uppercase; }
.cover .lesson { font-size: 15pt; color: #555; margin-top: 4mm; font-style: italic; }
.cover .heroart { width: 110mm; }
.cover .heroart svg { width: 100%; }
.end h2 { font-family: 'Fredoka'; font-size: 30pt; color: var(--acc); text-align: center; margin: 4mm 0; }
.end .big { font-size: 22pt; text-align: center; font-weight: 800; padding: 6mm 10mm; background: #fff; border-radius: 16px; border: 3px dashed var(--acc); }
.end .q { font-size: 18pt; text-align: center; margin-top: 10mm; color: #444; }
.end .hint { font-size: 13pt; text-align: center; color: #777; margin-top: 6mm; }
.colorline { display:flex; justify-content:center; gap:6mm; margin-top: 8mm; }
.colorline span { width: 14mm; height: 14mm; border-radius: 50%; border: 2px solid #333; display:inline-block; }
`;
const ACCENTS = ['#e8613c', '#3a9d5d', '#5b6dd6', '#d9a300', '#e0508a', '#2d9bb5', '#d96d1f', '#7b58c8', '#3ca370', '#c0392b'];

function heroSVG(t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="150 -20 700 620">${character(t, { x: 500, y: 560, s: 2.2, mood: 'happy' })}</svg>`;
}

function html(story, mode, acc) {
  const line = mode === 'line';
  const bg = line ? '#fff' : '#fffaf0';
  const kind = line ? 'Cuento para colorear' : 'Cuento para leer';
  let pages = '';
  pages += `<section class="page cover"><div class="frame cover" style="justify-content:center">
    <div class="kind">${kind}</div>
    <div class="heroart art" style="border:none;background:none">${heroSVG(story.hero)}</div>
    <h1>${story.title}</h1>
    <div class="lesson">Un cuento sobre: ${story.lesson.replace(/\.$/, '').toLowerCase()}</div>
    ${line ? '<div class="colorline"><span></span><span></span><span></span><span></span><span></span></div><div class="hint" style="margin-top:4mm;color:#777">Colorea la portada como más te guste</div>' : ''}
  </div></section>`;
  story.pages.forEach((p, i) => {
    pages += `<section class="page ${line ? 'line' : ''}"><div class="frame">
      <div class="art">${scene(p.sc)}</div>
      <div class="text">${p.text}</div>
    </div><div class="num">${i + 1}</div></section>`;
  });
  pages += `<section class="page end"><div class="frame" style="justify-content:center">
    <h2>${line ? '¿Qué aprendimos?' : 'La enseñanza'}</h2>
    <div class="big">${story.lesson}</div>
    <div class="q">${story.question}</div>
    ${line ? '<div class="hint">Dibuja aquí tu respuesta:</div><div style="flex:0 0 70mm;border:3px dashed var(--acc);border-radius:16px;margin-top:4mm;background:#fff"></div>' : '<div class="hint">Platica con un adulto sobre el cuento.</div>'}
  </div></section>`;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${story.title}</title><style>${CSS.split('FONTS').join(FONTS)}</style></head>
  <body style="--acc:${acc};--bg:${bg}">${pages}</body></html>`;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const only = process.argv[2];
  for (const mode of ['color', 'line']) {
    setMode(mode);
    const dir = path.join(OUT, mode === 'color' ? 'color' : 'colorear');
    fs.mkdirSync(dir, { recursive: true });
    for (const [i, story] of stories.entries()) {
      if (only && story.id !== only) continue;
      const doc = html(story, mode, ACCENTS[i]);
      const htmlPath = path.join(dir, `${story.id}-${story.slug}.html`);
      fs.writeFileSync(htmlPath, doc);
      await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const pdfPath = path.join(dir, `${story.id}-${story.slug}${mode === 'line' ? '-para-colorear' : ''}.pdf`);
      await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, preferCSSPageSize: true });
      fs.unlinkSync(htmlPath);
      console.log('OK', pdfPath);
    }
  }
  await browser.close();
})();
