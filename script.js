
// Navbar
const toggleBtn = document.querySelector('.toggle-btn');
const mobileToggleBtn = document.querySelector('.mobile-toggle');
const navbar = document.querySelector('.navbar');

toggleBtn.addEventListener('click', () => {
    if (!navbar.classList.contains('active')) {
        // Buka navbar
        navbar.classList.add('active');
        navbar.classList.remove('closing');
        toggleBtn.textContent = 'X Close';
    } else {
        // Tutup navbar
        navbar.classList.add('closing');
        navbar.classList.remove('active');
        toggleBtn.textContent = '☰ Menu';
    }
});

mobileToggleBtn.addEventListener('click', () => {
    if (navbar.classList.contains('active')) {
        mobileToggleBtn.classList.remove('active');
        navbar.classList.add('closing');
        navbar.classList.remove('active');
    } else {
        mobileToggleBtn.classList.add('active');
        navbar.classList.add('active');
        navbar.classList.remove('closing');
    }
});
// Dark Mode
let darkmode = localStorage.getItem("darkmode");
const themeswitch = document.getElementById('theme-switch');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
    themeswitch.textContent = "⏾";
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
    themeswitch.textContent = "☀";
}

if (darkmode === 'active') enableDarkmode();

themeswitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});
// Add some interactive sparkle effects
document.addEventListener('mousemove', function (e) {
    if (Math.random() < 0.1) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.fontSize = '12px';
    sparkle.style.animation = 'sparkleMove 1s ease-out forwards';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add click effects to dessert items
document.querySelectorAll('.dessert-item').forEach(item => {
    item.addEventListener('click', function () {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Add click effect to CTA button
document.querySelector('.cta-button').addEventListener('click', function () {
    // Create multiple sparkles around button
    const rect = this.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const angle = (i * 45) * Math.PI / 180;
            const distance = 50;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            createSparkle(x, y);
        }, i * 50);
    }
});

// Add gentle shake animation to cute cat on click
document.querySelector('.cute-cat').addEventListener('click', function () {
    this.style.animation = 'shake 0.5s ease-in-out';

    setTimeout(() => {
        this.style.animation = '';
    }, 500);
});

// Add shake keyframe animation to CSS dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg) scale(1.1); }
        75% { transform: rotate(5deg) scale(1.1); }
    }
`;
document.head.appendChild(shakeStyle);

// Add page load animation
window.addEventListener('load', function () {
    document.querySelector('.container').style.opacity = '0';
    document.querySelector('.container').style.transform = 'translateY(30px)';
    document.querySelector('.container').style.transition = 'all 1s ease-out';

    setTimeout(() => {
        document.querySelector('.container').style.opacity = '1';
        document.querySelector('.container').style.transform = 'translateY(0)';
    }, 100);

    // Animate floating elements entrance
    document.querySelectorAll('.floating-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0)';
        item.style.transition = 'all 0.5s ease-out';

        setTimeout(() => {
            item.style.opacity = '0.3';
            item.style.transform = 'scale(1)';
        }, 500 + index * 100);
    });
});

// Add double click effect to character circle
document.querySelector('.character-circle').addEventListener('dblclick', function () {
    // Create sparkle explosion
    const rect = this.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const angle = (i * 30) * Math.PI / 180;
            const distance = 80 + Math.random() * 40;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            createSparkle(x, y);
        }, i * 25);
    }

    // Add bounce effect to character
    this.style.transform = 'scale(1.1)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
});

// Add hover effect to logo
document.querySelector('.logo').addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.05)';
    this.style.transition = 'transform 0.3s ease';
});

document.querySelector('.logo').addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
});

// Add random sparkle generation every few seconds
setInterval(() => {
    if (Math.random() < 0.3) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createSparkle(x, y);
    }
}, 3000);

// Add scroll effect for floating elements
window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    document.querySelectorAll('.floating-item').forEach((item, index) => {
        const speed = 0.5 + (index * 0.1);
        item.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// Add touch support for mobile
document.addEventListener('touchstart', function (e) {
    if (e.touches.length === 1) {
        const touch = e.touches[0];
        if (Math.random() < 0.3) {
            createSparkle(touch.clientX, touch.clientY);
        }
    }
});

// Add celebration effect when ORDER NOW is clicked
document.querySelector('.cta-button').addEventListener('click', function (e) {
    e.preventDefault();

    // Change button text temporarily
    const originalText = this.textContent;
    this.textContent = '✨ AMAZING! ✨';
    this.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';

    setTimeout(() => {
        this.textContent = originalText;
        this.style.background = 'linear-gradient(135deg, #FF69B4, #FFB6C1)';
    }, 2000);

    // Add screen shake effect
    document.body.style.animation = 'screenShake 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
});

// Add screen shake keyframe
const screenShakeStyle = document.createElement('style');
screenShakeStyle.textContent = `
    @keyframes screenShake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
        20%, 40%, 60%, 80% { transform: translateX(2px); }
    }
`;
document.head.appendChild(screenShakeStyle);