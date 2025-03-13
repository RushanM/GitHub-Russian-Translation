// Проверка включения/выключения перевода
let translationEnabled = true;
let observer = null;

// Проверяем сохранённое состояние при загрузке
browser.storage.local.get('enabled').then(result => {
    translationEnabled = result.enabled !== undefined ? result.enabled : true;
    if (translationEnabled) {
        initTranslation();
    }
});

// Слушаем сообщения от popup.js
browser.runtime.onMessage.addListener(function (message) {
    if (message.action === "toggleTranslation") {
        translationEnabled = message.enabled;

        if (translationEnabled) {
            initTranslation();
        } else {
            disableTranslation();
        }
    }
    return Promise.resolve({ response: "Состояние изменено" });
});

// Функция отключения перевода
function disableTranslation() {
    if (observer) {
        // Останавливаем наблюдатель
        observer.disconnect();
        observer = null;
    }

    window.location.reload();
}

// Функция инициализации всего перевода
function initTranslation() {
    'use strict';

    const interFontLink = document.createElement('link');
    interFontLink.rel = 'stylesheet';
    interFontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(interFontLink);

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

        // Кнопки звезды
        "Star": "Поставить звезду",
        "Starred": "Звезда поставлена",
        "Unstar this repository?": "Убрать звезду с этого репозитория?",
        "Unstar": "Убрать звезду",
        "Lists": "Списки",

        // История изменений
        "Latest changes": "Последние изменения",
        "View changelog →": "Просмотреть историю изменений →",

        // Новости
        // 25 февраля 2025
        // 
        "Enhanced billing platform is now available for personal accounts": "Улучшенная платформа выставления счетов теперь доступна для личных учётных записей",
        // 
        "Repositories – Updated insight views (General Availability)": "Репозитории — обновлённые представления аналитики (общедоступная версия)",
        // 
        "GitHub Enterprise Server 3.16 release candidate is now available": "Стал доступен кандидат на выпуск 3.16 «Сервера „GitHub для предприятий“»",
        // 
        "Refining messages and reloading responses in Copilot Chat is now in public preview": "Уточнение сообщений и перезагрузка ответов в чате Копайлота теперь в публичном предварительном просмотре",

        // 4 марта 2025
        // 
        "Find secrets in your organization with the secret risk assessment": "Найдите секреты в вашей организации с помощью оценки риска утечек секретов",
        // 
        "Improved pull request merge experience is now generally available": "Улучшенный процесс слияния запросов на слияние теперь доступен для всех",
        //
        "billing": "выставление-счетов",
        "enterprise": "для-предприятий",
        "Introducing GitHub Secret Protection and GitHub Code Security": "Представляем «Защиту секретов» и «Безопасность кода» от GitHub",

        // 5 марта 2025
        // 
        "advanced-security": "продвинутая-безопасность",
        "code-scanning": "сканирование-кода",
        "secret-scanning": "сканирование-секретов",
        "security-and-compliance": "безопасность-и-соответствие",
        "March 5, 2025": "5 марта 2025",
        "Delegated alert dismissal for code scanning and secret scanning now available in public preview": "Делегированное закрытие уведомлений для сканирования кода и секретов теперь доступно в публичном предварительном просмотре",
        "Keep control over the security posture of your organization with delegated alert dismissal. With this feature, you can require a review process before alerts are dismissed in code scanning and secret scanning. This helps you manage security risk better, as well as meet audit and compliance requirements.": "Сохраните контроль над уровнем безопасности вашей организации с помощью делегированного закрытия уведомлений. Эта функция позволяет требовать прохождения проверки перед тем, как уведомления в системах сканирования кода и секретов будут закрыты. Это помогает эффективнее управлять рисками в области безопасности, а также соответствовать требованиям аудита и нормативным стандартам.",
        "While this feature adds oversight and control, organizations should carefully balance security needs with development velocity. Things to consider include:": "Несмотря на то, что данная функция усиливает контроль, организациям следует тщательно балансировать потребности в безопасности и скорость разработки. При этом стоит учитывать следующие моменты:",
        "Who can close alerts": "кто имеет право закрывать уведомления,",
        "When and how alerts should be closed": "когда и каким образом уведомления должны закрываться,",
        "Who should review and approve dismissal requests.": "кто отвечает за проверку и одобрение запросов на закрытие уведомлений.",
        "This feature can be configured and managed at scale using security configurations or at the repository level.": "Эту функцию можно настроить и управлять ею как на уровне всей организации посредством настроек безопасности, так и на уровне отдельных репозиториев.",
        "Each dismissal request requires a mandatory comment explaining the rationale, with email notifications sent to both approvers and requesters throughout the process. If rejected, the alert remains open.": "Каждый запрос на закрытие уведомления требует обязательного комментария с пояснением причин, а уведомления по электронной почте отправляются как утверждающим, так и запрашивающим участникам процесса. Если запрос отклоняется, уведомление остаётся активным.",
        "People with the": "По умолчанию лица с ролями",
        "organization owner": "владельца организации",
        "or": "или",
        "security manager": "менеджера по безопасности",
        "role can review and approve dismissal requests by default. The state of previously dismissed alerts does not change when enabling this feature.": "могут проверять и одобрять запросы на закрытие уведомлений. При включении этой функции статус ранее закрытых уведомлений не изменяется.",
        "The dismissal and approval process is visible on the alert timeline, included on the audit log, and accessible through both the REST API and webhooks.": "Процесс закрытия и утверждения уведомлений отображается в хронологии уведомлений, включён в журнал аудита и доступен через API REST и вебхуки.",
        "You can enable this feature today for": "Вы можете включить эту функцию уже сегодня для ",
        "code scanning": "сканирования кода",
        "and": " и ",
        "secret scanning": "секретов",
        "in GitHub Enterprise Cloud. It will also be available in version 3.17 of GitHub Enterprise Server.": " в «Облаке „GitHub для предприятий“». Она также станет доступна в версии 3.17 «Сервера „GitHub для предприятий“».",

        // Кнопки репозитория
        // "Fork": "Разветвить",
        "Follow": "Следить",
        "Sponsor": "Спонсировать",

        // Education
        "Back to GitHub Education": "На главную страницу GitHub Education",
        "LaunchPad": "Быстрый старт",
        "Intro to GitHub": "Начало пользования GitHub",
        "Action Items": "Что нужно сделать",
        "Complete the GitHub Flow course": "Пройдите курс по GitHub Flow",
        "Free Benefits": "Бесплатные бонусы",
        "Est. Time": "Ориентировочное время",
        "30 minutes": "30 минут",
        "Level": "Уровень",
        "In this Experience": "В этом курсе",
        "Overview": "Обзор",
        "About this Experience": "О курсе",
        "Take action": "Приступите к выполнению",
        "GitHub flow is a lightweight, branch-based workflow. In this Experience you'll learn the basics of the GitHub Flow including creating and making changes to branches within a repository, as well as creating and merging pull requests. The GitHub flow is useful for everyone, not just developers.": "GitHub Flow — это простой, основанный на ветках рабочий процесс. В этом курсе вы узнаете основы GitHub Flow, включая создание и изменение веток в репозитории, а также создание и принятие запросов на слияние. GitHub Flow полезен для всех, не только для разработчиков.",
        "In four easy steps, you will create a branch, commit a file to that branch, open a pull request and merge that pull request.": "За четыре простых шага вы создадите ветку, внесёте в неё файл, откроете запрос на слияние и подтвердите его.",
        "ACTION ITEM": "ЗАДАНИЕ",
        "Add starred repositories to a list": "Добавьте репозитории, на которые поставили звезду, в список",
        "Incomplete": "Не выполнено",
        "List": "Список",
        "To complete this task, create a list with at least 3 поставил(а) звезду на repos with the list name 'My Repo Watchlist'.": "Чтобы выполнить это задание, создайте список, содержащий не менее трёх репозиториев, на которые вы поставили звезду, с названием «My Repo Watchlist».",
        "See detailed instructions": "Подробные инструкции",
        "Mark complete": "Отметить как выполненное"
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
        // Если элемент находится внутри заголовков Markdown, то не переводим
        if (el.closest('.markdown-heading')) return true;
        // Если элемент находится внутри ячейки с названием каталога, то не переводим
        if (el.closest('.react-directory-filename-column')) return true;
        return false;
    }

    // Функция для перевода блока GitHub Education
    function translateEducationExperience() {
        document.querySelectorAll('.experience__action-item h3').forEach(el => {
            if (el.textContent.includes('Add') && el.textContent.includes('repositories to a list')) {
                el.innerHTML = el.innerHTML.replace(
                    /Add .* repositories to a list/,
                    'Добавьте репозитории, на которые поставили звезду, в список'
                );
            }
        });

        document.querySelectorAll('.experience__action-item p.mt-4.f4').forEach(el => {
            if (el.textContent.includes('To complete this task, create a list with at least 3')) {
                el.innerHTML = el.innerHTML.replace(
                    /To complete this task, create a list with at least 3 .* repos with the list name 'My Repo Watchlist'./,
                    'Чтобы выполнить это задание, создайте список, содержащий не менее трёх репозиториев, на которые вы поставили звезду, с названием «My Repo Watchlist».'
                );
            }
        });

        document.querySelectorAll('.experience__actions-items-labels .Label--attention').forEach(el => {
            if (el.textContent.trim() === 'Incomplete') {
                el.textContent = 'Не выполнено';
            }
        });

        document.querySelectorAll('.experience__actions-items-labels .Label--secondary').forEach(el => {
            if (el.textContent.trim() === 'List') {
                el.textContent = 'Список';
            }
        });

        document.querySelectorAll('.experience__cta .Button--primary .Button-label').forEach(el => {
            if (el.textContent.trim() === 'See detailed instructions') {
                el.textContent = 'Подробные инструкции';
            }
        });

        document.querySelectorAll('.experience__cta .Button--secondary .Button-label').forEach(el => {
            if (el.textContent.trim() === 'Mark complete') {
                el.textContent = 'Отметить как выполненное';
            }
        });
    }

    function translateTextContent() {
        const elements = document.querySelectorAll(
            '.ActionList-sectionDivider-title, .ActionListItem-label, span[data-content], .AppHeader-context-item-label, #qb-input-query, .Truncate-text, h2, button, .Label, a, img[alt], .Box-title, .post__content p, .post__content li'
        );

        elements.forEach(el => {
            // Если элемент подпадает под исключения, пропускаем его
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

        document.querySelectorAll('.Button-label').forEach(btn => {
            if (btn.textContent.trim() === "New") {
                btn.textContent = "Создать";
            }
        });
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
                div.innerHTML = 'Чем ты полезен?';
            } else if (text === 'Learn JS closures') {
                div.innerHTML = 'Научи замыканиям в JavaScript';
            } else if (text === 'List Git history danger zones') {
                div.innerHTML = 'Перечисли опасные зоны в истории Git';
            } else if (text === 'Python env variables guide') {
                div.innerHTML = 'Руководство по переменным окружения в Python';
            } else if (text === 'Python variable passing guide') {
                div.innerHTML = 'Руководство по передаче переменных в Python';
            } else if (text === 'Learn Python star operators') {
                div.innerHTML = 'Расскажи про операторы со звёздочкой в Python';
            } else if (text === 'Explain fork sync process') {
                div.innerHTML = 'Объясни процесс синхронизации форков';
            } else if (text === 'Explain RESTful basics') {
                div.innerHTML = 'Объясни основы RESTful';
            } else if (text === 'Compare JS equality operators') {
                div.innerHTML = 'Сравни операторы равенства в JavaScript';
            } else if (text === 'Understand Java access levels') {
                div.innerHTML = 'Разбери уровни доступа в Java';
            } else if (text === 'Explain CLI repository setup') {
                div.innerHTML = 'Объясни настройку репозитория через CLI';
            } else if (text === 'Learn JS import patterns') {
                div.innerHTML = 'Научи паттернам импортирования в JavaScript';
            } else if (text === 'Explore Java Map Iterations') {
                div.innerHTML = 'Исследуй способы итерации по Map в Java';
            } else if (text === 'Explain pull request basics') {
                div.innerHTML = 'Объясни основы запросов на слияние';
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

        document.querySelectorAll('.h5.color-fg-on-emphasis.text-mono').forEach(el => {
            if (el.textContent.trim() === 'LaunchPad') {
                el.textContent = translations['LaunchPad'];
            }
        });

        document.querySelectorAll('.experience__gradient.experience__title').forEach(el => {
            if (el.textContent.trim() === 'Intro to GitHub') {
                el.textContent = translations['Intro to GitHub'];
            }
        });

        // Шрифт Inter
        const educationNavBlock = document.querySelector('.d-flex.flex-justify-center.flex-md-justify-start.pb-5.pb-sm-7');
        if (educationNavBlock) {
            educationNavBlock.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
        }

        document.querySelectorAll('header h1.mb-5').forEach(el => {
            el.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
        });
    }

    function translateExperienceHeaderItems() {
        // Перевод заголовков и текста в блоке experience__header__items
        document.querySelectorAll('.experience__header__item .experience__hero__heading').forEach(el => {
            const text = el.textContent.trim();
            if (translations[text]) {
                el.textContent = translations[text];
            }
        });

        // Перевод основного текста в блоке experience__header__items
        document.querySelectorAll('.experience__header__item p.color-fg-on-emphasis').forEach(el => {
            const text = el.textContent.trim();
            if (translations[text]) {
                el.textContent = translations[text];
            }
        });

        // Шрифт Inter ко всему блоку для лучшей поддержки кириллицы
        document.querySelectorAll('.color-fg-on-emphasis').forEach(el => {
            el.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
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
            if (text === 'Your profile') el.textContent = 'Ваш профиль';
            if (text === 'Your repositories') el.textContent = 'Ваши репозитории';
            // Копайлот — это название сервиса Гитхаба. Но после добавления «your» нельзя сказать, что сервис Гитхаба вдруг стал нашим («Ваш Копайлот»). Он не стал нашим, это игра слов. Фраза «your copilot» означает «ваш помощник».
            if (text === 'Your Copilot') el.textContent = 'Ваш помощник';
            if (text === 'Your projects') el.textContent = 'Ваши проекты';
            if (text === 'Your stars') el.textContent = 'Ваши звёзды';
            if (text === 'Your gists') el.textContent = 'Ваши джисты';
            if (text === 'Your organizations') el.textContent = 'Ваши организации';
            if (text === 'Your enterprises') el.textContent = 'Ваши предприятия';
            if (text === 'Your sponsors') el.textContent = 'Ваши спонсоры';
            if (text === 'Try Enterprise') el.textContent = 'Попробовать GitHub для предприятий';
            if (text === 'Feature preview') el.textContent = 'Тестируемые возможности';
            if (text === 'GitHub Website') el.textContent = 'Сайт GitHub';
            if (text === 'GitHub Docs') el.textContent = 'Документация GitHub';
            if (text === 'GitHub Support') el.textContent = 'Поддержка GitHub';
            if (text === 'GitHub Community') el.textContent = 'Сообщество GitHub';
            if (text === 'Sign out') el.textContent = 'Выйти из учётной записи';
        });
    }

    function translateStarButtons() {
        // Находим все span с классом d-inline внутри кнопок
        document.querySelectorAll('.BtnGroup-item .d-inline').forEach(span => {
            const text = span.textContent.trim();
            if (text === 'Star') {
                span.textContent = translations["Star"] || 'Поставить звезду';
            } else if (text === 'Starred') {
                span.textContent = translations["Starred"] || 'Звезда поставлена';
            }
        });

        // Переводим заголовок в диалоговом окне отмены звезды
        document.querySelectorAll('.Box-title').forEach(title => {
            if (title.textContent.trim() === 'Unstar this repository?') {
                title.textContent = translations["Unstar this repository?"] || 'Убрать звезду с этого репозитория?';
            }
        });

        // Переводим кнопку Unstar в диалоговом окне
        document.querySelectorAll('.btn-danger.btn').forEach(btn => {
            if (btn.textContent.trim() === 'Unstar') {
                btn.textContent = translations["Unstar"] || 'Убрать звезду';
            }
        });
    }

    function translateRepositoryButtons() {
        // Перевод кнопки Sponsor
        document.querySelectorAll('.Button-label .v-align-middle').forEach(span => {
            const text = span.textContent.trim();
            if (text === 'Sponsor') {
                span.textContent = translations["Sponsor"] || 'Спонсировать';
            }
        });

        // Перевод кнопки Watch
        document.querySelectorAll('.prc-Button-Label-pTQ3x').forEach(span => {
            if (span.textContent.trim().startsWith('Watch')) {
                // Сохраняем счётчик
                const counter = span.querySelector('.Counter');
                const counterHTML = counter ? counter.outerHTML : '';

                // Новый текст с сохранённым счетчиком
                span.innerHTML = (translations["Watch"] || 'Следить') +
                    (counterHTML ? ' ' + counterHTML : '');
            }
        });

        // Перевод кнопки Fork
        document.querySelectorAll('.BtnGroup.d-flex').forEach(btnGroup => {
            // Проверяем, что это непереведенная кнопка Fork
            if (btnGroup.textContent.includes('Fork') && !btnGroup.hasAttribute('data-translated-fork')) {
                // Сначала сохраним все важные элементы
                const counter = btnGroup.querySelector('#repo-network-counter');
                const details = btnGroup.querySelector('details');

                // Создаём функцию для глубокого обхода DOM-дерева
                function translateNode(node) {
                    if (node.nodeType === Node.TEXT_NODE) {
                        // Регулярное выражение для поиска слова «Fork» с сохранением пробелов
                        const regex = /(\s*)Fork(\s*)/g;
                        node.textContent = node.textContent.replace(regex,
                            (match, before, after) => before + (translations["Fork"] || 'Разветвить') + after);
                    } else {
                        // Рекурсивный обход всех дочерних узлов
                        for (let i = 0; i < node.childNodes.length; i++) {
                            translateNode(node.childNodes[i]);
                        }
                    }
                }

                // Запускаем перевод с корневого элемента
                translateNode(btnGroup);

                // Отмечаем элемент как обработанный
                btnGroup.setAttribute('data-translated-fork', 'true');
            }
        });
    }

    const observer = new MutationObserver(() => {
        translateTextContent();
        translateAttributes();
        translateCopilotPreview();
        translateTooltips();
        translateGitHubEducation();
        translateExperienceHeaderItems();
        translateEducationExperience()
        translateFilterMenu();
        translateOpenCopilotMenu();
        translateStarButtons();
        translateRepositoryButtons();

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
    translateExperienceHeaderItems();
    translateEducationExperience()
    translateFilterMenu();
    translateOpenCopilotMenu();
    translateStarButtons();
    translateRepositoryButtons();

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
}