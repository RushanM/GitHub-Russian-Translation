// ==UserScript==
// @name            GitHub Russian Translation
// @name:ru         Русификатор GitHub
// @author          Deflecta
// @contributionURL https://boosty.to/rushanm
// @description     Переводит сайт github.com на русский язык.
// @description:ru  Переводит сайт github.com на русский язык.
// @downloadURL     https://github.com/RushanM/GitHub-Russian-Translation/raw/main/GitHub%20Ru%20Translation.user.js
// @grant           none
// @homepageURL     https://github.com/RushanM/GitHub-Russian-Translation
// @icon            https://github.githubassets.com/favicons/favicon.png
// @license         MIT
// @match           https://github.com/*
// @run-at          document-end
// @namespace       githubrutraslation
// @supportURL      https://github.com/RushanM/GitHub-Russian-Translation/issues
// @updateURL       https://github.com/RushanM/GitHub-Russian-Translation/raw/main/GitHub%20Ru%20Translation.user.js
// @version         1-B4
// ==/UserScript==

(function() {
    'use strict';

    const translations = {
        "Public profile": "Публичный профиль",
        "Account": "Учётная запись",
        "Appearance": "Внешний вид",
        "Accessibility": "Доступность",
        "Notifications": "Уведомления",
        "Billing and plans": "Выставление счетов и планы",
        "Plans and usage": "Планы и использование",
        "Spending limits": "Лимиты расходов",
        "Payment information": "Платёжная информация",
        "Emails": "Электронные почты",
        "Password and authentication": "Пароль и аутентификация",
        "Sessions": "Сессии",
        "SSH and GPG keys": "Ключи SSH и GPG",
        "Organizations": "Организации",
        "Enterprises": "Предприятия",
        "Blocked users": "Заблокированные пользователи",
        "Interaction limits": "Ограничения взаимодействия",
        "Code review limits": "Ограничения код-ревью",
        "Repositories": "Репозитории",
        "Codespaces": "Кодовые пространства",
        "Packages": "Пакеты",
        "Copilot": "Копайлот",
        "Pages": "Страницы",
        "Saved replies": "Сохранённые ответы",
        "Applications": "Приложения",
        "Scheduled reminders": "Запланированные напоминания",
        "Security log": "Журнал безопасности",
        "Sponsorship log": "Журнал спонсорства",
        "Developer settings": "Настройки разработчика",
        "Code security": "Безопасность кода",
        "Moderation": "Модерация",
        // Заголовки настроек
        "Access": "Доступ",
        "Code, planning, and automation": "Код, планирование и автоматизация",
        "Security": "Безопасность",
        "Integrations": "Интеграции",
        "Archives": "Архивы",
        // Вкладки
        "Code": "Код",
        "Pull requests": "Запросы на слияние",
        "Issues": "Темы",
        "Discussions": "Обсуждения",
        "Actions": "Экшены",
        "Projects": "Проекты",
        "Wiki": "Вики",
        "Security": "Безопасность",
        "Insights": "Аналитика",
        "Settings": "Настройки",
        "Releases": "Выпуски",
        // Бутербродное меню репозитория
        "Compare": "Сравнение",
        "Dependencies": "Зависимости",
        "Commits": "Правки",
        "Branches": "Ветки",
        // Настройки репозитория
        "General": "Основное",
        "Collaborators": "Коллабораторы",
        "Moderation options": "Настройки модерации",
        "Tags": "Теги",
        "Rules": "Правила",
        "Rulesets": "Наборы правил",
        "Runners": "Исполнители",
        "Webhooks": "Вебхуки",
        "Environments": "Среды",
        "Deploy keys": "Ключи развёртывания",
        "Secrets and variables": "Секреты и переменные",
        "GitHub Apps": "Приложения GitHub",
        "Email notifications": "Уведомления по почте",
        "Autolink references": "Автоссылки",
        // Заголовки настроек репозитория
        "Code and automation": "Код и автоматизация",
        // Разделы экшенов
        "All workflows": "Все рабочие процессы",
        "Caches": "Кэши",
        "Attestations": "Утверждения",
        // Разделы экшена
        "Summary": "Сводка",
        "Usage": "Использование",
        "Workflow file": "Файл рабочего процесса",
        // Заголовки разделов экшена
        "Jobs": "Задания",
        "Run details": "Подробности запуска",
        // Заголовки разделов экшенов
        "Management": "Управление",
        // Заголовки страниц
        "Dashboard": "Главная",
        "Copilot": "Копайлот",
        // Поиск
        "Type / to search": "Нажмите <kbd class=\"AppHeader-search-kbd\">/</kbd> для поиска",
        // Разделы главной
        "Home": "Главная",
        "Explore": "Обзор",
        "Marketplace": "Торговая площадка"
    };

    function translateTextContent() {
        const elements = document.querySelectorAll('.ActionList-sectionDivider-title, .ActionListItem-label, span[data-content], .AppHeader-context-item-label, #qb-input-query, .Truncate-text');

        elements.forEach(el => {
            // Проверка, содержит ли элемент дочерние элементы (<kbd>)
            if (el.childElementCount > 0) {
                // Сборка текстового содержания с учётом дочерних элементов
                let text = '';
                el.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        text += node.textContent;
                    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'KBD') {
                        text += '/' ; // Добавление символа «/», который содержится внутри <kbd>
                    }
                });
                text = text.trim();
                if (translations[text]) {
                    // Создание нового фрагмента с переводом и сохранение тега <kbd>
                    const newFragment = document.createDocumentFragment();
                    const parts = translations[text].split('<kbd class="AppHeader-search-kbd">/</kbd>');
                    newFragment.append(document.createTextNode(parts[0]));
                    const kbd = document.createElement('kbd');
                    kbd.className = 'AppHeader-search-kbd';
                    kbd.textContent = '/';
                    newFragment.append(kbd);
                    newFragment.append(document.createTextNode(parts[1]));
                    // Очистка элемента и вставка нового контента
                    el.innerHTML = '';
                    el.appendChild(newFragment);
                }
            } else {
                const text = el.textContent.trim();
                if (translations[text]) {
                    el.textContent = translations[text];
                }
            }
        });
    }

    const observer = new MutationObserver(translateTextContent);

    // Наблюдение за всем документом
    observer.observe(document, {
        childList: true,
        subtree: true
    });

    translateTextContent();
})();