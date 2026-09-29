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

## Реализация (feat/home-slider-markup)

Только разметка и внешний вид. Переключение, автопроигрывание и обработчики смены слайда — `feat/slider-logic` (Часть 2).

Figma MCP по-прежнему без edit access, node слайдера неизвестен. Заголовок — имя слоя `favorite-coffee` из [hero.md](./hero.md): «Favorite coffee», слово `Favorite` — `em.slider__accent`, как акцент в hero. Подписи напитков и цены в экспорте нет, поэтому не выдуманы: три элемента — фото из `assets/images/`.

| Элемент | Контракт |
| --- | --- |
| Секция | `section.slider#favorite-coffee` на главной. Якорь nav: `index.html#favorite-coffee` (подпись ссылки остаётся `Slider`) |
| Элементы | Три `li` с `img`: `coffee-slider-1.png` (iced latte), `coffee-slider-2.png` (cortado), `coffee-slider-3.png` (iced coffee). PNG 530×530, RGBA. На ≥769px — три в ряд. При ≤768 виден только первый слайд (CSS); переключение — Часть 2 |
| Controls | `button.slider__control` prev/next, `aria-disabled="true"`, без `disabled` и без JS. Стрелок в `assets/icons/` нет — шевроны на CSS, как полосы бургера |
| Индикаторы | Не добавлены: в плане ассетов есть стрелки, отдельных индикаторов нет, макет не прочитан |

Колонка — `.slider__inner.container`. About и Extra — отдельные секции (`feat/home-extra-sections`).

## Адаптив (feat/responsive)

- ≤768: `.slider__list` — одна колонка; `.slider__item:nth-child(n + 2) { display: none }`.
- ≤380: controls под фото в один ряд (`order` на list).
- Без горизонтального скролла.
