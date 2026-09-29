# Juegitos pendejos

Juegos hechos en HTML puro. Se abren directo en el navegador (móvil o PC), sin instalar nada.

## Bloquazo

Puzle de bloques: arrastra cubos de madera a una bandeja de 8×8 y vacía filas y columnas completas.

- **100 niveles** en 10 mundos (Pradera, Océano, Desierto, Selva, Volcán, Glaciar, Feria, Cosmos, Tormenta y Leyenda).
- Dos tipos de meta: **puntos** (llega a la cifra objetivo) y **canicas** (cada 4 niveles: vacía las filas o columnas donde están las canicas).
- Cada 10 niveles hay un **jefe** con la bandeja más llena.
- **Estrellas** por eficiencia: menos piezas usadas, más estrellas (300 en total).
- **Modo clásico**: sin niveles ni límite, la dificultad sube con los puntos y se guarda tu récord.
- Combos por vaciar varias líneas a la vez o seguidas, bono por dejar la bandeja vacía.
- **Música de fondo** y efectos generados con Web Audio (se activan por separado, no pesan nada).
- Progreso guardado en el navegador.

Abrir: `bloquazo/index.html`.

Truco para probar: abrir con `#todos` al final de la dirección (`index.html#todos`) desbloquea los 100 niveles.

## Brick Breaker

Recreación del clásico que venía preinstalado en los BlackBerry: paleta, bola y ladrillos, metido en un "teléfono" con pantalla negra, menús de lista al estilo BlackBerry y un trackball que lanza y dispara.

- **34 niveles** diseñados a mano, con ladrillos de 1, 2 y 3 golpes y **plateados irrompibles** (solo los rompen las balas).
- **10 cápsulas** del original: LIFE, LONG, SLOW, CATCH, GUN, LASER, BOMB, MULTI, FLIP y WRAP. Duran hasta perder una vida o pasar de nivel.
- **Puntaje oficial**: 10 por ladrillo con la bola, 20 con láser, 50 con bala, 5 por daño de bomba y 50 por cápsula.
- **El "Turn"**: al pasar el nivel 34 vuelves al 1 con la bola más rápida; si pasas los 34 dos veces, la bola queda lenta para siempre.
- 3 vidas, récord, tabla de **10 mejores puntuaciones** y partida en curso guardados en el navegador (**Continuar partida**).
- Control táctil relativo: la paleta se desliza con el dedo, no salta a donde tocas. Con ratón sigue al puntero; también flechas. Trackball, toque, clic o espacio para lanzar y disparar (mantener para el láser); tecla Menú o `P` pausa.
- Menús navegables con flechas y Enter, como en el teléfono.
- Efectos de sonido generados con Web Audio.

Abrir: `brickbreaker/index.html`.

Trucos para probar (se pueden combinar con comas, por ejemplo `index.html#todos,test`): `#todos` desbloquea los 34 niveles, `#test` hace que cada ladrillo suelte una cápsula y `#turn` empieza como si ya hubieras pasado el Turn.

## Publicar en GitHub Pages

El flujo `.github/workflows/pages.yml` publica el repo completo en Pages cada vez que se hace push a `main`.
Pasos únicos (una sola vez):

1. Hacer el repo **público** (Settings → General → Danger Zone → Change visibility). Pages en repos privados solo funciona con GitHub Pro.
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Mezclar esta rama en `main`.

Los juegos quedan en `https://coquillo10.github.io/Juegitos-pendejos-/bloquazo/` y `.../brickbreaker/`, y la portada en `https://coquillo10.github.io/Juegitos-pendejos-/`.
