// Genera los 20 libros: interior (24 páginas A4) + cubierta completa (portada, lomo, contraportada) + ficha de registro.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { setMode, scene, character } = require('./shapes');
const stories = require('./stories');
const { meta } = require('./meta');

const OUT = path.join(__dirname, '..', 'pdf');
const IMG = path.join(__dirname, 'img');
const FONTS = 'file://' + path.join(__dirname, 'fonts');
const CHARS = { tobi: 'Tobi', lila: 'Lila', nico: 'Nico', pipo: 'Pipo', tina: 'Tina', buho: 'Abuela Búho', luz: 'Luz', pincho: 'Pincho', bubu: 'Bubu', dumbi: 'Dumbi', ani: 'Ani', fito: 'Fito', misu: 'Misu', nube: 'Nube', mari: 'Mari' };
const CHARFILE = { lila: 'nico' };

function findImg(storyId, mode, name) {
  const dir = path.join(IMG, storyId, mode === 'line' ? 'line' : 'color');
  for (const ext of ['png', 'jpg', 'jpeg', 'webp']) { const f = path.join(dir, `${name}.${ext}`); if (fs.existsSync(f)) return 'file://' + f; }
  return null;
}
function art(storyId, mode, name, fallbackSvg) {
  const f = findImg(storyId, mode, name) || (name === 'cover' ? findImg(storyId, mode, '1') : null);
  return f ? `<img src="${f}" style="display:block;width:100%;height:auto">` : fallbackSvg;
}
function heroSVG(t) { return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="150 -20 700 620">${character(t, { x: 500, y: 560, s: 2.2, mood: 'happy' })}</svg>`; }
function charsInStory(story) {
  const text = story.pages.map(p => p.img).join(' ');
  const found = [];
  for (const [k, n] of Object.entries(CHARS)) {
    const re = k === 'mari' ? /butterfly/i : new RegExp(`\\b${n.replace('Abuela Búho', 'Grandma Owl')}\\b`);
    if (re.test(text)) found.push(k);
  }
  return [...new Set(found)];
}
const ACCENTS = ['#e8613c', '#3a9d5d', '#5b6dd6', '#d9a300', '#e0508a', '#2d9bb5', '#d96d1f', '#7b58c8', '#3ca370', '#c0392b'];

const CSS = `
@font-face{font-family:'Fredoka';font-weight:500;src:url('${FONTS}/Fredoka-Medium.ttf')}
@font-face{font-family:'Fredoka';font-weight:700;src:url('${FONTS}/Fredoka-Bold.ttf')}
@font-face{font-family:'Nunito';font-weight:600;src:url('${FONTS}/Nunito-SemiBold.ttf')}
@font-face{font-family:'Nunito';font-weight:800;src:url('${FONTS}/Nunito-ExtraBold.ttf')}
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
body { margin: 0; font-family: 'Nunito', 'DejaVu Sans', sans-serif; color: #2b2b2b; }
.page { width: 210mm; height: 297mm; page-break-after: always; padding: 12mm; display: flex; flex-direction: column; position: relative; overflow: hidden; background: var(--bg); }
.page:last-child { page-break-after: auto; }
.frame { border: 3px solid var(--acc); border-radius: 18px; padding: 8mm; flex: 1; display: flex; flex-direction: column; }
.art { border-radius: 14px; overflow: hidden; border: 3px solid var(--acc); background: #fff; }
.art img, .art svg { display: block; width: 100%; height: auto; }
.text { font-size: 21pt; line-height: 1.45; font-weight: 800; padding: 6mm 4mm 2mm; text-align: center; }
.line .text { font-size: 19pt; }
.num { position: absolute; bottom: 7mm; right: 12mm; font-family: 'Fredoka'; font-size: 13pt; color: var(--acc); }
h1 { font-family: 'Fredoka', 'DejaVu Sans', sans-serif; font-weight: 700; font-size: 40pt; color: var(--acc); margin: 6mm 0 2mm; line-height: 1.1; text-align: center; }
h2 { font-family: 'Fredoka'; font-size: 30pt; color: var(--acc); text-align: center; margin: 4mm 0; }
.kind { font-family: 'Fredoka'; font-size: 16pt; color: #666; letter-spacing: 2px; text-transform: uppercase; text-align: center; }
.sub { font-size: 16pt; color: #555; text-align: center; font-style: italic; }
.author { font-family: 'Fredoka'; font-size: 18pt; color: #444; text-align: center; margin-top: 8mm; }
.center { justify-content: center; align-items: center; text-align: center; }
.heroart { width: 120mm; }
.big { font-size: 22pt; text-align: center; font-weight: 800; padding: 6mm 10mm; background: #fff; border-radius: 16px; border: 3px dashed var(--acc); }
.q { font-size: 18pt; text-align: center; margin-top: 10mm; color: #444; }
.hint { font-size: 13pt; text-align: center; color: #777; margin-top: 6mm; }
.box { flex: 1; border: 3px dashed var(--acc); border-radius: 16px; margin-top: 6mm; background: #fff; }
.small { font-size: 11pt; color: #666; text-align: center; line-height: 1.6; }
.chars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6mm; margin-top: 6mm; }
.chars div { text-align: center; font-family: 'Fredoka'; font-size: 15pt; color: #444; }
.chars img { width: 100%; border-radius: 12px; border: 3px solid var(--acc); background: #fff; }
.field { border-bottom: 2px solid var(--acc); height: 12mm; margin: 8mm 10mm 0; }
`;

function interiorHTML(story, mode, acc) {
  const line = mode === 'line';
  const m = meta(story, mode);
  const bg = line ? '#fff' : '#fffaf0';
  const kind = line ? 'Cuento para colorear' : 'Cuento para leer';
  const chars = charsInStory(story);
  const charGrid = chars.map(k => { const f = path.join(IMG, 'chars', `${CHARFILE[k] || k}.jpg`); return fs.existsSync(f) ? `<div><img src="file://${f}"><br>${CHARS[k]}</div>` : ''; }).join('');
  let p = '';
  // 1 portadilla
  p += `<section class="page"><div class="frame center"><div class="kind">${kind}</div><div class="heroart art" style="border:none;background:none">${art(story.id, 'color', 'cover', heroSVG(story.hero))}</div><h1>${story.title}</h1><div class="sub">${m.subtitle.replace(/ \(.*\)$/, '')}</div><div class="author">${m.autor}</div></div></section>`;
  // 2 créditos
  p += `<section class="page"><div class="frame center"><div class="small">${story.title}<br>${m.subtitle}<br><br>© ${new Date().getFullYear()} ${m.autor}. Todos los derechos reservados.<br>Colección ${m.serie}.<br>Texto e historia: ${m.autor}. Ilustraciones creadas con herramientas de inteligencia artificial y supervisadas por el autor.<br><br>Ninguna parte de este libro puede reproducirse sin permiso del autor, excepto para uso personal y educativo de las páginas para colorear.<br><br>Recomendado para niños ${m.edad}.</div></div></section>`;
  // 3 este libro pertenece a
  p += `<section class="page"><div class="frame center"><h2>Este libro pertenece a</h2><div class="field" style="width:120mm"></div><div class="hint">Nombre</div><div class="field" style="width:60mm"></div><div class="hint">Edad</div>${line ? '<div class="hint" style="margin-top:14mm">Colorea con tus colores favoritos. Cada página tiene un pedacito del cuento.</div>' : '<div class="hint" style="margin-top:14mm">Un cuento para leer juntos, despacito y con cariño.</div>'}</div></section>`;
  // 4 personajes
  p += `<section class="page"><div class="frame"><h2>Conoce a los personajes</h2><div class="chars">${charGrid}</div></div></section>`;
  // 5-22 historia
  story.pages.forEach((pg, i) => {
    p += `<section class="page ${line ? 'line' : ''}"><div class="frame"><div class="art">${art(story.id, mode, String(i + 1), scene(pg.sc || { bg: story.bg, chars: [{ t: story.hero }] }))}</div><div class="text">${pg.text}</div></div><div class="num">${i + 1}</div></section>`;
  });
  // 23 enseñanza
  p += `<section class="page"><div class="frame" style="justify-content:center"><h2>${line ? '¿Qué aprendimos?' : 'La enseñanza'}</h2><div class="big">${story.lesson}</div><div class="q">${story.question}</div><div class="hint">Platica con un adulto sobre el cuento.</div></div></section>`;
  // 24 mi dibujo
  p += `<section class="page"><div class="frame"><h2>Mi dibujo del cuento</h2><div class="hint">Dibuja tu parte favorita de la historia.</div><div class="box"></div></div></section>`;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${story.title}</title><style>${CSS}</style></head><body style="--acc:${acc};--bg:${bg}">${p}</body></html>`;
}

// ---- Cubierta completa (KDP): sangrado 0.125", A4, lomo según páginas ----
const TRIM_W = 8.27, TRIM_H = 11.69, BLEED = 0.125, PAGES = 24;
function spineIn(mode) { return PAGES * (mode === 'line' ? 0.002252 : 0.002347); } // papel blanco / color premium
function coverHTML(story, mode, acc) {
  const line = mode === 'line';
  const m = meta(story, mode);
  const spine = spineIn(mode);
  const W = BLEED * 2 + TRIM_W * 2 + spine, H = TRIM_H + BLEED * 2;
  const heroImg = findImg(story.id, 'color', 'cover');
  const sceneImg = findImg(story.id, line ? 'line' : 'color', '18') || findImg(story.id, 'color', '18');
  const bg = line ? '#ffffff' : '#fffaf0';
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face{font-family:'Fredoka';font-weight:700;src:url('${FONTS}/Fredoka-Bold.ttf')}
  @font-face{font-family:'Nunito';font-weight:600;src:url('${FONTS}/Nunito-SemiBold.ttf')}
  @font-face{font-family:'Nunito';font-weight:800;src:url('${FONTS}/Nunito-ExtraBold.ttf')}
  @page { size: ${W}in ${H}in; margin: 0; }
  * { box-sizing: border-box; } body { margin: 0; font-family: 'Nunito', sans-serif; }
  .cover { width: ${W}in; height: ${H}in; display: flex; background: ${acc}; position: relative; }
  .back, .front { width: ${TRIM_W + BLEED}in; height: 100%; padding: ${BLEED + 0.5}in; display: flex; flex-direction: column; }
  .spine { width: ${spine}in; height: 100%; background: ${acc}; }
  .panel { background: ${bg}; border-radius: 0.35in; flex: 1; padding: 0.45in; display: flex; flex-direction: column; align-items: center; text-align: center; }
  h1 { font-family: 'Fredoka'; font-size: 44pt; color: ${acc}; margin: 0.15in 0 0.05in; line-height: 1.05; }
  .kind { font-family: 'Fredoka'; font-size: 15pt; color: #777; letter-spacing: 3px; text-transform: uppercase; }
  .sub { font-size: 17pt; color: #555; font-style: italic; margin-bottom: 0.2in; }
  .author { font-family: 'Fredoka'; font-size: 20pt; color: #444; margin-top: auto; }
  .hero { width: 5.4in; border-radius: 0.3in; border: 5px solid ${acc}; background: #fff; }
  .desc { font-size: 14.5pt; line-height: 1.5; color: #333; text-align: left; margin-top: 0.3in; }
  .scene { width: 4.6in; border-radius: 0.25in; border: 4px solid ${acc}; background: #fff; }
  .barcode { position: absolute; right: 0.375in; bottom: 0.375in; width: 2in; height: 1.2in; background: #fff; border: 1px dashed #bbb; font-size: 8pt; color: #999; display: flex; align-items: center; justify-content: center; }
  .serie { font-family: 'Fredoka'; font-size: 13pt; color: ${acc}; margin-top: 0.2in; }
  </style></head><body><div class="cover">
    <div class="back"><div class="panel">
      <div class="kind">${line ? 'Libro para colorear' : 'Cuento ilustrado'}</div>
      <h1 style="font-size:26pt">${story.title}</h1>
      ${sceneImg ? `<img class="scene" src="${sceneImg}">` : ''}
      <div class="desc">${m.sinopsis}<br><br>${line ? '18 páginas para colorear con el texto del cuento, una enseñanza y espacio para tu propio dibujo.' : '18 escenas ilustradas a todo color, letra grande y una enseñanza para conversar en familia.'}</div>
      <div class="serie">Colección ${m.serie} · ${m.edad}</div>
      <div class="author">${m.autor}</div>
    </div></div>
    <div class="spine"></div>
    <div class="front"><div class="panel">
      <div class="kind">${line ? 'Libro para colorear' : 'Cuento para leer'}</div>
      <h1>${story.title}</h1>
      <div class="sub">${m.subtitle.replace(/ \(.*\)$/, '')}</div>
      ${heroImg ? `<img class="hero" src="${heroImg}">` : ''}
      <div class="author">${m.autor}</div>
    </div></div>
    <div class="barcode">Espacio para código de barras ISBN</div>
  </div></body></html>`;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const only = process.argv[2];
  const registro = [];
  for (const mode of ['color', 'line']) {
    setMode(mode);
    const dir = path.join(OUT, mode === 'color' ? 'color' : 'colorear');
    const cdir = path.join(OUT, 'cubiertas');
    fs.mkdirSync(dir, { recursive: true }); fs.mkdirSync(cdir, { recursive: true });
    for (const [i, story] of stories.entries()) {
      if (only && story.id !== only) continue;
      const suf = mode === 'line' ? '-para-colorear' : '';
      const tmp = path.join(dir, `${story.id}-tmp.html`);
      fs.writeFileSync(tmp, interiorHTML(story, mode, ACCENTS[i]));
      await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.pdf({ path: path.join(dir, `${story.id}-${story.slug}${suf}.pdf`), format: 'A4', printBackground: true, preferCSSPageSize: true });
      fs.writeFileSync(tmp, coverHTML(story, mode, ACCENTS[i]));
      await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const spine = spineIn(mode);
      await page.pdf({ path: path.join(cdir, `${story.id}-${story.slug}${suf}-cubierta.pdf`), width: `${(BLEED * 2 + TRIM_W * 2 + spine).toFixed(4)}in`, height: `${(TRIM_H + BLEED * 2).toFixed(3)}in`, printBackground: true, preferCSSPageSize: true });
      fs.unlinkSync(tmp);
      const m = meta(story, mode);
      registro.push({ archivo_interior: `pdf/${mode === 'color' ? 'color' : 'colorear'}/${story.id}-${story.slug}${suf}.pdf`, archivo_cubierta: `pdf/cubiertas/${story.id}-${story.slug}${suf}-cubierta.pdf`, paginas_interior: PAGES, tamano: 'A4 (8.27 x 11.69 in)', sangrado: '0.125 in', lomo_in: +spine.toFixed(4), papel: mode === 'line' ? 'blanco (interior B/N)' : 'color premium', ...m });
      console.log('OK', story.id, mode);
    }
  }
  await browser.close();
  if (!only) {
    fs.writeFileSync(path.join(OUT, '..', 'registro', 'registro.json'), JSON.stringify(registro, null, 2));
    let md = '# Ficha de registro de los 20 libros\n\nTodos: tamaño A4 (8.27 × 11.69 in), 24 páginas interiores, sangrado 0.125 in, idioma español, público de 3 a 7 años.\n\n';
    for (const r of registro) {
      md += `## ${r.title}${r.subtitle.startsWith('Libro para colorear') ? ' (para colorear)' : ''}\n\n- **Título:** ${r.title}\n- **Subtítulo:** ${r.subtitle}\n- **Autor (seudónimo):** ${r.autor}\n- **Serie:** ${r.serie}\n- **Interior:** ${r.archivo_interior} (${r.paginas_interior} páginas, papel ${r.papel})\n- **Cubierta:** ${r.archivo_cubierta} (lomo ${r.lomo_in} in)\n- **Categorías:** ${r.categorias.join(' · ')}\n- **Palabras clave:** ${r.keywords.join(', ')}\n\n**Descripción (texto de venta):**\n\n${r.descripcion.replace(/\n\n/g, '\n\n')}\n\n---\n\n`;
    }
    fs.writeFileSync(path.join(OUT, '..', 'registro', 'registro.md'), md);
    console.log('registro listo');
  }
})();
