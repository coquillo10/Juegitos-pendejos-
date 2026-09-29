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

## Publicar en GitHub Pages

El flujo `.github/workflows/pages.yml` publica el repo completo en Pages cada vez que se hace push a `main`.
Pasos únicos (una sola vez):

1. Hacer el repo **público** (Settings → General → Danger Zone → Change visibility). Pages en repos privados solo funciona con GitHub Pro.
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Mezclar esta rama en `main`.

El juego queda en `https://coquillo10.github.io/Juegitos-pendejos-/bloquazo/` y la portada en `https://coquillo10.github.io/Juegitos-pendejos-/`.
