# Home — дополнительные секции

## Scope

- На главной помимо hero и слайдера — ещё **не менее двух** контентных секций.
- Примеры: about, преимущества, отзывы, галерея, CTA-блок — по теме.

## Out of scope

- Каталог (отдельная страница)

## Реализация (feat/home-extra-sections)

Две секции на главной после слайдера. Якоря nav не менялись: `#about` и `#extra`.

Figma MCP по-прежнему без edit access, тексты слоёв неизвестны. Абзацы и слоганы не выдуманы. Заголовки — подписи каркаса из [header.md](./header.md): `About` и `Extra`. Контент — уже лежащие экспорты.

| Элемент | Контракт |
| --- | --- |
| About | `section.about#about`. Цитата из `[D] Home`. Десктоп — две колонки: слева tall woman и short lights, справа short man и tall couple (зазор ~40px, не равные квадраты). ≤768 — woman и couple столбиком. ≤380 — только couple |
| Extra | `section.extra#extra`. Заголовок «Download our app to start ordering», текст, ссылки App Store и Google Play, `mobile-screens.png` справа. ≤768 — столбик: текст, кнопки, телефоны |

Колонки — `.about__inner.container` и `.extra__inner.container`.

## Адаптив (feat/responsive)

- Ориентир: `docs/qa/screenshots/[D] Home.png`, `[T] Home.jpg`, `[M] Home.jpg`.
- Фон страницы `#E1D4C9`, текст `#403F3D` — замер кадра `[D]`.
- Горизонтального скролла нет; >1440 контент по центру.
