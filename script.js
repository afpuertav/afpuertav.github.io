const mediaItems = [
    { type: 'image', src: "gallery/image1.jpg", caption: "A CNC routing machine with 2 coupled degrees of freedom. It is a 7-bar mechanism with 2 parallel prismatic pair" },
    { type: 'image', src: "gallery/image2.jpg", caption: "Participation in 'IEEE Education Society Initiative #26 : Robotics For The Streets: Open-Source Robotics for Academics and The Community'" },
    
    { type: 'video', src: "gallery/video1.mp4", caption: "An HMI with touch screen and PLC. In this case, simulating a single-seat parking lot" },
    { type: 'video', src: "gallery/video2.mp4", caption: "My first time programming a URe Universal Robots" },
    { type: 'video', src: "gallery/video3.mp4", caption: "H-bridge for motor direction control"},
    { type: 'video', src: "gallery/video4.mp4", caption: "URe of Universal Robots connecting the circuit of a light bulb and turning it on"},
];

let lastIndex = -1;
let carouselInterval;
let imageTimeout;

function getRandomIndex() {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * mediaItems.length);
    } while (randomIndex === lastIndex);

    lastIndex = randomIndex;
    return randomIndex;
}

function updateCarousel() {
    const mediaElement = document.getElementById("carousel-image");
    const videoElement = document.getElementById("carousel-video");
    const captionElement = document.getElementById("carousel-caption");

    const randomIndex = getRandomIndex();
    const { type, src, caption } = mediaItems[randomIndex];

    videoElement.style.display = 'none';
    mediaElement.style.display = 'none';

    if (type === 'image') {
        mediaElement.src = src;
        mediaElement.style.display = 'block';
        captionElement.textContent = caption;

        clearTimeout(imageTimeout);  
        imageTimeout = setTimeout(updateCarousel, 7000);

    } else if (type === 'video') {
        videoElement.src = src;
        videoElement.muted = true;
        videoElement.style.display = 'block';
        captionElement.textContent = caption;

        clearInterval(carouselInterval);

        videoElement.play();

        videoElement.onended = function() {
            videoElement.pause();
            videoElement.currentTime = 0;
            updateCarousel();
        };
    }
}

carouselInterval = setInterval(updateCarousel, 7000);

const carousel = document.getElementById("carousel");

carousel.addEventListener("mouseenter", () => {
    clearInterval(carouselInterval);
    clearTimeout(imageTimeout);
});

carousel.addEventListener("mouseleave", () => {
    carouselInterval = setInterval(updateCarousel, 7000);
});

window.onload = updateCarousel;