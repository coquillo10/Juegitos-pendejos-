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

Las ilustraciones actuales son vectoriales (hechas en `src/shapes.js`). Para sustituirlas por
imágenes o animaciones generadas con Higgsfield:

1. Conecta Higgsfield en https://claude.ai/customize/connectors y abre una sesión nueva.
2. Usa los prompts de `prompts-higgsfield/prompts.md` (uno por escena, con estilo a color,
   estilo para colorear y prompt de animación).
3. Guarda las imágenes en `src/img/<id-cuento>/<pagina>.png` y ajusta `build.js` para
   insertar la imagen en lugar del SVG de la escena.
