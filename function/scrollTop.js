// Кнопка "Наверх" — появляется при скролле

const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    // Показываем/скрываем кнопку в зависимости от позиции скролла
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'flex';
            scrollTopBtn.style.alignItems = 'center';
            scrollTopBtn.style.justifyContent = 'center';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // Плавный скролл наверх при клике
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}