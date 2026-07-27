/* ============================================================
   gallery.js — Reproduce o pausa el video al hacer clic en él
   ============================================================ */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".gallery-item").forEach(function (item) {
      var media = item.querySelector("video");
      if (!media) return;

      item.addEventListener("click", function () {
        if (media.paused) {
          media.play();
        } else {
          media.pause();
        }
      });
    });
  });
})();
