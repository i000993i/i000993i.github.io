// Копирование команды в буфер обмена по клику

document.addEventListener('DOMContentLoaded', function() {
    const commandElements = document.querySelectorAll('.cmd-name');
    
    commandElements.forEach(cmdElement => {
        cmdElement.style.cursor = 'pointer';
        cmdElement.title = '📋 Нажмите, чтобы скопировать команду';
        
        cmdElement.addEventListener('click', async function(e) {
            e.stopPropagation();
            
            // Получаем текст команды (без лишних пробелов)
            let commandText = this.textContent.trim();
            
            // Если команда содержит пример, берём только первую часть
            if (commandText.includes('\n')) {
                commandText = commandText.split('\n')[0].trim();
            }
            
            // Копирование в буфер обмена
            try {
                await navigator.clipboard.writeText(commandText);
                
                // Визуальный фидбек
                const originalHTML = this.innerHTML;
                this.innerHTML = '✅ Скопировано!';
                this.style.backgroundColor = 'rgba(46, 204, 113, 0.3)';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.backgroundColor = '';
                }, 1500);
            } catch (err) {
                console.error('Ошибка копирования:', err);
                
                // Fallback для старых браузеров
                const textarea = document.createElement('textarea');
                textarea.value = commandText;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                this.innerHTML = '⚠️ Скопировано (вручную)';
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 1500);
            }
        });
    });
});