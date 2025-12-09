// Image carousel functionality with swipe support
const images = [
    'gambar/BOLUFINAL/kue (1).jpg',
    'gambar/BOLUFINAL/cookies/cookiessusu.jpg',
    'gambar/BOLUFINAL/kue (2).jpg',
    'gambar/BOLUFINAL/lainnya/rabukayam.jpg'
];

let currentIndex = 0;
const carouselImage = document.getElementById('carousel-image');
const carousel = document.querySelector('.carousel');

// Touch variables for swipe detection
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;

// Function to update the carousel image
function updateCarousel(direction) {
    // Remove any existing animation classes
    carouselImage.classList.remove('slide-in-left', 'slide-in-right');

    // Force reflow to restart animation
    void carouselImage.offsetWidth;

    // Add the appropriate animation class
    if (direction === 'next') {
        carouselImage.classList.add('slide-in-left');
    } else if (direction === 'prev') {
        carouselImage.classList.add('slide-in-right');
    }

    // Update the image source
    carouselImage.src = images[currentIndex];

    // Remove the animation class after animation completes
    setTimeout(() => {
        carouselImage.classList.remove('slide-in-left', 'slide-in-right');
    }, 500); // Match the animation duration
}



// Touch event handlers for swipe functionality
carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    isSwiping = true;
});

carousel.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    e.preventDefault(); // Prevent scrolling while swiping
});

carousel.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    isSwiping = false;
});

// Function to handle swipe gestures
function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for swipe recognition
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe left - next image
            nextImage();
        } else {
            // Swipe right - previous image
            prevImage();
        }
    }
}

// Function to update dots
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Function to go to next image
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel('next');
    updateDots();
}

// Function to go to previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel('prev');
    updateDots();
}

// Initialize carousel
updateCarousel();
updateDots();

// Auto-cycle every 3 seconds
setInterval(nextImage, 3000);
