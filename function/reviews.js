// Система отзывов — ручное добавление после модерации
// Отправка в Google Форму, показ только одобренных отзывов

const reviewForm = document.getElementById('reviewForm');

// === НАСТРОЙКА ОТПРАВКИ В ВАШУ GOOGLE ФОРМУ ===
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfGkoDWZrIaazvs_swvS8pOJUDZfGLZu9XvNo45iEHDEsH1QQ/formResponse';
const NAME_FIELD_ID = 'entry.1281699288';
const REVIEW_FIELD_ID = 'entry.246588080';
// ============================================

// === СПИСОК ОДОБРЕННЫХ ОТЗЫВОВ ===
// СЮДА ВЫ ДОБАВЛЯЕТЕ ОТЗЫВЫ ПОСЛЕ ПРОВЕРКИ В GOOGLE ТАБЛИЦЕ
const approvedReviews = [
    // { name: 'Анна', text: 'Текст отзыва' },
    // { name: 'Иван', text: 'Ещё один отзыв' }
];
// =================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showMessage(message, isError = false) {
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `form-message ${isError ? 'error' : 'success'}`;
    msgDiv.textContent = message;
    msgDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${isError ? '#e74c3c' : '#27ae60'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(msgDiv);
    
    setTimeout(() => {
        msgDiv.style.opacity = '0';
        setTimeout(() => msgDiv.remove(), 500);
    }, 4000);
}

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
        container.innerHTML = '<div class="info-box" style="text-align:center;">📝 Пока нет отзывов. Станьте первым!</div>';
    }
}

if (reviewForm) {
    reviewForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('reviewName');
        const textInput = document.getElementById('reviewText');
        
        const name = nameInput.value.trim();
        const text = textInput.value.trim();
        
        if (!name || !text) {
            showMessage('❌ Заполните имя и отзыв', true);
            return;
        }
        
        if (text.length < 10) {
            showMessage('❌ Отзыв должен быть не короче 10 символов', true);
            return;
        }
        
        const safeName = escapeHtml(name);
        const safeText = escapeHtml(text);
        
        const formData = new FormData();
        formData.append(NAME_FIELD_ID, safeName);
        formData.append(REVIEW_FIELD_ID, safeText);
        
        try {
            await fetch(GOOGLE_FORM_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });
            
            showMessage('✅ Спасибо! Отзыв отправлен на модерацию.');
            reviewForm.reset();
        } catch (error) {
            console.error('Ошибка отправки:', error);
            showMessage('❌ Ошибка при отправке. Попробуйте позже.', true);
        }
    });
}

loadApprovedReviews();

if (!document.querySelector('#reviewAnimationStyle')) {
    const style = document.createElement('style');
    style.id = 'reviewAnimationStyle';
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .form-message { animation: fadeIn 0.3s ease; }
        .review-card { animation: fadeIn 0.3s ease; }
    `;
    document.head.appendChild(style);
}