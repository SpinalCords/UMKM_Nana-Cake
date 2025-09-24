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