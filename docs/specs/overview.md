# Product & domain overview

## Что это

Учебный лендинг RS School Full-Stack Engineering: две связанные страницы (главная + каталог), адаптив, темы, интерактивность на чистом JS.

## Вариант выполнения

**Accepted ([P-001](../decisions.md)):** Coffee House. Авторский проект не выбран.

| Поле | Значение |
| --- | --- |
| Вариант | Coffee House |
| Тема / бренд | Coffee House |
| Макет | [Coffee House 2026Q3](https://www.figma.com/design/yuc5s9NCc4jENkk5LdFfvX/Coffee-House-2026Q3?node-id=0-1) |
| fileKey | `yuc5s9NCc4jENkk5LdFfvX` |
| Узел страницы | `0:1` |
| Известные узлы (view в браузере) | `[D] Home` Desktop `216:1349`; слой `hero` `216:1370`; заголовок `216:1373` |
| URL каталога | `menu.html` |

## План ассетов (ручной импорт)

Figma MCP не прочитал файл: `get_metadata` для `yuc5s9NCc4jENkk5LdFfvX` вернул отсутствие edit access. Импорт не повторялся. В `assets/` нет скачанных бинарников и нет заглушек.

Отдельные node id слоёв неизвестны. Единственный известный id — страница `0:1`. Экспорт делает пользователь из этой страницы (фреймы Home и Menu, ширины макета, обе темы).

| Что выгрузить | Куда положить | Node id |
| --- | --- | --- |
| Изображения контента Home и Menu (hero, слайдер, остальные секции, карточки) | `assets/images/` | hero-кадр `216:1370`; файл фото внутри кадра не экспортирован |
| Иконки (логотип, бургер, закрытие, стрелки слайдера, соцсети, переключатель темы) | `assets/icons/` | неизвестен (внутри `0:1`) |
| Файлы шрифтов, если макет отдаёт файлы, а не ссылку на веб-шрифт | `assets/fonts/` | неизвестен (внутри `0:1`) |
| Favicon | `assets/favicon.svg` (или `.ico` / `.png`, если в макете не SVG) | неизвестен (внутри `0:1`) |

Имена файлов — по именам слоёв в Figma, латиницей, kebab-case. Не перерисовывать и не подменять иллюстрации.

## Страницы

| Страница | Файл (черновик) | Содержание |
| --- | --- | --- |
| Home | `index.html` | Hero, слайдер, ≥ 2 доп. секции |
| Catalog | `menu.html` | Категории, карточки, show-more / pagination |

Общие: `header`, `footer`, theme toggle, favicon.

## Инварианты (обе части)

- Semantic HTML, Chrome latest
- Адаптив 1440px → 380px без горизонтального скролла
- Выше 1440px: контент по центру, фон на всю ширину
- Нет React/Vue/Angular, Bootstrap, TypeScript, готовых UI-библиотек слайдеров/модалок
- Нельзя верстать скриншотами блоков

## Источники курса

- [README задания](https://github.com/rolling-scopes-school/tasks/tree/master/fullstack-engineering/tasks/landing-page)
- [Part 1](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/landing-page/README-part-1.md)
- [Part 2](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/landing-page/README-part-2.md)
