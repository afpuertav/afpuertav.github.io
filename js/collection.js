/* ============================================================
   collection.js — Renderiza listas con búsqueda y orden
   Comparte la lógica de publicaciones, presentaciones y blog.

   Cada elemento admite:
     { date: "2026-02-14" | null,   // ISO; null si aún no aplica
       statusKey: "publications.status.working",  // usado si no hay fecha
       link: "ruta.html",
       external: true|false,
       title:   { es: "...", en: "..." } | "texto único",
       excerpt: { es: "...", en: "..." } | "texto único",
       meta:    { es: "...", en: "..." },   // línea secundaria opcional
       ctaKey:  "presentations.openSlides", // opcional
       tags: ["NLP", "Python"] }
   ============================================================ */
(function () {
  "use strict";

  function pick(value, lang) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    return value[lang] != null ? value[lang] : value.en || value.es || "";
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char];
    });
  }

  function formatDate(iso, lang) {
    var parsed = new Date(iso);
    if (isNaN(parsed.getTime())) return iso;
    return parsed.toLocaleDateString(lang === "es" ? "es-CO" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    });
  }

  function mount(options) {
    var container = document.querySelector(options.container);
    if (!container) return;

    var searchInput = options.search
      ? document.querySelector(options.search)
      : null;
    var sortSelect = options.sort ? document.querySelector(options.sort) : null;
    var items = options.items || [];

    function currentLang() {
      return window.I18N ? window.I18N.lang : "en";
    }

    function translate(key) {
      return (window.I18N && window.I18N.t(key)) || "";
    }

    function render() {
      var lang = currentLang();
      var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
      var mode = sortSelect ? sortSelect.value : "date-desc";

      var visible = items.filter(function (item) {
        if (!query) return true;
        var haystack = [
          pick(item.title, lang),
          pick(item.excerpt, lang),
          (item.tags || []).join(" ")
        ]
          .join(" ")
          .toLowerCase();
        return haystack.indexOf(query) !== -1;
      });

      visible = visible.slice().sort(function (a, b) {
        var titleA = pick(a.title, lang);
        var titleB = pick(b.title, lang);
        var timeA = a.date ? new Date(a.date).getTime() : -Infinity;
        var timeB = b.date ? new Date(b.date).getTime() : -Infinity;

        switch (mode) {
          case "date-asc":
            return timeA - timeB;
          case "title-asc":
            return titleA.localeCompare(titleB, lang);
          case "title-desc":
            return titleB.localeCompare(titleA, lang);
          default:
            return timeB - timeA;
        }
      });

      if (!visible.length) {
        container.innerHTML =
          '<p class="empty-state">' +
          escapeHtml(translate("common.noResults")) +
          "</p>";
        return;
      }

      container.innerHTML = visible
        .map(function (item) {
          var title = escapeHtml(pick(item.title, lang));
          var excerpt = escapeHtml(pick(item.excerpt, lang));
          var dateLine = item.date
            ? formatDate(item.date, lang)
            : item.statusKey
              ? translate(item.statusKey)
              : "";
          var metaLine = item.meta ? escapeHtml(pick(item.meta, lang)) : "";

          var heading = item.link
            ? '<h2><a href="' +
              escapeHtml(item.link) +
              '"' +
              (item.external ? ' target="_blank" rel="noopener"' : "") +
              ">" +
              title +
              "</a></h2>"
            : "<h2>" + title + "</h2>";

          var tags = (item.tags || []).length
            ? '<div class="post-tags">' +
              item.tags
                .map(function (tag) {
                  return '<span class="tag">' + escapeHtml(tag) + "</span>";
                })
                .join("") +
              "</div>"
            : "";

          var cta =
            item.ctaKey && item.link
              ? '<p style="margin:1rem 0 0"><a class="card-cta" href="' +
                escapeHtml(item.link) +
                '"' +
                (item.external ? ' target="_blank" rel="noopener"' : "") +
                ">" +
                escapeHtml(translate(item.ctaKey)) +
                "</a></p>"
              : "";

          return (
            '<article class="post">' +
            heading +
            (metaLine || dateLine
              ? '<p class="post-date">' +
                [metaLine, dateLine].filter(Boolean).join(" · ") +
                "</p>"
              : "") +
            (excerpt ? '<p class="post-excerpt">' + excerpt + "</p>" : "") +
            tags +
            cta +
            "</article>"
          );
        })
        .join("");
    }

    if (searchInput) searchInput.addEventListener("input", render);
    if (sortSelect) sortSelect.addEventListener("change", render);
    document.addEventListener("afp:languagechange", render);

    render();
  }

  window.Collection = { mount: mount };
})();
