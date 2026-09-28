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
| About | `section.about#about`. Четыре `img` 726×726: `about-1.jpg` … `about-4.jpg`, сетка 2×2 |
| Extra | `section.extra#extra`. Один `img`: `mobile-screens.png` 630×630, экраны приложения |

Колонки — `.about__inner.container` и `.extra__inner.container`.
