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
// @version         1-B13
// ==/UserScript==

(function () {
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
        "Find a repository…": "Найти репозиторий…",
        "Find a release": "Найти выпуск",
        // Разделы главной
        "Home": "Главная",
        "Explore": "Обзор",
        "Marketplace": "Торговая площадка",
        // Главная
        "Top repositories": "Лучшие репозитории",
        "Recent activity": "Недавняя активность",
        // Подзаголовки главной
        "Show more": "Показать больше",
        "Filter": "Фильтр",
        "Events": "События",
        "Activity you want to see on your feed": "Деятельность, которую вы хотите видеть в своей ленте",
        "Announcements": "Объявления",
        "Special discussion posts from repositories": "Особые обсуждения из репозиториев",
        "Releases": "Выпуски",
        "Update posts from repositories": "Обновления из репозиториев",
        "Sponsors": "Спонсоры",
        "Relevant projects or people that are being sponsored": "Соответствующие проекты или люди, которых спонсируют",
        "Stars": "Звёзды",
        "Repositories being starred by people": "Репозитории, которые получают звёзды от пользователей",
        "Repositories": "Репозитории",
        "Repositories that are created or forked by people": "Репозитории, созданные или разветвлённые пользователями",
        "Repository activity": "Деятельность репозиториев",
        "Issues and pull requests from repositories": "Проблемы и запросы на слияние из репозиториев",
        "Follows": "Подписки",
        "Who people are following": "На кого подписываются пользователи",
        "Recommendations": "Рекомендации",
        "Repositories and people you may like": "Репозитории и пользователи, которые могут вам понравиться",
        "Include events from starred repositories": "Включать события из репозиториев, на которые вы поставили звезду",
        "By default, the feed shows events from repositories you sponsor or watch, and people you follow.": "По умолчанию лента отображает события из репозиториев, которые вы спонсируете или за которыми следите, а также от людей, на которых подписаны.",
        "Reset to default": "Сбросить до настроек по умолчанию",
        "Save": "Сохранить",
        "Pre-release": "Пре-релиз",
        "github-actions": "Экшены GitHub",
        "Draft a new release": "Подготовить новый выпуск",
        "starred": "поставил(а) звезду на",
        "a repository": "репозиторий",
        "your repository": "ваш репозиторий",
        "added a repository to": "добавил(а) репозиторий в список",
        "Starred": "Звезда поставлена",
        "Star": "Поставить звезду",
        "Lists": "Списки"
    };

    // УРА, наконец-то рабочий вариант перевода starred
    translations["starred"] = "поставил(а) звезду на";

    function getRepositoriesTranslation(count) {
        if (count === 1) return `${count} репозиторий`;
        if (count >= 2 && count <= 4) return `${count} репозитория`;
        return `${count} репозиториев`;
    }

    function formatStarCount() {
        const starCounters = document.querySelectorAll('.Counter.js-social-count');
        starCounters.forEach(counter => {
            let text = counter.textContent.trim();
            if (text.includes('k')) {
                text = text.replace('.', ',').replace('k', 'К');
                counter.textContent = text;
            }
        });
    }

    // Функция для перевода абсолютного времени во всплывающей подсказке, например:
    // «Feb 24, 2025, 3:09 PM GMT+3» → «24 февраля 2025, 15:09 по московскому времени»
    function translateAbsoluteTime(text) {
        // Маппирование месяцев
        const monthMapping = {
            Jan: 'января',
            Feb: 'февраля',
            Mar: 'марта',
            Apr: 'апреля',
            May: 'мая',
            Jun: 'июня',
            Jul: 'июля',
            Aug: 'августа',
            Sep: 'сентября',
            Oct: 'октября',
            Nov: 'ноября',
            Dec: 'декабря'
        };

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
            return `${day} ${monthRu} ${year}, ${hourStr}:${minute} по московскому времени`;
        }
        return text;
    }

    // Функция для перевода элементов <relative-time>
    function translateRelativeTimes() {
        const timeElements = document.querySelectorAll('relative-time');
        timeElements.forEach(el => {
            // Если элемент уже переведён, можно добавить атрибут data-translated
            if (el.getAttribute('data-translated')) return;

            // Перевод всплывающей подсказки, если атрибут title существует
            if (el.hasAttribute('title')) {
                const originalTitle = el.getAttribute('title');
                el.setAttribute('title', translateAbsoluteTime(originalTitle));
            }
            // Отмечаем элемент как переведённый
            el.setAttribute('data-translated', 'true');
        });
    }

    // функция для проверки, находится ли элемент в контейнере, где перевод нежелателен
    function isExcludedElement(el) {
        // если элемент находится внутри заголовков Markdown, то не переводим
        if (el.closest('.markdown-heading')) return true;
        // если элемент находится внутри ячейки с именем каталога, то не переводим
        if (el.closest('.react-directory-filename-column')) return true;
        return false;
    }

    function translateTextContent() {
        const elements = document.querySelectorAll(
            '.ActionList-sectionDivider-title, .ActionListItem-label, span[data-content], .AppHeader-context-item-label, #qb-input-query, .Truncate-text, h2, button, .Label, a, img[alt], .Box-title'
        );

        elements.forEach(el => {
            // если элемент подпадает под исключения, пропускаем его
            if (isExcludedElement(el)) return;

            if (el.tagName === 'IMG' && el.alt.trim() in translations) {
                el.alt = translations[el.alt.trim()];
            } else if (el.childElementCount === 0) {
                const text = el.textContent.trim();
                if (translations[text]) {
                    el.textContent = translations[text];
                } else {
                    const match = text.match(/^(\d+) repositories$/);
                    if (match) {
                        const count = parseInt(match[1], 10);
                        el.textContent = getRepositoriesTranslation(count);
                    } else if (text === 'added a repository to') {
                        el.textContent = 'добавил(а) репозиторий в список';
                    }
                }
            } else {
                // Часть функции translateTextContent(), отвечающая за обработку элементов с дочерними элементами
                if (el.childElementCount > 0) {
                    // Сборка текстового содержания с учётом дочерних элементов
                    let text = '';
                    el.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE) {
                            text += node.textContent;
                        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'KBD') {
                            text += '/'; // Добавление символа «/» из <kbd>
                        }
                    });
                    text = text.trim();
                    if (translations[text]) {
                        // Создание нового фрагмента с переводом и сохранение тега <kbd>, если перевод соответствует шаблону
                        const newFragment = document.createDocumentFragment();
                        const parts = translations[text].split('<kbd class="AppHeader-search-kbd">/</kbd>');
                        newFragment.append(document.createTextNode(parts[0]));
                        // Добавлять тег <kbd> только если есть вторая часть перевода
                        if (parts.length > 1 && parts[1] !== undefined) {
                            const kbd = document.createElement('kbd');
                            kbd.className = 'AppHeader-search-kbd';
                            kbd.textContent = '/';
                            newFragment.append(kbd);
                            newFragment.append(document.createTextNode(parts[1]));
                        }
                        // Очистка элемента и вставка нового контента
                        el.innerHTML = '';
                        el.appendChild(newFragment);
                    }
                    el.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE) {
                            const originalText = node.textContent;
                            const trimmed = originalText.trim();
                            if (translations[trimmed]) {
                                node.textContent = translations[trimmed];
                            } else if (originalText.includes("starred")) {
                                node.textContent = originalText.replace("starred", translations["starred"]);
                            } else if (originalText.includes("added a repository to")) {
                                node.textContent = originalText.replace("added a repository to", 'добавил(а) репозиторий в список');
                            } else if (originalText.includes("Notifications")) {
                                node.textContent = originalText.replace("Notifications", 'Уведомления');
                            }
                        }
                    });
                    // Последный выхват строчек
                    if (/\bstarred\b/.test(el.innerHTML)) {
                        el.innerHTML = el.innerHTML.replace(/\bstarred\b/g, translations["starred"]);
                    }
                    if (/\badded a repository to\b/.test(el.innerHTML)) {
                        el.innerHTML = el.innerHTML.replace(/\badded a repository to\b/g, 'добавил(а) репозиторий в список');
                    }
                    if (/\bNotifications\b/.test(el.innerHTML)) {
                        el.innerHTML = el.innerHTML.replace(/\bNotifications\b/g, 'Уведомления');
                    }
                } else {
                    // Сначала каждый узел
                    el.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE) {
                            let originalText = node.textContent;
                            // Переводы
                            originalText = originalText.replace(/\bstarred\b/g, translations["starred"]);
                            originalText = originalText.replace(/\badded a repository to\b/g, 'добавил(а) репозиторий в список');
                            originalText = originalText.replace(/\bNotifications\b/g, 'Уведомления');
                            node.textContent = originalText;
                        }
                    });

                    // Если всё ещё остаётся, заменить внутренний HTML
                    if (/\bstarred\b/.test(el.innerHTML)) {
                        el.innerHTML = el.innerHTML.replace(/\bstarred\b/g, translations["starred"]);
                    }
                    if (/\badded a repository to\b/.test(el.innerHTML)) {
                        el.innerHTML = el.innerHTML.replace(/\badded a repository to\b/g, 'добавил(а) репозиторий в список');
                    }
                    if (/\bNotifications\b/.test(el.innerHTML)) {
                        el.innerHTML = el.innerHTML.replace(/\bNotifications\b/g, 'Уведомления');
                    }
                }
            }
        });
        formatStarCount();
        translateRelativeTimes();
    }

    // Рекурсивная функция
    function replaceAllStarred(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(/\bstarred\b/g, translations["starred"]);
            node.textContent = node.textContent.replace(/\badded a repository to\b/g, 'добавил(а) репозиторий в список');
            node.textContent = node.textContent.replace(/\bNotifications\b/g, 'Уведомления');
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(child => replaceAllStarred(child));
        }
    }

    function translateAttributes() {
        // Перевод placeholder
        document.querySelectorAll('input[placeholder]').forEach(el => {
            const text = el.getAttribute('placeholder');
            if (translations[text]) {
                el.setAttribute('placeholder', translations[text]);
            }
        });
        // Перевод aria-label
        document.querySelectorAll('[aria-label]').forEach(el => {
            const text = el.getAttribute('aria-label');
            if (translations[text]) {
                el.setAttribute('aria-label', translations[text]);
            }
        });
    }

    function translateCopilotPreview() {
        // Замена «Ask Copilot»
        const askCopilotPlaceholder = document.querySelector('.copilotPreview__input[placeholder="Ask Copilot"]');
        if (askCopilotPlaceholder) {
            askCopilotPlaceholder.setAttribute('placeholder', 'Спросить Копайлота');
        }

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

    function translateTooltips() {
        const commandPaletteTooltip = document.querySelector('tool-tip[for="AppHeader-commandPalette-button"]');
        if (commandPaletteTooltip && commandPaletteTooltip.textContent.trim() === 'Command palette') {
            commandPaletteTooltip.textContent = 'Палитра команд';
        }

        const copilotChatTooltip = document.querySelector('tool-tip[for="copilot-chat-header-button"]');
        if (copilotChatTooltip && copilotChatTooltip.textContent.trim() === 'Chat with Copilot') {
            copilotChatTooltip.textContent = 'Поговорить с Копайлотом';
        }

        const copilotOpenTooltip = document.querySelector('tool-tip[for="global-copilot-menu-button"]');
        if (copilotOpenTooltip && copilotOpenTooltip.textContent.trim() === 'Open Copilot…') {
            copilotOpenTooltip.textContent = 'Открыть Копайлот';
        }

        const createNewTooltip = document.querySelector('tool-tip[for="global-create-menu-anchor"]');
        if (createNewTooltip && createNewTooltip.textContent.trim() === 'Create new...') {
            createNewTooltip.textContent = 'Создать новый…';
        }

        const tooltipTranslations = {
            'Issues': 'Темы',
            'Pull requests': 'Запросы на слияние',
            'Send': 'Отправить'
        };

        document.querySelectorAll('tool-tip[role="tooltip"]').forEach(tooltip => {
            const text = tooltip.textContent.trim();
            if (tooltipTranslations[text]) {
                tooltip.textContent = tooltipTranslations[text];
            }
        });

        const unreadTooltip = document.querySelector('tool-tip[for="AppHeader-notifications-button"]');
        if (unreadTooltip && unreadTooltip.textContent.trim() === 'You have unread notifications') {
            unreadTooltip.textContent = 'У вас есть непрочитанные уведомления';
        }
    }

    function translateGitHubEducation() {
        const noticeForms = document.querySelectorAll('div.js-notice form.js-notice-dismiss');

        noticeForms.forEach(form => {
            const heading = form.querySelector('h3.h4');
            if (heading && heading.textContent.trim() === 'Learn. Collaborate. Grow.') {
                heading.textContent = 'Учитесь. Кооперируйтесь. Развивайтесь.';
            }

            const desc = form.querySelector('p.my-3.text-small');
            if (desc && desc.textContent.includes('GitHub Education gives you the tools')) {
                desc.textContent = 'GitHub Education предоставляет инструменты и поддержку сообщества, чтобы вы могли принимать технологические вызовы и превращать их в возможности. Ваше технологическое будущее начинается здесь!';
            }

            const link = form.querySelector('.Button-label');
            if (link && link.textContent.trim() === 'Go to GitHub Education') {
                link.textContent = 'Перейти в GitHub Education';
            }
        });
    }

    function translateFilterMenu() {
        const filterTranslations = {
            "Filter": "Фильтр",
            "Events": "События",
            "Activity you want to see on your feed": "Деятельность, которую вы хотите видеть в своей ленте",
            "Announcements": "Объявления",
            "Special discussion posts from repositories": "Особые обсуждения из репозиториев",
            "Releases": "Выпуски",
            "Update posts from repositories": "Новые обновления в репозиториях",
            "Sponsors": "Спонсоры",
            "Relevant projects or people that are being sponsored": "Проекты или люди, которых кто-то начинает спонсировать",
            "Stars": "Звёзды",
            "Repositories being starred by people": "Репозитории, которые получают звёзды от людей",
            "Repositories": "Репозитории",
            "Repositories that are created or forked by people": "Репозитории, созданные или разветвлённые пользователями",
            "Repository activity": "Деятельность в репозиториях",
            "Issues and pull requests from repositories": "Новые темы и запросы на слияние в репозиториях",
            "Follows": "Подписки",
            "Who people are following": "На кого подписываются пользователи",
            "Recommendations": "Рекомендации",
            "Repositories and people you may like": "Репозитории и пользователи, которые могут вам понравиться",
            "Include events from starred repositories": "Включать события из репозиториев, на которые вы поставили звезду",
            "By default, the feed shows events from repositories you sponsor or watch, and people you follow.": "По умолчанию лента отображает события из репозиториев, которые вы спонсируете или за которыми следите, а также от людей, на которых подписаны.",
            "Reset to default": "Сбросить до настроек по умолчанию",
            "Save": "Сохранить"
        };

        const elements = document.querySelectorAll(
            '.SelectMenu-title, .SelectMenu-item h5, .SelectMenu-item span, .px-3.mt-2 h5, .px-3.mt-2 p'
        );

        elements.forEach(el => {
            const text = el.textContent.trim();
            if (filterTranslations[text]) {
                el.textContent = filterTranslations[text];
            }
        });
    }

    function translateOpenCopilotMenu() {
        document.querySelectorAll('span.prc-ActionList-GroupHeading-eahp0, .Box-sc-g0xbh4-0.jtiCfm').forEach(el => {
            const text = el.textContent.trim();
            if (text === 'New conversation') el.textContent = 'Новый разговор';
            if (text === 'Immersive') el.textContent = 'Раскрыть';
            if (text === 'Open with') el.textContent = 'Открыть в';
            if (text === 'Settings') el.textContent = 'Настройки';
        });
    }

    const observer = new MutationObserver(() => {
        translateTextContent();
        translateAttributes();
        translateCopilotPreview();
        translateTooltips();
        translateGitHubEducation();
        translateFilterMenu();
        translateOpenCopilotMenu();

        // Перевод подвала
        document.querySelectorAll('p.color-fg-subtle.text-small.text-light').forEach(node => {
            if (node.textContent.trim() === '© 2025 GitHub, Inc.') {
                node.textContent = '© компания GitHub, 2025 год';
            }
        });

        document.querySelectorAll('a.Link').forEach(link => {
            const text = link.textContent.trim();
            if (text === 'About') link.textContent = 'О нас';
            if (text === 'Blog') link.textContent = 'Блог';
            if (text === 'Terms') link.textContent = 'Условия';
            if (text === 'Privacy') link.textContent = 'Конфиденциальность';
            if (text === 'Security') link.textContent = 'Безопасность';
            if (text === 'Status') link.textContent = 'Статус';
        });

        document.querySelectorAll('.Button-label').forEach(btn => {
            if (btn.textContent.trim() === 'Do not share my personal information') {
                btn.textContent = 'Не передавать мои личные данные';
            }
            if (btn.textContent.trim() === 'Manage Cookies') {
                btn.textContent = 'Управление куки';
            }
        });

        // Владельцы и перейти туда
        document.querySelectorAll('h3.ActionList-sectionDivider-title').forEach(node => {
            if (node.textContent.trim() === 'Owners') {
                node.textContent = 'Владельцы';
            }
        });

        document.querySelectorAll('.ActionListItem-description.QueryBuilder-ListItem-trailing').forEach(span => {
            if (span.textContent.trim() === 'Jump to') {
                span.textContent = 'Перейти туда';
            }
        });

        // Замена «added a repository to»
        document.querySelectorAll('h3.h5.text-normal.color-fg-muted.d-flex.flex-items-center.flex-row.flex-nowrap.width-fit span.flex-1 span.flex-shrink-0').forEach(span => {
            if (span.textContent.trim() === 'added a repository to') {
                span.textContent = 'добавил(а) репозиторий в список';
            }
        });
    });

    // Наблюдение за всем документом, включая изменения атрибутов
    observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: true
    });

    // Будущие изменения
    const observerStarred = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => replaceAllStarred(node));
        });
    });

    // Запуск
    observerStarred.observe(document.body, { childList: true, subtree: true });

    // Начальное прохождение
    replaceAllStarred(document.body);

    translateTextContent();
    translateAttributes();
    translateCopilotPreview();
    translateTooltips();
    translateGitHubEducation();
    translateFilterMenu();
    translateOpenCopilotMenu();

    // Замена «Filter»
    document.querySelectorAll('summary .octicon-filter').forEach(icon => {
        const summary = icon.parentElement;
        if (summary) {
            summary.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === 'Filter') {
                    node.textContent = translations["Filter"];
                }
            });
        }
    });

    translateFilterMenu();
})();