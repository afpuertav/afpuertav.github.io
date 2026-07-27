/* ============================================================
   Datos de presentaciones y charlas.
   Para añadir una nueva, copia un bloque y ponlo al principio.
   El campo "date" usa formato AAAA-MM-DD (déjalo en null si aún
   no tienes la fecha; entonces se mostrará solo el campo "meta").
   ============================================================ */
window.AFP_DATA = window.AFP_DATA || {};

window.AFP_DATA.presentations = [
  {
    date: "2026-07-26",
    meta: {
      es: "Workshop · PyCon 2026",
      en: "Workshop · PyCon 2026"
    },
    link: "presentations/nlp-en-la-practica-pycon2026/nlp-en-la-practica.html",
    external: false,
    ctaKey: "presentations.openSlides",
    tags: ["NLP", "Python", "Workshop"],
    title: {
      es: "NLP en la práctica — Workshop PyCon 2026",
      en: "NLP in practice — PyCon 2026 Workshop"
    },
    excerpt: {
      es: "Taller práctico de procesamiento de lenguaje natural con Python: del preprocesamiento de texto a la construcción de modelos, con ejemplos ejecutables y un recorrido por las herramientas del ecosistema.",
      en: "Hands-on natural language processing workshop with Python: from text preprocessing to model building, with runnable examples and a tour of the ecosystem’s tooling."
    }
  }
];
