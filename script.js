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

// Save scroll position before refresh/unload
window.addEventListener('beforeunload', function () {
    localStorage.setItem('scrollPosition', window.scrollY);
});

// Animation sequence
document.addEventListener('DOMContentLoaded', function () {
    // Get saved scroll position
    const savedScrollPosition = parseInt(localStorage.getItem('scrollPosition')) || 0;

    // Disable browser scroll restoration to ensure we control it
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Scroll to top immediately to ensure animation is visible regardless of current scroll position
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Reset all animation states to ensure fresh start on every page load/refresh
    teksHeader.classList.remove('show', 'hidden');
    cloudBase.classList.remove('show');
    cupcake.classList.remove('show');
    homepage.classList.remove('hide');
    homebg.classList.remove('show');
    toggleBtnIntro.classList.remove('show');
    mobileToggleIntro.classList.remove('show');
    themeSwitchIntro.classList.remove('show');
    navContainer.classList.remove('show');

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

            // Scroll back to the saved position after animation
            setTimeout(() => {
                window.scrollTo({ top: savedScrollPosition, left: 0, behavior: 'instant' });
            }, 100);

            // Set visibility hidden after fade out transition
            setTimeout(() => {
                homepage.style.visibility = 'hidden';
            }, 1500);

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

// ===== ORDER NOW SECTION INTERACTIVITY =====
document.addEventListener('DOMContentLoaded', () => {
    // Enhanced particle animation for order now section
    const orderParticlesContainer = document.getElementById('orderParticles');
    if (orderParticlesContainer) {
        // Create initial particles with more variety
        for (let i = 0; i < 80; i++) {
            createEnhancedParticle(orderParticlesContainer);
        }

        // Add new particles periodically with different types
        setInterval(() => {
            if (Math.random() < 0.4) {
                createEnhancedParticle(orderParticlesContainer);
            }
        }, 1500);

        // Add scroll-based parallax effect with more dynamic movement
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const section = document.querySelector('.order-now-section');
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const windowHeight = window.innerHeight;
                const scrollProgress = (scrollY - sectionTop + windowHeight) / (sectionHeight + windowHeight);

                if (scrollProgress > 0 && scrollProgress < 1) {
                    const translateY = scrollProgress * 30;
                    const rotate = scrollProgress * 5;
                    orderParticlesContainer.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
                }
            }
        });
    }

    // Enhanced interactive order button effects
    const orderBtn = document.getElementById('orderBtn');
    if (orderBtn) {
        // Magnetic effect on mouse movement
        document.addEventListener('mousemove', (e) => {
            const rect = orderBtn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);

            if (distance < 150) {
                const strength = (150 - distance) / 150;
                const moveX = (e.clientX - centerX) * strength * 0.3;
                const moveY = (e.clientY - centerY) * strength * 0.3;
                orderBtn.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + strength * 0.1})`;
            } else {
                orderBtn.style.transform = 'translate(0, 0) scale(1)';
            }
        });

        orderBtn.addEventListener('mouseenter', () => {
            // Create enhanced sparkle effect around button with different colors
            for (let i = 0; i < 16; i++) {
                setTimeout(() => {
                    const angle = (i * 22.5) * Math.PI / 180;
                    const distance = 90 + Math.random() * 20;
                    const x = orderBtn.offsetLeft + orderBtn.offsetWidth / 2 + Math.cos(angle) * distance;
                    const y = orderBtn.offsetTop + orderBtn.offsetHeight / 2 + Math.sin(angle) * distance;
                    createEnhancedSparkle(x, y, ['✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 4)]);
                }, i * 40);
            }

            // Add heartbeat animation
            orderBtn.style.animation = 'heartbeat 1s infinite';
        });

        orderBtn.addEventListener('mouseleave', () => {
            orderBtn.style.animation = '';
        });

        orderBtn.addEventListener('click', () => {
            // Enhanced click effect with multiple phases
            orderBtn.style.transform = 'scale(0.9) rotate(-2deg)';
            setTimeout(() => {
                orderBtn.style.transform = 'scale(1.1) rotate(2deg)';
                setTimeout(() => {
                    orderBtn.style.transform = 'scale(1) rotate(0deg)';
                }, 200);
            }, 100);

            // Create massive burst of enhanced sparkles
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 200 + 50;
                    const x = orderBtn.offsetLeft + orderBtn.offsetWidth / 2 + Math.cos(angle) * distance;
                    const y = orderBtn.offsetTop + orderBtn.offsetHeight / 2 + Math.sin(angle) * distance;
                    createEnhancedSparkle(x, y, ['✨', '🌟', '💫', '⭐', '🎉'][Math.floor(Math.random() * 5)]);
                }, i * 15);
            }

            // Screen shake effect
            document.body.style.animation = 'screenShake 0.5s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 500);

            // Temporary color change
            const originalBg = orderBtn.style.background;
            orderBtn.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
            setTimeout(() => {
                orderBtn.style.background = originalBg;
            }, 1000);
        });
    }

    // Enhanced floating elements interaction
    const floatingItems = document.querySelectorAll('.order-floating-item');
    floatingItems.forEach((item, index) => {
        // Add random floating animation
        item.style.animation = `floatRandom${index % 3 + 1} ${3 + Math.random() * 2}s ease-in-out infinite`;

        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.8) rotate(15deg)';
            item.style.opacity = '1';
            item.style.filter = 'brightness(1.5) drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
            item.style.opacity = '0.6';
            item.style.filter = 'none';
        });

        item.addEventListener('click', () => {
            // Create sparkles around clicked floating item
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const rect = item.getBoundingClientRect();
                    const x = rect.left + Math.random() * rect.width;
                    const y = rect.top + Math.random() * rect.height;
                    createEnhancedSparkle(x, y, '✨');
                }, i * 50);
            }
        });
    });

    // Add random sparkle generation in order section
    const orderSection = document.querySelector('.order-now-section');
    if (orderSection) {
        setInterval(() => {
            if (Math.random() < 0.2) {
                const rect = orderSection.getBoundingClientRect();
                const x = rect.left + Math.random() * rect.width;
                const y = rect.top + Math.random() * rect.height;
                createEnhancedSparkle(x, y, ['✨', '🌟'][Math.floor(Math.random() * 2)]);
            }
        }, 2000);
    }
});

// Function to create particles
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 10000);
}

// Enhanced particle creation function
function createEnhancedParticle(container) {
    const particle = document.createElement('div');
    const particleTypes = ['✨', '🌟', '💫', '⭐', '🎈', '🎊'];
    const colors = ['#FFD700', '#FF6B6B', '#FFD93D', '#FF8E8E', '#4D96FF'];

    particle.innerHTML = particleTypes[Math.floor(Math.random() * particleTypes.length)];
    particle.style.position = 'absolute';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
    particle.style.color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    particle.style.animation = `floatParticle ${Math.random() * 3 + 2}s ease-in-out infinite`;
    particle.style.opacity = Math.random() * 0.5 + 0.3;

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 5000);
}

// Enhanced sparkle creation function
function createEnhancedSparkle(x, y, emoji = '✨') {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = emoji;
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.fontSize = (Math.random() * 20 + 15) + 'px';
    sparkle.style.animation = 'enhancedSparkleMove 1.5s ease-out forwards';
    sparkle.style.opacity = '1';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1500);
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

// Halaman shop

function goToShop(productId) {
    // Fungsi untuk redirect ke halaman shop dengan product ID
    console.log('Navigasi ke halaman shop untuk:', productId);

    // Contoh redirect (uncomment dan sesuaikan dengan URL Anda):
    // window.location.href = '/shop?product=' + productId;

    // Atau bisa juga:
    // window.location.href = '/shop/' + productId;

    // Untuk demo, kita tampilkan alert
    alert('Menuju halaman shop untuk produk: ' + productId);
}

// Animasi card saat scroll
const cards = document.querySelectorAll('.product-card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';

            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

cards.forEach(card => observer.observe(card));

function goToShop(shop) {
    window.location.href = "index html";
}

// Paket
document.addEventListener('DOMContentLoaded', function () {

    const allTabButtons = document.querySelectorAll('.paket-tab-btn');

    allTabButtons.forEach(button => {
        button.addEventListener('click', () => {

            const tabId = button.getAttribute('data-tab');
            const navContainer = button.closest('.paket-tab-nav');
            const contentWrapper = navContainer.nextElementSibling;
            const targetContent = contentWrapper.querySelector('#' + tabId);

            // 1. Nonaktifkan semua tombol & konten di scope ini
            navContainer.querySelectorAll('.paket-tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            contentWrapper.querySelectorAll('.paket-tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // 2. Aktifkan tombol & konten yang dituju
            button.classList.add('active');
            targetContent.classList.add('active');

            // 3. LOGIKA "STATEFUL" (Menyimpan state & tidak kosong)
            const subNav = targetContent.querySelector('.paket-tab-nav.paket-sub-nav');

            if (subNav) {
                const activeSubButton = subNav.querySelector('.paket-tab-btn.active');
                const subContentWrapper = subNav.nextElementSibling;

                if (activeSubButton) {
                    // =========================================================
                    // == PERBAIKAN BUG ADA DI SINI ==
                    // Jika state tersimpan (tombol sub-nav ada yg aktif),
                    // kita HARUS aktifkan kontennya juga.
                    // =========================================================
                    const activeSubTabId = activeSubButton.getAttribute('data-tab');
                    const activeSubContent = subContentWrapper.querySelector('#' + activeSubTabId);

                    if (activeSubContent) {
                        // (Walaupun sudah di-loop di atas, ini untuk memastikan
                        //  hanya konten sub-nav ini yg aktif)
                        subContentWrapper.querySelectorAll('.paket-tab-content').forEach(content => {
                            content.classList.remove('active');
                        });
                        // Aktifkan konten yang sesuai dengan tombol yg sudah aktif
                        activeSubContent.classList.add('active');
                    }

                } else {
                    // =========================================================
                    // Jika tidak ada state tersimpan (kasus "kosong"),
                    // klik tombol sub-nav pertama.
                    // =========================================================
                    const firstSubButton = subNav.querySelector('.paket-tab-btn');

                    if (firstSubButton) {
                        firstSubButton.click();
                    }
                }
            }
        });
    });
});
const cart = document.getElementById('cart');
const addButtons = document.querySelectorAll('.add-btn');
const cartItems = document.getElementById('cart-items');
const total = document.getElementById('total');
let totalPrice = 0;



addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        const price = parseInt(btn.getAttribute('data-price'));

        const item = document.createElement('div');
        item.classList.add('cart-item');
        item.innerHTML = `<span>${name}</span><strong>Rp${price.toLocaleString()}</strong>`;
        cartItems.appendChild(item);

        totalPrice += price;
        total.textContent = totalPrice.toLocaleString();
    });
});