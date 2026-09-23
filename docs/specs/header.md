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

Открытие/закрытие панели — [burger-menu.md](./burger-menu.md).

## Out of scope

- Содержимое секций, на которые ведут якоря
- Логика переключателя и `localStorage` — [theme.md](./theme.md), шаг `feat/theme-localstorage`
- Панель бургера — [burger-menu.md](./burger-menu.md)

## Реализация (feat/header-footer)

Логотип и иконки темы — экспорт пользователя в `assets/icons/`. SVG бургера в выгрузке нет: кнопка остаётся из CSS-полос.

Одинаковая разметка на `index.html` и `menu.html` (на каталоге у ссылки Menu — `aria-current="page"`).

| Элемент | Контракт |
| --- | --- |
| Название | `img.header__logo-img` → `assets/icons/logo.svg`, `alt="Resource Coffee House"`, ссылка на `index.html`. |
| Nav | `nav` → `ul` → `li` → `a`. Якоря текущих секций каркаса главной и ссылка на каталог. Подписи = роли секций каркаса, не имена слоёв Figma. |
| Тема | `button.header__theme`, `aria-label="Theme"`. Внутри `light.svg` и `dark.svg`. В светлой теме видна `light`, при `data-theme="dark"` — `dark`. Кнопка по-прежнему не переключает тему. |
| Бургер | `button.header__burger`, `aria-expanded="false"`, `aria-disabled="true"`, без панели. Виден при `max-width: 768px`; `.header__nav` при этой ширине скрыта. |

| Подпись | href |
| --- | --- |
| Home | `index.html#hero` |
| Slider | `index.html#slider` |
| About | `index.html#about` |
| Extra | `index.html#extra` |
| Menu | `menu.html` |

Когда `feat/home-*` переименует id секций под макет, в том же шаге обновить эту таблицу и href. SVG бургера подставить вместо CSS-полос, когда файл появится в `assets/icons/`.
