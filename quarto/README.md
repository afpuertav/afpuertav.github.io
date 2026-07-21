# Más allá del string — Presentación Quarto (PyCon Colombia 2026)

Versión en **Quarto / reveal.js** del taller, lista para correr desde **Visual Studio Code**.

## Contenido de la carpeta

```
quarto/
├── mas-alla-del-string.qmd   # la presentación (reveal.js)
├── theme.scss                # tema con la paleta oficial de PyCon Colombia 2026
├── img/                      # todas las imágenes del definitivo
└── README.md                 # este archivo
```

## Requisitos

1. **Quarto** — instalar desde https://quarto.org/docs/get-started/ (o `winget install quarto`).
2. **Visual Studio Code** con la extensión **Quarto** (`quarto.quarto`).

No se necesita Python ni R: la presentación es solo contenido (no ejecuta código).

## Cómo previsualizar

Desde VS Code:

- Abre `mas-alla-del-string.qmd` y pulsa el botón **Preview** (o `Ctrl+Shift+K`). Se abre en el navegador y se recarga al guardar.

Desde la terminal:

```bash
cd quarto
quarto preview mas-alla-del-string.qmd
```

## Cómo exportar

```bash
quarto render mas-alla-del-string.qmd          # genera el HTML autocontenible
```

El resultado es `mas-alla-del-string.html`. Este es el que conviene usar en el evento: **funciona sin internet** (Quarto empaqueta reveal.js localmente). Para llevarlo a PDF, abre el HTML en el navegador y añade `?print-pdf` al final de la URL → Imprimir → Guardar como PDF.

## `presentacion.html` (vista rápida, ya incluida)

En la carpeta hay un `presentacion.html` ya generado que puedes **abrir con doble clic** sin instalar nada. Usa exactamente el mismo diseño. Única diferencia: carga reveal.js desde internet (CDN), así que necesita conexión. Para uso offline en el evento, usa el que produce `quarto render`.

## Navegación en la presentación

- **Flechas** ← → para avanzar; **Esc** vista general; **S** notas del orador; **F** pantalla completa.
- El deck es horizontal (sin subslides verticales), igual que la versión PowerPoint.

## Pendientes por completar

- **Caso 1 (Karen):** las diapositivas de resultados tienen *placeholders* marcados `[ pendiente de insertar ]`. Reemplázalos añadiendo las imágenes a `img/` y una etiqueta `![](img/tu_figura.png)` en el `.qmd`.
- **QR de la práctica:** en la diapositiva "Manos a la obra" hay un recuadro `QR [ pendiente ]`. Cuando publiques el Colab, reemplaza ese bloque por `![](img/qr_colab.png){width="220px"}`.

## Paleta (por si necesitas ajustar el tema)

| Uso | Color |
|-----|-------|
| Violeta primario | `#6155F5` |
| Violeta oscuro (divisores) | `#3A2FB8` |
| Lavanda / fondo | `#D3D4F6` / `#F1F2FC` |
| Acento dorado | `#FFC24B` |
| Acento rosa | `#FF5C8A` |

Se editan en la parte superior de `theme.scss`.
