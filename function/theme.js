// Переключение тёмной/светлой темы с сохранением в localStorage

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Загрузка сохранённой темы при загрузке страницы
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light-mode') {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️ Светлая тема';
} else {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    if (themeToggle) themeToggle.textContent = '🌙 Тёмная тема';
}

// Функция переключения темы
function toggleTheme() {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
        if (themeToggle) themeToggle.textContent = '☀️ Светлая тема';
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        if (themeToggle) themeToggle.textContent = '🌙 Тёмная тема';
    }
}

// Добавляем обработчик события
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}