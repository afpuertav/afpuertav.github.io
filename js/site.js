/* ============================================================
   site.js — Comportamiento común a todas las páginas
   · Menú hamburguesa accesible
   · Conmutador de idioma ES/EN
   · Año dinámico en el pie de página
   ============================================================ */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* ---------- Menú responsive ---------- */
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");

    if (toggle && nav) {
      var closeNav = function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      };

      toggle.addEventListener("click", function () {
        var isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      // Cierra al elegir un enlace o al pulsar Escape
      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeNav);
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && nav.classList.contains("is-open")) {
          closeNav();
          toggle.focus();
        }
      });

      // Si se agranda la ventana, se restablece el estado
      window.addEventListener("resize", function () {
        if (window.innerWidth > 900) closeNav();
      });
    }

    /* ---------- Conmutador de idioma ---------- */
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (window.I18N) window.I18N.set(btn.getAttribute("data-lang"));
      });
    });

    /* ---------- Año del pie de página ---------- */
    document.querySelectorAll("[data-current-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  });
})();
