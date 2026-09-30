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
| Заголовок | Один `h1.catalog__title`: «Behind each of our cups hides an amazing surprise». Слово `amazing` — курсив `--color-accent`. Ориентир: `docs/qa/screenshots/[D] Menu _ Coffee.png` |
| Категории | Три `button.catalog__tab` (Coffee / Tea / Dessert) с иконками `assets/icons/coffe_pic.png`, `tea_pic.png`, `dessert_pic.png`. Активна Coffee: заливка `--color-footer`, светлый текст. Tea и Dessert — контур, `aria-disabled="true"` (переключение — `feat/catalog-categories`) |
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

## Переключение категорий (feat/catalog-categories)

Логика в `js/catalog.js` (тот же IIFE). Show-more / modal — не этот шаг.

| Поведение | Контракт |
| --- | --- |
| Старт | При открытии / перезагрузке `menu.html` активна первая категория `coffee`: таб с `data-category="coffee"` имеет `catalog__tab--active` и `aria-pressed="true"`; в списке карточки только `category === "coffee"` |
| Клик по табу | Таб с `data-category` (`coffee` / `tea` / `dessert`) становится единственным активным (`catalog__tab--active`, `aria-pressed="true"`); остальные — без модификатора, `aria-pressed="false"`. Без `aria-disabled` на табах. Список перерисовывается фильтром по выбранной категории без перезагрузки страницы |
| Карточки | Тот же контракт рендера, что в `feat/catalog-data`; фото по порядку внутри выбранной категории. Одновременно видна одна категория |
| Show-more | Клик и reset при смене категории — `feat/catalog-show-more` |

## Show-more (feat/catalog-show-more)

Логика в `js/catalog.js` (тот же IIFE). Modal — не этот шаг. Механизм: кнопка «Show more» (не пагинация). Канон курса: Coffee House ≤768 → сначала 4 карточки.

| Поведение | Контракт |
| --- | --- |
| Брейкпоинт | `MOBILE_MAX = 768`. Мобильный режим: `window.innerWidth <= 768` |
| Лимит | На мобильном без раскрытия видны первые `MOBILE_LIMIT = 4` карточки активной категории; 5+ скрыты CSS (`.catalog:not(.catalog--expanded) .catalog__item:nth-child(n + 5)`). На ширине >768 все карточки категории видны |
| Раскрытие | Модификатор `catalog--expanded` на `section.catalog` снимает скрытие 5+. Ставится при клике Show more; снимается при смене категории |
| Кнопка | `button.catalog__more`. Модификатор `catalog__more--visible` только в мобильном режиме, когда в активной категории есть скрытые карточки (`count > 4` и ещё не раскрыто). Без модификатора — `display: none`. Без `aria-disabled`; когда невидима — `aria-hidden="true"`, `tabindex="-1"` |
| Клик | Добавляет `catalog--expanded`, скрывает кнопку. Без перезагрузки |
| Смена категории | Сбрасывает раскрытие (`catalog--expanded` off): снова начальный набор (4 на мобильном / все на десктопе); кнопка видна только если на мобильном в новой категории > 4 карточек (coffee/dessert — да; tea с 4 — нет) |
| Resize | Слушатель `resize` синхронизирует кнопку с текущей шириной. Переход на >768: кнопка скрыта (карточки и так все видны). Возврат на ≤768: если уже раскрывали — `catalog--expanded` остаётся, кнопка скрыта; иначе — снова 4 + кнопка при наличии остальных |
