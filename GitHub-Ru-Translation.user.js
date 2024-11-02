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
// @version         1-B1
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
        // Заголовки
        "Access": "Доступ",
        "Code, planning, and automation": "Код, планирование и автоматизация",
        "Security": "Безопасность",
        "Integrations": "Интеграции",
        "Archives": "Архивы",
        // Вкладки
        "Code": "Код",
        "Pull requests": "Запросы на слияние",
        "Issues": "Проблемы, предложения и вопросы",
        "Discussions": "Обсуждения",
        "Actions": "Экшены",
        "Projects": "Проекты",
        "Wiki": "Вики",
        "Security": "Безопасность",
        "Insights": "Аналитика",
        "Settings": "Настройки",
        "Releases": "Выпуски"
    };

    function translateTextContent() {
        const elements = document.querySelectorAll('.ActionList-sectionDivider-title, .ActionListItem-label, span[data-content]');

        elements.forEach(el => {
            const text = el.textContent.trim();
            if (translations[text]) {
                el.textContent = translations[text];
            }
        });
    }

    const debouncedTranslate = (function() {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(translateTextContent, 100);
        };
    })();

    const observer = new MutationObserver(debouncedTranslate);

    const targetNode = document.querySelector('main') || document.body;
    observer.observe(targetNode, {
        childList: true,
        subtree: true,
        characterData: false,
        attributes: false
    });

    translateTextContent();
})();