# Cuentos infantiles: para leer y para colorear

20 libros listos para imprimir y publicar, generados a partir de 10 cuentos con una enseñanza.
Ilustraciones creadas con Higgsfield (modelo GPT Image 2.5) usando fichas de personaje como referencia,
para que cada personaje sea el mismo en todas las páginas.

| Carpeta | Contenido |
|---|---|
| `pdf/color/` | 10 cuentos ilustrados a color (interior, 24 páginas A4) |
| `pdf/colorear/` | Los mismos 10 cuentos en versión para colorear (interior, 24 páginas A4, línea negra sobre blanco) |
| `pdf/cubiertas/` | 20 cubiertas completas: contraportada + lomo + portada, con sangrado de 0.125 in y lomo calculado para 24 páginas |
| `registro/registro.md` y `registro.json` | Ficha de registro de cada libro: título, subtítulo, autor, sinopsis de venta, categorías y palabras clave |
| `prompts-higgsfield/prompts.md` | Prompts usados para cada escena |
| `src/` | Generador (Node + Playwright) e imágenes |

## Estructura de cada libro (24 páginas)

1. Portadilla · 2. Créditos · 3. "Este libro pertenece a" · 4. Conoce a los personajes ·
5 a 22. Las 18 escenas del cuento con su texto · 23. La enseñanza y una pregunta · 24. "Mi dibujo del cuento".

Los libros de colorear tienen las mismas 18 escenas en trazo negro, generadas a partir de la escena a color.

## Los cuentos

1. Tobi, el osito que compartía — compartir.
2. Tina, la tortuga paciente — paciencia.
3. Nico, el conejo valiente — valentía.
4. La estrellita que perdió su brillo — amabilidad.
5. Bubu, el pez que quería volar — aceptarse a uno mismo.
6. Dumbi y la hormiga Ani — todos podemos ayudar.
7. Fito, el zorro y las palabras mágicas — decir "por favor" y "gracias".
8. Nube, la nubecita gruñona — está bien sentir tristeza.
9. Misu y el jardín — cuidar la naturaleza.
10. Pincho, el erizo que quería un abrazo — ser diferente.

## Cambiar autor, textos o regenerar

- Autor (seudónimo), serie y sinopsis: `src/meta.js`.
- Textos de los cuentos: `src/stories.js`.
- Imágenes: `src/img/<cuento>/color/` y `src/img/<cuento>/line/` (`cover.jpg` y `1.jpg` … `18.jpg`). `src/state.json` guarda los IDs y URL de cada generación en Higgsfield.

```bash
cd cuentos/src
npm install playwright     # o usa una instalación global con NODE_PATH
node build.js              # genera interiores, cubiertas y la ficha de registro
node build.js 03           # solo el cuento 03
```

## Notas para la publicación

- Tamaño A4 (8.27 × 11.69 in). Si la plataforma pide otro tamaño (por ejemplo 8.5 × 11 in), cambia `TRIM_W` y `TRIM_H` en `src/build.js` y vuelve a generar.
- El lomo se calcula con el número de páginas (24) y el tipo de papel: color premium para los cuentos y papel blanco para los libros de colorear. Con menos de 79 páginas el lomo no lleva texto.
- La cubierta deja un espacio de 2 × 1.2 in en la esquina inferior derecha de la contraportada para el código de barras del ISBN.
