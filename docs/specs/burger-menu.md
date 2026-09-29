# Burger menu (Part 2)

## Scope

- Обе страницы, ширина ≤ 768px.
- Открытие/закрытие по кнопке; плавная анимация; иконка бургер ↔ крестик.
- Панель под header на доступную высоту; lock scroll при открытии.
- Закрытие: ссылка, `Escape`, resize ≥ 769px.
- Ссылки → секции главной или каталог.

## Out of scope

- Десктопная nav (она видна ≥ 769px)

## Реализация (feat/burger-menu)

| Элемент | Контракт |
| --- | --- |
| Кнопка | `button.header__burger`, `aria-controls="burger-panel"`, `aria-expanded` true/false, `aria-label` «Open menu» / «Close menu». Без `aria-disabled`. Видна при `max-width: 768px`. |
| Иконка | Две CSS-полосы `.header__burger-bar`; при `aria-expanded="true"` — крестик через `transform`. |
| Панель | `nav.burger#burger-panel` сразу после `header`. При открытии: класс `burger--open`, `body.is-burger-open` (`overflow: hidden`). `position: fixed` под header на `100dvh − header`. На ≥ 769px не показывается. |
| Ссылки | Центрированный столбец: Favorite coffee, About, Mobile app, Contact us, Menu (+ `burger__menu-icon` / `coffee-cup.svg`). Те же цели, что у десктопной nav; на `menu.html` секции → `index.html#…`. |
| JS | `js/burger.js` (vanilla). Закрытие: клик по ссылке в панели, `Escape`, resize ≥ 769px. |
| Референс | `docs/qa/screenshots/[T] Burger.png` (768), `[M] Burger.png` (380) — открытая панель на бежевом фоне. |
