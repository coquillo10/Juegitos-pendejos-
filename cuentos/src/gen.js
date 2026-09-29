// Arma las tandas de generación para Higgsfield (GPT Image 2.5) y lleva el estado en state.json
// Uso: node gen.js batches color   -> escribe batches en ../../scratch (via env OUT)
//      node gen.js batches line
// state.json: { chars: {tobi: jobId,...}, color: {"01|3": {job, url}}, line: {...} }
const fs = require('fs');
const path = require('path');
const stories = require('./stories');
const STATE = path.join(__dirname, 'state.json');
const state = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : { chars: {}, color: {}, line: {} };
const OUT = process.env.OUT || path.join(__dirname, 'batches');
const STYLE = "Children's picture-book illustration, kawaii cartoon style, soft rounded shapes, bright cheerful flat colors, thick clean outlines, no text.";
const LINE = 'STRICTLY black and white line art: crisp clean black outlines of uniform thickness on a pure white background, no color, no gray, no shading, no gradients, no fills, large simple shapes easy to color, no text.';
const NAMES = { tobi: 'Tobi', lila: 'Lila', nico: 'Nico', pipo: 'Pipo', tina: 'Tina', buho: 'Grandma Owl', luz: 'Luz', pincho: 'Pincho', bubu: 'Bubu', dumbi: 'Dumbi', ani: 'Ani', fito: 'Fito', misu: 'Misu', nube: 'Nube', mari: 'butterfly' };
// Lila y Nico comparten diseño (coneja blanca)
const CHARKEY = { lila: 'nico' };

function charsIn(img) {
  const found = [];
  for (const [k, n] of Object.entries(NAMES)) {
    const re = n === 'butterfly' ? /butterfly/i : new RegExp(`\\b${n}\\b`);
    if (re.test(img)) found.push(CHARKEY[k] || k);
  }
  return [...new Set(found)];
}
function countChars(img) { return charsIn(img).length; }

function colorRequests() {
  const reqs = [];
  for (const s of stories) {
    s.pages.forEach((pg, i) => {
      const key = `${s.id}|${i + 1}`;
      if (state.color[key]) return;
      const chars = charsIn(pg.img);
      const refs = chars.slice(0, 4).map(c => state.chars[c]).filter(Boolean);
      const names = chars.slice(0, 4).map(c => NAMES[c] === 'butterfly' ? 'the butterfly' : NAMES[c]).join(', ');
      const prompt = `${refs.length ? `Use the reference images as the exact character designs of ${names}. ` : ''}Scene: ${pg.img}. ${STYLE} Show exactly ${countChars(pg.img)} character(s), no duplicates, no extra characters.`;
      reqs.push({ key, params: { model: 'gpt_image_2_5', aspect_ratio: '4:3', resolution: '1k', quality: 'low', use_unlim: false, medias: refs.map(v => ({ value: v, role: 'image_references' })), prompt } });
    });
  }
  return reqs;
}
function lineRequests() {
  const reqs = [];
  for (const s of stories) {
    s.pages.forEach((pg, i) => {
      const key = `${s.id}|${i + 1}`;
      if (state.line[key] || !state.color[key]) return;
      const prompt = `Convert the reference illustration into a coloring book page for young children, keeping the same composition, characters and poses. ${LINE}`;
      reqs.push({ key, params: { model: 'gpt_image_2_5', aspect_ratio: '4:3', resolution: '1k', quality: 'low', use_unlim: false, medias: [{ value: state.color[key].job, role: 'image_references' }], prompt } });
    });
  }
  return reqs;
}
const cmd = process.argv[2];
if (cmd === 'batches') {
  const mode = process.argv[3];
  const reqs = mode === 'color' ? colorRequests() : lineRequests();
  fs.mkdirSync(OUT, { recursive: true });
  for (const f of fs.readdirSync(OUT)) if (f.startsWith(mode)) fs.unlinkSync(path.join(OUT, f));
  const keys = [];
  for (let b = 0; b * 12 < reqs.length; b++) {
    const chunk = reqs.slice(b * 12, b * 12 + 12);
    const items = chunk.map((r, j) => { keys.push(r.key); return { index: keys.length - 1, params: r.params }; });
    fs.writeFileSync(path.join(OUT, `${mode}_${String(b).padStart(2, '0')}.json`), JSON.stringify(items));
  }
  fs.writeFileSync(path.join(OUT, `${mode}_keys.json`), JSON.stringify(keys));
  console.log(mode, 'pendientes:', reqs.length, 'tandas:', Math.ceil(reqs.length / 12));
} else if (cmd === 'record') {
  // node gen.js record <mode> '<json: [{index, job_id, result_url}]>'
  const mode = process.argv[3];
  const keys = JSON.parse(fs.readFileSync(path.join(OUT, `${mode}_keys.json`), 'utf8'));
  const jobs = JSON.parse(fs.readFileSync(process.argv[4], 'utf8'));
  let n = 0;
  for (const j of jobs) { if (j.job_id) { state[mode][keys[j.index]] = { job: j.job_id, url: j.result_url || null }; n++; } }
  fs.writeFileSync(STATE, JSON.stringify(state, null, 1));
  console.log('registrados', n, 'total', Object.keys(state[mode]).length);
} else if (cmd === 'chars') {
  const map = JSON.parse(process.argv[3]);
  Object.assign(state.chars, map);
  fs.writeFileSync(STATE, JSON.stringify(state, null, 1));
  console.log('personajes:', Object.keys(state.chars).join(','));
}
