// Утилиты для работы с переводами и форматированием
const TranslationUtils = {
    // Объединение секций перевода в единый словарь
    mergeTranslations: function(data) {
        return Object.assign(
            {},
            data.dashboard || {},
            data.search || {},
            data.left_sidebar || {},
            data.settings || {},
            data.repo_tabs || {},
            data.copilot || {},
            data.createnew || {},
            data.right_sidebar || {},
            data.copilot_openwith || {},
            data.general || {},
            data.time || {},
            data.months || {},
            data.footer || {}
        );
    },
    
    // Склонения для репозиториев
    getRepositoriesTranslation: function(count) {
        if (count === 1) return `${count} репозиторий`;
        if (count >= 2 && count <= 4) return `${count} репозитория`;
        return `${count} репозиториев`;
    },
    
    // Форматирование счетчиков звезд (замена k на К)
    formatStarCount: function() {
        const starCounters = document.querySelectorAll('.Counter.js-social-count');
        starCounters.forEach(counter => {
            let text = counter.textContent.trim();
            if (text.includes('k')) {
                text = text.replace('.', ',').replace('k', 'К');
                counter.textContent = text;
            }
        });
    },
    
    // Перевод абсолютного времени
    translateAbsoluteTime: function(text, translations) {
        const monthMapping = translations.months || {};
        
        // Регулярное выражение для извлечения компонентов времени
        // Пример: Feb 24, 2025, 3:09 PM GMT+3
        const regex = /^([A-Z][a-z]{2}) (\d{1,2}), (\d{4}), (\d{1,2}):(\d{2})\s*(AM|PM)\s*GMT\+3$/;
        const match = text.match(regex);
        if (match) {
            const monthEn = match[1];
            const day = match[2];
            const year = match[3];
            let hour = parseInt(match[4], 10);
            const minute = match[5];
            const period = match[6];

            // Преобразование в 24-часовой формат
            if (period === 'PM' && hour !== 12) {
                hour += 12;
            } else if (period === 'AM' && hour === 12) {
                hour = 0;
            }
            // Форматирование часов с ведущим нулём
            const hourStr = hour < 10 ? '0' + hour : hour.toString();
            const monthRu = monthMapping[monthEn] || monthEn;

            // Используем перевод из файла переводов
            const byMoscowTime = translations.time?.by_moscow_time || "по московскому времени";
            return `${day} ${monthRu} ${year}, ${hourStr}:${minute} ${byMoscowTime}`;
        }
        return text;
    },
    
    // Проверка, находится ли элемент в зоне, где перевод не нужен
    isExcludedElement: function(el) {
        // Если элемент находится внутри заголовков Markdown, то не переводим
        if (el.closest('.markdown-heading')) return true;
        // Если элемент находится внутри ячейки с названием каталога, то не переводим
        if (el.closest('.react-directory-filename-column')) return true;
        return false;
    }
};

// Экспортирование объекта утилит в глобальную область видимости
window.TranslationUtils = TranslationUtils;
