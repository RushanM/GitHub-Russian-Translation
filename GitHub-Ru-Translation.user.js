// ==UserScript==
// @name            GitHub Russian Translation
// @name:ru         Русификатор GitHub
// @author          Deflecta
// @contributionURL https://boosty.to/rushanm
// @description     Translates the github.com website into Russian.
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
// @version         1-B7
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
        "Issues": "Темы",
        "Bugs": "Ошибки",
        "Pull requests": "Запросы на слияние",
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
        "Dashboard": "Главная страница",
        "Copilot": "Копайлот",
        // Поиск
        "Type / to search": "Нажмите <kbd class=\"AppHeader-search-kbd\">/</kbd> для поиска",
        // Разделы главной
        "Home": "Главная",
        "Explore": "Обзор",
        "Marketplace": "Торговая площадка",
        // Главная
        "Top repositories": "Лучшие репозитории",
        "Recent activity": "Недавняя активность",
        // Подзагаловки главной
        "Show more": "Показать больше"
    };

    function translateTextContent() {
        const elements = document.querySelectorAll('.ActionList-sectionDivider-title, .ActionListItem-label, span[data-content], .AppHeader-context-item-label, #qb-input-query, .Truncate-text, h2, button');

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

    function translateCopilotPreview() {
        // Замена «Ask Copilot»
        const askCopilotPlaceholder = document.querySelector('.copilotPreview__input[placeholder="Ask Copilot"]');
        if (askCopilotPlaceholder) {
            askCopilotPlaceholder.setAttribute('placeholder', 'Спросить Копайлота');
        }

        // Всплывающая подсказка «Send»
        document.querySelectorAll('tool-tip[role="tooltip"]').forEach(tooltip => {
            if (tooltip.textContent.trim() === 'Send') {
                tooltip.textContent = 'Отправить';
            }
        });

        // Предложения Копайлота
        document.querySelectorAll('.copilotPreview__suggestionButton div').forEach(div => {
            const text = div.textContent.trim();
            if (text === 'What is a hash table in JS?') {
                div.innerHTML = 'Что такое хэш-таблица в JS?';
            } else if (text === 'Email validation regex in JS') {
                div.innerHTML = 'Регулярное выражение для валидации адреса электронной почты в JS';
            } else if (text === 'Generate an HTML/JS calculator') {
                div.innerHTML = 'Напиши калькулятор на HTML/JS';
            } else if (text === 'How can you help?') {
                div.innerHTML = 'Как ты можешь помочь?';
            } else if (text === 'What are Python decorators?') {
                div.innerHTML = 'Что такое декораторы в Python?';
            } else if (text === 'Latest nodejs/node release') {
                div.innerHTML = 'Последний выпуск <span class="fgColor-muted">nodejs/node</span>';
            } else if (text === 'Rails authentication endpoint') {
                div.innerHTML = 'Точка аутентификации Rails';
            } else if (text === 'Pull requests in microsoft/vscode') {
                div.innerHTML = 'Запросы на слияние в <span class="fgColor-muted">microsoft/vscode</span>';
            } else if (text === 'Find issues assigned to me') {
                div.innerHTML = 'Найди назначенные на меня issues';
            } else if (text === 'Create a profile README for me') {
                div.innerHTML = 'Напиши README мне для профиля';
            } else if (text === 'Python Panda data analysis') {
                div.innerHTML = 'Анализ данных с помощью Python и Panda';
            } else if (text === 'Open issues in facebook/react') {
                div.innerHTML = 'Открытые issues в <span class="fgColor-muted">facebook/react</span>';
            } else if (text === 'Recent bugs in primer/react') {
                div.innerHTML = 'Последние баги в <span class="fgColor-muted">primer/react</span>';
            } else if (text === 'My open pull requests') {
                div.innerHTML = 'Открытые мной запросы на слияние';
            } else if (text === 'Python password endpoint') {
                div.innerHTML = 'Точка пароля Python';
            } else if (text === 'Recent commits in <span class="fgColor-muted">torvalds/linux</span>') {
                div.innerHTML = 'Последние правки в <span class="fgColor-muted">torvalds/linux</span>';
            } else if (text === 'What can I do here?') {
                div.innerHTML = 'Чем заняться?';
            }
        });
    }

    const observer = new MutationObserver(() => {
        translateTextContent();
        translateCopilotPreview();
    });

    // Наблюдение за всем документом, включая изменения атрибутов
    observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: true
    });

    // Вызываем после существующего перевода
    translateTextContent();
    translateCopilotPreview();
})();
