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

## Breakpoints (проверка курса)

| Ширина | Фокус |
| --- | --- |
| 1440px | Desktop-дизайн |
| 768px | Tablet; бургер-кнопка |
| 380px | Mobile |
| > 1440px | Контент по центру |
| < 380px | Не проверяется |

Промежуточные брейкпоинты — на усмотрение; горизонтального скролла быть не должно.
