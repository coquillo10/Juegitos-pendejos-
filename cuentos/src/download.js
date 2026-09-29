// Descarga las imágenes generadas en Higgsfield a src/img/ según manifest.json
// manifest.json: [{ "story": "01", "mode": "color"|"line", "name": "cover"|"1".."6", "url": "https://..." }, ...]
const fs = require('fs');
const path = require('path');
const https = require('https');
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));
function get(url, dest) {
  return new Promise((res, rej) => {
    https.get(url, r => {
      if (r.statusCode !== 200) return rej(new Error(`${r.statusCode} ${url}`));
      const w = fs.createWriteStream(dest); r.pipe(w); w.on('finish', () => w.close(res));
    }).on('error', rej);
  });
}
(async () => {
  for (const m of manifest) {
    const dir = path.join(__dirname, 'img', m.story, m.mode);
    fs.mkdirSync(dir, { recursive: true });
    const ext = (m.url.split('?')[0].split('.').pop() || 'png').toLowerCase();
    const dest = path.join(dir, `${m.name}.${ext}`);
    if (fs.existsSync(dest)) continue;
    await get(m.url, dest);
    console.log('OK', dest);
  }
})();
