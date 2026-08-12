(function () {
    const toggle = document.getElementById('nav-toggle');
    const overlay = document.getElementById('mobile-overlay');

    if (!toggle || !overlay) return;

    function closeMenu() {
        toggle.classList.remove('active');
        overlay.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    function openMenu() {
        toggle.classList.add('active');
        overlay.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', function () {
        overlay.classList.contains('open') ? closeMenu() : openMenu();
    });

    overlay.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', function () {
        if (window.matchMedia('(orientation: landscape)').matches) {
            closeMenu();
        }
    });
})();