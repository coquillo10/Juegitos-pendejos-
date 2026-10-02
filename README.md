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

## Publicación

`.github/workflows/pages.yml` publica el repo en GitHub Pages en cada push a `main` y versiona la caché del service worker con el hash del commit, así cada versión nueva se descarga sola (el juego avisa con un toque para actualizar).

## Herramientas de desarrollo

`balance.js` (en el historial de la sesión) juega los 200 niveles con un bot sin anticipación; con los valores actuales gana el 100 % de los mundos 1-5 y entre el 25 % y el 65 % de los mundos 14-20.
