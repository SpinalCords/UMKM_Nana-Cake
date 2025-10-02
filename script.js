// ===== INTRO ANIMATION SCRIPT =====
const teksHeader = document.getElementById('teksHeader');
const cloudBase = document.getElementById('cloudBase');
const cupcake = document.getElementById('cupcake');
const homepage = document.getElementById('homepage');
const homebg = document.getElementById('homebg');
const toggleBtnIntro = document.getElementById('toggleBtn');
const mobileToggleIntro = document.getElementById('mobileToggle');
const navContainer = document.getElementById('navContainer');
const navbarIntro = document.getElementById('navbar');
const themeSwitchIntro = document.getElementById('theme-switch');

let isNavOpenIntro = false;

// Animation sequence
document.addEventListener('DOMContentLoaded', function () {
    // Prevent scrolling during intro animation
    document.body.style.overflow = 'hidden';

    // Show intro animation
    setTimeout(() => {
        teksHeader.classList.add('show');
    }, 100);

    setTimeout(() => {
        cloudBase.classList.add('show');
    }, 300);

    setTimeout(() => {
        cupcake.classList.add('show');
    }, 800);

    // Hide intro animation and show main content
    setTimeout(() => {
        cupcake.classList.remove('show');
        cloudBase.classList.remove('show');
        teksHeader.classList.add('hidden');

        // Hide homepage overlay
        setTimeout(() => {
            homepage.classList.add('hide');

            // Show main content
            homebg.classList.add('show');
            toggleBtnIntro.classList.add('show');
            mobileToggleIntro.classList.add('show');
            themeSwitchIntro.classList.add('show');
            navContainer.classList.add('show');

            // Allow scrolling after intro animation
            document.body.style.overflow = 'auto';

            // Initialize main JavaScript after intro animation
            initMainScript();
        }, 500);
    }, 4000);
});

// Toggle menu functionality for intro
function toggleMenuIntro() {
    if (!isNavOpenIntro) {
        navbarIntro.classList.add('active');
        navbarIntro.classList.remove('closing');
        toggleBtnIntro.textContent = '✕ Close';
        mobileToggleIntro.classList.add('active');
        isNavOpenIntro = true;
    } else {
        navbarIntro.classList.add('closing');
        navbarIntro.classList.remove('active');
        toggleBtnIntro.textContent = '☰ Menu';
        mobileToggleIntro.classList.remove('active');

        setTimeout(() => {
            navbarIntro.classList.remove('closing');
        }, 400);

        isNavOpenIntro = false;
    }
}

// Event listeners for intro
toggleBtnIntro.addEventListener('click', toggleMenuIntro);
mobileToggleIntro.addEventListener('click', toggleMenuIntro);

// Close menu when clicking nav items
const navItemsIntro = document.querySelectorAll('.nav-item');
navItemsIntro.forEach(item => {
    item.addEventListener('click', () => {
        if (isNavOpenIntro) {
            toggleMenuIntro();
        }
    });
});

// Close menu when clicking outside (for mobile)
document.addEventListener('click', function (event) {
    if (isNavOpenIntro &&
        !navbarIntro.contains(event.target) &&
        !toggleBtnIntro.contains(event.target) &&
        !mobileToggleIntro.contains(event.target)) {
        toggleMenuIntro();
    }
});

// ===== MAIN SCRIPT (FROM ORIGINAL JS) =====
function initMainScript() {
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

    // Dark Mode (Modified to work without localStorage)
    const themeswitch = document.getElementById('theme-switch');

    const enableDarkmode = () => {
        document.body.classList.add('darkmode');
        themeswitch.textContent = "⏾";
    }

    const disableDarkmode = () => {
        document.body.classList.remove('darkmode');
        themeswitch.textContent = "☀";
    }

    themeswitch.addEventListener("click", () => {
        const isDarkmode = document.body.classList.contains('darkmode');
        !isDarkmode ? enableDarkmode() : disableDarkmode();
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

    // Add click effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function () {
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

            // Change button text temporarily
            const originalText = this.textContent;
            this.textContent = '✨ NOW ✨';
            this.style.background = 'linear-gradient(135deg, #fbd4e7ff, #FFB6C1)';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = 'linear-gradient(135deg, #FF69B4, #FFB6C1)';
            }, 2000);
        });
    }

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

    // Add hover effect to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        logo.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    }

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

    // Add screen shake keyframe
    const screenShakeStyle = document.createElement('style');
    screenShakeStyle.textContent = `
                
                @keyframes sparkleMove {
                    0% {
                        opacity: 1;
                        transform: translateY(0px) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-30px) scale(0.5);
                    }
                }
            `;
    document.head.appendChild(screenShakeStyle);
}

// ===== PAKET SECTION INTERACTIVITY =====
document.addEventListener('DOMContentLoaded', () => {
    const paketButtons = document.querySelectorAll('.paket-btn');

    paketButtons.forEach(button => {
        button.addEventListener('click', () => {
            const paketItem = button.closest('.paket-item');
            const details = paketItem.querySelector('.paket-details');
            const isHidden = details.hasAttribute('hidden');

            // Hide all other paket details
            document.querySelectorAll('.paket-details').forEach(d => {
                d.setAttribute('hidden', '');
            });

            if (isHidden) {
                details.removeAttribute('hidden');
                // Add animation class for smooth reveal
                details.style.animation = 'slideDown 0.3s ease-out';
            } else {
                details.setAttribute('hidden', '');
            }

            // Add visual feedback
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('paket-item')) {
                const button = focusedElement.querySelector('.paket-btn');
                if (button) {
                    button.click();
                    e.preventDefault();
                }
            }
        }
    });

    // Add hover effects for better interactivity
    const paketItems = document.querySelectorAll('.paket-item');
    paketItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.02)';
            item.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
    });
});

// CSS animation for details reveal
const paketStyle = document.createElement('style');
paketStyle.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .paket-details {
        margin-top: 15px;
        padding: 10px;
        background: var(--bg2);
        border-radius: 10px;
        border: 1px solid var(--border);
        font-size: var(--fontS);
        color: var(--text2);
        transition: all 0.3s ease;
    }

    .paket-details[hidden] {
        display: none;
    }
`;
document.head.appendChild(paketStyle);
