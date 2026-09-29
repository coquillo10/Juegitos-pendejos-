# Cuentos infantiles: para leer y para colorear

20 libros en PDF (tamaño A4) generados a partir de 10 cuentos cortos con una enseñanza.

| Carpeta | Contenido |
|---|---|
| `pdf/color/` | 10 cuentos ilustrados a color para leer con niños |
| `pdf/colorear/` | Los mismos 10 cuentos en versión de línea para colorear |
| `prompts-higgsfield/` | Prompts (color, colorear y animación) de cada escena, listos para Higgsfield |
| `src/` | Generador: ilustraciones vectoriales, textos y render a PDF |

Cada libro tiene portada, 6 páginas de historia y una página final con la enseñanza y una pregunta para conversar.

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

## Regenerar los PDF

Requiere Node 18+ y Playwright con Chromium.

```bash
cd cuentos/src
npm install playwright        # o usa una instalación global con NODE_PATH
node build.js                 # genera los 20 PDF
node build.js 03              # solo el cuento 03
node prompts.js               # regenera los prompts para Higgsfield
```

## Ilustraciones con Higgsfield

Las 70 ilustraciones a color (10 portadas + 60 escenas) se generaron con Higgsfield
(modelo Z Image) a partir de los prompts de `prompts-higgsfield/prompts.md` y están en
`src/img/<cuento>/color/`. Las URL originales están en `src/manifest.json`
(`node download.js` las vuelve a descargar).

Las páginas para colorear (`src/img/<cuento>/line/`) se derivan de las imágenes a color con
`python3 lineart.py` (OpenCV): contorno negro puro sobre blanco, sin grises ni color.

Si falta una imagen, `build.js` usa la ilustración vectorial de respaldo de `src/shapes.js`.

Flujo completo para regenerar:

```bash
cd cuentos/src
node download.js      # descarga las imágenes a color (según manifest.json)
python3 lineart.py    # crea las páginas para colorear
node build.js         # genera los 20 PDF
```
