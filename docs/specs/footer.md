# Footer

## Scope

- Одинаковый footer на обеих страницах.
- Контакты (`tel:`, адрес → карта в новой вкладке и т.п.).
- Внешние ссылки (соцсети / GitHub / RS School — по теме).
- Доп. информация по теме (копирайт и т.д.).

## Out of scope

- Формы отправки сообщений (если не входят в выбранный дизайн)
- Иконки соцсетей из макета, пока их нет в `assets/icons/`

## Реализация (feat/header-footer)

Одинаковый footer на `index.html` и `menu.html`. Контакты — кадр «Contact us» от 2026-09-28. Телефон — `tel:`, адрес — карта в новой вкладке. Часы — текст, не ссылка. Иконок пина, трубки и часов в `assets/icons/` нет, в разметке их нет.

| Блок | Значение |
| --- | --- |
| Заголовок | `Contact us` |
| Телефон | `+1 (603) 555-0123` → `tel:+16035550123` |
| Адрес | `8558 Green Rd., LA` → `https://www.google.com/maps/search/?api=1&query=8558+Green+Rd.%2C+LA`, `target="_blank"`, `rel="noopener noreferrer"` |
| Часы | `Mon–Sat: 9:00–23:00` |
| Внешние ссылки | [GitHub](https://github.com/Bogagree), [RS School](https://rs.school/) — новая вкладка |
| Доп. информация | `© 2026 Coffee House` |
