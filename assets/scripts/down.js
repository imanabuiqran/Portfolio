(function () {
    const arrow = document.getElementById('scroll-arrow');
    if (!arrow) return;

    const FADE_THRESHOLD = 60; // px scrolled before it fades — tweak to taste
    let dismissed = false;

    // trigger the entrance on the next frame so the CSS transition applies
    requestAnimationFrame(() => arrow.classList.add('visible'));

    window.addEventListener('scroll', () => {
        if (dismissed) return;
        if (window.scrollY > FADE_THRESHOLD) {
            dismissed = true;
            arrow.classList.remove('visible');
            arrow.classList.add('hidden');
        }
    }, { passive: true });
})();