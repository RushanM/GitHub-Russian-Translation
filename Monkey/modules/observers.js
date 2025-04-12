// Модуль наблюдателей за DOM
const DOMObservers = {
    // Инициализация MutationObserver для отслеживания изменений DOM
    startObserving: function(translations) {
        // Основной наблюдатель за DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                // Проверяем изменения в атрибутах
                if (mutation.type === 'attributes') {
                    this.handleAttributeChanges(mutation.target, translations);
                }
                // Проверяем новые добавленные узлы
                else if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.handleNewElement(node, translations);
                        }
                    });
                }
            });
        });

        // Настраиваем наблюдатель
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['aria-label', 'placeholder', 'title'],
        });
        
        // Наблюдаем за появлением модальных окон
        this.observeModals(translations);
        
        // Наблюдаем за изменениями заголовка страницы
        this.observePageTitle(translations);
        
        return observer;
    },
    
    // Обработка изменений атрибутов
    handleAttributeChanges: function(element, translations) {
        // Переводим атрибуты aria-label, placeholder и title
        ['aria-label', 'placeholder', 'title'].forEach(attr => {
            if (element.hasAttribute(attr)) {
                const originalText = element.getAttribute(attr);
                if (originalText && translations[originalText]) {
                    element.setAttribute(attr, translations[originalText]);
                }
            }
        });
    },
    
    // Обработка новых элементов в DOM
    handleNewElement: function(element, translations) {
        // Проверяем, не является ли элемент частью исключений
        if (TranslationUtils.isExcludedElement(element)) {
            return;
        }
        
        // Обрабатываем специфические элементы
        this.processHeaderElements(element, translations);
        this.processModalElements(element, translations);
        this.processTooltips(element, translations);
        
        // Переводим текстовые узлы в добавленном элементе
        this.translateTextNodesInElement(element, translations);
        
        // Переводим атрибуты
        this.translateAttributes(element, translations);
    },
    
    // Перевод текстовых узлов внутри элемента
    translateTextNodesInElement: function(element, translations) {
        const textNodes = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            { 
                acceptNode: function(node) {
                    if (!node.textContent.trim() || 
                        node.parentElement.tagName === 'SCRIPT' || 
                        node.parentElement.tagName === 'STYLE') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        
        let currentNode;
        while (currentNode = textNodes.nextNode()) {
            if (TranslationUtils.isExcludedElement(currentNode.parentElement)) {
                continue;
            }
            
            const originalText = currentNode.textContent.trim();
            if (!originalText) continue;
            
            // Проверяем, есть ли прямой перевод
            if (translations[originalText]) {
                currentNode.textContent = currentNode.textContent.replace(
                    originalText, 
                    translations[originalText]
                );
                continue;
            }
            
            // Обрабатываем время и даты
            const text = currentNode.textContent.trim();
            if (/^(\d+) (hours?|minutes?|days?|weeks?) ago$/.test(text)) {
                this.translateRelativeTime(currentNode, translations);
            } 
            else if (/^[A-Z][a-z]{2} \d{1,2}, \d{4}, \d{1,2}:\d{2}\s*(AM|PM)\s*GMT\+3$/.test(text)) {
                const translated = TranslationUtils.translateAbsoluteTime(text, translations);
                if (translated !== text) {
                    currentNode.textContent = currentNode.textContent.replace(text, translated);
                }
            }
        }
    },
    
    // Перевод атрибутов элемента
    translateAttributes: function(element, translations) {
        const elementsWithAttrs = element.querySelectorAll('[aria-label], [placeholder], [title]');
        elementsWithAttrs.forEach(el => {
            ['aria-label', 'placeholder', 'title'].forEach(attr => {
                if (el.hasAttribute(attr)) {
                    const originalText = el.getAttribute(attr);
                    if (originalText && translations[originalText]) {
                        el.setAttribute(attr, translations[originalText]);
                    }
                }
            });
        });
    },
    
    // Обработка элементов в заголовке
    processHeaderElements: function(element, translations) {
        // Поиск и перевод элементов в шапке
        const headerElements = element.querySelectorAll('.AppHeader-globalBar-item');
        headerElements.forEach(item => {
            // Ищем элементы меню в шапке
            const menuText = item.querySelector('.AppHeader-item-label');
            if (menuText && translations[menuText.textContent.trim()]) {
                menuText.textContent = translations[menuText.textContent.trim()];
            }
        });
    },
    
    // Обработка модальных окон
    processModalElements: function(element, translations) {
        // Перевод заголовков модальных окон
        const modalTitles = element.querySelectorAll('.Overlay-headerTitle');
        modalTitles.forEach(title => {
            if (translations[title.textContent.trim()]) {
                title.textContent = translations[title.textContent.trim()];
            }
        });
        
        // Перевод кнопок в модальных окнах
        const modalButtons = element.querySelectorAll('.Overlay-footer .btn');
        modalButtons.forEach(btn => {
            if (translations[btn.textContent.trim()]) {
                btn.textContent = translations[btn.textContent.trim()];
            }
        });
    },
    
    // Обработка всплывающих подсказок
    processTooltips: function(element, translations) {
        const tooltips = element.querySelectorAll('.Tooltip, .tooltip');
        tooltips.forEach(tooltip => {
            const tooltipText = tooltip.getAttribute('aria-label');
            if (tooltipText && translations[tooltipText]) {
                tooltip.setAttribute('aria-label', translations[tooltipText]);
            }
        });
    },
    
    // Перевод относительного времени
    translateRelativeTime: function(node, translations) {
        const text = node.textContent.trim();
        
        const timeRegexes = [
            { pattern: /^(\d+) hours? ago$/, key: 'hour', count: match => parseInt(match[1]) },
            { pattern: /^(\d+) minutes? ago$/, key: 'minute', count: match => parseInt(match[1]) },
            { pattern: /^(\d+) days? ago$/, key: 'day', count: match => parseInt(match[1]) },
            { pattern: /^(\d+) weeks? ago$/, key: 'week', count: match => parseInt(match[1]) }
        ];
        
        for (const { pattern, key, count } of timeRegexes) {
            const match = text.match(pattern);
            if (match) {
                const numValue = count(match);
                let translationKey;
                
                if (numValue === 1) {
                    translationKey = `${key}_singular`;
                } else if (numValue >= 2 && numValue <= 4) {
                    translationKey = `${key}_few`;
                } else {
                    translationKey = `${key}_many`;
                }
                
                if (translations.time && translations.time[translationKey]) {
                    const translation = translations.time[translationKey].replace('{count}', numValue);
                    node.textContent = node.textContent.replace(text, translation);
                }
                return;
            }
        }
    },
    
    // Наблюдение за появлением модальных окон
    observeModals: function(translations) {
        // Наблюдатель для портала модальных окон
        const portalContainer = document.getElementById('portal');
        if (portalContainer) {
            const modalObserver = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                // Перевод модальных окон с задержкой для полной загрузки
                                setTimeout(() => {
                                    this.handleNewElement(node, translations);
                                }, 100);
                            }
                        });
                    }
                });
            });
            
            modalObserver.observe(portalContainer, {
                childList: true,
                subtree: true
            });
        }
    },
    
    // Наблюдение за изменениями заголовка страницы
    observePageTitle: function(translations) {
        // Сохраняем оригинальную функцию смены заголовка
        const originalTitleSetter = Object.getOwnPropertyDescriptor(Document.prototype, 'title').set;
        
        // Устанавливаем свой перехватчик
        Object.defineProperty(document, 'title', {
            set: function(newTitle) {
                // Убираем в конце " · GitHub"
                let translatedTitle = newTitle;
                if (newTitle.endsWith(' · GitHub')) {
                    const basePart = newTitle.substring(0, newTitle.length - 9);
                    if (translations[basePart]) {
                        translatedTitle = translations[basePart] + ' · GitHub';
                    }
                }
                // Вызываем оригинальную функцию
                originalTitleSetter.call(this, translatedTitle);
            }
        });
    }
};

// Экспорт объекта наблюдателей в глобальную область видимости
window.DOMObservers = DOMObservers;
