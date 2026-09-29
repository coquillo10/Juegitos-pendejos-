// Genera los prompts de imagen/animación para Higgsfield a partir de las escenas.
const fs = require('fs');
const path = require('path');
const stories = require('./stories');

const NAMES = { bear: 'Tobi the bear cub (light brown, cream tummy)', rabbit: 'Nico the white bunny (pink inner ears)', bird: 'Pipo the little blue bird', turtle: 'Tina the green turtle', fox: 'Fito the orange fox', owl: 'Grandma Owl (brown, big round eyes)', star: 'Luz the little yellow star', fish: 'Bubu the orange fish', elephant: 'Dumbi the blue-grey elephant', ant: 'Ani the tiny brown ant', cloud: 'Nube the little cloud', cat: 'Misu the grey kitten', hedgehog: 'Pincho the hedgehog', butterfly: 'a pink and yellow butterfly', child: 'a child' };
const MOODS = { happy: 'smiling happily', sad: 'sad with a small tear', surprised: 'surprised with wide eyes', big: 'laughing with a big open smile', sleepy: 'with eyes closed, calm' };
const BGS = { forest: 'a sunny cartoon forest with round trees and pines', meadow: 'a green meadow with rolling hills, flowers and a smiling sun', sunset: 'a warm orange sunset over a meadow', night: 'a starry night in the forest with a big soft moon', storm: 'a cloudy grey sky with rain over the forest', sea: 'under the sea and above the waves, blue ocean with sandy bottom and seaweed', garden: 'a garden with a wooden fence and grass', gardenbloom: 'a garden full of colorful flowers with a wooden fence', village: 'a cozy village street with three pastel houses', picnic: 'a meadow picnic with a pink checkered blanket', sky: 'high in a blue sky among soft clouds', rain: 'a rainy day in a garden with a wooden fence' };
const PROPS = { honey: 'a big jar of golden honey', sprout: 'a small green sprout', seed: 'a tiny seed', sunflower: 'a giant sunflower', flower: 'flowers', umbrella: 'a red umbrella', peanut: 'a peanut', balloon: 'a balloon', wateringcan: 'a blue watering can', basket: 'a picnic basket', trash: 'scattered trash', rock: 'a big rock', crack: 'a narrow crack in the ground', blanket: 'a soft pink blanket', cake: 'a pink frosted cake with a candle', gift: 'a gift box', moonstar: 'a small star', heart: 'a floating red heart', acorn: 'an acorn' };

const STYLE_COLOR = 'Children\'s picture-book illustration, cute kawaii cartoon animals, big expressive eyes, soft rounded shapes, bright cheerful flat colors, thick clean outlines, gentle lighting, no text, 4:3.';
const STYLE_LINE = 'Children\'s coloring book page, clean black line art on pure white background, thick smooth outlines, no shading, no color, no gray fills, simple shapes for kids age 3-7, no text, 4:3.';
const STYLE_ANIM = 'Gentle looping animation, subtle idle motion: characters blink and breathe, leaves and grass sway, clouds drift slowly, soft camera push-in, 4 seconds, kid-friendly, no fast movement.';

function describe(sc) {
  const chars = (sc.chars || []).map(c => `${NAMES[c.t]} ${MOODS[c.mood || 'happy']}`).join(', ');
  const props = [...(sc.props || []), ...(sc.front || [])].map(p => PROPS[p.t]).filter(Boolean);
  return `${chars}${props.length ? ', with ' + [...new Set(props)].join(' and ') : ''}, in ${BGS[sc.bg]}.`;
}

const out = { style: { color: STYLE_COLOR, coloring: STYLE_LINE, animation: STYLE_ANIM }, stories: [] };
let md = `# Prompts para Higgsfield\n\nCada cuento tiene una portada, 6 escenas y una página final. Para cada escena hay tres prompts:\n\n- **color**: ilustración a color para el cuento animado.\n- **colorear**: versión de línea para el libro de colorear (misma escena).\n- **animación**: instrucción de movimiento (imagen a video) a partir de la ilustración a color.\n\nEstilo base a color:\n> ${STYLE_COLOR}\n\nEstilo base para colorear:\n> ${STYLE_LINE}\n\nAnimación:\n> ${STYLE_ANIM}\n\n`;
for (const s of stories) {
  const st = { id: s.id, title: s.title, lesson: s.lesson, cover: `${NAMES[s.hero]} smiling, full body, centered, plain soft background. ${STYLE_COLOR}`, scenes: [] };
  md += `## ${s.id} · ${s.title}\n\n**Enseñanza:** ${s.lesson}\n\n**Portada (color):** ${st.cover}\n\n`;
  s.pages.forEach((p, i) => {
    const d = describe(p.sc);
    st.scenes.push({ page: i + 1, text_es: p.text, color: `${d} ${STYLE_COLOR}`, coloring: `${d} ${STYLE_LINE}`, animation: STYLE_ANIM });
    md += `### Escena ${i + 1}\n\n_${p.text}_\n\n- **color:** ${d} ${STYLE_COLOR}\n- **colorear:** ${d} ${STYLE_LINE}\n- **animación:** ${STYLE_ANIM}\n\n`;
  });
  out.stories.push(st);
}
const dir = path.join(__dirname, '..', 'prompts-higgsfield');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'prompts.json'), JSON.stringify(out, null, 2));
fs.writeFileSync(path.join(dir, 'prompts.md'), md);
console.log('prompts listos:', out.stories.length, 'cuentos');
