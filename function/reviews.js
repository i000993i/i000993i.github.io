// Система отзывов — ТОЛЬКО РУЧНОЕ ДОБАВЛЕНИЕ
// Отзывы добавляются в массив approvedReviews ниже

// === СПИСОК ОДОБРЕННЫХ ОТЗЫВОВ ===
// ДОБАВЛЯЙТЕ НОВЫЕ ОТЗЫВЫ СЮДА ВРУЧНУЮ:
const approvedReviews = [
    // Пример:
    // { name: 'Анна', text: 'Отличный бот, очень нравится экономика!' },
    // { name: 'Иван', text: 'Майнинг на высоте, спасибо разработчикам!' }
    
    // === ВАШИ ОТЗЫВЫ ===
    { name: 'i000993i', text: 'Я люблю пельмени:).' },
];
// =================================

// Защита от XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Загрузка отзывов
function loadApprovedReviews() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    
    if (approvedReviews.length > 0) {
        container.innerHTML = approvedReviews.map(review => `
            <div class="review-card">
                <div class="review-text">"${escapeHtml(review.text)}"</div>
                <div class="review-author">— ${escapeHtml(review.name)}</div>
            </div>
        `).join('');
    } else {
        container.innerHTML = '<div class="info-box" style="text-align:center;">📝 Пока нет отзывов. Будьте первым!</div>';
    }
}

// Загружаем отзывы при старте
loadApprovedReviews();