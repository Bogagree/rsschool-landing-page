# Slider / Carousel

## Scope

- Секция на главной, ≥ 3 элемента.
- Элементы управления «вперёд» / «назад» (и индикаторы, если есть в дизайне).

## Part 1

Только вёрстка внешнего вида и controls. Переключение не обязательно.

## Part 2

- Prev/next, циклическое переключение.
- Плавная смена; лишнее скрыто `overflow`.
- Индикаторы синхронны (если есть).
- Корректно на 1440 / 768 / 380 и после resize.

## Out of scope

- Готовые библиотеки (Swiper и т.п.)
- Индикаторы (dots) — в макете/ассетах нет
- Autoplay — в спеке Part 2 не требуется

## Реализация (feat/slider-logic)

Логика и анимация на главной (`index.html`, `section.slider#favorite-coffee`). Скрипт: `js/slider.js` (IIFE, `defer`), только на `index.html`. Vanilla JS, без Swiper и UI-библиотек.

| Поведение | Контракт |
| --- | --- |
| Prev / next | Кнопки `.slider__control--prev` / `--next` листают в свою сторону. Циклически: после последнего — первый, до первого — последний. Без `disabled` и без `aria-disabled` (кнопки всегда доступны) |
| Слайды | ≥ 3 `li.slider__item` с фото `coffee-slider-1/2/3.png`. Одновременно виден один слайд; соседние в разметке, обрезаны `overflow: hidden` на `.slider__stage` (без `display: none`). Горизонтального скролла страницы нет |
| Анимация | `transform: translateX(…)` на `.slider__list`, CSS `transition`. При `prefers-reduced-motion: reduce` — transition отключён |
| Подпись | S'mores Frappuccino / описание / `$5.50` только у слайда 1 (внутри первого `li`). Остальные слайды — фото и существующий `alt`, без выдуманных названий/цен |
| Индикаторы | Нет |
| Autoplay | Нет |
| Resize | Работает на 1440 / 768 / 380; после resize translate пересчитывается/сохраняется корректно |
| Стили | Стрелки и сетка layout как в Part 1; правки CSS только под трек/overflow/анимацию. Hover controls — только opacity, без сдвига соседей |

## Реализация (feat/home-slider-markup)

Только разметка и внешний вид. Переключение, автопроигрывание и обработчики смены слайда — `feat/slider-logic` (Часть 2).

Figma MCP по-прежнему без edit access, node слайдера неизвестен. Заголовок — имя слоя `favorite-coffee` из [hero.md](./hero.md): «Favorite coffee», слово `Favorite` — `em.slider__accent`, как акцент в hero. Подписи напитков и цены в экспорте нет, поэтому не выдуманы: три элемента — фото из `assets/images/`.

| Элемент | Контракт |
| --- | --- |
| Секция | `section.slider#favorite-coffee` на главной. Якорь nav: `index.html#favorite-coffee` (подпись ссылки остаётся `Slider`) |
| Элементы | Три `li` с `img`: `coffee-slider-1.png`, `coffee-slider-2.png`, `coffee-slider-3.png`. PNG 530×530, RGBA. На всех ширинах виден первый слайд по центру (кадры `[D]`/`[T]`/`[M]` Home): подпись S'mores Frappuccino, описание, `$5.50`. Остальные два в разметке, `display: none`. Переключение — Часть 2 |
| Controls | `button.slider__control` prev/next, `aria-disabled="true"`, без `disabled` и без JS. Стрелок в `assets/icons/` нет — шевроны на CSS, как полосы бургера |
| Индикаторы | Не добавлены: в плане ассетов есть стрелки, отдельных индикаторов нет, макет не прочитан |

Колонка — `.slider__inner.container`. About и Extra — отдельные секции (`feat/home-extra-sections`).

## Адаптив (feat/responsive)

- Заголовок: «Choose your favorite coffee», `favorite` — курсив.
- Стрелки по бокам фото на 1440, 768 и 380. Подпись под фото.
- Без горизонтального скролла.
