# Modal + card params (Part 2)

## Scope

- Клик по любой части карточки → модалка по центру + затемнение.
- Lock scroll; закрытие: текстовая кнопка Close, overlay, `Escape` (клик внутри окна — нет).
- Данные из того же объекта, что и карточка.
- ≥ 2 параметра; выбранные выделены; связанная информация (цена и т.п.) обновляется без reload.
- Корректный вид на 1440 / 768 / 380 в обеих темах.

## Out of scope

- Реальная оплата / backend
- Готовые библиотеки модалок

## Реализация (feat/modal)

Открытие / закрытие, overlay, Esc. Данные: имя, описание, базовая цена, фото.

| Элемент | Контракт |
| --- | --- |
| Разметка | На `menu.html`: `div.modal#product-modal` (изначально `hidden`, `aria-hidden="true"`). Внутри: затемнение = клик по самому `.modal`; окно `div.modal__dialog[role="dialog"][aria-modal="true"]` с `aria-labelledby="modal-title"`. Контент: `img.modal__photo`, `h2.modal__title#modal-title`, `p.modal__text`, строка `.modal__total` («Total:» + `.modal__price`), примечание `.modal__note`, `button.modal__close` с видимым текстом `Close` внизу `.modal__info` |
| Открытие | Клик по любой части `.card` в каталоге. `js/catalog.js` диспатчит `CustomEvent` `catalog:open-modal` с `detail: { product, imageSrc }`, где `product` — **тот же объект** из массива `products` (через `data-product-index` на карточке). `js/modal.js` слушает событие, заполняет поля из объекта + `imageSrc`, снимает `hidden`, ставит `aria-hidden="false"`, класс `modal--open`, `body.is-modal-open` |
| Центр + overlay | `.modal` — `position: fixed`, на весь viewport, flex-центр, полупрозрачный фон поверх страницы (`z-index` выше header). `.modal__dialog` — карточка поверх затемнения, фон `--color-bg`, токены темы |
| Scroll lock | `body.is-modal-open` и `js/scroll-lock.js` (`html.is-scroll-locked`, `overflow: hidden` на `html`). Фокус на Close — `focus({ preventScroll: true })`, чтобы открытие не сдвигало страницу. Пока окно открыто `scrollY` не меняется; после закрытия позиция та же |
| Закрытие | Текстовая кнопка `.modal__close` («Close»); клик по затемнённой области (`.modal`, не `.modal__dialog`); клавиша `Escape`. Клик внутри `.modal__dialog` не закрывает (`stopPropagation`). Отдельного крестика нет |
| Данные на этом шаге | Имя, описание, базовая цена (`$` + `product.price`), фото карточки |
| Скрипт | `js/modal.js` (`defer` на `menu.html` после `catalog.js`) |
| Адаптив | 1440 и 768: ряд, фото слева, текст справа; кнопка Close на ширину колонки текста. ≤720: одна колонка, фото скрыто, Close на ширину диалога — две колонки с `minmax(11rem, …)` и `minmax(16rem, …)` не влезают и дают скролл диалога. Кадры: `docs/qa/screenshots/[D|T|M] Modal _ *.png` |

## Реализация (feat/modal-params)

Параметры Size / Additives и live-цена из того же объекта продукта. Открытие / закрытие / overlay / Esc / scroll lock — без изменений относительно `feat/modal`.

| Элемент | Контракт |
| --- | --- |
| Разметка | В `.modal__info` после описания: блок `.modal__params` с двумя группами — Size (`.modal__param[data-param="size"]`) и Additives (`.modal__param[data-param="additives"]`). У каждой: подпись `.modal__param-label` и контейнер `.modal__options` (кнопки рендерит JS). Ниже: `.modal__total` (подпись «Total:» и `.modal__price`), статичное `.modal__note` (иконка «i» + текст про нефинальную цену и приложение, шрифт 10px), затем `button.modal__close` |
| Источник | Тот же `product` из `catalog:open-modal`: `product.sizes` (`s` / `m` / `l` с полями `size`, `add-price`) и `product.additives[]` (`name`, `add-price`). Без отдельных копий и без новых иллюстраций — только текст/бейджи из данных |
| Size | Три `button.modal__option` с `data-size="s\|m\|l"`, бейдж `S`/`M`/`L` и объём из `sizes.*.size`. Выбор взаимоисключающий. Выбранный: `modal__option--active` + `aria-pressed="true"` |
| Additives | По одной `button.modal__option` на элемент `additives[]` (`data-additive-index`), бейдж `1…n` и `name`. Мультивыбор (toggle). Выбранный: тот же модификатор и `aria-pressed` |
| Старт при открытии | Size `s` выбран; все additives сняты; цена = `$` + `product.price` с двумя знаками (как на карточке). Состояние предыдущей карточки не сохраняется |
| Live-цена | `base = product.price` + `sizes[selected].add-price` + сумма `add-price` выбранных additives. Формат `$` + `toFixed(2)`. Обновление без reload при клике по опции |
| Клик по опции | Не закрывает модалку (клик внутри `.modal__dialog`) |
| Скрипт | Тот же `js/modal.js` |
| Адаптив | 1440 / 768 / 380, light и dark, токены темы. 1440: опции Size в один ряд, если влезают. 768: тот же ряд фото + текст, опции переносятся. ≤720: без фото, одна колонка, без скролла диалога при высоте ~800. Close и цена в viewport; при росте контента скролл внутри `.modal__dialog`, страница под lock |
