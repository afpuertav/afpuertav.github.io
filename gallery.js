document.addEventListener("DOMContentLoaded", function() {
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const media = item.querySelector("img, video");
            if (media.tagName === "VIDEO") {
                if (media.paused) {
                    media.play();
                } else {
                    media.pause();
                }
            }
        });
    });
});