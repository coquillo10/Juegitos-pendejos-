# Juegitos pendejos

Juegos hechos en HTML puro. Se abren directo en el navegador (móvil o PC), sin instalar nada.

**Jugar:** https://coquillo10.github.io/Juegitos-pendejos-/

## Bloquazo

Puzle de bloques: arrastra cubos de madera a una bandeja de 8×8 y vacía filas y columnas completas.

- **200 niveles** en 20 mundos. Desde el mundo 11 hay **hielo** (se rompe en dos vaciadas) y desde el 13 **candados** (se destraban al vaciar una línea vecina o la suya). En los mundos altos aparece el **cubo dorado**, que vacía su fila y su columna.
- Metas de **puntos** o de **canicas** (cada 4 niveles). Cada 10 niveles hay un **jefe**.
- **Estrellas** por eficiencia (600 en total). El "par" de cada nivel se calibró con un bot que juega los 200 niveles.
- **Reto del día**: el mismo tablero para todos, cambia a medianoche.
- **Modo clásico** sin límite y **contrarreloj** de 2 minutos, con tabla de los 10 mejores de cada uno.
- **Monedas** para **deshacer** (10) y **cambiar piezas** (20). Se ganan con niveles, misiones diarias, racha, logros y el regalo diario.
- **Misiones diarias** (3 al día + bonus), **racha** de días jugados y **24 logros**.
- **Música** adaptativa (sube con el combo), efectos y vibración, con interruptores separados.
- Efectos de ambiente por mundo, confeti al ganar, partida que se **reanuda** donde la dejaste.
- **App instalable (PWA)**: funciona sin internet y se instala con icono propio desde el navegador.

Abrir: `bloquazo/index.html` (o la URL de arriba). Truco para probar: `index.html#todos` desbloquea los 200 niveles.

## Brick Breaker

Recreación del clásico que venía preinstalado en los BlackBerry: paleta, bola y ladrillos, con estética retro de pantalla negra.

- **34 niveles** diseñados a mano, con ladrillos de 1, 2 y 3 golpes y **plateados irrompibles** (solo los rompen las balas).
- **10 cápsulas** del original: LIFE, LONG, SLOW, CATCH, GUN, LASER, BOMB, MULTI, FLIP y WRAP. Duran hasta perder una vida o pasar de nivel.
- **Puntaje oficial**: 10 por ladrillo con la bola, 20 con láser, 50 con bala, 5 por daño de bomba y 50 por cápsula.
- **El "Turn"**: al pasar el nivel 34 vuelves al 1 con la bola más rápida; si pasas los 34 dos veces, la bola queda lenta para siempre.
- La bola acelera un poquito con cada rebote en la paleta (tope +24 %); se reinicia al perder una vida o cambiar de nivel.
- 3 vidas, récord y partida en curso guardados en el navegador (botón **Continuar**).
- Control táctil relativo: la paleta se desliza con el dedo, no salta a donde tocas. Con ratón sigue al puntero; también flechas. Toque, clic o espacio para lanzar y disparar; `P` pausa.
- Efectos de sonido generados con Web Audio.

Abrir: `brickbreaker/index.html`.

Trucos para probar (se pueden combinar con comas, por ejemplo `index.html#todos,test`): `#todos` desbloquea los 34 niveles, `#test` hace que cada ladrillo suelte una cápsula y `#turn` empieza como si ya hubieras pasado el Turn.

## Publicación

`.github/workflows/pages.yml` publica el repo en GitHub Pages en cada push a `main` (juegos en `.../bloquazo/` y `.../brickbreaker/`) y versiona la caché del service worker con el hash del commit, así cada versión nueva se descarga sola (el juego avisa con un toque para actualizar).

## Herramientas de desarrollo

`balance.js` (en el historial de la sesión) juega los 200 niveles con un bot sin anticipación; con los valores actuales gana el 100 % de los mundos 1-5 y entre el 25 % y el 65 % de los mundos 14-20.
