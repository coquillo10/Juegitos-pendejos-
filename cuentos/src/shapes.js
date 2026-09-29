// Biblioteca de ilustraciones vectoriales infantiles.
// MODE = 'color' (cuento ilustrado) | 'line' (para colorear)
let MODE = 'color';
const setMode = (m) => { MODE = m; };
const isLine = () => MODE === 'line';

function darken(hex, k = 0.72) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * k), g = Math.round(((n >> 8) & 255) * k), b = Math.round((n & 255) * k);
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}
const SW = () => (isLine() ? 4 : 2.5);
// Relleno con contorno (personajes y objetos)
function F(color, stroke) {
  if (isLine()) return `fill="#ffffff" stroke="#111111" stroke-width="${SW()}" stroke-linejoin="round" stroke-linecap="round"`;
  return `fill="${color}" stroke="${stroke || darken(color)}" stroke-width="${SW()}" stroke-linejoin="round" stroke-linecap="round"`;
}
// Relleno plano sin contorno (cielo, suelo). En modo línea desaparece.
function FL(color) {
  return isLine() ? `fill="none" stroke="none"` : `fill="${color}" stroke="none"`;
}
// Relleno plano, en modo línea se vuelve contorno (colinas, olas)
function FO(color) {
  return isLine() ? `fill="#ffffff" stroke="#111111" stroke-width="3"` : `fill="${color}" stroke="none"`;
}
const INK = () => (isLine() ? '#111111' : '#3b2a20');
const WHITE = () => '#ffffff';

// ---------- Caras ----------
function face(cx, cy, r, mood = 'happy', o = {}) {
  const I = INK();
  const ex = r * (o.eyeSpread || 0.38), ey = cy - r * 0.12, er = r * (o.eyeR || 0.11);
  let s = '';
  if (mood === 'sleepy') {
    for (const sx of [-1, 1]) s += `<path d="M${cx + sx * ex - er * 1.3} ${ey} q${er * 1.3} ${er * 1.6} ${er * 2.6} 0" fill="none" stroke="${I}" stroke-width="3"/>`;
  } else {
    for (const sx of [-1, 1]) {
      s += `<circle cx="${cx + sx * ex}" cy="${ey}" r="${er}" fill="${I}"/>`;
      s += `<circle cx="${cx + sx * ex + er * 0.35}" cy="${ey - er * 0.35}" r="${er * 0.3}" fill="#fff"/>`;
    }
    if (mood === 'sad') for (const sx of [-1, 1]) s += `<path d="M${cx + sx * ex - er * 1.4} ${ey - er * 2} l${er * 2.8} ${sx * er * 0.9}" fill="none" stroke="${I}" stroke-width="2.5"/>`;
  }
  const my = cy + r * 0.32;
  if (mood === 'happy' || mood === 'sleepy') s += `<path d="M${cx - r * 0.28} ${my} q${r * 0.28} ${r * 0.3} ${r * 0.56} 0" fill="none" stroke="${I}" stroke-width="3"/>`;
  else if (mood === 'sad') s += `<path d="M${cx - r * 0.24} ${my + r * 0.12} q${r * 0.24} ${-r * 0.25} ${r * 0.48} 0" fill="none" stroke="${I}" stroke-width="3"/>` +
    (isLine() ? '' : `<ellipse cx="${cx + ex + er * 1.2}" cy="${ey + er * 2.4}" rx="${er * 0.6}" ry="${er}" fill="#7cc4ff"/>`);
  else if (mood === 'surprised') s += `<ellipse cx="${cx}" cy="${my}" rx="${r * 0.13}" ry="${r * 0.18}" fill="${I}"/>`;
  else if (mood === 'big') s += `<path d="M${cx - r * 0.32} ${my - r * 0.05} q${r * 0.32} ${r * 0.5} ${r * 0.64} 0 z" fill="${isLine() ? '#fff' : '#c0392b'}" stroke="${I}" stroke-width="3"/>`;
  if (!isLine() && mood !== 'sad') for (const sx of [-1, 1]) s += `<ellipse cx="${cx + sx * r * 0.62}" cy="${cy + r * 0.2}" rx="${r * 0.16}" ry="${r * 0.1}" fill="#ff9aa2" opacity="0.7"/>`;
  return s;
}
function g(x, y, s = 1, flip = false, inner) {
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${inner}</g>`;
}

// ---------- Personajes (origen: pies en y=0, altura ~200) ----------
const CH = {};
CH.bear = ({ mood }) => {
  const c = '#c98a4b', l = '#f1d3a6';
  return `
  <ellipse cx="-42" cy="-30" rx="18" ry="16" ${F(c)}/><ellipse cx="42" cy="-30" rx="18" ry="16" ${F(c)}/>
  <ellipse cx="0" cy="-80" rx="62" ry="70" ${F(c)}/>
  <ellipse cx="0" cy="-70" rx="36" ry="42" ${F(l)}/>
  <ellipse cx="-60" cy="-95" rx="22" ry="20" ${F(c)}/><ellipse cx="60" cy="-95" rx="22" ry="20" ${F(c)}/>
  <circle cx="-42" cy="-190" r="20" ${F(c)}/><circle cx="42" cy="-190" r="20" ${F(c)}/>
  <circle cx="-42" cy="-190" r="10" ${F(l)}/><circle cx="42" cy="-190" r="10" ${F(l)}/>
  <circle cx="0" cy="-150" r="58" ${F(c)}/>
  <ellipse cx="0" cy="-130" rx="26" ry="18" ${F(l)}/>
  <ellipse cx="0" cy="-138" rx="9" ry="6" fill="${INK()}"/>
  ${face(0, -150, 58, mood)}`;
};
CH.rabbit = ({ mood }) => {
  const c = '#e8e8ee', p = '#ffb6c1';
  return `
  <ellipse cx="-30" cy="-12" rx="22" ry="12" ${F(c)}/><ellipse cx="30" cy="-12" rx="22" ry="12" ${F(c)}/>
  <ellipse cx="0" cy="-70" rx="48" ry="58" ${F(c)}/>
  <ellipse cx="0" cy="-62" rx="26" ry="34" ${F('#fff5f7')}/>
  <ellipse cx="-50" cy="-80" rx="16" ry="18" ${F(c)}/><ellipse cx="50" cy="-80" rx="16" ry="18" ${F(c)}/>
  <ellipse cx="-24" cy="-235" rx="16" ry="55" ${F(c)}/><ellipse cx="24" cy="-235" rx="16" ry="55" ${F(c)}/>
  <ellipse cx="-24" cy="-235" rx="7" ry="38" ${F(p)}/><ellipse cx="24" cy="-235" rx="7" ry="38" ${F(p)}/>
  <circle cx="0" cy="-140" r="52" ${F(c)}/>
  <ellipse cx="0" cy="-124" rx="7" ry="5" ${F(p)}/>
  ${face(0, -140, 52, mood)}`;
};
CH.bird = ({ mood }) => {
  const c = '#6ec1ff', w = '#3f97e0', b = '#ffb347';
  return `
  <path d="M-8 0 l-6 -12 M8 0 l6 -12" stroke="${isLine() ? '#111' : '#d47f00'}" stroke-width="3" fill="none"/>
  <ellipse cx="0" cy="-42" rx="34" ry="32" ${F(c)}/>
  <path d="M-30 -48 q-30 -10 -34 20 q18 10 34 -8 z" ${F(w)}/>
  <path d="M-28 -60 l-22 -8 l4 14 z" ${F(w)}/>
  <path d="M10 -78 q4 -18 -6 -26" stroke="${INK()}" stroke-width="3" fill="none"/>
  <path d="M28 -44 l20 6 l-20 8 z" ${F(b)}/>
  ${face(2, -46, 30, mood, { eyeSpread: 0.35 })}`;
};
CH.turtle = ({ mood }) => {
  const s = '#5fb36b', sk = '#a9dd8f';
  return `
  <ellipse cx="-50" cy="-10" rx="18" ry="12" ${F(sk)}/><ellipse cx="50" cy="-10" rx="18" ry="12" ${F(sk)}/>
  <path d="M-72 -20 q72 -110 144 0 z" ${F(s)}/>
  <path d="M-30 -40 l18 -30 l24 0 l18 30 l-14 22 l-32 0 z" ${F('#3f9550')}/>
  <ellipse cx="0" cy="-20" rx="76" ry="14" ${F('#3f9550')}/>
  <ellipse cx="-92" cy="-30" rx="12" ry="8" ${F(sk)}/>
  <circle cx="80" cy="-70" r="34" ${F(sk)}/>
  ${face(84, -70, 34, mood)}`;
};
CH.fox = ({ mood }) => {
  const c = '#ff9d4d', w = '#fff3e6';
  return `
  <path d="M40 -40 q70 20 40 -60 q-30 -30 -50 20 z" ${F(c)}/>
  <path d="M75 -90 q10 -20 -8 -32 q-14 6 -6 20 z" ${F(w)}/>
  <ellipse cx="-28" cy="-10" rx="18" ry="10" ${F('#8c5a2b')}/><ellipse cx="28" cy="-10" rx="18" ry="10" ${F('#8c5a2b')}/>
  <ellipse cx="0" cy="-70" rx="44" ry="56" ${F(c)}/>
  <ellipse cx="0" cy="-62" rx="24" ry="34" ${F(w)}/>
  <path d="M-40 -170 l-14 -50 l40 24 z" ${F(c)}/><path d="M40 -170 l14 -50 l-40 24 z" ${F(c)}/>
  <circle cx="0" cy="-140" r="52" ${F(c)}/>
  <path d="M-40 -125 q40 40 80 0 q-40 25 -80 0 z" ${F(w)}/>
  <ellipse cx="0" cy="-112" rx="8" ry="6" fill="${INK()}"/>
  ${face(0, -145, 52, mood)}`;
};
CH.owl = ({ mood }) => {
  const c = '#b07d4f', l = '#e9c49a';
  return `
  <path d="M-14 0 l-6 -10 M0 0 l0 -10 M14 0 l6 -10 M-14 0 l28 0" stroke="${isLine() ? '#111' : '#d47f00'}" stroke-width="3" fill="none"/>
  <ellipse cx="0" cy="-70" rx="52" ry="66" ${F(c)}/>
  <path d="M-52 -80 q-26 30 -10 70 q20 -10 20 -40 z" ${F('#8a5f38')}/>
  <path d="M52 -80 q26 30 10 70 q-20 -10 -20 -40 z" ${F('#8a5f38')}/>
  <ellipse cx="0" cy="-60" rx="30" ry="42" ${F(l)}/>
  <path d="M-38 -125 l-10 -22 l26 8 z M38 -125 l10 -22 l-26 8 z" ${F(c)}/>
  <circle cx="-20" cy="-108" r="20" ${F('#fff')}/><circle cx="20" cy="-108" r="20" ${F('#fff')}/>
  <circle cx="-20" cy="-108" r="8" fill="${INK()}"/><circle cx="20" cy="-108" r="8" fill="${INK()}"/>
  <circle cx="-17" cy="-111" r="2.5" fill="#fff"/><circle cx="23" cy="-111" r="2.5" fill="#fff"/>
  <path d="M-6 -92 l12 0 l-6 14 z" ${F('#ffb347')}/>
  ${mood === 'happy' ? `<path d="M-14 -70 q14 12 28 0" fill="none" stroke="${INK()}" stroke-width="3"/>` : ''}`;
};
CH.star = ({ mood }) => {
  const c = '#ffd93d';
  return `
  <path d="M0 -190 L26 -122 L98 -118 L42 -72 L60 -2 L0 -42 L-60 -2 L-42 -72 L-98 -118 L-26 -122 Z" ${F(c, '#d4a000')}/>
  ${face(0, -100, 40, mood)}`;
};
CH.fish = ({ mood }) => {
  const c = '#ff8a5b', l = '#ffd1b3';
  return `
  <path d="M60 -80 l40 -34 l-6 34 l6 34 z" ${F(c)}/>
  <ellipse cx="0" cy="-80" rx="70" ry="46" ${F(c)}/>
  <path d="M-30 -120 q10 -30 40 -14 z" ${F(c)}/>
  <path d="M-10 -50 q16 20 30 6 z" ${F(c)}/>
  <ellipse cx="-14" cy="-70" rx="34" ry="24" ${F(l)}/>
  <path d="M20 -110 q10 20 0 40 M36 -104 q8 16 0 32" fill="none" stroke="${isLine() ? '#111' : '#d9633a'}" stroke-width="2.5"/>
  ${face(-26, -84, 32, mood)}`;
};
CH.elephant = ({ mood }) => {
  const c = '#9fb4d9', l = '#d6e2f5';
  return `
  <ellipse cx="-50" cy="-14" rx="24" ry="16" ${F(c)}/><ellipse cx="50" cy="-14" rx="24" ry="16" ${F(c)}/>
  <ellipse cx="0" cy="-90" rx="90" ry="80" ${F(c)}/>
  <ellipse cx="-80" cy="-150" rx="34" ry="42" ${F(c)}/><ellipse cx="80" cy="-150" rx="34" ry="42" ${F(c)}/>
  <ellipse cx="-80" cy="-150" rx="20" ry="28" ${F('#f4c2c2')}/><ellipse cx="80" cy="-150" rx="20" ry="28" ${F('#f4c2c2')}/>
  <circle cx="0" cy="-150" r="62" ${F(c)}/>
  <path d="M-14 -120 q-10 60 30 70 q20 4 16 -16 q-14 4 -18 -10 q-8 -30 2 -44 z" ${F(c)}/>
  ${face(0, -160, 62, mood, { eyeSpread: 0.36 })}`;
};
CH.ant = ({ mood }) => {
  const c = '#5b3a2e';
  return `
  <path d="M-30 -30 l-16 20 M-10 -30 l-10 24 M10 -30 l10 24 M30 -30 l16 20" stroke="${INK()}" stroke-width="3" fill="none"/>
  <ellipse cx="-30" cy="-40" rx="26" ry="18" ${F(c)}/>
  <ellipse cx="4" cy="-44" rx="16" ry="13" ${F(c)}/>
  <circle cx="32" cy="-50" r="18" ${F(c)}/>
  <path d="M40 -66 q4 -16 18 -18 M30 -68 q-2 -16 10 -24" stroke="${INK()}" stroke-width="2.5" fill="none"/>
  ${face(34, -50, 18, mood, { eyeSpread: 0.4, eyeR: 0.18 })}`;
};
CH.cloud = ({ mood }) => {
  const c = '#f2f4ff';
  return `
  <path d="M-90 -60 a40 40 0 0 1 50 -50 a50 50 0 0 1 90 -6 a40 40 0 0 1 50 56 a34 34 0 0 1 -10 66 l-170 0 a36 36 0 0 1 -10 -66 z" ${F(c, '#8aa0c8')}/>
  ${face(0, -70, 52, mood)}`;
};
CH.cat = ({ mood }) => {
  const c = '#9a9a9a', l = '#e6e6e6';
  return `
  <path d="M40 -30 q60 -10 40 -70" stroke="${isLine() ? '#111' : '#6f6f6f'}" stroke-width="12" fill="none" stroke-linecap="round"/>
  <ellipse cx="-28" cy="-10" rx="18" ry="10" ${F(c)}/><ellipse cx="28" cy="-10" rx="18" ry="10" ${F(c)}/>
  <ellipse cx="0" cy="-70" rx="44" ry="56" ${F(c)}/>
  <ellipse cx="0" cy="-62" rx="24" ry="34" ${F(l)}/>
  <path d="M-40 -172 l-8 -40 l36 18 z" ${F(c)}/><path d="M40 -172 l8 -40 l-36 18 z" ${F(c)}/>
  <circle cx="0" cy="-140" r="50" ${F(c)}/>
  <path d="M-60 -125 l-26 -4 M-60 -115 l-26 4 M60 -125 l26 -4 M60 -115 l26 4" stroke="${INK()}" stroke-width="2"/>
  <path d="M-6 -118 l12 0 l-6 6 z" fill="${isLine() ? '#111' : '#ff8fa3'}"/>
  ${face(0, -145, 50, mood)}`;
};
CH.hedgehog = ({ mood }) => {
  const c = '#7a5230', l = '#f0d5b5';
  let spikes = '';
  for (let i = 0; i < 9; i++) { const a = -160 + i * 16; const r1 = 70, r2 = 108; const x1 = Math.cos(a * Math.PI / 180) * r1, y1 = Math.sin(a * Math.PI / 180) * r1; const x2 = Math.cos(a * Math.PI / 180) * r2, y2 = Math.sin(a * Math.PI / 180) * r2; spikes += `<path d="M${x1 - 14} ${y1 - 70} L${x2} ${y2 - 70} L${x1 + 14} ${y1 - 70} z" ${F(c)}/>`; }
  return `
  <g transform="translate(-10 0)">${spikes}</g>
  <ellipse cx="-30" cy="-8" rx="16" ry="9" ${F(c)}/><ellipse cx="20" cy="-8" rx="16" ry="9" ${F(c)}/>
  <ellipse cx="-10" cy="-70" rx="72" ry="58" ${F(l)}/>
  <path d="M40 -60 q50 -10 58 -40 q-30 -4 -60 -18 z" ${F(l)}/>
  <circle cx="98" cy="-98" r="9" fill="${INK()}"/>
  ${face(30, -80, 40, mood, { eyeSpread: 0.45 })}`;
};
CH.butterfly = ({ mood }) => {
  const c = '#ff77c8', c2 = '#ffd166';
  return `
  <path d="M-4 -70 q-50 -60 -60 -10 q0 30 56 10 z" ${F(c)}/><path d="M4 -70 q50 -60 60 -10 q0 30 -56 10 z" ${F(c)}/>
  <path d="M-4 -60 q-46 20 -30 46 q26 4 34 -40 z" ${F(c2)}/><path d="M4 -60 q46 20 30 46 q-26 4 -34 -40 z" ${F(c2)}/>
  <ellipse cx="0" cy="-60" rx="8" ry="34" ${F('#5b3a2e')}/>
  <path d="M-4 -92 q-8 -14 -16 -16 M4 -92 q8 -14 16 -16" stroke="${INK()}" stroke-width="2.5" fill="none"/>`;
};
CH.child = ({ mood }) => {
  const skin = '#f7cfa5', shirt = '#ff6f61', pants = '#4f7bd9', hair = '#5b3a2e';
  return `
  <rect x="-30" y="-70" width="24" height="70" rx="10" ${F(pants)}/><rect x="6" y="-70" width="24" height="70" rx="10" ${F(pants)}/>
  <rect x="-40" y="-150" width="80" height="90" rx="22" ${F(shirt)}/>
  <rect x="-66" y="-140" width="26" height="70" rx="13" ${F(skin)}/><rect x="40" y="-140" width="26" height="70" rx="13" ${F(skin)}/>
  <circle cx="0" cy="-195" r="48" ${F(skin)}/>
  <path d="M-48 -200 q0 -50 48 -50 q48 0 48 50 q-20 -20 -48 -18 q-28 -2 -48 18 z" ${F(hair)}/>
  ${face(0, -195, 48, mood)}`;
};

function character(t, opts = {}) {
  const { x = 500, y = 560, s = 1, flip = false, mood = 'happy' } = opts;
  const k = { turtle: 1.75, bird: 1.5, ant: 1.5, butterfly: 1.2 }[t] || 1.4;
  return g(x, y, s * k, flip, CH[t]({ mood }));
}

// ---------- Objetos ----------
const PR = {};
PR.honey = () => `<path d="M-34 -70 q-10 50 0 70 l68 0 q10 -20 0 -70 z" ${F('#ffb020')}/><rect x="-38" y="-88" width="76" height="22" rx="8" ${F('#ffd166')}/><rect x="-22" y="-50" width="44" height="30" rx="6" ${F('#fff8e1')}/><path d="M-30 -66 q10 20 0 30 M18 -66 q6 16 0 26" fill="none" stroke="${isLine() ? '#111' : '#e08e00'}" stroke-width="3"/>`;
PR.sprout = () => `<path d="M0 0 l0 -34" stroke="${isLine() ? '#111' : '#4f9d4f'}" stroke-width="4"/><path d="M0 -20 q-26 -20 -30 -46 q28 6 30 46 z" ${F('#7cc96f')}/><path d="M0 -26 q26 -20 30 -46 q-28 6 -30 46 z" ${F('#7cc96f')}/>`;
PR.seed = () => `<ellipse cx="0" cy="-8" rx="14" ry="9" ${F('#8b5a2b')}/>`;
PR.sunflower = () => `<path d="M0 0 l0 -150" stroke="${isLine() ? '#111' : '#4f9d4f'}" stroke-width="6"/><path d="M0 -70 q-40 -10 -50 -46 q40 0 50 46 z" ${F('#5fb36b')}/>${[...Array(12)].map((_, i) => `<ellipse cx="0" cy="-150" rx="14" ry="36" transform="rotate(${i * 30} 0 -150) translate(0 -36)" ${F('#ffd23f')}/>`).join('')}<circle cx="0" cy="-150" r="30" ${F('#8b5a2b')}/>`;
PR.flower = (c = '#ff77c8') => `<path d="M0 0 l0 -50" stroke="${isLine() ? '#111' : '#4f9d4f'}" stroke-width="4"/>${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-50" rx="9" ry="16" transform="rotate(${a} 0 -50) translate(0 -14)" ${F(c)}/>`).join('')}<circle cx="0" cy="-50" r="9" ${F('#ffd166')}/>`;
PR.umbrella = () => `<path d="M0 -10 l0 -120" stroke="${INK()}" stroke-width="4" fill="none"/><path d="M0 -10 q0 20 -16 14" stroke="${INK()}" stroke-width="4" fill="none"/><path d="M-80 -120 q80 -90 160 0 q-20 -14 -40 0 q-20 -14 -40 0 q-20 -14 -40 0 q-20 -14 -40 0 z" ${F('#ff6f61')}/>`;
PR.peanut = () => `<path d="M-30 -30 a18 18 0 0 1 30 -8 a18 18 0 0 1 30 8 a16 16 0 0 1 -30 10 a16 16 0 0 1 -30 -10 z" ${F('#d9a066')}/>`;
PR.balloon = (c = '#ff6f61') => `<path d="M0 0 q10 -30 0 -60" stroke="${INK()}" stroke-width="2" fill="none"/><ellipse cx="0" cy="-110" rx="38" ry="48" ${F(c)}/><path d="M-6 -64 l12 0 l-6 8 z" ${F(c)}/>`;
PR.wateringcan = () => `<rect x="-40" y="-60" width="70" height="60" rx="10" ${F('#5fa8d3')}/><path d="M30 -46 l40 -30 M70 -76 l-6 12 M70 -76 l-12 -2" stroke="${INK()}" stroke-width="5" fill="none"/><path d="M-40 -40 q-30 -20 -20 10" stroke="${INK()}" stroke-width="5" fill="none"/>`;
PR.basket = () => `<path d="M-50 -50 l100 0 l-12 50 l-76 0 z" ${F('#d9a066')}/><path d="M-30 -50 q30 -50 60 0" stroke="${INK()}" stroke-width="4" fill="none"/><path d="M-44 -34 l90 0 M-40 -18 l80 0" stroke="${isLine() ? '#111' : '#a0673a'}" stroke-width="2"/>`;
PR.trash = () => `<path d="M-20 0 l-10 -30 l14 -10 l-4 -14 l24 -4 l6 18 l14 10 l-8 30 z" ${F('#d0d0d0')}/><rect x="30" y="-40" width="24" height="40" rx="4" ${F('#8ed1fc')}/>`;
PR.rock = () => `<path d="M-60 0 q-10 -50 40 -56 q60 -4 60 56 z" ${F('#b8b0a2')}/>`;
PR.crack = () => `<path d="M-6 0 l3 -22 l-6 -14 l5 -18" stroke="${INK()}" stroke-width="4" fill="none"/>`;
PR.blanket = () => `<path d="M-90 0 q-10 -30 20 -30 q40 -20 90 -10 q40 10 70 40 z" ${F('#ffd6e0')}/><path d="M-60 -10 l20 0 M-20 -20 l20 0 M20 -20 l20 0" stroke="${isLine() ? '#111' : '#ff9aa2'}" stroke-width="3"/>`;
PR.cake = () => `<rect x="-40" y="-40" width="80" height="40" rx="8" ${F('#f7c59f')}/><path d="M-40 -34 q10 12 20 0 q10 12 20 0 q10 12 20 0 q10 12 20 0 l0 -6 l-80 0 z" ${F('#ff8fa3')}/><path d="M0 -40 l0 -22" stroke="${INK()}" stroke-width="3"/><ellipse cx="0" cy="-66" rx="5" ry="8" ${F('#ffb020')}/>`;
PR.gift = () => `<rect x="-36" y="-56" width="72" height="56" rx="6" ${F('#5fa8d3')}/><rect x="-6" y="-56" width="12" height="56" ${F('#ffd166')}/><rect x="-40" y="-64" width="80" height="14" rx="4" ${F('#ffd166')}/><path d="M0 -64 q-20 -30 -10 0 M0 -64 q20 -30 10 0" ${F('#ffd166')}/>`;
PR.moonstar = () => `<path d="M0 -60 L10 -32 L40 -30 L16 -12 L24 16 L0 0 L-24 16 L-16 -12 L-40 -30 L-10 -32 Z" ${F('#ffd93d')}/>`;
PR.heart = () => `<path d="M0 -10 q-30 -40 -15 -50 q15 -10 15 10 q0 -20 15 -10 q15 10 -15 50 z" ${F('#ff6f61')}/>`;
PR.acorn = () => `<ellipse cx="0" cy="-20" rx="16" ry="20" ${F('#c98a4b')}/><path d="M-20 -32 q20 -14 40 0 q-20 8 -40 0 z" ${F('#7a5230')}/>`;
function prop(t, opts = {}) { const { x = 500, y = 560, s = 1, flip = false, color } = opts; return g(x, y, s * 1.3, flip, PR[t](color)); }

// ---------- Fondos (1000 x 700, suelo en y=560) ----------
function tree(x, y, s = 1, c = '#4f9d4f') {
  return g(x, y, s, false, `<rect x="-14" y="-90" width="28" height="90" rx="6" ${F('#8b5a2b')}/><circle cx="0" cy="-130" r="60" ${F(c)}/><circle cx="-40" cy="-100" r="40" ${F(c)}/><circle cx="40" cy="-100" r="40" ${F(c)}/>`);
}
function pine(x, y, s = 1) {
  return g(x, y, s, false, `<rect x="-10" y="-40" width="20" height="40" ${F('#8b5a2b')}/><path d="M-60 -40 l60 -70 l60 70 z" ${F('#3f9550')}/><path d="M-48 -90 l48 -60 l48 60 z" ${F('#4fae60')}/><path d="M-36 -135 l36 -50 l36 50 z" ${F('#5fc270')}/>`);
}
function sun(x, y) { return `<circle cx="${x}" cy="${y}" r="46" ${F('#ffd93d', '#e0a800')}/>${[...Array(8)].map((_, i) => `<path d="M${x} ${y - 62} l0 -22" transform="rotate(${i * 45} ${x} ${y})" stroke="${isLine() ? '#111' : '#f0b400'}" stroke-width="5" stroke-linecap="round"/>`).join('')}`; }
function cloudShape(x, y, s = 1) { return g(x, y, s, false, `<path d="M-60 0 a30 30 0 0 1 40 -36 a36 36 0 0 1 66 -2 a28 28 0 0 1 30 38 z" ${F('#ffffff', '#bcc8dd')}/>`); }
function grassTufts(y, n = 12) { let s = ''; for (let i = 0; i < n; i++) { const x = 40 + i * (920 / n) + (i % 3) * 10; s += `<path d="M${x} ${y} q4 -18 8 0 M${x + 8} ${y} q4 -14 8 0" fill="none" stroke="${isLine() ? '#111' : '#3f9550'}" stroke-width="2.5"/>`; } return s; }
function flowersRow(y) { return [120, 300, 720, 900].map((x, i) => prop('flower', { x, y, s: 0.5, color: ['#ff77c8', '#ffd166', '#8ed1fc', '#ff6f61'][i] })).join(''); }
function stars(n, seed = 1) { let s = ''; for (let i = 0; i < n; i++) { const x = ((i * 137 + seed * 53) % 960) + 20, y = ((i * 89 + seed * 31) % 300) + 30; s += `<path d="M${x} ${y - 8} l3 6 l7 1 l-5 4 l1 7 l-6 -3 l-6 3 l1 -7 l-5 -4 l7 -1 z" ${F('#fff7b0', '#e0c000')}/>`; } return s; }

const BG = {};
BG.forest = () => `<rect width="1000" height="700" ${FL('#cfeeff')}/>${sun(880, 100)}${cloudShape(180, 120)}${cloudShape(560, 80, 0.8)}<path d="M0 560 q250 -60 500 0 q250 -60 500 0 l0 140 l-1000 0 z" ${FO('#8fd47a')}/>${pine(120, 560, 1.1)}${tree(300, 560, 0.9)}${pine(860, 560, 1.2)}${tree(700, 560, 0.8, '#5fb36b')}${grassTufts(600)}`;
BG.meadow = () => `<rect width="1000" height="700" ${FL('#d7f0ff')}/>${sun(140, 110)}${cloudShape(700, 110)}${cloudShape(420, 70, 0.7)}<path d="M0 470 q300 -120 600 -20 q200 -50 400 20 l0 230 l-1000 0 z" ${FO('#a8e6a1')}/><path d="M0 560 q500 -60 1000 0 l0 140 l-1000 0 z" ${FO('#8fd47a')}/>${tree(900, 480, 0.6)}${flowersRow(600)}${grassTufts(610)}`;
BG.sunset = () => `<rect width="1000" height="700" ${FL('#ffd3a8')}/><rect width="1000" height="300" ${FL('#ffb28a')}/>${sun(500, 330)}${cloudShape(220, 130, 0.9)}${cloudShape(780, 170, 0.8)}<path d="M0 470 q300 -120 600 -20 q200 -50 400 20 l0 230 l-1000 0 z" ${FO('#8fcf8a')}/><path d="M0 560 q500 -60 1000 0 l0 140 l-1000 0 z" ${FO('#78c46f')}/>${tree(120, 480, 0.7)}${tree(880, 470, 0.6)}${grassTufts(610)}`;
BG.night = () => `<rect width="1000" height="700" ${FL('#22305a')}/>${stars(18)}<circle cx="840" cy="120" r="56" ${F('#fff4b8', '#d9c36a')}/><circle cx="820" cy="110" r="10" ${F('#f1e39a', '#d9c36a')}/><circle cx="858" cy="140" r="7" ${F('#f1e39a', '#d9c36a')}/><path d="M0 560 q250 -60 500 0 q250 -60 500 0 l0 140 l-1000 0 z" ${FO('#3a6b45')}/>${pine(140, 560, 1.1)}${pine(860, 560, 1.2)}${tree(320, 560, 0.8, '#3f7a4a')}${grassTufts(600)}`;
BG.storm = () => `<rect width="1000" height="700" ${FL('#6c7a99')}/>${cloudShape(200, 150, 1.3)}${cloudShape(600, 110, 1.4)}${cloudShape(880, 180, 1.0)}${[...Array(14)].map((_, i) => `<path d="M${60 + i * 68} ${220 + (i % 3) * 40} l-8 30" stroke="${isLine() ? '#111' : '#9fd0ff'}" stroke-width="4" stroke-linecap="round"/>`).join('')}<path d="M0 560 q250 -60 500 0 q250 -60 500 0 l0 140 l-1000 0 z" ${FO('#6fae6a')}/>${pine(120, 560, 1.1)}${tree(860, 560, 0.9)}${grassTufts(600)}`;
BG.sea = () => `<rect width="1000" height="700" ${FL('#bfe9ff')}/>${sun(880, 90)}${cloudShape(240, 100)}<path d="M0 300 q100 -30 200 0 t200 0 t200 0 t200 0 t200 0 l0 400 l-1000 0 z" ${FO('#5fbcf0')}/><path d="M0 640 q80 -30 160 0 t160 0 t160 0 t160 0 t160 0 t160 0 l0 60 l-1000 0 z" ${FO('#f3dfa8')}/>${[...Array(5)].map((_, i) => `<path d="M${120 + i * 200} 640 q0 -40 -10 -80 q10 30 20 0 q-10 40 10 60 z" ${F('#3fa66b')}/>`).join('')}<circle cx="700" cy="460" r="8" ${F('#e8f7ff', '#8ecff0')}/><circle cx="730" cy="420" r="6" ${F('#e8f7ff', '#8ecff0')}/>`;
BG.garden = () => `<rect width="1000" height="700" ${FL('#d7f0ff')}/>${sun(120, 100)}${cloudShape(640, 90, 0.9)}<path d="M0 560 l1000 0 l0 140 l-1000 0 z" ${FO('#8fd47a')}/>${[...Array(11)].map((_, i) => `<rect x="${i * 100 + 20}" y="${470}" width="26" height="90" rx="6" ${F('#e9c8a0')}/>`).join('')}<rect x="0" y="490" width="1000" height="14" ${F('#e9c8a0')}/><rect x="0" y="525" width="1000" height="14" ${F('#e9c8a0')}/>${tree(900, 480, 0.7)}${grassTufts(610)}`;
BG.village = () => `<rect width="1000" height="700" ${FL('#d7f0ff')}/>${sun(880, 100)}${cloudShape(300, 110, 0.8)}${[[140, '#ffb6a3'], [420, '#fff0a3'], [720, '#a3d8ff']].map(([x, c]) => `<rect x="${x - 90}" y="380" width="180" height="180" rx="8" ${F(c)}/><path d="M${x - 110} 380 l110 -90 l110 90 z" ${F('#d9633a')}/><rect x="${x - 26}" y="470" width="52" height="90" rx="6" ${F('#8b5a2b')}/><rect x="${x + 36}" y="410" width="40" height="40" rx="4" ${F('#e8f7ff')}/><rect x="${x - 76}" y="410" width="40" height="40" rx="4" ${F('#e8f7ff')}/>`).join('')}<path d="M0 560 l1000 0 l0 140 l-1000 0 z" ${FO('#8fd47a')}/>${grassTufts(610)}`;
BG.picnic = () => BG.meadow() + `<path d="M280 590 l440 0 l40 60 l-520 0 z" ${F('#ffd6e0')}/>${[0, 1, 2].map(i => `<path d="M${330 + i * 130} 590 l30 0 l30 60 l-30 0 z" ${F('#ff9aa2')}/>`).join('')}`;
BG.sky = () => `<rect width="1000" height="700" ${FL('#bfe9ff')}/>${sun(140, 110)}${cloudShape(300, 260, 1.4)}${cloudShape(700, 330, 1.6)}${cloudShape(880, 140, 0.9)}<path d="M0 620 q250 -60 500 0 q250 -60 500 0 l0 80 l-1000 0 z" ${FO('#8fd47a')}/>`;
BG.rain = () => `<rect width="1000" height="700" ${FL('#9fb3d1')}/>${cloudShape(240, 140, 1.2)}${cloudShape(760, 120, 1.3)}${[...Array(16)].map((_, i) => `<path d="M${40 + i * 62} ${200 + (i % 4) * 50} l-6 24" stroke="${isLine() ? '#111' : '#dff1ff'}" stroke-width="4" stroke-linecap="round"/>`).join('')}<path d="M0 560 l1000 0 l0 140 l-1000 0 z" ${FO('#8fd47a')}/>${[...Array(11)].map((_, i) => `<rect x="${i * 100 + 20}" y="470" width="26" height="90" rx="6" ${F('#e9c8a0')}/>`).join('')}<rect x="0" y="490" width="1000" height="14" ${F('#e9c8a0')}/>${grassTufts(610)}`;
BG.gardenbloom = () => BG.garden() + [80, 200, 330, 470, 600, 750, 860].map((x, i) => prop('flower', { x, y: 590, s: 0.7 + (i % 3) * 0.15, color: ['#ff77c8', '#ffd166', '#8ed1fc', '#ff6f61', '#c48cff'][i % 5] })).join('');
BG.nightsoft = () => BG.night();

function background(t) { return BG[t]().replace(/^<rect width="1000" height="700" ([^>]*)\/>/, '<rect x="0" y="-160" width="1000" height="860" $1/>'); }

function scene(sc) {
  const parts = [background(sc.bg)];
  for (const p of sc.props || []) parts.push(prop(p.t, p));
  for (const c of sc.chars || []) parts.push(character(c.t, c));
  for (const p of sc.front || []) parts.push(prop(p.t, p));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -240 1000 940" width="100%" font-family="sans-serif">${parts.join('\n')}</svg>`;
}
module.exports = { setMode, scene, character, prop, isLine };
