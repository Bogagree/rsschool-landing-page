# Architecture

Связано с [decisions.md](../decisions.md). Меняешь границы слоёв — обнови эту спеку и decision.

## Стек

- HTML + CSS + vanilla JavaScript
- Опционально позже: SCSS, Vite (+ source maps) — только новым `Accepted` decision
- Деплой: GitHub Pages (D-006)

## Слои

```text
index.html          → главная
menu.html           → каталог (имя может смениться с вариантом темы)
css/
  base.css          → reset/normalize-минимум, токены, типографика
  layout.css        → сетка, контейнер, секции
  components.css    → header, footer, cards, slider, modal, …
  themes.css        → light/dark через CSS variables
js/
  theme.js          → Часть 1: переключение темы + localStorage
  main.js           → Часть 2: точки входа по страницам (или отдельные файлы)
  burger.js
  slider.js
  catalog.js
  modal.js
data/
  products.json     → Часть 2: категории и карточки
assets/
  images/
  icons/
  fonts/
  favicon.ico | favicon.svg
docs/               → SDD (не в runtime)
```

## Правила модулей

- Страницы — отдельные HTML с разными URL (не SPA).
- Общий chrome (header/footer/theme) — одинаковая разметка/классы на обеих страницах; JS темы подключается на обеих.
- Карточки каталога в Части 1 могут быть статическим HTML-макетом; в Части 2 — только из `data/`, без дублей в HTML.
- Стили: токены → компоненты; magic colors в компонентах не плодить.

## Токены и контейнер

Контракт `feat/tokens-base` (D-005). Бренд Coffee House — [P-001](../decisions.md).

| Слой | Файл | Что лежит |
| --- | --- | --- |
| Примитивы | `css/base.css` | Отступы, типографика, размер контейнера; базовые стили элементов ссылаются на семантические цвета |
| Семантические цвета | `css/themes.css` | Наборы light/dark на `:root`, `[data-theme='light']`, `[data-theme='dark']` |
| Колонка | `css/layout.css` | `.container` |

Переключатель и `localStorage` — `feat/theme-localstorage` ([theme.md](./theme.md)), не этот шаг.

`.container`: `width: 100%`, `max-width: var(--container-max-width)` (1440px — десктоп из критериев курса), `margin-inline: auto`. Фон секции не вешать на `.container`: выше 1440px колонка по центру, фон может быть на всю ширину. Пока нет полноширинных секций, класс стоит на `<main>`.

`get_variable_defs` для fileKey `yuc5s9NCc4jENkk5LdFfvX`, node `0:1` вернул отсутствие edit access. Повтор не делался, бинарники не скачивались. Цвета в `themes.css` — системные `Canvas` / `CanvasText` / `LinkText` и `color-scheme`, не палитра макета. Числа отступов и кегля — структурный каркас, не замеры Figma. Когда переменные макета появятся, подставить их в эти же имена; каркас не выдавать за бренд.

## Breakpoints (проверка курса)

| Ширина | Фокус |
| --- | --- |
| 1440px | Desktop-дизайн |
| 768px | Tablet; бургер-кнопка |
| 380px | Mobile |
| > 1440px | Контент по центру |
| < 380px | Не проверяется |

Промежуточные брейкпоинты — на усмотрение; горизонтального скролла быть не должно.
