const carousel = document.querySelector('.circle-carousel'); 
const circles = document.querySelectorAll('.outer-circle');

const radius = 300;
let angleStep = (2 * Math.PI) / circles.length;
let currentRotation = Math.PI;
let targetRotation = currentRotation;
let isAnimating = false;
let rotationSpeed = 0.05;

function smoothstep(x) {
  return x * x * (3 - 2 * x);
}

function positionCircles() {
  circles.forEach((circle, index) => {
    const angle = index * angleStep + currentRotation;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    circle.style.left = `${50 + (x / radius) * 50}%`;
    circle.style.top = `${50 + (y / radius) * 50}%`;

    let normalizedAngle = (angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    const diffFromLeft = Math.abs(normalizedAngle - Math.PI);

    const maxScale = 1.4;
    const minScale = 0.6;
    const t = Math.min(diffFromLeft / (Math.PI / 2), 1);
    const smooth = 1 - smoothstep(t);

    const scaleFactor = minScale + (maxScale - minScale) * smooth;

    circle.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
    circle.style.opacity = t >= 1 ? 0 : 1;
  });
}

function animateRotation() {
  if (!isAnimating) return;

  const distance = targetRotation - currentRotation;
  if (Math.abs(distance) < 0.01) {
    currentRotation = targetRotation;
    isAnimating = false;
    positionCircles();

    setTimeout(() => {
      startNextRotation();
    }, 3000);
    return;
  }

  currentRotation += distance * rotationSpeed;
  positionCircles();
  requestAnimationFrame(animateRotation);
}

function startNextRotation() {
  targetRotation += angleStep;
  isAnimating = true;
  requestAnimationFrame(animateRotation);
}

circles.forEach(circle => {
  circle.style.transition = "transform 0.3s ease, opacity 0.3s ease";
});

positionCircles();
setTimeout(startNextRotation, 1000);

// ----- NEW CLICK HANDLING -----
const welcomeText = document.getElementById("welcome-text");
const circleInfo = document.getElementById("circle-info");
const circleTitle = document.getElementById("circle-title");
const circleDescription = document.getElementById("circle-description");
const backBtn = document.getElementById("back-btn");

circles.forEach(circle => {
  circle.addEventListener("click", () => {
    circles.forEach(c => c.classList.remove("active"));
    circle.classList.add("active");

    circleTitle.textContent = circle.dataset.title;
    circleDescription.textContent = circle.dataset.description;

    welcomeText.classList.add("hidden");
    circleInfo.classList.remove("hidden");
  });
});

backBtn.addEventListener("click", () => {
  circles.forEach(c => c.classList.remove("active"));
  circleInfo.classList.add("hidden");
  welcomeText.classList.remove("hidden");
});