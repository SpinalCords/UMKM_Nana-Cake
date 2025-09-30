console.log('JS loaded');
const carousel = document.querySelector('.circle-carousel');
const circles = document.querySelectorAll('.outer-circle');
console.log('Carousel:', carousel);
console.log('Circles:', circles);

const radius = 250;
let angleStep = (2 * Math.PI) / circles.length;
let currentRotation = Math.PI;

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

    // Reset to normal scale
    circle.style.transform = `translate(-50%, -50%) scale(1)`;
  });
}





circles.forEach(circle => {
  circle.style.transition = "all 1s ease";
});

positionCircles();

let isAnimating = false;

function highlightLeftCircle() {
  circles.forEach((circle, index) => {
    const angle = index * angleStep + currentRotation;
    let normalizedAngle = (angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    const diffFromLeft = Math.abs(normalizedAngle - Math.PI);

    if (diffFromLeft < Math.PI / 6) { // If close to left position, highlight
      circle.style.transform = `translate(-50%, -50%) scale(1.5)`;
    } else {
      circle.style.transform = `translate(-50%, -50%) scale(1)`;
    }
  });
}

function animateRotation() {
  console.log('Animating rotation');
  if (isAnimating) return;
  isAnimating = true;

  // Rotate by one step
  currentRotation += angleStep;

  // Position circles to new positions
  positionCircles();

  // After animation, highlight and wait
  setTimeout(() => {
    highlightLeftCircle();
    setTimeout(() => {
      // Reset highlight
      circles.forEach(circle => {
        circle.style.transform = `translate(-50%, -50%) scale(1)`;
      });
      isAnimating = false;
    }, 2500); // 2.5 seconds highlight
  }, 1000); // Wait for position animation to finish
}

// Start automatic animation every 5 seconds
setInterval(animateRotation, 5000);

// Modal functionality
const modal = document.getElementById('image-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeBtn = document.getElementsByClassName('close')[0];

circles.forEach(circle => {
  circle.addEventListener('click', () => {
    const title = circle.getAttribute('data-title');
    const description = circle.getAttribute('data-description');
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.style.display = 'flex';
    // Trigger animation after display
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  });
});

closeBtn.onclick = () => {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
};

