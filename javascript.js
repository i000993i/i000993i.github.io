// Главный файл JavaScript — инициализация, мобильное меню, навигация

(function() {
    // Мобильное меню
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuToggle = document.getElementById('menuToggleBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');

    function openSidebar() {
        if (sidebar) {
            sidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSidebar() {
        if (sidebar) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', openSidebar);
    }
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Плавная навигация по якорям
    const allLinks = document.querySelectorAll('.sidebar a, .nav-links a');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');
            if (hash && hash.startsWith('#')) {
                e.preventDefault();
                const targetId = hash.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.pushState(null, null, hash);
                }
                // Закрываем мобильное меню, если оно открыто
                if (window.innerWidth <= 880) {
                    closeSidebar();
                }
            }
        });
    });

    // Закрытие меню при ресайзе окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 880 && sidebar && sidebar.classList.contains('open')) {
            closeSidebar();
        }
    });

    // Добавляем порядковые индексы для анимации карточек
    document.querySelectorAll('.cmd-card').forEach((card, index) => {
        card.style.setProperty('--order', index);
    });
})();