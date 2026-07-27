/* ============================================================
   home.js — Carrusel de la página de inicio y mapa de visitantes
   ============================================================ */
(function () {
  "use strict";

  var mediaItems = [
    { type: "image", src: "gallery/image1.jpg", captionKey: "gallery.item1" },
    { type: "image", src: "gallery/image2.jpg", captionKey: "gallery.item2" },
    { type: "video", src: "gallery/video1.mp4", captionKey: "gallery.item3" },
    { type: "video", src: "gallery/video2.mp4", captionKey: "gallery.item4" },
    { type: "video", src: "gallery/video3.mp4", captionKey: "gallery.item5" },
    { type: "video", src: "gallery/video4.mp4", captionKey: "gallery.item6" }
  ];

  var SLIDE_MS = 7000;
  var lastIndex = -1;
  var timer = null;
  var paused = false;

  function randomIndex() {
    if (mediaItems.length < 2) return 0;
    var index;
    do {
      index = Math.floor(Math.random() * mediaItems.length);
    } while (index === lastIndex);
    lastIndex = index;
    return index;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var carousel = document.getElementById("carousel");
    if (!carousel) return;

    var imageEl = document.getElementById("carousel-image");
    var videoEl = document.getElementById("carousel-video");
    var captionEl = document.getElementById("carousel-caption");

    function caption(key) {
      return (window.I18N && window.I18N.t(key)) || "";
    }

    function schedule(delay) {
      window.clearTimeout(timer);
      if (!paused) timer = window.setTimeout(next, delay);
    }

    function next() {
      var item = mediaItems[randomIndex()];

      imageEl.style.display = "none";
      videoEl.style.display = "none";
      videoEl.onended = null;
      videoEl.pause();

      captionEl.textContent = caption(item.captionKey);
      captionEl.setAttribute("data-caption-key", item.captionKey);

      if (item.type === "image") {
        imageEl.src = item.src;
        imageEl.alt = caption(item.captionKey);
        imageEl.style.display = "block";
        schedule(SLIDE_MS);
      } else {
        window.clearTimeout(timer);
        videoEl.src = item.src;
        videoEl.muted = true;
        videoEl.playsInline = true;
        videoEl.style.display = "block";
        var attempt = videoEl.play();
        if (attempt && typeof attempt.catch === "function") {
          attempt.catch(function () {
            schedule(SLIDE_MS);
          });
        }
        videoEl.onended = function () {
          videoEl.currentTime = 0;
          next();
        };
      }
    }

    carousel.addEventListener("mouseenter", function () {
      paused = true;
      window.clearTimeout(timer);
    });

    carousel.addEventListener("mouseleave", function () {
      paused = false;
      schedule(SLIDE_MS);
    });

    // Mantiene el pie de foto en el idioma activo
    document.addEventListener("afp:languagechange", function () {
      var key = captionEl.getAttribute("data-caption-key");
      if (key) {
        captionEl.textContent = caption(key);
        if (imageEl.style.display === "block") imageEl.alt = caption(key);
      }
    });

    next();

    /* ---------- Mapa de visitantes ---------- */
    // El mensaje de respaldo desaparece cuando el proveedor del mapa inyecta
    // algo en el contenedor. Cuenta cualquier elemento que no sea <script>:
    // MapMyVisitors dibuja con <div> y background-image, sin usar <img>, asi
    // que buscar una imagen concreta no sirve. Si el widget nunca aparece,
    // el aviso se queda y no deja un hueco en blanco.
    var embed = document.getElementById("visitor-map-embed");
    var fallback = document.getElementById("visitor-map-fallback");
    if (embed && fallback) {
      var widgetPresente = function () {
        var hijos = embed.children;
        for (var i = 0; i < hijos.length; i++) {
          if (hijos[i].tagName !== "SCRIPT") return true;
        }
        return false;
      };

      var check = function () {
        if (widgetPresente()) {
          fallback.style.display = "none";
          return true;
        }
        return false;
      };

      if (!check()) {
        [500, 1500, 4000, 8000].forEach(function (delay) {
          window.setTimeout(check, delay);
        });
      }
    }
  });
})();
