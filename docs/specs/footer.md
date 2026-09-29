# Footer

## Scope

- Одинаковый footer на обеих страницах.
- Контакты (`tel:`, адрес → карта в новой вкладке и т.п.).
- Внешние ссылки (соцсети / GitHub / RS School — по теме).
- Доп. информация по теме (копирайт и т.д.).

## Out of scope

- Формы отправки сообщений (если не входят в выбранный дизайн)
- Отдельные файлы иконок в `assets/icons/`: в футере они inline SVG

## Реализация (feat/header-footer)

Одинаковый footer на `index.html` и `menu.html`. Ориентир — `docs/qa/screenshots/`. Телефон — `tel:`, адрес — карта в новой вкладке. Часы — текст, не ссылка. Иконки пина, трубки, часов и соцсетей — inline SVG.

| Блок | Значение |
| --- | --- |
| Заголовок | `Contact us` |
| Телефон | `+1 (603) 555-0123` → `tel:+16035550123` |
| Адрес | `8558 Green Rd., LA` → `https://www.google.com/maps/search/?api=1&query=8558+Green+Rd.%2C+LA`, `target="_blank"`, `rel="noopener noreferrer"` |
| Часы | `Mon–Sat: 9:00–23:00` |
| Внешние ссылки | [GitHub](https://github.com/Bogagree), [RS School](https://rs.school/) — новая вкладка |
| Слоган | `Sip, Savor, Smile.` цветом страницы, следующая строка `It's coffee time!` курсивом `#b0907a` |
| Соцсети | Круглые кнопки Twitter, Instagram, Facebook. GitHub и RS School остаются текстовыми ссылками |
| Контакты | Слева иконка, справа текст: адрес, телефон, часы. На ≥769 колонка справа от слогана; на ≤768 под иконками |
