# afpuertav.github.io

Página personal de Andrés Felipe Puerta Vélez. Sitio estático servido por GitHub Pages,
sin build ni dependencias: solo HTML, CSS y JavaScript plano.

## Estructura

```
/
├── index.html                 Inicio (perfil, carrusel, mapa de visitantes)
├── cv.html                    Hoja de vida
├── courses.html               Listado de cursos
├── publications.html          Listado de publicaciones
├── presentations.html         Listado de charlas y talleres
├── blog.html                  Listado de entradas del blog
├── gallery.html               Galería de fotos y videos
├── games.html                 Juegos (fuera del menú principal)
├── 404.html                   Página de error
├── robots.txt · sitemap.xml   SEO
├── styles.css                 Hoja de estilos única del sitio
│
├── js/
│   ├── i18n.js                Diccionario ES/EN y motor de traducción
│   ├── site.js                Menú responsive, botón de idioma, año del pie
│   ├── collection.js          Renderiza listas con búsqueda y orden
│   ├── home.js                Carrusel del inicio y mapa de visitantes
│   ├── gallery.js             Play/pausa de los videos de la galería
│   └── data/
│       ├── publications.js    Datos de publicaciones
│       ├── presentations.js   Datos de presentaciones
│       └── posts.js           Datos del blog
│
├── assets/                    Foto de perfil e iconos
├── gallery/                   Imágenes y videos
├── courses/
│   ├── estadistica_general/   CM0244 — simuladores + PDFs
│   ├── pensamiento_computacional/
│   └── machine_learning_regresion/
├── presentations/             Una carpeta por presentación
├── blog/                      Una página por entrada
├── games/                     Juegos sueltos
├── docs/                      Notas de diseño y código heredado
└── estadistica_general/       Solo redirecciones (ver más abajo)
```

**Reglas de nombres.** Todo lo que aparece en la raíz va en inglés: `courses/`,
`presentations/`, `gallery/`, `games/`. Dentro de esas carpetas, el nombre puede
ir en el idioma del contenido (`estadistica_general/`,
`nlp-en-la-practica-pycon2026/`), porque son cursos y charlas en español.
Siempre en minúscula, sin espacios ni tildes.

## Cómo añadir contenido

**Una publicación** → añade un bloque al principio de `js/data/publications.js`.

**Una presentación** → añade un bloque al principio de `js/data/presentations.js` y
pon los archivos de la charla en `presentations/<nombre-del-evento>/`.

**Una entrada de blog** → crea `blog/postN.html` (copia una existente) y añade el
bloque correspondiente en `js/data/posts.js`.

**Un curso** → crea `courses/<nombre_curso>/index.html` (copia una de las páginas
existentes) y añade una tarjeta en `courses.html`.

En todos los casos, recuerda añadir la nueva URL a `sitemap.xml`.

## Redirecciones heredadas

La carpeta `estadistica_general/` de la raíz **no tiene contenido**: son cinco
páginas que reenvían a `courses/estadistica_general/`. Existen porque esa ruta
antigua era la más visitada del sitio (582 impresiones en Google, frente a 3 del
resto de páginas) y borrarla dejaría esos enlaces rotos.

Se pueden eliminar cuando Search Console muestre la ruta nueva ya indexada y la
antigua sin tráfico.

## Idiomas

Cada texto traducible lleva `data-i18n="clave"` en el HTML y la clave vive en
`js/i18n.js`. Para atributos se usa `data-i18n-attr="placeholder:clave"`.
El idioma se detecta del navegador la primera vez y luego se recuerda en el
navegador del visitante. El texto escrito dentro del HTML sirve de respaldo si
falta la clave.

## Mapa de visitantes

Instalado con [MapMyVisitors](https://mapmyvisitors.com/). El `<script>` vive
dentro de `<div id="visitor-map-embed">` en `index.html` — tiene que ir en el
`<body>`, no en el `<head>`.

Las estadísticas completas (países, ciudades, referrers) están en el panel:
<https://mapmyvisitors.com/web/1c6ww>

Debajo del mapa hay un mensaje de respaldo que solo se oculta cuando el widget
pinta algo real. Si el proveedor deja de responder, el aviso vuelve a aparecer
en lugar de dejar un hueco en blanco.

**El mapa no se ve abriendo `index.html` con doble clic.** El script de
MapMyVisitors carga su imagen de fondo desde `//mapmyvisitors.com/...`, una URL
relativa al protocolo, que bajo `file://` el navegador busca en el disco local.
Necesita servirse por HTTP.

## Probar el sitio en local

```bash
cd C:\Users\afpue\Documents\GitHub\afpuertav.github.io
python -m http.server 8000
```

Y abre <http://localhost:8000>. Así funcionan el mapa, las rutas absolutas de
`404.html` y todo lo demás igual que en producción. `Ctrl+C` para detenerlo.

## Limpieza aplicada (27 de julio de 2026)

| Acción | Archivos |
|---|---|
| Borrado | `index.js`, `blog.js`, `publications.js`, `gallery.js`, `games.js` (raíz, obsoletos tras pasar a `/js/`) |
| Borrado | `/estadistica_general/` — copia duplicada de `/cursos/estadistica_general/` |
| Borrado | `games/tetris copy.html` |
| Movido | `paletteCode.txt`, `paletteCSS.txt`, `ANALISIS_TERCERPARCIAL.md` → `docs/` |
| Movido | `server.js` (servidor IoT, ajeno a este sitio) → `docs/legacy/` |
| Renombrado | `presentaciones/NLP en la practica - Workshop de PYCON2026/` → `presentaciones/nlp-en-la-practica-pycon2026/` |
| Creado | `.nojekyll` |

La carpeta `docs/` no forma parte del sitio publicado: son notas de trabajo y
código heredado que se conservan por si hacen falta.
