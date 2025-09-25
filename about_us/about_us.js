const carousel = document.querySelector('.circle-carousel');
const circles = document.querySelectorAll('.outer-circle');

const radius = 300; // Distance from center
let angleStep = (2 * Math.PI) / circles.length;
let currentRotation = Math.PI;
let targetRotation = currentRotation;
let isAnimating = false;
let rotationSpeed = 0.05;

function positionCircles() {
  circles.forEach((circle, index) => {
    const angle = index * angleStep + currentRotation;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    circle.style.left = `${50 + (x / radius) * 50}%`;
    circle.style.top = `${50 + (y / radius) * 50}%`;

    let normalizedAngle = (angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);

    const diffFromLeft = Math.abs(normalizedAngle - Math.PI);
    const maxScale = 1.6; // largest at center
    const minScale = 0.6; // smallest at back
    const scaleFactor = minScale + (maxScale - minScale) * Math.cos(diffFromLeft) ** 2;

    circle.style.transform = `scale(${scaleFactor})`;
    circle.style.opacity = diffFromLeft > Math.PI / 2 ? 0 : 1;
  });
}

function animateRotation() {
  if (!isAnimating) return;

  const distance = targetRotation - currentRotation;
  if (Math.abs(distance) < 0.01) {
    currentRotation = targetRotation; // snap to exact target
    isAnimating = false;
    positionCircles();

    // Wait before rotating again
    setTimeout(() => {
      startNextRotation();
    }, 3000); // Wait 3 seconds before next step
    return;
  }

  currentRotation += distance * rotationSpeed;
  positionCircles();
  requestAnimationFrame(animateRotation);
}

function startNextRotation() {
  targetRotation += angleStep; // move to next step clockwise
  isAnimating = true;
  requestAnimationFrame(animateRotation);
}

// Initial positioning
positionCircles();

// Start first rotation after a short delay
setTimeout(startNextRotation, 1000);