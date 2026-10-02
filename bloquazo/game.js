(() => {
  'use strict';

  /* ================= Datos ================= */
  const N = 8, MAX = 200;
  const UNDO_COST = 10, SWAP_COST = 20;
  const COLORS = ['#d94a3d', '#ec8a2f', '#efc233', '#5aa64a', '#2fa89c', '#3f7ec2', '#8a5fc0', '#dd6a9c'];
  const GOLD = '#f0b323', GREY = '#a89b86';
  const WORLDS = [
    { name: 'Pradera',  color: '#5aa64a', fx: 'leaf' },
    { name: 'Océano',   color: '#3f7ec2', fx: 'bubble' },
    { name: 'Desierto', color: '#ec8a2f', fx: 'dust' },
    { name: 'Selva',    color: '#3d8f3a', fx: 'leaf' },
    { name: 'Volcán',   color: '#d94a3d', fx: 'spark' },
    { name: 'Glaciar',  color: '#2fa89c', fx: 'snow' },
    { name: 'Feria',    color: '#dd6a9c', fx: 'confetti' },
    { name: 'Cosmos',   color: '#8a5fc0', fx: 'star' },
    { name: 'Tormenta', color: '#6b7a8f', fx: 'rain' },
    { name: 'Leyenda',  color: '#d99a12', fx: 'sparkle' },
    { name: 'Huerto',   color: '#7cb342', fx: 'leaf' },
    { name: 'Arrecife', color: '#26a69a', fx: 'bubble' },
    { name: 'Mina',     color: '#8d6e63', fx: 'dust' },
    { name: 'Pantano',  color: '#558b2f', fx: 'bubble' },
    { name: 'Fragua',   color: '#e65100', fx: 'spark' },
    { name: 'Ventisca', color: '#5fa8d3', fx: 'snow' },
    { name: 'Circo',    color: '#ec407a', fx: 'confetti' },
    { name: 'Nebulosa', color: '#7e57c2', fx: 'star' },
    { name: 'Huracán',  color: '#546e7a', fx: 'rain' },
    { name: 'Olimpo',   color: '#c9a227', fx: 'sparkle' }
  ];
  const SVG = {
    star: '<svg viewBox="0 0 24 24"><path d="M12 1.8l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.9l-6.4 3.5 1.4-7.1-5.3-5 7.2-.9z"/></svg>',
    marble: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="8.5" cy="8.5" r="3.2" fill="#fff" opacity=".75"/></svg>',
    lock: '<svg viewBox="0 0 24 24"><path d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3z"/></svg>',
    soundOn: '<svg viewBox="0 0 24 24"><path d="M3 9h4l5-5v16l-5-5H3zM16 7.5a6 6 0 0 1 0 9l-1.4-1.4a4 4 0 0 0 0-6.2zM18.8 4.7a10 10 0 0 1 0 14.6l-1.4-1.4a8 8 0 0 0 0-11.8z"/></svg>',
    soundOff: '<svg viewBox="0 0 24 24"><path d="M3 9h4l5-5v16l-5-5H3zM15.6 8.6 18 11l2.4-2.4 1.4 1.4-2.4 2.4 2.4 2.4-1.4 1.4-2.4-2.4-2.4 2.4-1.4-1.4 2.4-2.4-2.4-2.4z"/></svg>',
    note: '<svg viewBox="0 0 24 24"><path d="M12 3v10.6A3.5 3.5 0 1 0 14 17V7h4V3z"/></svg>',
    fx: '<svg viewBox="0 0 24 24"><path d="M11 2 5 12h5l-1 10 8-12h-5z"/></svg>',
    vibe: '<svg viewBox="0 0 24 24"><path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 3v14h8V5zM2 8h2v8H2zm18 0h2v8h-2z"/></svg>',
    coin: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#f0b323" stroke="#b57d0a" stroke-width="2"/><circle cx="12" cy="12" r="5.5" fill="none" stroke="#b57d0a" stroke-width="2"/></svg>',
    undo: '<svg viewBox="0 0 24 24"><path d="M12 5a8 8 0 0 1 8 8h-2.5a5.5 5.5 0 0 0-5.5-5.5H9.5V11L4 6.5 9.5 2v3z"/><path d="M4 13h2.5a5.5 5.5 0 0 0 5.5 5.5V21a8 8 0 0 1-8-8z"/></svg>',
    swap: '<svg viewBox="0 0 24 24"><path d="M7 7h9.2l-2.6-2.6L15 3l5 5-5 5-1.4-1.4L16.2 9H7zM17 17H7.8l2.6 2.6L9 21l-5-5 5-5 1.4 1.4L7.8 15H17z"/></svg>',
    flame: '<svg viewBox="0 0 24 24"><path d="M12 2c1 4 5 5 5 11a5 5 0 0 1-10 0c0-2 1-3 1-3s.5 2 2 2c0-3-1-5 2-10z"/></svg>',
    trophy: '<svg viewBox="0 0 24 24"><path d="M6 2h12v2h3v4a4 4 0 0 1-4 4h-.3A6 6 0 0 1 13 15.9V18h3v2H8v-2h3v-2.1A6 6 0 0 1 7.3 12H7a4 4 0 0 1-4-4V4h3zm0 4H5v2a2 2 0 0 0 2 2zm12 0v4a2 2 0 0 0 2-2V6z"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-1 3h2v5.6l3.5 2-1 1.7L11 13.6z"/></svg>',
    gift: '<svg viewBox="0 0 24 24"><path d="M20 7h-2.2A3 3 0 0 0 12 4.3 3 3 0 0 0 6.2 7H4a1 1 0 0 0-1 1v3h8V8h2v3h8V8a1 1 0 0 0-1-1zM9 7a1 1 0 1 1 0-2c.6 0 1.4.7 2 2zm6 0h-2c.6-1.3 1.4-2 2-2a1 1 0 1 1 0 2zM4 13v7a1 1 0 0 0 1 1h6v-8zm9 8h6a1 1 0 0 0 1-1v-7h-7z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24"><path d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h3zm-2 7v11h14V9zm2 2h3v3H7z"/></svg>'
  };

  // Piezas: '#' = cubo, '.' = hueco, '/' = nueva fila. [patrón, nivel de dificultad, peso]
  const SHAPE_DEFS = [
    ['#', 0, 1.2], ['##', 0, 2], ['#/#', 0, 2], ['###', 0, 2.2], ['#/#/#', 0, 2.2],
    ['##/##', 0, 3], ['##/#.', 0, 1.3], ['##/.#', 0, 1.3], ['#./##', 0, 1.3], ['.#/##', 0, 1.3],
    ['####', 0, 1.6], ['#/#/#/#', 0, 1.6],
    ['###/.#.', 1, 1], ['.#./###', 1, 1], ['#./##/#.', 1, 1], ['.#/##/.#', 1, 1],
    ['#./#./##', 1, .7], ['.#/.#/##', 1, .7], ['##/#./#.', 1, .7], ['##/.#/.#', 1, .7],
    ['###/#..', 1, .7], ['###/..#', 1, .7], ['#../###', 1, .7], ['..#/###', 1, .7],
    ['##./.##', 1, .8], ['.##/##.', 1, .8], ['#./##/.#', 1, .8], ['.#/##/#.', 1, .8],
    ['###/###', 1, 1.2], ['##/##/##', 1, 1.2],
    ['#####', 2, 1.2], ['#/#/#/#/#', 2, 1.2], ['###/###/###', 2, 1.4],
    ['###/#../#..', 2, .7], ['###/..#/..#', 2, .7], ['#../#../###', 2, .7], ['..#/..#/###', 2, .7]
  ];
  const SHAPES = SHAPE_DEFS.map(([p, tier, wt], id) => {
    const rows = p.split('/');
    const cells = [];
    rows.forEach((row, r) => [...row].forEach((ch, c) => { if (ch === '#') cells.push([r, c]); }));
    return { id, cells, h: rows.length, w: Math.max(...rows.map(r => r.length)), tier, wt };
  });

  /* ================= Utilidades ================= */
  const $ = s => document.querySelector(s);
  const rand = Math.random;
  function mulberry32(a) {
    return () => {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  const pick = (arr, r = rand) => arr[Math.floor(r() * arr.length)];
  function shuffle(arr, r = rand) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const emptyBoard = () => Array.from({ length: N }, () => Array(N).fill(null));
  const fmtDate = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const today = () => fmtDate(new Date());
  const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return fmtDate(d); };
  const dateSeed = s => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) | 0, 7);
  const niceDate = s => { const [y, m, d] = s.split('-'); return `${+d}/${+m}/${y.slice(2)}`; };
  const mmss = t => { const s = Math.max(0, Math.ceil(t)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================= Guardado ================= */
  const STORE_KEY = 'bloquazo-v3';
  const save = (() => {
    const base = {
      unlocked: 1, stars: {}, best: {}, classicBest: 0, timeBest: 0, classicTop: [], timeTop: [],
      coins: 50, music: true, sfx: true, vibe: true, ach: {}, stats: { pieces: 0, lines: 0, wins: 0, games: 0 },
      daily: null, streak: { last: '', n: 0 }, gift: '', dailyLevel: {}, game: null, installed: false
    };
    try {
      const s = JSON.parse(localStorage.getItem(STORE_KEY));
      if (s && typeof s.unlocked === 'number') return Object.assign(base, s);
      const old = JSON.parse(localStorage.getItem('bloquazo-v2'));
      if (old && typeof old.unlocked === 'number') {
        return Object.assign(base, { unlocked: old.unlocked, stars: old.stars || {}, best: old.best || {}, classicBest: old.classicBest || 0, music: old.music !== false, sfx: old.sfx !== false });
      }
    } catch (e) { /* sin almacenamiento */ }
    return base;
  })();
  function persist() { try { localStorage.setItem(STORE_KEY, JSON.stringify(save)); } catch (e) { /* ignorar */ } }
  if (location.hash === '#todos') { save.unlocked = MAX; persist(); }
  const totalStars = () => Object.values(save.stars).reduce((a, b) => a + b, 0);
  function addCoins(n) {
    save.coins = Math.max(0, save.coins + n);
    persist();
    for (const el of document.querySelectorAll('[data-coins]')) el.innerHTML = `${SVG.coin}<span>${save.coins}</span>`;
  }

  /* ================= Avisos ================= */
  function toast(text, icon = SVG.coin, ms = 2600, cls = '') {
    const box = $('#toasts');
    const el = document.createElement('div');
    el.className = 'toast ' + cls;
    el.innerHTML = `${icon}<span>${text}</span>`;
    box.append(el);
    while (box.children.length > 3) box.firstChild.remove();
    if (ms) setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, ms);
    return el;
  }
  function haptic(p) { if (save.vibe && navigator.vibrate) { try { navigator.vibrate(p); } catch (e) { /* nada */ } } }

  /* ================= Logros ================= */
  const ACH = [
    { id: 'primera', name: 'Primera línea', desc: 'Vacía una fila o columna' },
    { id: 'limpio', name: 'Bandeja vacía', desc: 'Deja la bandeja sin un solo cubo' },
    { id: 'triple', name: 'Triple', desc: 'Vacía 3 líneas de un golpe' },
    { id: 'combo3', name: 'Combo x3', desc: 'Encadena 3 vaciadas seguidas' },
    { id: 'combo5', name: 'Combo x5', desc: 'Encadena 5 vaciadas seguidas' },
    { id: 'mundo1', name: 'Pradera completa', desc: 'Supera los 10 niveles del Mundo 1' },
    { id: 'mundos5', name: 'Medio camino', desc: 'Completa 5 mundos' },
    { id: 'cien', name: 'Centenario', desc: 'Supera el nivel 100' },
    { id: 'doscientos', name: 'Leyenda', desc: 'Supera el nivel 200' },
    { id: 'estrellas50', name: 'Coleccionista', desc: 'Junta 50 estrellas' },
    { id: 'estrellas150', name: 'Constelación', desc: 'Junta 150 estrellas' },
    { id: 'estrellas300', name: 'Firmamento', desc: 'Junta 300 estrellas' },
    { id: 'clasico2000', name: 'Aguantador', desc: '2.000 puntos en una partida clásica' },
    { id: 'clasico5000', name: 'Imparable', desc: '5.000 puntos en una partida clásica' },
    { id: 'tiempo1000', name: 'Rapidín', desc: '1.000 puntos en contrarreloj' },
    { id: 'reto', name: 'Retador', desc: 'Supera un Reto del día' },
    { id: 'reto7', name: 'Semana perfecta', desc: 'Supera 7 Retos del día' },
    { id: 'comodin', name: 'Toque dorado', desc: 'Coloca un cubo dorado' },
    { id: 'hielo', name: 'Rompehielos', desc: 'Rompe un cubo de hielo' },
    { id: 'candado', name: 'Cerrajero', desc: 'Destraba un candado' },
    { id: 'piezas1000', name: 'Mil cubos', desc: 'Coloca 1.000 piezas en total' },
    { id: 'racha3', name: 'Costumbre', desc: 'Juega 3 días seguidos' },
    { id: 'racha7', name: 'Rutina', desc: 'Juega 7 días seguidos' },
    { id: 'racha30', name: 'Devoción', desc: 'Juega 30 días seguidos' }
  ];
  const ACH_COINS = 50;
  function unlock(id) {
    if (save.ach[id]) return;
    save.ach[id] = today();
    const a = ACH.find(x => x.id === id);
    addCoins(ACH_COINS);
    toast(`Logro: ${a.name} · +${ACH_COINS}`, SVG.trophy, 3200);
    haptic([20, 40, 20]);
  }

  /* ================= Misiones diarias y racha ================= */
  const MISSION_DEFS = [
    { id: 'lines', opts: [10, 20, 30], text: t => `Vacía ${t} líneas` },
    { id: 'wins', opts: [1, 2, 3], text: t => `Supera ${t} ${t === 1 ? 'nivel' : 'niveles'}` },
    { id: 'pieces', opts: [40, 80], text: t => `Coloca ${t} piezas` },
    { id: 'combo', opts: [2, 3], text: t => `Haz un combo x${t}`, flag: true },
    { id: 'three', opts: [1], text: () => 'Gana un nivel con 3 estrellas', flag: true },
    { id: 'classic', opts: [500, 1000], text: t => `Haz ${t} puntos en una partida clásica`, max: true },
    { id: 'time', opts: [400, 800], text: t => `Haz ${t} puntos en contrarreloj`, max: true },
    { id: 'empty', opts: [1], text: () => 'Deja la bandeja vacía', flag: true },
    { id: 'daily', opts: [1], text: () => 'Supera el Reto del día', flag: true }
  ];
  const MISSION_COINS = 30, DAILY_BONUS = 60;
  function ensureDaily() {
    const t = today();
    if (save.daily && save.daily.date === t) return save.daily;
    const r = mulberry32(dateSeed(t));
    const defs = shuffle(MISSION_DEFS, r).slice(0, 3);
    save.daily = {
      date: t, bonus: false,
      missions: defs.map(d => { const target = pick(d.opts, r); return { id: d.id, target, progress: 0, done: false }; })
    };
    persist();
    return save.daily;
  }
  function missionText(m) { return MISSION_DEFS.find(d => d.id === m.id).text(m.target); }
  function track(kind, value) {
    const daily = ensureDaily();
    let changed = false;
    for (const m of daily.missions) {
      if (m.done || m.id !== kind) continue;
      const def = MISSION_DEFS.find(d => d.id === kind);
      if (def.flag) { if (value >= m.target) m.progress = m.target; }
      else if (def.max) m.progress = Math.max(m.progress, value);
      else m.progress += value;
      if (m.progress >= m.target) {
        m.done = true; changed = true;
        addCoins(MISSION_COINS);
        toast(`Misión cumplida · +${MISSION_COINS}`, SVG.calendar, 3000);
      }
    }
    if (!daily.bonus && daily.missions.every(m => m.done)) {
      daily.bonus = true; changed = true;
      addCoins(DAILY_BONUS);
      toast(`¡Las 3 misiones del día! · +${DAILY_BONUS}`, SVG.gift, 3400);
    }
    if (changed) persist();
  }
  function touchStreak() {
    const t = today();
    if (save.streak.last === t) return;
    save.streak.n = save.streak.last === yesterday() ? save.streak.n + 1 : 1;
    save.streak.last = t;
    const bonus = 5 * Math.min(save.streak.n, 10);
    addCoins(bonus);
    toast(`Racha de ${save.streak.n} ${save.streak.n === 1 ? 'día' : 'días'} · +${bonus}`, SVG.flame, 3000);
    if (save.streak.n >= 3) unlock('racha3');
    if (save.streak.n >= 7) unlock('racha7');
    if (save.streak.n >= 30) unlock('racha30');
  }
  const streakNow = () => (save.streak.last === today() || save.streak.last === yesterday()) ? save.streak.n : 0;

  /* ================= Niveles ================= */
  const isGemLevel = n => n % 4 === 0;
  const isBoss = n => n % 10 === 0;

  function genObstacles(rng, count, n, iceP, lockP) {
    const b = emptyBoard();
    if (!count) return b;
    const mode = n % 3; // 0: disperso, 1: espejo, 2: grupos
    const palette = shuffle(COLORS, rng).slice(0, 3);
    const rowCnt = Array(N).fill(0), colCnt = Array(N).fill(0);
    let placed = 0;
    const canSet = (r, c) => r < N && c < N && !b[r][c] && rowCnt[r] < 6 && colCnt[c] < 6;
    const set = (r, c, color) => {
      const cell = { color, gem: false, ice: 0, lock: false };
      const x = rng();
      if (x < iceP) cell.ice = 2; else if (x < iceP + lockP) cell.lock = true;
      b[r][c] = cell; rowCnt[r]++; colCnt[c]++; placed++;
    };
    for (let guard = 0; placed < count && guard < 3000; guard++) {
      const r = Math.floor(rng() * N), c = Math.floor(rng() * N);
      const color = pick(palette, rng);
      if (mode === 1) {
        const c2 = N - 1 - c;
        if (canSet(r, c) && canSet(r, c2)) { set(r, c, color); set(r, c2, color); }
      } else if (mode === 2) {
        for (const [dr, dc] of [[0, 0], [0, 1], [1, 0], [1, 1]]) {
          if (placed < count && rng() < 0.75 && canSet(r + dr, c + dc)) set(r + dr, c + dc, color);
        }
      } else if (canSet(r, c)) {
        set(r, c, color);
      }
    }
    return b;
  }

  function levelConfig(n) {
    const rng = mulberry32(n * 7919 + 13);
    const type = isGemLevel(n) ? 'gems' : 'score';
    const boss = isBoss(n);
    const world = Math.floor((n - 1) / 10);
    const tier = n < 6 ? 0 : n < 16 ? 1 : 2;
    const density = n === 1 ? 0 : Math.min(0.06 + n * 0.0018 + (boss ? 0.05 : 0), 0.28);
    const gems = type === 'gems' ? Math.min(3 + Math.floor(n / 12), 10) : 0;
    let count = Math.round(64 * density);
    if (gems) count = Math.max(count, gems + 4);
    const iceP = world >= 10 ? Math.min(0.18 + (world - 10) * 0.02, 0.32) : 0;
    const lockP = world >= 12 ? Math.min(0.08 + (world - 12) * 0.01, 0.14) : 0;
    const board = genObstacles(rng, count, n, iceP, lockP);
    if (gems) {
      const filled = [];
      board.forEach((row, r) => row.forEach((cell, c) => { if (cell && !cell.lock) filled.push([r, c]); }));
      shuffle(filled, rng).slice(0, gems).forEach(([r, c]) => { board[r][c].gem = true; });
    }
    const target = type === 'score' ? Math.round((200 + 22 * n) / 10) * 10 : 0;
    // Par para 3 estrellas: ajustado con un bot que juega los 200 niveles (los combos hacen que los puntos crezcan rápido)
    const par = type === 'score' ? Math.round(1.35 * Math.pow(target, 0.33)) + 2 : Math.round(3 + 3.5 * gems);
    return {
      mode: 'level', n, type, boss, tier, target, par, board, world,
      gems: board.flat().filter(c => c && c.gem).length,
      help: Math.max(0.12, 0.6 - n * 0.0045),
      retries: n < 20 ? 4 : n < 50 ? 3 : 2,
      wild: n > 100 ? 0.06 : 0
    };
  }
  const classicConfig = () => ({ mode: 'classic', n: 0, type: 'score', boss: false, tier: 0, target: 0, par: 0, board: emptyBoard(), gems: 0, world: 0, help: 0.45, retries: 2, wild: 0 });
  const timeConfig = () => ({ mode: 'time', n: 0, type: 'score', boss: false, tier: 1, target: 0, par: 0, board: emptyBoard(), gems: 0, world: 6, help: 0.5, retries: 2, wild: 0.03, duration: 120 });
  // Reto del día: el mismo tablero para todos, cambia a medianoche
  function dailyConfig(date = today()) {
    const rng = mulberry32(dateSeed(date) ^ 0x5bd1e995);
    const world = Math.floor(rng() * 10);
    const count = 10 + Math.floor(rng() * 10);
    const board = genObstacles(rng, count, 2 + Math.floor(rng() * 3), rng() < 0.4 ? 0.2 : 0, rng() < 0.3 ? 0.12 : 0);
    const target = 900 + Math.floor(rng() * 7) * 100;
    return { mode: 'daily', n: 0, date, type: 'score', boss: false, tier: 2, target, par: Math.round(1.35 * Math.pow(target, 0.33)) + 2, board, gems: 0, world, help: 0.3, retries: 2, wild: 0.03 };
  }

  /* ================= Lógica del tablero ================= */
  function canPlace(board, s, r, c) {
    if (r < 0 || c < 0 || r + s.h > N || c + s.w > N) return false;
    for (const [dr, dc] of s.cells) if (board[r + dr][c + dc]) return false;
    return true;
  }
  function fitsAnywhere(board, s) {
    for (let r = 0; r <= N - s.h; r++) for (let c = 0; c <= N - s.w; c++) if (canPlace(board, s, r, c)) return true;
    return false;
  }
  function fullLines(board) {
    const rows = [], cols = [];
    for (let i = 0; i < N; i++) {
      if (board[i].every(Boolean)) rows.push(i);
      let full = true;
      for (let j = 0; j < N; j++) if (!board[j][i]) { full = false; break; }
      if (full) cols.push(i);
    }
    return { rows, cols };
  }
  function linesIf(board, s, r, c) {
    for (const [dr, dc] of s.cells) board[r + dr][c + dc] = true;
    const res = fullLines(board);
    for (const [dr, dc] of s.cells) board[r + dr][c + dc] = null;
    return res;
  }
  function wouldClear(board, s) {
    for (let r = 0; r <= N - s.h; r++) for (let c = 0; c <= N - s.w; c++) {
      if (!canPlace(board, s, r, c)) continue;
      const l = linesIf(board, s, r, c);
      if (l.rows.length + l.cols.length) return true;
    }
    return false;
  }

  /* ================= Estado de la partida ================= */
  let G = null;

  function weighted(pool, n) {
    const w = s => s.wt * (s.cells.length >= 5 ? 1 + n / 70 : 1);
    let total = 0;
    for (const s of pool) total += w(s);
    let x = rand() * total;
    for (const s of pool) { x -= w(s); if (x <= 0) return s; }
    return pool[pool.length - 1];
  }

  // En clásico y contrarreloj la dificultad sube con la puntuación
  function difficulty() {
    const cfg = G.cfg;
    if (cfg.mode !== 'classic' && cfg.mode !== 'time') return cfg;
    const s = G.score;
    return {
      tier: s < 600 ? 0 : s < 2500 ? 1 : 2,
      help: Math.max(0.12, cfg.help - s / 15000),
      retries: s < 4000 ? 2 : s < 9000 ? 1 : 0,
      n: Math.min(100, Math.floor(s / 100)),
      wild: cfg.mode === 'time' ? cfg.wild : s > 3000 ? 0.04 : 0
    };
  }

  function deal() {
    const d = difficulty();
    const pool = SHAPES.filter(s => s.tier <= d.tier);
    const res = [];
    for (let i = 0; i < 3; i++) {
      let s = null;
      if (i === 0 && rand() < d.help) s = shuffle(pool).find(x => wouldClear(G.board, x)) || null;
      if (!s) {
        for (let t = 0; t <= d.retries; t++) {
          s = weighted(pool, d.n);
          if (fitsAnywhere(G.board, s)) break;
        }
      }
      res.push({ shape: s, color: pick(COLORS), wild: false });
    }
    // Garantía: las tres piezas caben al repartirlas (si existe alguna que quepa)
    for (let i = 0; i < 3; i++) {
      if (fitsAnywhere(G.board, res[i].shape)) continue;
      const f = shuffle(pool).find(s => fitsAnywhere(G.board, s));
      if (f) res[i] = { shape: f, color: pick(COLORS), wild: false };
    }
    if (d.wild && rand() < d.wild) res[Math.floor(rand() * 3)] = { shape: SHAPES[0], color: GOLD, wild: true };
    G.pieces = shuffle(res);
    G.dealT = performance.now();
  }

  const serPieces = ps => ps.map(p => p ? { id: p.shape.id, color: p.color, wild: !!p.wild } : null);
  const unserPieces = ps => ps.map(p => p ? { shape: SHAPES[p.id], color: p.color, wild: !!p.wild } : null);
  const cloneBoard = b => b.map(row => row.map(c => c ? { ...c } : null));

  function begin(cfg, resume) {
    G = {
      cfg,
      board: cloneBoard(cfg.board),
      pieces: [null, null, null],
      score: 0, used: 0, gemsLeft: cfg.gems,
      combo: 0, sinceClear: 0,
      over: false, won: false, loseT: 0, dealT: 0,
      timeLeft: cfg.duration || 0, timeStart: performance.now() + 1500, shownSec: -1, beatRecord: false,
      history: [],
      effects: [], floats: [], parts: [], ambient: [], pop: null, drag: null, shake: 0
    };
    if (resume) {
      Object.assign(G, {
        board: resume.board, pieces: unserPieces(resume.pieces), score: resume.score, used: resume.used,
        gemsLeft: resume.gemsLeft, combo: resume.combo, sinceClear: resume.sinceClear,
        timeLeft: resume.timeLeft, beatRecord: resume.beatRecord,
        history: (resume.history || []).map(h => ({ ...h, pieces: unserPieces(h.pieces) }))
      });
      G.dealT = performance.now();
    } else deal();
    closeModal();
    show('game');
    document.documentElement.style.setProperty('--world', cfg.mode === 'classic' ? '#e4552b' : WORLDS[cfg.world].color);
    initAmbient(WORLDS[cfg.world].fx);
    resize();
    MUSIC.start();
    MUSIC.intensity(0);
    updateHud();
    saveGame();
  }

  function showBanner(title, sub) {
    const banner = $('#banner');
    banner.innerHTML = `<strong>${title}</strong><span>${sub}</span>`;
    banner.hidden = true;
    void banner.offsetWidth;
    banner.hidden = false;
    clearTimeout(showBanner.t);
    showBanner.t = setTimeout(() => { banner.hidden = true; }, 2000);
  }
  function goalText(cfg) {
    return cfg.type === 'score' ? `Consigue ${cfg.target} puntos` : `Saca ${cfg.gems === 1 ? 'la canica' : `las ${cfg.gems} canicas`}`;
  }
  function startLevel(n) {
    const cfg = levelConfig(n);
    begin(cfg);
    showBanner(`${cfg.boss ? 'Jefe · ' : ''}Nivel ${n}`, goalText(cfg));
  }
  function startClassic() {
    begin(classicConfig());
    showBanner('Modo clásico', save.classicBest ? `Récord: ${save.classicBest} puntos` : 'Aguanta lo más que puedas');
  }
  function startTime() {
    begin(timeConfig());
    showBanner('Contrarreloj', save.timeBest ? `2 minutos · Récord: ${save.timeBest}` : '2 minutos, todos los puntos que puedas');
  }
  function startDaily() {
    const cfg = dailyConfig();
    begin(cfg);
    showBanner('Reto del día', goalText(cfg));
  }
  function resumeGame() {
    const g = save.game;
    if (!g) return;
    const cfg = g.mode === 'level' ? levelConfig(g.n) : g.mode === 'classic' ? classicConfig() : g.mode === 'time' ? timeConfig() : dailyConfig(g.date);
    if (g.mode === 'daily' && g.date !== today()) { save.game = null; persist(); startDaily(); return; }
    begin(cfg, g);
    showBanner('Seguimos', cfg.mode === 'level' ? `Nivel ${cfg.n} · ${goalText(cfg)}` : cfg.mode === 'daily' ? goalText(cfg) : `${G.score} puntos`);
  }

  function saveGame() {
    if (!G || G.over) { save.game = null; persist(); return; }
    save.game = {
      mode: G.cfg.mode, n: G.cfg.n, date: G.cfg.date || '', board: G.board, pieces: serPieces(G.pieces),
      history: G.history.slice(-5).map(h => ({ ...h, pieces: serPieces(h.pieces) })),
      score: G.score, used: G.used, gemsLeft: G.gemsLeft, combo: G.combo, sinceClear: G.sinceClear,
      timeLeft: G.timeLeft, beatRecord: G.beatRecord
    };
    persist();
  }

  function starsFor(used, par) { return used <= par ? 3 : used <= Math.ceil(par * 1.5) ? 2 : 1; }

  function snapshot() {
    return { board: cloneBoard(G.board), pieces: G.pieces.map(p => p ? { ...p } : null), score: G.score, used: G.used, gemsLeft: G.gemsLeft, combo: G.combo, sinceClear: G.sinceClear };
  }
  function undo() {
    if (!G || G.over || !G.history.length || save.coins < UNDO_COST) return;
    const h = G.history.pop();
    Object.assign(G, h);
    G.effects = []; G.pop = null; G.dealT = performance.now();
    addCoins(-UNDO_COST);
    SFX.drop(); haptic(10);
    updateHud(); saveGame();
  }
  function swap() {
    if (!G || G.over || save.coins < SWAP_COST) return;
    addCoins(-SWAP_COST);
    deal();
    SFX.pick(); haptic(10);
    updateHud(); saveGame();
  }

  function place(slot, r, c) {
    const p = G.pieces[slot];
    const s = p.shape;
    const now = performance.now();
    G.history.push(snapshot());
    if (G.history.length > 10) G.history.shift();
    for (const [dr, dc] of s.cells) G.board[r + dr][c + dc] = { color: p.color, gem: false, ice: 0, lock: false };
    G.pieces[slot] = null;
    G.used++;
    save.stats.pieces++;
    if (save.stats.pieces >= 1000) unlock('piezas1000');
    G.pop = { cells: new Set(s.cells.map(([dr, dc]) => (r + dr) * N + (c + dc))), t0: now };
    let gained = s.cells.length;
    SFX.place(); haptic(12);

    const { rows, cols } = fullLines(G.board);
    if (p.wild) {
      if (!rows.includes(r)) rows.push(r);
      if (!cols.includes(c)) cols.push(c);
      unlock('comodin');
    }
    const lines = rows.length + cols.length;
    const cx = L.bx + (c + s.w / 2) * C, cy = L.by + (r + s.h / 2) * C;
    if (lines) {
      G.combo = G.combo > 0 ? G.combo + 1 : 1;
      G.sinceClear = 0;
      const cleared = new Map();
      rows.forEach(rr => { for (let j = 0; j < N; j++) if (G.board[rr][j]) cleared.set(rr * N + j, [rr, j]); });
      cols.forEach(cc => { for (let i = 0; i < N; i++) if (G.board[i][cc]) cleared.set(i * N + cc, [i, cc]); });
      let gemsHit = 0, iceHit = false;
      for (const [rr, cc] of cleared.values()) {
        const cell = G.board[rr][cc];
        if (cell.lock) continue;
        const x = L.bx + cc * C, y = L.by + rr * C;
        const dist = Math.hypot(x + C / 2 - cx, y + C / 2 - cy) / C;
        if (cell.ice > 0) {
          cell.ice--; iceHit = true;
          G.effects.push({ kind: 'crack', x, y, t0: now + dist * 28, spawned: false });
          if (cell.ice > 0) continue;
        }
        if (cell.gem) gemsHit++;
        G.effects.push({ kind: 'block', x, y, color: cell.color, gem: cell.gem, t0: now + dist * 28, spawned: false });
        G.board[rr][cc] = null;
      }
      let unlocked = 0;
      for (let rr = 0; rr < N; rr++) for (let cc = 0; cc < N; cc++) {
        const cell = G.board[rr][cc];
        if (!cell || !cell.lock) continue;
        if (rows.some(x => Math.abs(x - rr) <= 1) || cols.some(x => Math.abs(x - cc) <= 1)) {
          cell.lock = false; unlocked++;
          G.effects.push({ kind: 'crack', gold: true, x: L.bx + cc * C, y: L.by + rr * C, t0: now + 150, spawned: false });
        }
      }
      const base = lines * 80 * (1 + (lines - 1) * 0.5);
      const mult = Math.min(1 + (G.combo - 1) * 0.5, 5);
      const pts = Math.round(base * mult);
      gained += pts;
      const words = ['', '¡Bien!', '¡Genial!', '¡Increíble!', '¡Brutal!'];
      addFloat(words[Math.min(lines, 4)], L.W / 2, L.by + C * 3.2, C * 0.95, '#fff8ee', 1100);
      addFloat(`+${pts}`, cx, cy, C * 0.7, GOLD, 900);
      if (G.combo >= 2) addFloat(`Combo x${G.combo}`, L.W / 2, L.by + C * 4.3, C * 0.62, '#8ff0e8', 1100);
      if (gemsHit) {
        G.gemsLeft = Math.max(0, G.gemsLeft - gemsHit);
        addFloat(gemsHit > 1 ? `+${gemsHit} canicas` : '+1 canica', cx, cy - C * 0.9, C * 0.55, '#8ff0e8', 1000);
      }
      if (unlocked) { addFloat(unlocked > 1 ? '¡Destrabados!' : '¡Destrabado!', L.W / 2, L.by + C * 5.3, C * 0.6, GOLD, 1200); unlock('candado'); }
      if (G.board.every(row => row.every(x => !x))) {
        gained += 300;
        addFloat('¡Bandeja vacía! +300', L.W / 2, L.by + C * 5.3, C * 0.6, '#9ef08a', 1400);
        unlock('limpio'); track('empty', 1);
      }
      G.shake = now;
      SFX.clear(lines + Math.max(0, G.combo - 1));
      haptic(lines >= 2 ? [30, 30, 40] : 30);
      save.stats.lines += lines;
      track('lines', lines); track('combo', G.combo);
      unlock('primera');
      if (lines >= 3) unlock('triple');
      if (iceHit) unlock('hielo');
      if (G.combo >= 3) unlock('combo3');
      if (G.combo >= 5) unlock('combo5');
      MUSIC.intensity(G.combo >= 4 ? 2 : G.combo >= 2 ? 1 : 0);
    } else {
      G.sinceClear++;
      if (G.sinceClear >= 3 && G.combo) { G.combo = 0; MUSIC.intensity(0); }
    }
    G.score += gained;
    track('pieces', 1);
    const best = G.cfg.mode === 'classic' ? save.classicBest : G.cfg.mode === 'time' ? save.timeBest : 0;
    if (best && G.score > best && !G.beatRecord) {
      G.beatRecord = true;
      addFloat('¡Nuevo récord!', L.W / 2, L.by + C * 2.2, C * 0.8, GOLD, 1500);
      SFX.win();
    }

    if (G.pieces.every(x => !x)) deal();
    updateHud();

    const g = G;
    const done = (G.cfg.mode === 'level' || G.cfg.mode === 'daily') && (G.cfg.type === 'score' ? G.score >= G.cfg.target : G.gemsLeft === 0);
    if (done) {
      G.over = true; G.won = true;
      setTimeout(() => { if (g === G) showWin(); }, 900);
    } else if (!G.pieces.some(x => x && fitsAnywhere(G.board, x.shape))) {
      endNoSpace(now);
    }
    saveGame();
  }
  function endNoSpace(now) {
    const g = G;
    G.over = true;
    G.loseT = now + 450;
    haptic(80);
    setTimeout(() => { if (g === G) SFX.lose(); }, 450);
    setTimeout(() => { if (g === G) showLose(); }, 1500);
    saveGame();
  }

  function finishGame() {
    save.game = null;
    save.stats.games++;
    touchStreak();
    persist();
  }
  function pushTop(list, score, pieces) {
    list.push({ s: score, p: pieces, d: today() });
    list.sort((a, b) => b.s - a.s);
    list.splice(10);
  }
  const completeWorlds = () => WORLDS.filter((w, wi) => { for (let n = wi * 10 + 1; n <= wi * 10 + 10; n++) if (!save.stars[n]) return false; return true; }).length;

  /* ================= Interfaz ================= */
  function show(id) {
    for (const s of document.querySelectorAll('.screen')) s.hidden = s.id !== id;
    if (id === 'home') renderHome();
    if (id === 'levels') renderLevels();
    if (id !== 'game') document.documentElement.style.setProperty('--world', '#4f9e3f');
  }
  function togglesHtml() {
    return `<button class="toggle" data-toggle="music" aria-pressed="${save.music}">${SVG.note}Música<i></i></button>
            <button class="toggle" data-toggle="sfx" aria-pressed="${save.sfx}">${SVG.fx}Efectos<i></i></button>
            <button class="toggle" data-toggle="vibe" aria-pressed="${save.vibe}">${SVG.vibe}Vibración<i></i></button>`;
  }
  const coinChip = () => `<span class="chip" data-coins>${SVG.coin}<span>${save.coins}</span></span>`;

  function renderHome() {
    const daily = ensureDaily();
    const next = Math.min(save.unlocked, MAX);
    const allDone = Object.keys(save.stars).length >= MAX;
    const streak = streakNow();
    $('#home-stats').innerHTML = `<span class="chip"><span class="star">★</span>${totalStars()} / ${MAX * 3}</span>${coinChip()}<span class="chip ${streak ? 'hot' : ''}">${SVG.flame}${streak} ${streak === 1 ? 'día' : 'días'}</span>`;
    const g = save.game;
    const resume = $('#btn-resume');
    resume.hidden = !g;
    if (g) {
      const what = g.mode === 'level' ? `Nivel ${g.n}` : g.mode === 'classic' ? 'Clásico' : g.mode === 'time' ? 'Contrarreloj' : 'Reto del día';
      resume.innerHTML = `Continuar <small>${what} · ${g.score} pts</small>`;
    }
    const play = $('#btn-play');
    play.textContent = allDone ? 'Jugar nivel 200' : `Jugar nivel ${next}`;
    play.classList.toggle('alt', !!g);
    const dl = save.dailyLevel[today()];
    $('#btn-daily').innerHTML = `Reto del día <small>${dl ? `Superado · ${dl.stars}★` : `${dailyConfig().target} puntos · ${niceDate(today())}`}</small>`;
    $('#btn-daily').classList.toggle('alt', !!dl || !!g);
    $('#classic-best').textContent = `Récord ${save.classicBest}`;
    $('#time-best').textContent = `Récord ${save.timeBest}`;
    $('#levels-sub').textContent = `${Object.keys(save.stars).length} / ${MAX}`;
    $('#missions-sub').textContent = `${daily.missions.filter(m => m.done).length} / 3 hoy`;
    $('#ach-sub').textContent = `${Object.keys(save.ach).length} / ${ACH.length}`;
    $('#home-toggles').innerHTML = togglesHtml();
    dailyGift();
  }

  // Regalo diario: monedas al abrir la app cada día (más si vienes en racha)
  function dailyGift() {
    const t = today();
    if (save.gift === t) return;
    save.gift = t;
    const streak = streakNow();
    const n = 20 + 5 * Math.min(streak, 6);
    addCoins(n);
    toast(`Regalo del día · +${n} monedas`, SVG.gift, 3400);
  }

  function starRow(n) {
    const s = save.stars[n] || 0;
    return '<b>' + '★'.repeat(s) + '</b>' + '★'.repeat(3 - s);
  }
  function renderLevels() {
    $('#levels-stars').textContent = `${totalStars()} / ${MAX * 3}`;
    const list = $('#levels-list');
    let html = '';
    WORLDS.forEach((w, wi) => {
      let ws = 0;
      for (let n = wi * 10 + 1; n <= wi * 10 + 10; n++) ws += save.stars[n] || 0;
      const extra = wi === 10 ? ' · Hielo' : wi === 12 ? ' · Candados' : '';
      html += `<section style="--wc:${w.color}"><div class="world-head"><h3>Mundo ${wi + 1} · ${w.name}${extra}</h3><span class="eyebrow">★ ${ws} / 30</span></div><div class="lv-grid">`;
      for (let n = wi * 10 + 1; n <= wi * 10 + 10; n++) {
        const locked = n > save.unlocked;
        const current = !locked && !save.stars[n];
        const cls = ['lv', locked ? 'locked' : '', current ? 'current' : '', isBoss(n) ? 'boss' : ''].join(' ');
        const label = `Nivel ${n}${isBoss(n) ? ', jefe' : ''}${isGemLevel(n) ? ', canicas' : ''}${locked ? ', bloqueado' : `, ${save.stars[n] || 0} estrellas`}`;
        html += `<button class="${cls}" data-level="${n}" aria-label="${label}" ${locked ? 'aria-disabled="true"' : ''}>`;
        if (isGemLevel(n) && !locked) html += `<span class="tag">${SVG.marble}</span>`;
        html += locked ? SVG.lock : `${n}<span class="st">${starRow(n)}</span>`;
        html += '</button>';
      }
      html += '</div></section>';
    });
    list.innerHTML = html;
    const cur = list.querySelector('.lv.current') || list.querySelector(`[data-level="${Math.min(save.unlocked, MAX)}"]`);
    const sc = list.parentElement;
    if (cur) requestAnimationFrame(() => { sc.scrollTop = Math.max(0, cur.offsetTop - sc.offsetTop - sc.clientHeight / 2 + 40); });
  }

  function renderExtras(tab) {
    for (const b of document.querySelectorAll('#tabs button')) b.classList.toggle('on', b.dataset.tab === tab);
    $('#extras-title').textContent = { missions: 'Misiones', ach: 'Logros', records: 'Récords' }[tab];
    $('#extras-coins').outerHTML = coinChip().replace('class="chip"', 'class="chip" id="extras-coins"');
    const body = $('#extras-body');
    if (tab === 'missions') {
      const d = ensureDaily();
      const streak = streakNow();
      body.innerHTML = `
        <div class="day-head"><h3>Hoy · ${niceDate(d.date)}</h3><span class="chip ${streak ? 'hot' : ''}">${SVG.flame}Racha de ${streak}</span></div>
        <div class="list">${d.missions.map(m => `
          <div class="row ${m.done ? 'done' : ''}">
            <div class="ic">${m.done ? SVG.star : SVG.calendar}</div>
            <div><strong>${missionText(m)}</strong><span class="d">${m.done ? 'Cumplida' : `${Math.min(m.progress, m.target)} / ${m.target}`}</span>
              <div class="meter"><i style="width:${Math.min(100, m.progress / m.target * 100)}%"></i></div></div>
            <span class="reward">${SVG.coin}${MISSION_COINS}</span>
          </div>`).join('')}</div>
        <div class="bonus ${d.bonus ? 'done' : ''}">${d.bonus ? `Bonus del día cobrado: +${DAILY_BONUS} monedas` : `Cumple las 3 y llévate +${DAILY_BONUS} monedas extra`}</div>
        <div class="bonus" style="margin-top:10px">Las misiones cambian cada día a medianoche. Jugar a diario sube la racha: cada día seguido da más monedas de regalo.</div>`;
    } else if (tab === 'ach') {
      body.innerHTML = `<div class="list">${ACH.map(a => {
        const on = save.ach[a.id];
        return `<div class="row ${on ? 'done' : 'locked'}"><div class="ic">${SVG.trophy}</div><div><strong>${a.name}</strong><span class="d">${a.desc}${on ? ` · ${niceDate(on)}` : ''}</span></div><span class="reward">${SVG.coin}${ACH_COINS}</span></div>`;
      }).join('')}</div>`;
    } else {
      const table = (title, list) => `<div><h3>${title}</h3>${list.length ? `<table class="records"><thead><tr><th>#</th><th>Puntos</th><th>Piezas</th><th>Fecha</th></tr></thead><tbody>${list.map((r, i) => `<tr class="${i === 0 ? 'top' : ''}"><td>${i + 1}</td><td class="pts">${r.s}</td><td>${r.p}</td><td>${niceDate(r.d)}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">Todavía no hay partidas. ¡Juega una!</div>'}</div>`;
      const dl = Object.entries(save.dailyLevel).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 7);
      body.innerHTML = `<div class="records-wrap">${table('Clásico · mejores 10', save.classicTop)}${table('Contrarreloj · mejores 10', save.timeTop)}
        <div><h3>Retos del día superados · ${Object.keys(save.dailyLevel).length}</h3>${dl.length ? `<table class="records"><thead><tr><th>Fecha</th><th>Puntos</th><th>Piezas</th><th>★</th></tr></thead><tbody>${dl.map(([d, r]) => `<tr><td>${niceDate(d)}</td><td class="pts">${r.score}</td><td>${r.pieces}</td><td>${'★'.repeat(r.stars)}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">Aún no superas ningún reto.</div>'}</div></div>`;
    }
  }

  function updateHud() {
    const cfg = G.cfg;
    const goal = $('#goal');
    goal.classList.toggle('gems', cfg.type === 'gems');
    goal.classList.toggle('classic', cfg.mode === 'classic' || cfg.mode === 'time');
    let near = false;
    if (cfg.mode === 'classic' || cfg.mode === 'time') {
      const best = cfg.mode === 'classic' ? save.classicBest : save.timeBest;
      $('#lvl-num').textContent = cfg.mode === 'classic' ? 'Clásico' : 'Contrarreloj';
      $('#lvl-world').textContent = G.combo >= 2 ? `Combo x${G.combo}` : cfg.mode === 'classic' ? 'Sin niveles, sin límite' : '2 minutos';
      $('#goal-label').textContent = best ? `Puntos · récord ${best}` : 'Puntos';
      $('#goal-value').textContent = G.score;
      $('#goal-bar').style.width = best ? Math.min(100, G.score / best * 100) + '%' : '0%';
      near = best && G.score >= best * 0.85 && G.score < best;
      if (cfg.mode === 'time') $('#par').innerHTML = `<div class="eyebrow">Tiempo</div><div class="big" id="timer">${mmss(G.timeLeft)}</div>`;
      else $('#par').innerHTML = `<div class="eyebrow">Piezas</div><div class="big">${G.used}</div>`;
    } else {
      $('#lvl-num').textContent = cfg.mode === 'daily' ? 'Reto del día' : `${cfg.boss ? 'Jefe · ' : ''}Nivel ${cfg.n}`;
      $('#lvl-world').textContent = cfg.mode === 'daily' ? niceDate(cfg.date) : `Mundo ${cfg.world + 1} · ${WORLDS[cfg.world].name}`;
      if (cfg.type === 'score') {
        $('#goal-label').textContent = 'Puntos';
        $('#goal-value').innerHTML = `${G.score}<small>/ ${cfg.target}</small>`;
        $('#goal-bar').style.width = Math.min(100, G.score / cfg.target * 100) + '%';
        near = G.score >= cfg.target * 0.8;
      } else {
        const got = cfg.gems - G.gemsLeft;
        $('#goal-label').textContent = `Canicas · ${G.score} puntos`;
        $('#goal-value').innerHTML = `${SVG.marble}${got}<small>/ ${cfg.gems}</small>`;
        $('#goal-bar').style.width = (got / cfg.gems * 100) + '%';
        near = G.gemsLeft === 1;
      }
      const s = starsFor(G.used, cfg.par);
      const limit = s === 3 ? cfg.par : s === 2 ? Math.ceil(cfg.par * 1.5) : null;
      $('#par').innerHTML = `<div class="par-stars"><b>${'★'.repeat(s)}</b>${'★'.repeat(3 - s)}</div><div class="eyebrow">${limit ? `${G.used} / ${limit} piezas` : `${G.used} piezas`}</div>`;
    }
    goal.classList.toggle('near', !!near && !G.over);
    const on = save.music || save.sfx;
    $('#btn-sound').innerHTML = on ? SVG.soundOn : SVG.soundOff;
    $('#btn-sound').setAttribute('aria-label', on ? 'Silenciar todo' : 'Activar sonido');
    $('#game-coins').outerHTML = coinChip().replace('class="chip"', 'class="chip" id="game-coins"');
    const u = $('#btn-undo'), w = $('#btn-swap');
    u.innerHTML = `${SVG.undo}Deshacer<span class="cost">${SVG.coin}${UNDO_COST}</span>`;
    w.innerHTML = `${SVG.swap}Cambiar<span class="cost">${SVG.coin}${SWAP_COST}</span>`;
    u.disabled = G.over || !G.history.length || save.coins < UNDO_COST;
    w.disabled = G.over || save.coins < SWAP_COST;
  }

  function openModal(html) {
    $('#modal-card').innerHTML = html;
    $('#modal').hidden = false;
    const b = $('#modal-card button');
    if (b) b.focus({ preventScroll: true });
    countUp();
  }
  function closeModal() { $('#modal').hidden = true; }
  function countUp() {
    for (const el of document.querySelectorAll('#modal-card [data-to]')) {
      const to = +el.dataset.to, t0 = performance.now(), dur = Math.min(1200, 300 + to / 4);
      const step = now => {
        const p = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }
  const earnHtml = n => `<span class="earn">${SVG.coin}+${n} monedas</span>`;

  function showWin() {
    const g = G;
    const stars = starsFor(g.used, g.cfg.par);
    let coins, title, extra = '', next = '';
    if (g.cfg.mode === 'daily') {
      const first = !save.dailyLevel[g.cfg.date];
      save.dailyLevel[g.cfg.date] = { score: g.score, pieces: g.used, stars: Math.max(stars, first ? 0 : save.dailyLevel[g.cfg.date].stars) };
      coins = first ? 40 + 10 * stars : 5 * stars;
      title = '¡Reto superado!';
      track('daily', 1); unlock('reto');
      if (Object.keys(save.dailyLevel).length >= 7) unlock('reto7');
      extra = '<p>Mañana hay un reto nuevo. ¡Vuelve a jugarlo!</p>';
      next = '<button class="btn" data-act="home">Inicio</button>';
    } else {
      const n = g.cfg.n;
      const first = !save.stars[n];
      save.stars[n] = Math.max(save.stars[n] || 0, stars);
      save.best[n] = Math.max(save.best[n] || 0, g.score);
      save.unlocked = Math.max(save.unlocked, Math.min(n + 1, MAX));
      coins = 5 * stars + (first ? 10 : 0);
      title = n === MAX ? '¡Completaste los 200 niveles!' : '¡Nivel superado!';
      save.stats.wins++;
      track('wins', 1);
      if (stars === 3) track('three', 1);
      if (n === 100) unlock('cien');
      if (n === MAX) unlock('doscientos');
      const cw = completeWorlds();
      if (cw >= 1) unlock('mundo1');
      if (cw >= 5) unlock('mundos5');
      const ts = totalStars();
      if (ts >= 50) unlock('estrellas50');
      if (ts >= 150) unlock('estrellas150');
      if (ts >= 300) unlock('estrellas300');
      next = n === MAX ? '' : '<button class="btn" data-act="next">Siguiente nivel</button>';
    }
    addCoins(coins);
    finishGame();
    SFX.win(); haptic([40, 60, 40]);
    celebrate();
    const starsHtml = [1, 2, 3].map(i => SVG.star.replace('<svg', `<svg class="${i <= stars ? 'on' : ''}" style="animation-delay:${i * 180}ms"`)).join('');
    openModal(`
      <h2>${title}</h2>
      <div class="big-stars">${starsHtml}</div>
      <p><b data-to="${g.score}">0</b> puntos con <b>${g.used}</b> piezas${stars < 3 ? ` · 3 estrellas con ${g.cfg.par} piezas o menos` : ''}</p>
      ${earnHtml(coins)}${extra}
      <div class="actions">
        ${next}
        <button class="btn alt" data-act="retry">Repetir</button>
        <button class="btn alt" data-act="${g.cfg.mode === 'daily' ? 'missions' : 'levels'}">${g.cfg.mode === 'daily' ? 'Misiones de hoy' : 'Niveles'}</button>
      </div>`);
  }

  function showLose() {
    const g = G;
    const cfg = g.cfg;
    if (cfg.mode === 'classic' || cfg.mode === 'time') {
      const key = cfg.mode === 'classic' ? 'classicBest' : 'timeBest';
      const record = g.score > save[key];
      if (record) save[key] = g.score;
      pushTop(cfg.mode === 'classic' ? save.classicTop : save.timeTop, g.score, g.used);
      const coins = Math.floor(g.score / 300);
      addCoins(coins);
      track(cfg.mode, g.score);
      if (cfg.mode === 'classic') { if (g.score >= 2000) unlock('clasico2000'); if (g.score >= 5000) unlock('clasico5000'); }
      else if (g.score >= 1000) unlock('tiempo1000');
      finishGame();
      if (record) celebrate();
      openModal(`
        <h2>${cfg.mode === 'time' && g.timeLeft <= 0 ? '¡Se acabó el tiempo!' : '¡Sin espacio!'}</h2>
        <div class="score-big" data-to="${g.score}">0</div>
        ${record ? '<span class="record">★ Nuevo récord</span>' : `<p>Tu récord: <b>${save[key]}</b> · ${g.used} piezas colocadas</p>`}
        ${coins ? earnHtml(coins) : ''}
        <div class="actions">
          <button class="btn" data-act="${cfg.mode}">Jugar otra vez</button>
          <button class="btn alt" data-act="records">Ver récords</button>
          <button class="btn alt" data-act="home">Inicio</button>
        </div>`);
      return;
    }
    finishGame();
    const missing = cfg.type === 'score'
      ? `Te faltaron <b>${cfg.target - g.score}</b> puntos.`
      : `Te faltaron <b>${g.gemsLeft}</b> ${g.gemsLeft === 1 ? 'canica' : 'canicas'}.`;
    openModal(`
      <h2>¡Sin espacio!</h2>
      <p>Ningún cubo cabe en la bandeja. ${missing}</p>
      <p>Tip: con monedas puedes <b>deshacer</b> la última pieza o <b>cambiar</b> las piezas antes de quedarte sin lugar.</p>
      <div class="actions">
        <button class="btn" data-act="retry">Reintentar</button>
        <button class="btn alt" data-act="${cfg.mode === 'daily' ? 'home' : 'levels'}">${cfg.mode === 'daily' ? 'Inicio' : 'Niveles'}</button>
      </div>`);
  }

  function showPause() {
    if (!G || G.over) return;
    const m = G.cfg.mode;
    const endless = m === 'classic' || m === 'time';
    const what = m === 'classic' ? 'Clásico' : m === 'time' ? 'Contrarreloj' : m === 'daily' ? 'Reto del día' : `Nivel ${G.cfg.n}`;
    const prog = endless ? `<b>${G.score}</b> puntos` : `<b>${G.cfg.type === 'score' ? `${G.score} / ${G.cfg.target} puntos` : `${G.cfg.gems - G.gemsLeft} / ${G.cfg.gems} canicas`}</b>`;
    openModal(`
      <h2>Pausa</h2>
      <p>${what} · ${prog}</p>
      <div class="toggles">${togglesHtml()}</div>
      <div class="actions">
        <button class="btn" data-act="resume">Continuar</button>
        <button class="btn alt" data-act="retry">${endless ? 'Empezar de nuevo' : 'Reiniciar'}</button>
        <button class="btn alt" data-act="home">Inicio <small>La partida se guarda</small></button>
      </div>`);
  }

  function retry() {
    const m = G.cfg.mode;
    if (m === 'level') startLevel(G.cfg.n);
    else if (m === 'classic') startClassic();
    else if (m === 'time') startTime();
    else startDaily();
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('button[data-toggle]');
    if (!t) return;
    const key = t.dataset.toggle;
    save[key] = !save[key];
    persist();
    audioInit();
    for (const b of document.querySelectorAll(`[data-toggle="${key}"]`)) b.setAttribute('aria-pressed', String(save[key]));
    if (key === 'music') { if (save.music) MUSIC.start(); else MUSIC.stop(); }
    else if (key === 'sfx' && save.sfx) SFX.pick();
    else if (key === 'vibe' && save.vibe) haptic(30);
    if (G && !$('#game').hidden) updateHud();
  });
  $('#modal-card').addEventListener('click', e => {
    const b = e.target.closest('button[data-act]');
    if (!b) return;
    const act = b.dataset.act;
    if (act === 'resume') closeModal();
    else if (act === 'retry') retry();
    else if (act === 'next') startLevel(Math.min(G.cfg.n + 1, MAX));
    else if (act === 'classic') startClassic();
    else if (act === 'time') startTime();
    else if (act === 'levels') { closeModal(); show('levels'); }
    else if (act === 'home') { closeModal(); show('home'); }
    else if (act === 'missions') { closeModal(); show('extras'); renderExtras('missions'); }
    else if (act === 'records') { closeModal(); show('extras'); renderExtras('records'); }
  });
  $('#btn-play').addEventListener('click', () => { audioInit(); startLevel(Math.min(save.unlocked, MAX)); });
  $('#btn-resume').addEventListener('click', () => { audioInit(); resumeGame(); });
  $('#btn-daily').addEventListener('click', () => { audioInit(); startDaily(); });
  $('#btn-classic').addEventListener('click', () => { audioInit(); startClassic(); });
  $('#btn-time').addEventListener('click', () => { audioInit(); startTime(); });
  $('#btn-levels').addEventListener('click', () => { audioInit(); MUSIC.start(); show('levels'); });
  $('#btn-missions').addEventListener('click', () => { show('extras'); renderExtras('missions'); });
  $('#btn-ach').addEventListener('click', () => { show('extras'); renderExtras('ach'); });
  $('#btn-levels-back').addEventListener('click', () => show('home'));
  $('#btn-extras-back').addEventListener('click', () => show('home'));
  $('#tabs').addEventListener('click', e => { const b = e.target.closest('button[data-tab]'); if (b) renderExtras(b.dataset.tab); });
  $('#btn-pause').addEventListener('click', showPause);
  $('#btn-undo').addEventListener('click', undo);
  $('#btn-swap').addEventListener('click', swap);
  $('#btn-sound').addEventListener('click', () => {
    const on = !(save.music || save.sfx);
    save.music = on; save.sfx = on; persist();
    if (on) { audioInit(); MUSIC.start(); } else MUSIC.stop();
    updateHud();
  });
  $('#levels-list').addEventListener('click', e => {
    const b = e.target.closest('.lv');
    if (!b || b.classList.contains('locked')) return;
    audioInit();
    startLevel(+b.dataset.level);
  });
  document.addEventListener('keydown', e => {
    if ($('#game').hidden) return;
    if (e.key === 'Escape') { if (!$('#modal').hidden) { if (G && !G.over) closeModal(); } else showPause(); }
    if (e.key === 'z' || e.key === 'Z') undo();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (G && !G.over && !$('#game').hidden) saveGame(); if (AC) AC.suspend(); }
    else if (AC && (save.music || save.sfx)) AC.resume();
  });

  /* ================= Sonido ================= */
  let AC = null;
  function audioInit() {
    try {
      if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === 'suspended') AC.resume();
    } catch (e) { AC = null; }
  }
  function tone(f, d, type = 'sine', v = 0.1, delay = 0, f2 = null) {
    if (!AC || !save.sfx) return;
    const t = AC.currentTime + delay;
    const o = AC.createOscillator(), g = AC.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g).connect(AC.destination);
    o.start(t); o.stop(t + d + 0.03);
  }
  const SFX = {
    pick: () => tone(620, 0.05, 'triangle', 0.05),
    place: () => tone(200, 0.09, 'triangle', 0.14, 0, 120),
    drop: () => tone(300, 0.08, 'sine', 0.05, 0, 200),
    tick: () => tone(1200, 0.04, 'square', 0.03),
    clear: k => [523, 659, 784, 1047, 1319, 1568].slice(0, Math.min(6, k + 1)).forEach((f, i) => tone(f, 0.2, 'square', 0.045, i * 0.055)),
    win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i === 3 ? 0.5 : 0.18, 'triangle', 0.12, i * 0.12)),
    lose: () => [392, 330, 262].forEach((f, i) => tone(f, 0.28, 'triangle', 0.1, i * 0.16))
  };

  // Música de fondo generada al vuelo: marimba de juguete, bajo y sonajero en Do mayor a 108 bpm.
  // La intensidad sube con el combo: 1 añade sonajero continuo, 2 añade palmas.
  const MUSIC = (() => {
    const BPM = 108, STEP = 60 / BPM / 2;
    const CHORDS = [[0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14]];
    const MELODY = [0, null, 4, null, 7, 4, null, 2, 4, null, null, 0, null, 2, 4, null,
                    7, null, 9, null, 7, 4, null, null, 2, null, 4, null, 0, null, null, null];
    const ARP = [0, 1, 2, 1, 0, 2, 1, 2];
    const hz = semi => 261.63 * Math.pow(2, semi / 12);
    let master = null, filter = null, noise = null, timer = null, nextT = 0, step = 0, level = 0;

    function pluck(f, t, d, type, v, dest) {
      const o = AC.createOscillator(), g = AC.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(v, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g).connect(dest);
      o.start(t); o.stop(t + d + 0.02);
    }
    function hit(t, v, freq, d) {
      const src = AC.createBufferSource(), g = AC.createGain(), f = AC.createBiquadFilter();
      src.buffer = noise;
      f.type = freq > 3000 ? 'highpass' : 'bandpass'; f.frequency.value = freq; f.Q.value = 1.2;
      g.gain.setValueAtTime(v, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      src.connect(f).connect(g).connect(master);
      src.start(t); src.stop(t + d + 0.02);
    }
    function playStep(s, t) {
      const chord = CHORDS[Math.floor(s / 16) % 4];
      if (s % 8 === 0 || s % 8 === 5) pluck(hz(chord[0] - 24), t, STEP * 1.7, 'sine', 0.22, master);
      const oct = s % 16 >= 8 ? 12 : 0;
      pluck(hz(chord[ARP[s % 8]] + oct), t, STEP * 0.9, 'triangle', 0.075, filter);
      if (s % 2 === 1) hit(t, s % 4 === 3 ? 0.035 : 0.02, 6000, 0.06);
      if (level >= 1 && s % 2 === 0) hit(t, 0.018, 7000, 0.04);
      if (level >= 2 && s % 8 === 4) hit(t, 0.12, 1500, 0.1);
      const m = MELODY[(s + (s >= 32 ? 3 : 0)) % 32];
      if (m !== null && (s % 64 >= 16 || level >= 1)) pluck(hz(m + 12), t, STEP * 1.5, 'sine', level >= 2 ? 0.12 : 0.09, master);
    }
    function schedule() {
      while (nextT < AC.currentTime + 0.3) { playStep(step, nextT); step = (step + 1) % 64; nextT += STEP; }
    }
    return {
      intensity(k) { level = k; },
      start() {
        if (!save.music || timer) return;
        audioInit();
        if (!AC) return;
        if (!noise) {
          noise = AC.createBuffer(1, AC.sampleRate * 0.12, AC.sampleRate);
          const d = noise.getChannelData(0);
          for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        }
        master = AC.createGain();
        master.gain.setValueAtTime(0.0001, AC.currentTime);
        master.gain.exponentialRampToValueAtTime(0.5, AC.currentTime + 1.2);
        master.connect(AC.destination);
        filter = AC.createBiquadFilter();
        filter.type = 'lowpass'; filter.frequency.value = 1800;
        filter.connect(master);
        nextT = AC.currentTime + 0.1; step = 0;
        timer = setInterval(schedule, 120);
        schedule();
      },
      stop() {
        if (!timer) return;
        clearInterval(timer); timer = null;
        const m = master;
        m.gain.cancelScheduledValues(AC.currentTime);
        m.gain.setValueAtTime(m.gain.value, AC.currentTime);
        m.gain.exponentialRampToValueAtTime(0.0001, AC.currentTime + 0.4);
        setTimeout(() => m.disconnect(), 600);
      }
    };
  })();

  /* ================= Dibujo ================= */
  const cv = $('#cv');
  const ctx = cv.getContext('2d');
  const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const TH = { wood: cssVar('--wood'), woodDark: cssVar('--wood-dark'), tray: cssVar('--tray'), hole: cssVar('--hole'), ink: cssVar('--ink') };
  const DISPLAY_FONT = '"Fredoka", "Arial Rounded MT Bold", sans-serif';
  let C = 40, dpr = 1;
  const L = { W: 0, H: 0, bx: 0, by: 0, fp: 0, trayY: 0, trayH: 0 };
  const sprites = new Map();

  function resize() {
    const stage = $('#stage');
    const W = stage.clientWidth, H = stage.clientHeight;
    if (!W || !H) return;
    dpr = Math.min(window.devicePixelRatio || 1, 3);
    C = Math.max(16, Math.floor(Math.min(W / 8.6, H / 12.2, 62)));
    L.W = W;
    L.H = Math.min(H, Math.ceil(C * 12.2));
    L.fp = C * 0.22;
    L.bx = (W - 8 * C) / 2;
    L.by = C * 0.36;
    L.trayY = L.by + 8 * C + L.fp + C * 0.3;
    L.trayH = L.H - L.trayY;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(L.H * dpr);
    cv.style.width = W + 'px';
    cv.style.height = L.H + 'px';
    sprites.clear();
  }
  window.addEventListener('resize', resize);
  if (window.ResizeObserver) new ResizeObserver(() => { if (!$('#game').hidden) resize(); }).observe($('#stage'));

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    let r = n >> 16, g = n >> 8 & 255, b = n & 255;
    const f = amt < 0 ? 0 : 255, p = Math.abs(amt);
    r = Math.round(r + (f - r) * p); g = Math.round(g + (f - g) * p); b = Math.round(b + (f - b) * p);
    return `rgb(${r},${g},${b})`;
  }
  function rr(g, x, y, w, h, r) {
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r);
    g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + w, y, r);
    g.closePath();
  }

  // Cubo de madera pintado, mate: cara superior clara, lado oscuro abajo, vetas suaves
  function sprite(color) {
    let sp = sprites.get(color);
    if (sp) return sp;
    const s = Math.max(8, Math.round(C * dpr));
    sp = document.createElement('canvas');
    sp.width = sp.height = s;
    const g = sp.getContext('2d');
    const m = s * 0.04, lift = s * 0.14, rad = s * 0.14;
    rr(g, m, m + lift * 0.4, s - 2 * m, s - 2 * m - lift * 0.4, rad);
    g.fillStyle = shade(color, -0.42);
    g.fill();
    rr(g, m, m, s - 2 * m, s - 2 * m - lift, rad);
    g.fillStyle = color;
    g.fill();
    g.save();
    g.clip();
    g.lineWidth = s * 0.07;
    g.strokeStyle = shade(color, 0.28);
    rr(g, m + s * 0.035, m + s * 0.035, s - 2 * m - s * 0.07, s - 2 * m - lift - s * 0.07, rad * 0.8);
    g.stroke();
    g.strokeStyle = 'rgba(0,0,0,.09)';
    g.lineWidth = s * 0.03;
    for (let i = 0; i < 2; i++) {
      const y = s * (0.32 + i * 0.26);
      g.beginPath();
      g.moveTo(m + s * 0.12, y);
      g.bezierCurveTo(s * 0.4, y - s * 0.06, s * 0.6, y + s * 0.07, s - m - s * 0.12, y - s * 0.02);
      g.stroke();
    }
    g.restore();
    sprites.set(color, sp);
    return sp;
  }
  function drawBlock(color, x, y, size, alpha = 1) {
    ctx.globalAlpha = alpha;
    ctx.drawImage(sprite(color), x, y, size, size);
    ctx.globalAlpha = 1;
  }
  function starPath(cx, cy, r) {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, rr2 = i % 2 ? r * 0.45 : r;
      ctx.lineTo(cx + Math.cos(a) * rr2, cy + Math.sin(a) * rr2);
    }
    ctx.closePath();
  }
  function drawWild(x, y, size, alpha = 1, now = 0) {
    drawBlock(GOLD, x, y, size, alpha);
    ctx.globalAlpha = alpha;
    starPath(x + size / 2, y + size * 0.44, size * (0.24 + Math.sin(now / 200) * 0.02));
    ctx.fillStyle = '#fff6d6';
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  function drawMarble(cx, cy, size, now) {
    const r = size * 0.27;
    cy -= size * 0.07;
    ctx.beginPath();
    ctx.ellipse(cx, cy + r * 0.95, r * 0.9, r * 0.32, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,.22)';
    ctx.fill();
    const gr = ctx.createRadialGradient(cx - r * 0.4, cy - r * 0.45, r * 0.1, cx, cy, r);
    gr.addColorStop(0, '#effffd');
    gr.addColorStop(0.35, '#7fe6df');
    gr.addColorStop(0.8, '#1a9e96');
    gr.addColorStop(1, '#0d6b66');
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = gr;
    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = r * 0.22;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(240, 179, 35, .85)';
    const a = now / 900 + cx;
    ctx.arc(cx, cy, r * 0.55, a, a + 2.2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx - r * 0.35, cy - r * 0.45, r * 0.28, r * 0.16, -0.6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,.85)';
    ctx.fill();
  }
  // Capa de hielo: translúcida, con grieta cuando queda una vaciada
  function drawIce(x, y, size, ice) {
    const m = size * 0.05;
    rr(ctx, x + m, y + m, size - 2 * m, size - 2 * m, size * 0.14);
    ctx.fillStyle = ice === 2 ? 'rgba(214, 242, 255, .72)' : 'rgba(214, 242, 255, .5)';
    ctx.fill();
    ctx.lineWidth = Math.max(1, size * 0.04);
    ctx.strokeStyle = 'rgba(255,255,255,.9)';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + size * 0.2, y + size * 0.22); ctx.lineTo(x + size * 0.36, y + size * 0.16);
    ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = size * 0.05; ctx.lineCap = 'round';
    ctx.stroke();
    if (ice === 1) {
      ctx.beginPath();
      ctx.moveTo(x + size * 0.25, y + size * 0.85); ctx.lineTo(x + size * 0.45, y + size * 0.55);
      ctx.lineTo(x + size * 0.4, y + size * 0.45); ctx.lineTo(x + size * 0.65, y + size * 0.2);
      ctx.moveTo(x + size * 0.45, y + size * 0.55); ctx.lineTo(x + size * 0.75, y + size * 0.6);
      ctx.strokeStyle = 'rgba(40, 90, 120, .7)'; ctx.lineWidth = Math.max(1, size * 0.035);
      ctx.stroke();
    }
  }
  function drawLock(x, y, size) {
    ctx.fillStyle = 'rgba(59, 42, 26, .35)';
    rr(ctx, x + size * 0.05, y + size * 0.05, size * 0.9, size * 0.9, size * 0.14);
    ctx.fill();
    const cx = x + size / 2, cy = y + size * 0.5;
    const w = size * 0.34, h = size * 0.26;
    ctx.fillStyle = '#3b2a1a';
    rr(ctx, cx - w / 2, cy - h * 0.1, w, h, size * 0.05);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy - h * 0.1, w * 0.3, Math.PI, 0);
    ctx.lineWidth = size * 0.07; ctx.strokeStyle = '#3b2a1a';
    ctx.stroke();
    ctx.fillStyle = GOLD;
    ctx.beginPath(); ctx.arc(cx, cy + h * 0.32, size * 0.045, 0, Math.PI * 2); ctx.fill();
  }

  // Ambiente por mundo: partículas suaves detrás de la bandeja
  function initAmbient(style) {
    G.ambient = [];
    if (reducedMotion) return;
    const n = { leaf: 12, bubble: 14, dust: 16, spark: 16, snow: 18, confetti: 14, star: 22, rain: 24, sparkle: 14 }[style] || 12;
    for (let i = 0; i < n; i++) G.ambient.push(spawnAmbient(style, true));
  }
  function spawnAmbient(style, anywhere) {
    const W = L.W || 400, H = L.H || 700;
    const p = { style, x: rand() * W, y: anywhere ? rand() * H : -10, life: 1, t: rand() * 10 };
    switch (style) {
      case 'leaf': Object.assign(p, { vx: (rand() - .5) * 20, vy: 18 + rand() * 20, r: 3 + rand() * 3, rot: rand() * 6, spin: (rand() - .5) * 3, color: pick(['rgba(90,166,74,.5)', 'rgba(124,179,66,.5)', 'rgba(236,138,47,.45)']) }); break;
      case 'bubble': Object.assign(p, { y: anywhere ? p.y : H + 10, vx: (rand() - .5) * 8, vy: -(14 + rand() * 18), r: 2 + rand() * 4 }); break;
      case 'dust': Object.assign(p, { x: anywhere ? p.x : -10, vx: 25 + rand() * 25, vy: (rand() - .5) * 6, r: 1 + rand() * 2 }); break;
      case 'spark': Object.assign(p, { y: anywhere ? p.y : H + 5, vx: (rand() - .5) * 14, vy: -(30 + rand() * 40), r: 1.5 + rand() * 2, color: pick(['#ff8a3d', '#ffc23d', '#ff5a3d']) }); break;
      case 'snow': Object.assign(p, { vx: (rand() - .5) * 12, vy: 12 + rand() * 14, r: 1.5 + rand() * 2.5 }); break;
      case 'confetti': Object.assign(p, { vx: (rand() - .5) * 20, vy: 20 + rand() * 25, r: 2.5 + rand() * 2, rot: rand() * 6, spin: (rand() - .5) * 6, color: pick(COLORS) }); break;
      case 'star': Object.assign(p, { vx: 0, vy: 0, r: 0.8 + rand() * 1.4 }); break;
      case 'rain': Object.assign(p, { vx: -40, vy: 260 + rand() * 120, r: 6 + rand() * 8 }); break;
      case 'sparkle': Object.assign(p, { vx: 0, vy: -6, r: 2 + rand() * 2 }); break;
    }
    return p;
  }
  function drawAmbient(now, dt) {
    const W = L.W, H = L.H;
    for (let i = 0; i < G.ambient.length; i++) {
      const p = G.ambient[i];
      p.x += p.vx * dt; p.y += p.vy * dt; p.t += dt;
      if (p.rot !== undefined) p.rot += p.spin * dt;
      const out = p.y > H + 12 || p.y < -14 || p.x > W + 12 || p.x < -14;
      if (out) { G.ambient[i] = spawnAmbient(p.style, false); continue; }
      ctx.save();
      ctx.translate(p.x, p.y);
      switch (p.style) {
        case 'leaf': case 'confetti':
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color; ctx.globalAlpha = p.style === 'confetti' ? 0.6 : 1;
          if (p.style === 'leaf') { ctx.beginPath(); ctx.ellipse(0, 0, p.r * 1.6, p.r * 0.8, 0, 0, Math.PI * 2); ctx.fill(); }
          else ctx.fillRect(-p.r, -p.r * 0.6, p.r * 2, p.r * 1.2);
          break;
        case 'bubble':
          ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(63,126,194,.45)'; ctx.lineWidth = 1; ctx.stroke();
          ctx.beginPath(); ctx.arc(-p.r * 0.3, -p.r * 0.3, p.r * 0.25, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fill();
          break;
        case 'dust':
          ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(180,122,62,.28)'; ctx.fill(); break;
        case 'spark':
          ctx.globalAlpha = 0.5 + 0.5 * Math.sin(p.t * 9);
          ctx.fillStyle = p.color; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r); break;
        case 'snow':
          ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fill(); break;
        case 'star':
          ctx.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(p.t * 1.5 + p.x));
          ctx.fillStyle = '#8a5fc0'; ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill(); break;
        case 'rain':
          ctx.strokeStyle = 'rgba(84,110,122,.35)'; ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-p.r * 0.15, p.r); ctx.stroke(); break;
        case 'sparkle':
          ctx.globalAlpha = 0.3 + 0.7 * Math.abs(Math.sin(p.t * 2.2 + p.x));
          ctx.fillStyle = GOLD; starPath(0, 0, p.r * 1.6); ctx.fill(); break;
      }
      ctx.restore();
    }
  }

  function addFloat(text, x, y, size, color, dur) {
    G.floats.push({ text, x, y, size, color, dur, t0: performance.now() });
  }
  function trayScale(s) {
    return Math.min(C * 0.6, (L.W / 3 - C * 0.35) / s.w, (L.trayH - C * 0.4) / s.h);
  }
  function traySlotCenter(i) { return [(i + 0.5) * L.W / 3, L.trayY + L.trayH / 2]; }
  function dragGeom(now) {
    const d = G.drag;
    const s = G.pieces[d.slot].shape;
    const cx = d.x;
    const cy = d.touch ? d.y - s.h * C / 2 - C * 1.2 : d.y;
    const k = Math.min(1, (now - d.t0) / 110);
    const [tx, ty] = traySlotCenter(d.slot);
    const size = trayScale(s) + (C - trayScale(s)) * k;
    return { s, size, cx: tx + (cx - tx) * k, cy: ty + (cy - ty) * k, left: cx - s.w * C / 2, top: cy - s.h * C / 2 };
  }
  function updateTarget() {
    const g = dragGeom(Infinity);
    const gc = Math.round((g.left - L.bx) / C), gr = Math.round((g.top - L.by) / C);
    G.drag.target = canPlace(G.board, g.s, gr, gc) ? { r: gr, c: gc, lines: linesIf(G.board, g.s, gr, gc) } : null;
  }

  function drawPiece(p, x, y, size, alpha, now) {
    for (const [dr, dc] of p.shape.cells) {
      const px = x + dc * size, py = y + dr * size;
      if (p.wild) drawWild(px, py, size, alpha, now); else drawBlock(p.color, px, py, size, alpha);
    }
  }

  let lastT = performance.now();
  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    if (!G || $('#game').hidden || !L.W) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, L.W, L.H);

    // contrarreloj
    if (G.cfg.mode === 'time' && !G.over && $('#modal').hidden && !document.hidden && now > G.timeStart) {
      G.timeLeft = Math.max(0, G.timeLeft - dt);
      const sec = Math.ceil(G.timeLeft);
      if (sec !== G.shownSec) {
        G.shownSec = sec;
        const el = $('#timer');
        if (el) { el.textContent = mmss(G.timeLeft); el.classList.toggle('hot', sec <= 10); }
        if (sec <= 10 && sec > 0) SFX.tick();
      }
      if (G.timeLeft <= 0) endNoSpace(now);
    }

    drawAmbient(now, dt);

    const sk = now - G.shake;
    if (sk < 220) {
      const a = (1 - sk / 220) * C * 0.06;
      ctx.translate((rand() - 0.5) * a, (rand() - 0.5) * a);
    }

    // bandeja de madera
    const bs = 8 * C, fp = L.fp;
    ctx.fillStyle = TH.woodDark;
    rr(ctx, L.bx - fp, L.by - fp + C * 0.12, bs + 2 * fp, bs + 2 * fp, C * 0.3);
    ctx.fill();
    const wg = ctx.createLinearGradient(0, L.by - fp, 0, L.by + bs + fp);
    wg.addColorStop(0, '#c98d4e');
    wg.addColorStop(1, TH.wood);
    ctx.fillStyle = wg;
    rr(ctx, L.bx - fp, L.by - fp, bs + 2 * fp, bs + 2 * fp, C * 0.3);
    ctx.fill();
    ctx.fillStyle = TH.tray;
    rr(ctx, L.bx - C * 0.06, L.by - C * 0.06, bs + C * 0.12, bs + C * 0.12, C * 0.12);
    ctx.fill();

    const d = G.drag;
    const t = d && d.target;
    const hl = new Set();
    if (t) {
      t.lines.rows.forEach(r => { for (let j = 0; j < N; j++) hl.add(r * N + j); });
      t.lines.cols.forEach(c => { for (let i = 0; i < N; i++) hl.add(i * N + c); });
    }
    const dragPiece = d ? G.pieces[d.slot] : null;

    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      const x = L.bx + c * C, y = L.by + r * C;
      const cell = G.board[r][c];
      if (!cell) {
        ctx.fillStyle = TH.hole;
        rr(ctx, x + C * 0.06, y + C * 0.06, C * 0.88, C * 0.88, C * 0.1);
        ctx.fill();
        continue;
      }
      let color = hl.has(r * N + c) && !cell.ice && !cell.lock ? dragPiece.color : cell.color;
      if (G.loseT && now > G.loseT + r * 70) color = GREY;
      let size = C, ox = 0;
      if (G.pop && G.pop.cells.has(r * N + c)) {
        const p = Math.min(1, (now - G.pop.t0) / 180);
        size = C * (1 + 0.14 * Math.sin(p * Math.PI));
        ox = (C - size) / 2;
      }
      drawBlock(color, x + ox, y + ox, size);
      if (cell.gem) drawMarble(x + C / 2, y + C / 2, C, now);
      if (cell.ice) drawIce(x, y, C, cell.ice);
      if (cell.lock) drawLock(x, y, C);
    }

    if (t) drawPiece(dragPiece, L.bx + t.c * C, L.by + t.r * C, C, 0.45, now);

    // cubos que salen, grietas de hielo y candados
    G.effects = G.effects.filter(e => {
      const p = (now - e.t0) / 300;
      if (p >= 1) return false;
      if (e.kind === 'crack') {
        if (p < 0) return true;
        if (!e.spawned) {
          e.spawned = true;
          for (let i = 0; i < 7; i++) {
            const a = rand() * Math.PI * 2, v = (1 + rand() * 2) * C * 2.2;
            G.parts.push({ x: e.x + C / 2, y: e.y + C / 2, vx: Math.cos(a) * v, vy: Math.sin(a) * v - C * 2, life: 1, color: e.gold ? GOLD : '#dff6ff', size: C * (0.1 + rand() * 0.12), spin: (rand() - 0.5) * 12, rot: rand() * 6 });
          }
        }
        return false;
      }
      if (p < 0) { drawBlock(e.color, e.x, e.y, C); if (e.gem) drawMarble(e.x + C / 2, e.y + C / 2, C, now); return true; }
      if (!e.spawned) {
        e.spawned = true;
        for (let i = 0; i < (e.gem ? 10 : 4); i++) {
          const a = rand() * Math.PI * 2, v = (1 + rand() * 2.5) * C * (e.gem ? 3 : 2);
          G.parts.push({ x: e.x + C / 2, y: e.y + C / 2, vx: Math.cos(a) * v, vy: Math.sin(a) * v - C * 3, life: 1, color: e.gem ? '#9ff0ea' : e.color, size: C * (0.12 + rand() * 0.14), spin: (rand() - 0.5) * 12, rot: rand() * 6 });
        }
      }
      const size = C * (1 - p * 0.9);
      drawBlock(e.color, e.x + (C - size) / 2, e.y + (C - size) / 2, size, 1 - p * 0.6);
      return true;
    });

    G.parts = G.parts.filter(p => {
      p.life -= dt * 1.6;
      if (p.life <= 0) return false;
      p.vy += C * 22 * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.spin * dt;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
      return true;
    });

    // piezas en espera
    for (let i = 0; i < 3; i++) {
      const p = G.pieces[i];
      if (!p || (d && d.slot === i)) continue;
      const s = p.shape;
      const ts = trayScale(s);
      let [cx, cy] = traySlotCenter(i);
      const k = Math.min(1, Math.max(0, (now - G.dealT - i * 60) / 260));
      const ease = 1 - Math.pow(1 - k, 3);
      cx += (1 - ease) * L.W * 0.5;
      const fits = fitsAnywhere(G.board, s);
      const alpha = (fits && !G.loseT ? 1 : 0.32) * ease;
      if (G.loseT) { for (const [dr, dc] of s.cells) drawBlock(GREY, cx - s.w * ts / 2 + dc * ts, cy - s.h * ts / 2 + dr * ts, ts, alpha); }
      else drawPiece(p, cx - s.w * ts / 2, cy - s.h * ts / 2, ts, alpha, now);
    }

    if (d) {
      const g = dragGeom(now);
      drawPiece(dragPiece, g.cx - g.s.w * g.size / 2, g.cy - g.s.h * g.size / 2, g.size, 1, now);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    G.floats = G.floats.filter(f => {
      const p = (now - f.t0) / f.dur;
      if (p >= 1) return false;
      const sc = p < 0.15 ? 0.6 + p / 0.15 * 0.4 : 1;
      ctx.font = `700 ${Math.round(f.size * sc)}px ${DISPLAY_FONT}`;
      ctx.globalAlpha = p > 0.7 ? (1 - p) / 0.3 : 1;
      const y = f.y - p * C * 0.9;
      const x = Math.min(Math.max(f.x, f.size * 2.2), L.W - f.size * 2.2);
      ctx.lineJoin = 'round';
      ctx.lineWidth = f.size * 0.22;
      ctx.strokeStyle = TH.ink;
      ctx.strokeText(f.text, x, y);
      ctx.fillStyle = f.color;
      ctx.fillText(f.text, x, y);
      ctx.globalAlpha = 1;
      return true;
    });
  }
  requestAnimationFrame(frame);

  // Confeti de celebración sobre toda la pantalla
  const fx = $('#fx'), fxc = fx.getContext('2d');
  let confetti = [];
  function celebrate() {
    if (reducedMotion) return;
    const app = $('#app');
    const W = app.clientWidth, H = app.clientHeight;
    fx.width = Math.round(W * dpr); fx.height = Math.round(H * dpr);
    fx.style.width = W + 'px'; fx.style.height = H + 'px';
    fx.hidden = false;
    for (let i = 0; i < 140; i++) {
      confetti.push({ x: W / 2 + (rand() - .5) * W * 0.3, y: H * 0.45, vx: (rand() - .5) * 700, vy: -300 - rand() * 500, w: 6 + rand() * 6, h: 4 + rand() * 4, rot: rand() * 6, spin: (rand() - .5) * 14, color: pick([...COLORS, GOLD, '#fff8ee']) });
    }
    let last = performance.now();
    const step = now => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      fxc.setTransform(dpr, 0, 0, dpr, 0, 0);
      fxc.clearRect(0, 0, W, H);
      confetti = confetti.filter(p => {
        p.vy += 900 * dt; p.vx *= 0.99; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.spin * dt;
        if (p.y > H + 20) return false;
        fxc.save(); fxc.translate(p.x, p.y); fxc.rotate(p.rot); fxc.fillStyle = p.color; fxc.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); fxc.restore();
        return true;
      });
      if (confetti.length) requestAnimationFrame(step); else fx.hidden = true;
    };
    requestAnimationFrame(step);
  }

  /* ================= Arrastre ================= */
  function pointerPos(e) {
    const r = cv.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  cv.addEventListener('pointerdown', e => {
    if (!G || G.over || G.drag || !$('#modal').hidden) return;
    audioInit();
    const { x, y } = pointerPos(e);
    if (y < L.trayY - C * 0.2) return;
    const slot = Math.min(2, Math.max(0, Math.floor(x / (L.W / 3))));
    if (!G.pieces[slot]) return;
    G.drag = { slot, x, y, touch: e.pointerType !== 'mouse', t0: performance.now(), target: null, id: e.pointerId };
    try { cv.setPointerCapture(e.pointerId); } catch (err) { /* sin captura */ }
    updateTarget();
    SFX.pick();
    e.preventDefault();
  });
  cv.addEventListener('pointermove', e => {
    if (!G || !G.drag || e.pointerId !== G.drag.id) return;
    const { x, y } = pointerPos(e);
    G.drag.x = x; G.drag.y = y;
    updateTarget();
  });
  function endDrag(e) {
    if (!G || !G.drag || e.pointerId !== G.drag.id) return;
    const d = G.drag;
    G.drag = null;
    if (e.type === 'pointerup' && d.target && !G.over) place(d.slot, d.target.r, d.target.c);
    else SFX.drop();
  }
  cv.addEventListener('pointerup', endDrag);
  cv.addEventListener('pointercancel', endDrag);

  /* ================= App instalable ================= */
  let installPrompt = null;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    installPrompt = e;
    $('#btn-install').hidden = save.installed;
  });
  $('#btn-install').addEventListener('click', async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const res = await installPrompt.userChoice.catch(() => null);
    if (res && res.outcome === 'accepted') { save.installed = true; persist(); $('#btn-install').hidden = true; toast('¡Instalado! Búscalo en tu pantalla de inicio', SVG.gift, 3500); }
    installPrompt = null;
  });
  window.addEventListener('appinstalled', () => { save.installed = true; persist(); $('#btn-install').hidden = true; });
  if ('serviceWorker' in navigator && /^https?:/.test(location.protocol)) {
    navigator.serviceWorker.register('sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            const el = toast('Hay una versión nueva · toca para actualizar', SVG.gift, 0, 'sw');
            el.addEventListener('click', () => { nw.postMessage('skip'); el.remove(); });
          }
        });
      });
    }).catch(() => { /* sin service worker */ });
    let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (!reloading) { reloading = true; location.reload(); } });
  }

  /* ================= Arranque ================= */
  ensureDaily();
  show('home');
  const splashOff = () => { const s = $('#splash'); if (!s) return; s.classList.add('out'); setTimeout(() => s.remove(), 450); };
  Promise.race([document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 1400))]).then(() => setTimeout(splashOff, 250));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!$('#game').hidden) resize(); });

  // Para pruebas automáticas
  window.__bloquazo = { levelConfig, dailyConfig, startLevel, startClassic, startTime, startDaily, get state() { return G; }, place, undo, swap, save, ACH, ensureDaily };
})();
