# Header

Связано: [theme.md](./theme.md), [burger-menu.md](./burger-menu.md).

## Scope

- На обеих страницах одинаковый header.
- Логотип / название → главная.
- `nav` → `ul` / `li` / `a`: якоря секций главной + ссылка на каталог.
- Переключатель светлой/тёмной темы.
- Кнопка бургера видна при ширине ≤ 768px; основная nav скрыта.

## Part 1

Кнопка бургера может быть неактивной (без панели).

## Part 2

Открытие/закрытие панели — [burger-menu.md](./burger-menu.md). Кнопка без `aria-disabled`; панель `nav.burger#burger-panel`; логика в `js/burger.js`.

## Out of scope

- Содержимое секций, на которые ведут якоря
- Детали ключа/`data-theme` — [theme.md](./theme.md) (`feat/theme-localstorage`)
- Детали панели бургера (анимация, lock scroll, закрытие) — [burger-menu.md](./burger-menu.md)

## Реализация (feat/header-footer)

Логотип и иконки темы — экспорт пользователя в `assets/icons/`. SVG бургера в выгрузке нет: кнопка остаётся из CSS-полос.

Одинаковая разметка на `index.html` и `menu.html` (на каталоге у ссылки Menu — `aria-current="page"`).

| Элемент | Контракт |
| --- | --- |
| Название | `img.header__logo-img` → `assets/icons/logo.svg`, `alt="Resource Coffee House"`, ссылка на `index.html`. |
| Nav | `nav` → `ul` → `li` → `a`. Якоря текущих секций каркаса главной и ссылка на каталог. Подписи = роли секций каркаса, не имена слоёв Figma. |
| Тема | `button.header__theme`, `aria-label="Theme"`. Капсула с солнцем и луной сразу: в светлой теме круг `--color-accent` на солнце, в тёмной — на луне. Каждая позиция — блок 36×36; иконка луны внутри блока 18×18. Переключение и `localStorage` — `js/theme.js`. |
| Бургер | `button.header__burger`, `aria-controls="burger-panel"`, `aria-expanded` по состоянию панели. Виден при `max-width: 768px`; `.header__nav` при этой ширине скрыта. Панель и JS — [burger-menu.md](./burger-menu.md) (`feat/burger-menu`). |

| Подпись | href |
| --- | --- |
| Favorite coffee | `#favorite-coffee` (с каталога `index.html#favorite-coffee`) |
| About | `#about` |
| Mobile app | `#extra` |
| Contact us | `#contact` (с каталога `index.html#contact`) |
| Menu | `a.header__menu` → `menu.html`. На десктопе справа от капсулы темы: слово и `assets/icons/coffee-cup.svg` в одной строке, одна линия под ними обоими, без рамки-пилюли. На ≤768 скрыта вместе с nav; видна кнопка бургера |

Когда `feat/home-*` переименует id секций под макет, в том же шаге обновить эту таблицу и href. SVG бургера подставить вместо CSS-полос, когда файл появится в `assets/icons/`.
