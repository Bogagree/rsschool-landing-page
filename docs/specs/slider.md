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
- Autoplay — в спеке Part 2 не требуется

## Реализация (feat/slider-logic)

Логика и анимация на главной (`index.html`, `section.slider#favorite-coffee`). Скрипт: `js/slider.js` (IIFE, `defer`), только на `index.html`. Vanilla JS, без Swiper и UI-библиотек.

| Поведение | Контракт |
| --- | --- |
| Prev / next | Кнопки `.slider__control--prev` / `--next` листают в свою сторону. Циклически: после последнего — первый, до первого — последний. Без `disabled` и без `aria-disabled`. На ≤380 кнопки скрыты: кадр меняется свайпом по `.slider__stage` (порог ~40px по горизонтали) и кликом по индикатору |
| Слайды | ≥ 3 `li.slider__item` с фото `coffee-slider-1/2/3.png`. Одновременно виден один слайд; соседние в разметке, обрезаны `overflow: hidden` на `.slider__stage` (без `display: none`). Горизонтального скролла страницы нет |
| Анимация | `transform: translateX(…)` на `.slider__list`, CSS `transition`. При `prefers-reduced-motion: reduce` — transition отключён |
| Подпись | У каждого слайда внутри `li`: название, описание и цена. 1 — S'mores Frappuccino, `$5.50`. 2 — Caramel Macchiato, `$5.00`. 3 — Ice coffee, `$4.50`. Тексты те же, что у трёх кадров слайдера Coffee House |
| Индикаторы | Под ценой, по центру кадра: три кнопки `.slider__indicator` (по одной на слайд). Полоска ~30×3px, зазор ~10px, `border-radius` полный. Неактивная `#C1B6AD` (`--color-primary`), активная `#665F55` в светлой теме и `--color-text` в тёмной, плюс `aria-current="true"`. Класс `.slider__indicator--active` совпадает с видимым кадром. Клик по полоске открывает этот слайд |
| Autoplay | Нет |
| Resize | Работает на 1440 / 768 / 380; после resize translate пересчитывается/сохраняется корректно |
| Стили | Стрелки — `assets/icons/arrow-left.svg` и `arrow-right.svg` (CSS mask, `currentColor`). Hover controls — только opacity, без сдвига соседей |

## Реализация (feat/home-slider-markup)

Только разметка и внешний вид. Переключение, автопроигрывание и обработчики смены слайда — `feat/slider-logic` (Часть 2).

Figma MCP по-прежнему без edit access, node слайдера неизвестен. Заголовок — имя слоя `favorite-coffee` из [hero.md](./hero.md): «Favorite coffee», слово `Favorite` — `em.slider__accent`, как акцент в hero. Подписи напитков и цены в экспорте нет, поэтому не выдуманы: три элемента — фото из `assets/images/`.

| Элемент | Контракт |
| --- | --- |
| Секция | `section.slider#favorite-coffee` на главной. Якорь nav: `index.html#favorite-coffee` (подпись ссылки остаётся `Slider`) |
| Элементы | Три `li` с `img`: `coffee-slider-1.png`, `coffee-slider-2.png`, `coffee-slider-3.png`. PNG 530×530, RGBA. На всех ширинах виден первый слайд по центру (кадры `[D]`/`[T]`/`[M]` Home): подпись S'mores Frappuccino, описание, `$5.50`. Остальные два в разметке, `display: none`. Переключение — Часть 2 |
| Controls | `button.slider__control` prev/next. Иконки `assets/icons/arrow-left.svg` и `arrow-right.svg` |
| Индикаторы | Не добавлены: в плане ассетов есть стрелки, отдельных индикаторов нет, макет не прочитан |

Колонка — `.slider__inner.container`. About и Extra — отдельные секции (`feat/home-extra-sections`).

## Адаптив (feat/responsive)

- Заголовок: «Choose your favorite coffee», `favorite` — курсив.
- Стрелки по бокам фото на 1440 и 768. На ≤380 стрелки скрыты, под фото подпись и индикаторы; смена — свайп и клик по полоске.
- Без горизонтального скролла.
