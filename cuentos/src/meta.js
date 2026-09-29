// Datos de registro/publicación de cada libro (título, subtítulo, autor, sinopsis, categorías, keywords).
// Cambia AUTOR y SERIE por los que quieras usar en la plataforma.
const AUTOR = 'Sofía Luz';
const SERIE = 'Amiguitos del Bosque';
const EDAD = 'de 3 a 7 años';

const base = {
  '01': {
    subtitle: 'Un cuento sobre compartir',
    sinopsis: 'Tobi es un osito que adora la miel. Un día encuentra el tarro más grande que ha visto y decide guardarlo solo para él… hasta que sus amigos Lila y Pipo llegan con hambre. ¿Sabrá Tobi que la miel sabe mejor cuando se comparte?',
    valor: 'la generosidad y la amistad',
    keywords: ['cuentos infantiles para dormir', 'libro sobre compartir para niños', 'cuentos con valores', 'osito cuento ilustrado', 'cuentos cortos con moraleja', 'libros para niños de 3 a 7 años', 'cuentos de animales del bosque'],
  },
  '02': {
    subtitle: 'Un cuento sobre la paciencia',
    sinopsis: 'Tina, la tortuga, planta una semilla diminuta y la cuida cada día, aunque nadie crea que algo vaya a crecer. Con cariño, agua y mucha paciencia, descubrirá que las cosas más bonitas necesitan tiempo.',
    valor: 'la paciencia y la constancia',
    keywords: ['cuento sobre la paciencia para niños', 'tortuga cuento infantil', 'cuentos con valores', 'libro ilustrado jardín semilla', 'cuentos cortos con enseñanza', 'libros para niños de 3 a 7 años', 'cuentos para dormir'],
  },
  '03': {
    subtitle: 'Un cuento sobre la valentía',
    sinopsis: 'Nico es un conejo alegre de día, pero cuando llega la noche siente mucho miedo. Una noche escucha un llanto en el bosque y tendrá que decidir si se esconde o ayuda. Un cuento tierno para hablar del miedo a la oscuridad.',
    valor: 'la valentía y la empatía',
    keywords: ['cuento miedo a la oscuridad niños', 'conejo valiente cuento', 'cuentos con valores', 'libro para dormir sin miedo', 'cuentos infantiles ilustrados', 'libros para niños de 3 a 7 años', 'cuentos de animales del bosque'],
  },
  '04': {
    subtitle: 'Un cuento sobre la amabilidad',
    sinopsis: 'Luz es una estrellita que ilumina el bosque cada noche. Pero una noche se siente sola, pierde su brillo y cae entre los árboles. Sus nuevos amigos descubrirán que las palabras amables pueden hacer brillar a cualquiera.',
    valor: 'la amabilidad y la amistad',
    keywords: ['cuento de la estrella para niños', 'cuentos sobre la amabilidad', 'cuentos con valores', 'cuentos para dormir ilustrados', 'estrellita cuento infantil', 'libros para niños de 3 a 7 años', 'cuentos de amistad'],
  },
  '05': {
    subtitle: 'Un cuento sobre ser uno mismo',
    sinopsis: 'Bubu es un pececito naranja que sueña con volar como su amigo Pipo. Salta y salta, pero siempre cae al agua. Hasta que descubre que su mar está lleno de maravillas y que cada uno tiene algo especial.',
    valor: 'la autoestima y aceptarse a uno mismo',
    keywords: ['cuento autoestima niños', 'pez cuento infantil ilustrado', 'cuentos con valores', 'cuentos del mar para niños', 'cuentos cortos con moraleja', 'libros para niños de 3 a 7 años', 'aceptarse a uno mismo cuento'],
  },
  '06': {
    subtitle: 'Un cuento sobre ayudar',
    sinopsis: 'Dumbi, el elefante, cree que Ani, la hormiga, es demasiado pequeña para hacer algo importante. Pero cuando su cacahuate favorito cae en una grieta, solo alguien muy pequeñito podrá ayudarlo.',
    valor: 'el respeto y la cooperación',
    keywords: ['cuento elefante y hormiga', 'cuentos sobre ayudar a los demás', 'cuentos con valores', 'respeto a los demás cuento infantil', 'cuentos cortos con enseñanza', 'libros para niños de 3 a 7 años', 'cuentos de animales'],
  },
  '07': {
    subtitle: 'Un cuento sobre las palabras mágicas',
    sinopsis: 'Fito es un zorro muy listo, pero muy mandón: "¡Dame eso!", "¡Quítate!". Cuando nadie quiere jugar con él, la abuela Búho le enseña dos palabras mágicas que abren todas las puertas: por favor y gracias.',
    valor: 'la cortesía y el respeto',
    keywords: ['cuento por favor y gracias', 'buenos modales cuento infantil', 'cuentos con valores', 'zorro cuento ilustrado', 'cuentos cortos con moraleja', 'libros para niños de 3 a 7 años', 'cuentos para aprender a pedir las cosas'],
  },
  '08': {
    subtitle: 'Un cuento sobre las emociones',
    sinopsis: 'Nube amanece gris y gruñona sin saber por qué. Cuando por fin llora, arruina el picnic de sus amigos… o eso cree. Un cuento para aprender que está bien sentirse triste y que hasta la lluvia hace crecer flores.',
    valor: 'las emociones y la gestión de la tristeza',
    keywords: ['cuento sobre emociones para niños', 'nube cuento infantil', 'cuentos con valores', 'inteligencia emocional niños', 'cuentos para dormir ilustrados', 'libros para niños de 3 a 7 años', 'cuento de la lluvia'],
  },
  '09': {
    subtitle: 'Un cuento sobre cuidar la naturaleza',
    sinopsis: 'Misu, la gatita, encuentra un jardín triste, lleno de basura y sin flores. Con la ayuda de sus amigos lo limpia, siembra semillas y lo cuida cada día, hasta que vuelven las mariposas y los pájaros.',
    valor: 'el cuidado del medio ambiente',
    keywords: ['cuento cuidar la naturaleza niños', 'gatita cuento infantil', 'cuentos con valores', 'medio ambiente cuento ilustrado', 'reciclaje para niños cuento', 'libros para niños de 3 a 7 años', 'jardín cuento infantil'],
  },
  '10': {
    subtitle: 'Un cuento sobre ser diferente',
    sinopsis: 'Pincho es un erizo que solo quiere un abrazo, pero sus púas pinchan a todos. Se siente solo hasta que su amigo Tobi tiene una idea llena de cariño. Un cuento sobre la inclusión y la amistad.',
    valor: 'la inclusión y la amistad',
    keywords: ['cuento erizo abrazo', 'cuentos sobre la diferencia niños', 'cuentos con valores', 'inclusión cuento infantil', 'cuentos de amistad ilustrados', 'libros para niños de 3 a 7 años', 'cuentos para dormir'],
  },
};

const CATS_LECTURA = [
  'Juvenile Fiction > Animals > General',
  'Juvenile Fiction > Social Themes > Emotions & Feelings',
  'Juvenile Fiction > Bedtime & Dreams',
];
const CATS_COLOREAR = [
  'Juvenile Nonfiction > Activity Books > Coloring',
  'Juvenile Fiction > Animals > General',
  'Juvenile Fiction > Social Themes > Values & Virtues',
];

function meta(story, mode) {
  const b = base[story.id];
  const lectura = mode !== 'line';
  const title = story.title;
  const subtitle = lectura ? `${b.subtitle} (${SERIE})` : `Libro para colorear · ${b.subtitle} (${SERIE})`;
  const descripcion = lectura
    ? `${b.sinopsis}\n\n"${title}" es un cuento corto y sencillo para leer en familia, con ilustraciones a todo color, grandes y alegres, y una enseñanza sobre ${b.valor}. Cada libro de la colección ${SERIE} termina con una página de reflexión y una pregunta para conversar con los niños.\n\nIdeal para niños ${EDAD}, para la hora de dormir, para primeros lectores y para trabajar valores en casa o en el aula. 18 escenas ilustradas, texto en español claro y con letra grande.`
    : `${b.sinopsis}\n\nEsta es la versión para colorear de "${title}": 18 escenas del cuento en trazo negro, limpio y grueso, listas para pintar con crayones, colores o marcadores. Cada página incluye el texto del cuento, así que los niños colorean mientras leen o escuchan la historia, y al final encuentran la enseñanza sobre ${b.valor} y un espacio para su propio dibujo.\n\nRecomendado para niños ${EDAD}. Formato grande, una ilustración por página, impresa por una sola cara para que los colores no traspasen. Parte de la colección ${SERIE}.`;
  const keywords = lectura ? b.keywords : [`libro para colorear ${title.split(',')[0].toLowerCase()}`, 'libro de colorear para niños', 'cuentos para colorear con valores', ...b.keywords.slice(2, 6)];
  return { title, subtitle, autor: AUTOR, serie: SERIE, edad: EDAD, descripcion, sinopsis: b.sinopsis, categorias: lectura ? CATS_LECTURA : CATS_COLOREAR, keywords, valor: b.valor };
}
module.exports = { meta, AUTOR, SERIE, EDAD };
