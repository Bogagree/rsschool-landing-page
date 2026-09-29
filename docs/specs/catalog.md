# Catalog

Страница каталога (файл: `menu.html`).

## Scope

- ≥ 3 категории + UI переключения.
- В одной категории ≥ 8 карточек.
- Карточка: изображение, заголовок, краткое описание, доп. поле (цена / дата / …).
- UI show-more **или** pagination.

## Part 1

Статическая вёрстка допустима; логика категорий / show-more / модалки не обязательна.

## Part 2

- Данные из `data/products.json` (или `.js`).
- Динамический рендер; одна активная категория.
- Show-more / pagination по правилам курса (Coffee House: ≤768 сначала 4 карточки).
- Клик по карточке → [modal.md](./modal.md).

## Out of scope

- Корзина / оформление заказа

## Реализация (feat/catalog-layout)

Статика на `menu.html`. Figma MCP по-прежнему без edit access; слоган меню из макета не выдуман — `h1` = `Menu`. Иконки категорий и refresh show-more в `assets/icons/` нет, в разметке их нет. Тексты и цены карточек — из [products.json](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/landing-page/products.json) курса. Фото — уже лежащие `coffee-1.jpg` … `coffee-8.jpg`.

| Элемент | Контракт |
| --- | --- |
| Секция | `section.catalog#catalog` в `main.main`, колонка `.catalog__inner.container` |
| Заголовок | Один `h1.catalog__title`: `Menu` |
| Категории | Три `button.catalog__tab` (Coffee / Tea / Dessert), `data-category`, `role="group"`. Активна Coffee (`catalog__tab--active`, `aria-pressed="true"`). Tea и Dessert — UI only, `aria-disabled="true"` (логика — Часть 2) |
| Карточки | 8 `article.card` в категории coffee: фото, `h2.card__title`, `p.card__text`, `p.card__price` (`$…`). На ≥769px — сетка 4 колонки, все 8 видны. При ≤768 — 2 колонки; `.catalog__item:nth-child(n + 5)` скрыты CSS (макет Coffee House) |
| Show-more | `button.catalog__more` «Show more», `aria-disabled="true"`. Видна только при ≤768 (`display: flex`); на десктопе скрыта. Клик — Часть 2 |

## Адаптив (feat/responsive)

- Без горизонтального скролла 1440 → 380; >1440 колонка по центру.
- Hover интерактивов — внутри `@media (hover: hover)`.
- Логика show-more / категорий — не этот шаг.

## Данные и рендер (feat/catalog-data)

- Источник: `data/products.json` — копия [products.json](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/landing-page/products.json) курса (поля без URL картинок).
- Скрипт: `js/catalog.js` на `menu.html` (`defer`). Рендерит в пустой `ul.catalog__list`.
- Активная категория: `coffee` (фильтр по `product.category`). Tea / Dessert / show-more / modal — не этот шаг.
- Фото: `assets/images/{category}-{n}.{ext}` по порядку внутри категории (`coffee` → `.jpg`, `tea` / `dessert` → `.png`, `n` с 1).
- Карточка: тот же контракт — `li.catalog__item` → `article.card` с `img.card__photo`, `h2.card__title`, `p.card__text`, `p.card__price` (`$` + `price`).
