// Анимации при загрузке страницы

document.addEventListener('DOMContentLoaded', function() {
    // Добавляем задержки для карточек команд
    const cards = document.querySelectorAll('.cmd-card');
    cards.forEach((card, index) => {
        card.style.setProperty('--order', index);
        card.style.animationDelay = `${Math.min(0.03 * index, 0.5)}s`;
    });
    
    // Анимация для ачивок
    const achievements = document.querySelectorAll('.achievement-frame');
    achievements.forEach((ach, index) => {
        ach.style.animationDelay = `${Math.min(0.05 * index, 0.6)}s`;
    });
    
    // Анимация для отзывов
    const reviews = document.querySelectorAll('.review-card');
    reviews.forEach((review, index) => {
        review.style.animationDelay = `${Math.min(0.07 * index, 0.5)}s`;
    });
});