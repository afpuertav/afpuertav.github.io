/* ============================================================
   i18n.js — Sistema de idiomas ES/EN
   Uso en el HTML:
     <span data-i18n="nav.home">Inicio</span>
     <input data-i18n-attr="placeholder:search.placeholder">
   El texto escrito en el HTML es el de respaldo si falta la clave.
   ============================================================ */
(function () {
  "use strict";

  var SUPPORTED = ["es", "en"];
  var STORAGE_KEY = "afp-lang";
  var DEFAULT = "en";

  /* ---------- Diccionario ---------- */
  var dict = {
    /* --- Navegación y elementos comunes --- */
    "nav.home": { es: "Inicio", en: "Home" },
    "nav.cv": { es: "Hoja de vida", en: "Curriculum vitae" },
    "nav.courses": { es: "Cursos", en: "Courses" },
    "nav.publications": { es: "Publicaciones", en: "Publications" },
    "nav.presentations": { es: "Presentaciones", en: "Presentations" },
    "nav.blog": { es: "Blog", en: "Blog" },
    "nav.gallery": { es: "Galería", en: "Gallery" },
    "nav.toggle": { es: "Abrir menú", en: "Open menu" },
    "nav.skip": { es: "Saltar al contenido", en: "Skip to content" },
    "nav.main": { es: "Navegación principal", en: "Main navigation" },
    "nav.language": { es: "Idioma", en: "Language" },

    "footer.rights": {
      es: "&copy; 2026 Andrés Felipe Puerta Vélez",
      en: "&copy; 2026 Andrés Felipe Puerta Vélez"
    },

    "profile.name": {
      es: "Andrés Felipe Puerta Vélez",
      en: "Andrés Felipe Puerta Vélez"
    },
    "profile.location": { es: "Medellín, Colombia", en: "Medellín, Colombia" },

    "common.back": { es: "Volver", en: "Back" },
    "common.search": { es: "Buscar…", en: "Search…" },
    "common.noResults": {
      es: "No hay resultados para esa búsqueda.",
      en: "No results for that search."
    },
    "common.soon": { es: "Próximamente", en: "Coming soon" },
    "common.open": { es: "Abrir", en: "Open" },

    "sort.dateDesc": { es: "Fecha (más reciente)", en: "Date (newest)" },
    "sort.dateAsc": { es: "Fecha (más antigua)", en: "Date (oldest)" },
    "sort.titleAsc": { es: "Título (A-Z)", en: "Title (A-Z)" },
    "sort.titleDesc": { es: "Título (Z-A)", en: "Title (Z-A)" },

    /* --- Inicio --- */
    "page.home.title": {
      es: "Andrés F. Puerta — Matemáticas aplicadas, datos y NLP",
      en: "Andrés F. Puerta — Applied mathematics, data and NLP"
    },
    "page.home.description": {
      es: "Página personal de Andrés Felipe Puerta Vélez: hoja de vida, cursos, publicaciones, presentaciones y galería de proyectos.",
      en: "Personal site of Andrés Felipe Puerta Vélez: CV, courses, publications, talks and project gallery."
    },
    "home.about.heading": { es: "Sobre mí", en: "About me" },
    "home.about.text": {
      es: "Estudiante de maestría en Matemáticas Aplicadas, ingeniero mecánico (con énfasis en diseño integrado de sistemas técnicos) y tecnólogo en desarrollo de software. Con experiencia en mecánica computacional, modelado e impresión 3D, robótica, automatización y maquinaria de taller, complementada con formación en programación, inteligencia artificial y gestión de proyectos. He trabajado como asistente de investigación, asistente académico y logístico, ingeniero de proyectos, analista de calidad de IA y tutor independiente. Actualmente desarrollo proyectos de procesamiento de lenguaje natural, estadística y ciencia de datos en el contexto de la investigación aplicada.",
      en: "Master’s student in Applied Mathematics with a bachelor’s degree in Mechanical Engineering (specializing in integrated design of technical systems) and an associate degree in Software Development. Skilled in computational mechanics, 3D modeling and printing, robotics, automation, and workshop machinery. Complemented by training in programming, artificial intelligence, and project management. Experienced in roles such as research, academic, and logistics assistant, project engineer, AI quality analyst, and independent tutor. Currently working on projects involving natural language processing, statistics, and data science within the context of applied research."
    },
    "home.carousel.heading": {
      es: "Proyectos en imágenes",
      en: "Projects in pictures"
    },
    "home.map.heading": { es: "Visitas por país", en: "Visitors by country" },
    "home.map.fallback": {
      es: "No se pudo cargar el mapa de visitantes.",
      en: "The visitor map could not be loaded."
    },

    /* --- Hoja de vida --- */
    "page.cv.title": {
      es: "Hoja de vida — Andrés F. Puerta",
      en: "Curriculum vitae — Andrés F. Puerta"
    },
    "page.cv.description": {
      es: "Formación académica, experiencia profesional y certificaciones de Andrés Felipe Puerta Vélez.",
      en: "Education, professional experience and certifications of Andrés Felipe Puerta Vélez."
    },
    "cv.heading": { es: "Hoja de vida", en: "Curriculum vitae" },
    "cv.summary": { es: "Perfil", en: "Summary" },
    "cv.education": { es: "Formación académica", en: "Education" },
    "cv.experience": { es: "Experiencia", en: "Experience" },
    "cv.certifications": {
      es: "Licencias y certificaciones",
      en: "Licenses & certifications"
    },

    "cv.edu.msc": {
      es: "Maestría en Matemáticas Aplicadas",
      en: "Master of Science in Applied Mathematics"
    },
    "cv.edu.msc.meta": {
      es: "Universidad EAFIT — en curso, grado previsto 2026",
      en: "Universidad EAFIT — in progress, expected 2026"
    },
    "cv.edu.bsc": {
      es: "Ingeniería Mecánica",
      en: "Bachelor of Science in Mechanical Engineering"
    },
    "cv.edu.bsc.meta": {
      es: "Universidad EAFIT — 2024",
      en: "Universidad EAFIT — 2024"
    },
    "cv.edu.assoc": {
      es: "Tecnología en Desarrollo de Software",
      en: "Associate Degree in Software Development"
    },
    "cv.edu.assoc.meta": {
      es: "Politécnico Jaime Isaza Cadavid — 2019",
      en: "Politécnico Jaime Isaza Cadavid — 2019"
    },

    "cv.exp.stats2": {
      es: "Monitor de Estadística General",
      en: "General statistics class assistant"
    },
    "cv.exp.stats2.meta": {
      es: "Universidad EAFIT · jul 2025 – actualidad",
      en: "Universidad EAFIT · Jul 2025 – present"
    },
    "cv.exp.seedbed": {
      es: "Coordinador del semillero de Automatización, Robótica y Sistemas",
      en: "Coordinator of the Automation, Robotics and Systems Study Seedbed"
    },
    "cv.exp.seedbed.meta": {
      es: "Universidad EAFIT · feb 2023 – actualidad",
      en: "Universidad EAFIT · Feb 2023 – present"
    },
    "cv.exp.research": {
      es: "Asistente de investigación: emisiones de gases contaminantes",
      en: "Research assistant: pollutant gas emissions"
    },
    "cv.exp.research.meta": {
      es: "Universidad EAFIT · jul 2024 – jul 2025",
      en: "Universidad EAFIT · Jul 2024 – Jul 2025"
    },
    "cv.exp.stats1": {
      es: "Monitor de Estadística General",
      en: "General statistics class assistant"
    },
    "cv.exp.stats1.meta": {
      es: "Universidad EAFIT · jul 2024 – nov 2024",
      en: "Universidad EAFIT · Jul 2024 – Nov 2024"
    },
    "cv.exp.scale": {
      es: "Analista de calidad de IA",
      en: "AI quality analyst"
    },
    "cv.exp.scale.meta": {
      es: "Scale AI · jun 2024 – ago 2024",
      en: "Scale AI · Jun 2024 – Aug 2024"
    },
    "cv.exp.corona": {
      es: "Ingeniero de proyectos",
      en: "Project engineer"
    },
    "cv.exp.corona.meta": {
      es: "Organización Corona · ene 2024 – jul 2024",
      en: "Organización Corona · Jan 2024 – Jul 2024"
    },
    "cv.exp.logistics": {
      es: "Coordinador logístico de grupos de investigación",
      en: "Logistics coordinator of research groups"
    },
    "cv.exp.logistics.meta": {
      es: "Universidad EAFIT · ago 2023 – ene 2024",
      en: "Universidad EAFIT · Aug 2023 – Jan 2024"
    },
    "cv.exp.preproject": {
      es: "Asistente académico de preproyecto",
      en: "Pre-project academic assistant"
    },
    "cv.exp.preproject.meta": {
      es: "Universidad EAFIT · jul 2023 – dic 2023",
      en: "Universidad EAFIT · Jul 2023 – Dec 2023"
    },
    "cv.exp.diplomaMl": {
      es: "Asistente logístico del Diplomado en Machine Learning con Python",
      en: "Logistics assistant of the Diploma in Machine Learning with Python"
    },
    "cv.exp.diplomaMl.meta": {
      es: "Universidad EAFIT · abr 2023 – jul 2023",
      en: "Universidad EAFIT · Apr 2023 – Jul 2023"
    },
    "cv.exp.diplomaPmi": {
      es: "Asistente logístico del Diplomado en Gestión de Proyectos con énfasis en PMI",
      en: "Logistics assistant of the Diploma in Project Management with emphasis on PMI"
    },
    "cv.exp.diplomaPmi.meta": {
      es: "Universidad EAFIT · feb 2022 – jun 2022",
      en: "Universidad EAFIT · Feb 2022 – Jun 2022"
    },
    "cv.exp.agro": {
      es: "Miembro del semillero de investigación en agroindustria",
      en: "Member of the agroindustry research seedbed"
    },
    "cv.exp.agro.meta": {
      es: "Universidad EAFIT · feb 2022 – jun 2022",
      en: "Universidad EAFIT · Feb 2022 – Jun 2022"
    },
    "cv.exp.admin": {
      es: "Asistente administrativo",
      en: "Administrative assistant"
    },
    "cv.exp.admin.meta": {
      es: "Universidad EAFIT · may 2021 – nov 2021",
      en: "Universidad EAFIT · May 2021 – Nov 2021"
    },
    "cv.exp.science": {
      es: "Asistente académico de la Oficina de Ciencias",
      en: "Science office academic assistant"
    },
    "cv.exp.science.meta": {
      es: "Universidad EAFIT · feb 2021 – nov 2021",
      en: "Universidad EAFIT · Feb 2021 – Nov 2021"
    },

    "cv.cert.issued": { es: "Emitida", en: "Issued" },

    /* --- Cursos --- */
    "page.courses.title": {
      es: "Cursos — Andrés F. Puerta",
      en: "Courses — Andrés F. Puerta"
    },
    "page.courses.description": {
      es: "Material, simuladores y recursos de los cursos que acompaño: Estadística General, Pensamiento Computacional y Machine Learning en Python.",
      en: "Material, practice simulators and resources for the courses I support: General Statistics, Computational Thinking and Machine Learning in Python."
    },
    "courses.heading": { es: "Cursos", en: "Courses" },
    "courses.intro": {
      es: "Recursos, material de clase y simuladores de los cursos en los que participo como docente o monitor.",
      en: "Resources, class material and practice simulators for the courses I teach or assist."
    },
    "courses.stats.name": { es: "Estadística General", en: "General Statistics" },
    "courses.stats.desc": {
      es: "Simuladores de los cuatro parciales y material de las dieciséis semanas de clase.",
      en: "Practice simulators for the four midterms plus the sixteen weeks of class material."
    },
    "courses.compthinking.name": {
      es: "Pensamiento Computacional",
      en: "Computational Thinking"
    },
    "courses.compthinking.desc": {
      es: "Fundamentos de algoritmia y resolución de problemas con programación. Diapositivas por semana y libro guía.",
      en: "Foundations of algorithmic thinking and problem solving through programming. Weekly slides and course textbook."
    },
    "courses.ml.name": {
      es: "Machine learning: aprendizaje supervisado de regresión en Python",
      en: "Machine learning: supervised regression learning in Python"
    },
    "courses.ml.desc": {
      es: "Modelos de regresión, evaluación y despliegue de soluciones de aprendizaje supervisado con Python.",
      en: "Regression models, evaluation and deployment of supervised learning solutions with Python."
    },
    "courses.institution.eafit": { es: "Universidad EAFIT", en: "Universidad EAFIT" },
    "courses.selfpaced": { es: "Curso propio", en: "Independent course" },
    "courses.enter": { es: "Entrar al curso", en: "Enter course" },

    /* --- Publicaciones --- */
    "page.publications.title": {
      es: "Publicaciones — Andrés F. Puerta",
      en: "Publications — Andrés F. Puerta"
    },
    "page.publications.description": {
      es: "Artículos y trabajos de investigación de Andrés Felipe Puerta Vélez.",
      en: "Research articles and papers by Andrés Felipe Puerta Vélez."
    },
    "publications.heading": { es: "Publicaciones", en: "Publications" },
    "publications.intro": {
      es: "Artículos y trabajos de investigación, publicados o en curso.",
      en: "Research articles and papers, published or in progress."
    },
    "publications.search": {
      es: "Buscar publicación…",
      en: "Search publication…"
    },
    "publications.status.working": {
      es: "En elaboración",
      en: "Working paper"
    },

    /* --- Presentaciones --- */
    "page.presentations.title": {
      es: "Presentaciones — Andrés F. Puerta",
      en: "Presentations — Andrés F. Puerta"
    },
    "page.presentations.description": {
      es: "Charlas, talleres y presentaciones en eventos de Andrés Felipe Puerta Vélez.",
      en: "Talks, workshops and event presentations by Andrés Felipe Puerta Vélez."
    },
    "presentations.heading": { es: "Presentaciones", en: "Presentations" },
    "presentations.intro": {
      es: "Charlas y talleres presentados en eventos y comunidades.",
      en: "Talks and workshops given at events and communities."
    },
    "presentations.search": {
      es: "Buscar presentación…",
      en: "Search presentation…"
    },
    "presentations.openSlides": { es: "Ver diapositivas", en: "View slides" },

    /* --- Blog --- */
    "page.blog.title": { es: "Blog — Andrés F. Puerta", en: "Blog — Andrés F. Puerta" },
    "page.blog.description": {
      es: "Notas y artículos sobre robótica, datos y matemáticas aplicadas.",
      en: "Notes and articles on robotics, data and applied mathematics."
    },
    "blog.heading": { es: "Blog", en: "Blog" },
    "blog.intro": {
      es: "Notas sobre proyectos, robótica, datos y matemáticas aplicadas.",
      en: "Notes on projects, robotics, data and applied mathematics."
    },
    "blog.search": { es: "Buscar entrada…", en: "Search post…" },

    /* --- Galería --- */
    "page.gallery.title": {
      es: "Galería — Andrés F. Puerta",
      en: "Gallery — Andrés F. Puerta"
    },
    "page.gallery.description": {
      es: "Fotografías y videos de proyectos de robótica, automatización y manufactura.",
      en: "Photos and videos of robotics, automation and manufacturing projects."
    },
    "gallery.heading": { es: "Galería", en: "Gallery" },
    "gallery.intro": {
      es: "Proyectos de robótica, automatización y manufactura en imágenes y video.",
      en: "Robotics, automation and manufacturing projects in pictures and video."
    },
    "gallery.item1": {
      es: "Fresadora CNC con 2 grados de libertad acoplados. Es un mecanismo de 7 barras con 2 pares prismáticos paralelos.",
      en: "A CNC routing machine with 2 coupled degrees of freedom. It is a 7-bar mechanism with 2 parallel prismatic pairs."
    },
    "gallery.item2": {
      es: "Participación en «IEEE Education Society Initiative #26: Robotics For The Streets: Open-Source Robotics for Academics and The Community».",
      en: "Participation in ‘IEEE Education Society Initiative #26: Robotics For The Streets: Open-Source Robotics for Academics and The Community’."
    },
    "gallery.item3": {
      es: "HMI con pantalla táctil y PLC simulando un parqueadero de un solo puesto.",
      en: "An HMI with touch screen and PLC, simulating a single-seat parking lot."
    },
    "gallery.item4": {
      es: "Mi primera vez programando un robot UR de Universal Robots.",
      en: "My first time programming a UR robot from Universal Robots."
    },
    "gallery.item5": {
      es: "Puente H para el control de dirección de un motor.",
      en: "H-bridge for motor direction control."
    },
    "gallery.item6": {
      es: "Robot UR de Universal Robots conectando el circuito de una bombilla y encendiéndola.",
      en: "A UR robot from Universal Robots connecting a light bulb circuit and turning it on."
    },

    /* --- Curso: Estadística General --- */
    "page.stats.title": {
      es: "Estadística General — Andrés F. Puerta",
      en: "General Statistics — Andrés F. Puerta"
    },
    "stats.heading": { es: "Estadística General", en: "General Statistics" },
    "stats.subtitle": {
      es: "Simuladores de parcial y archivos del curso",
      en: "Midterm simulators and course files"
    },
    "stats.simulators": { es: "Simuladores de parcial", en: "Midterm simulators" },
    "stats.files": { es: "Archivos del curso", en: "Course files" },
    "stats.openSimulator": { es: "Abrir simulador", en: "Open simulator" },
    "stats.p1": { es: "Primer parcial", en: "First midterm" },
    "stats.p1.desc": {
      es: "Estadística descriptiva, tablas de frecuencia y medidas de tendencia central.",
      en: "Descriptive statistics, frequency tables and measures of central tendency."
    },
    "stats.p2": { es: "Segundo parcial", en: "Second midterm" },
    "stats.p2.desc": {
      es: "Probabilidad, combinatoria y distribuciones discretas.",
      en: "Probability, combinatorics and discrete distributions."
    },
    "stats.p3": { es: "Tercer parcial", en: "Third midterm" },
    "stats.p3.desc": {
      es: "Distribuciones continuas, normal y teorema del límite central.",
      en: "Continuous distributions, the normal distribution and the central limit theorem."
    },
    "stats.p4": { es: "Cuarto parcial", en: "Fourth midterm" },
    "stats.p4.desc": {
      es: "Inferencia estadística, pruebas de hipótesis y regresión.",
      en: "Statistical inference, hypothesis testing and regression."
    },
    "stats.week": { es: "Clase semana", en: "Class week" },

    /* --- Curso: Pensamiento Computacional --- */
    "compthinking.book": { es: "Libro guía", en: "Course textbook" },
    "compthinking.openBook": { es: "Abrir el libro", en: "Open textbook" },
    "compthinking.material": { es: "Material de clase", en: "Class material" },
    "compthinking.week": { es: "Semana", en: "Week" },

    /* --- Cursos en preparación --- */
    "course.pending.heading": {
      es: "Contenido en preparación",
      en: "Content in preparation"
    },
    "course.pending.text": {
      es: "El material de este curso se publicará próximamente. Vuelve pronto.",
      en: "The material for this course will be published soon. Check back later."
    },

    /* --- 404 --- */
    "page.404.title": {
      es: "Página no encontrada — Andrés F. Puerta",
      en: "Page not found — Andrés F. Puerta"
    },
    "notfound.heading": { es: "Página no encontrada", en: "Page not found" },
    "notfound.text": {
      es: "La dirección que buscas no existe o cambió de lugar.",
      en: "The address you are looking for does not exist or has moved."
    },
    "notfound.cta": { es: "Ir al inicio", en: "Go to the home page" }
  };

  /* ---------- Motor ---------- */
  function detect() {
    var saved = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* almacenamiento no disponible */
    }
    if (SUPPORTED.indexOf(saved) !== -1) return saved;

    var browser =
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      DEFAULT;
    return String(browser).toLowerCase().indexOf("es") === 0 ? "es" : "en";
  }

  var current = detect();

  function t(key, lang) {
    var entry = dict[key];
    if (!entry) return null;
    return entry[lang || current] != null ? entry[lang || current] : entry[DEFAULT];
  }

  function applyTo(root) {
    var scope = root || document;

    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = t(el.getAttribute("data-i18n"));
      if (value != null) el.innerHTML = value;
    });

    // data-i18n-attr="placeholder:common.search;aria-label:nav.main"
    scope.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr")
        .split(";")
        .forEach(function (pair) {
          var parts = pair.split(":");
          if (parts.length !== 2) return;
          var value = t(parts[1].trim());
          if (value != null) el.setAttribute(parts[0].trim(), value);
        });
    });
  }

  function set(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    current = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* almacenamiento no disponible */
    }
    document.documentElement.setAttribute("lang", lang);
    applyTo(document);
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.setAttribute(
        "aria-pressed",
        btn.getAttribute("data-lang") === lang ? "true" : "false"
      );
    });
    document.dispatchEvent(
      new CustomEvent("afp:languagechange", { detail: { lang: lang } })
    );
  }

  window.I18N = {
    t: t,
    apply: applyTo,
    set: set,
    get lang() {
      return current;
    },
    supported: SUPPORTED
  };

  // Fija el atributo lang lo antes posible para evitar parpadeo
  document.documentElement.setAttribute("lang", current);

  document.addEventListener("DOMContentLoaded", function () {
    set(current);
  });
})();
