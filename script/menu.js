document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('menu-toggle');
    const menuPopup = document.getElementById('menu-popup');

    function openMenu() {
        menuPopup.classList.remove('hidden');
        toggleBtn.textContent = '✖ Fechar';
    }

    function closeMenu() {
        menuPopup.classList.add('hidden');
        toggleBtn.textContent = '☰ Menu';
    }

    toggleBtn.addEventListener('click', () => {
        if (menuPopup.classList.contains('hidden')) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    document.addEventListener('click', function (e) {
        const isClickInside = toggleBtn.contains(e.target) || menuPopup.contains(e.target);
        if (!isClickInside) {
            closeMenu();
        }
    });
});
