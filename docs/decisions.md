# Decisions

Закрытые решения. `Accepted` = факт для агента, не «обсуждали в чате».

Формат:

```md
## D-NNN: Короткий заголовок

- Status: Accepted
- Date: YYYY-MM-DD
- Почему: одно предложение

Текст решения.
```

---

## D-001: Репозиторий и ветки по требованиям курса

- Status: Accepted
- Date: 2026-09-21
- Почему: жёсткие требования задания к git-процессу

Публичный репозиторий `rsschool-landing-page`.

```text
main                         ← только служебные файлы
 └── landing-page            ← Часть 1; PR → main, НЕ мержить
      └── landing-page-part-2 ← Часть 2; PR → landing-page, НЕ мержить
```

Feature-ветки: `feat/<kebab-case>` от текущей part-ветки. См. [conventions/git.md](./conventions/git.md).

---

## D-002: Стек — vanilla HTML / CSS / JS

- Status: Accepted
- Date: 2026-09-21
- Почему: общие технические требования задания (−100 за запрещённый стек)

- HTML + CSS + чистый JavaScript.
- Запрещены: React/Vue/Angular, Bootstrap и CSS-фреймворки, TypeScript, готовые слайдеры/модалки/бургеры.
- Допустимы позже (отдельным decision): SCSS, modern-normalize, Vite/Webpack + source maps.

---

## D-003: Документация плана и SDD в репо

- Status: Accepted
- Date: 2026-09-22
- Почему: как в minigames — знания переживают чаты

Держим `docs/` (спеки, decisions, conventions, планы частей) и обновляем вместе с кодом.

---

## D-004: Структура исходников — multi-page, page-first

- Status: Accepted
- Date: 2026-09-22
- Почему: две страницы с разными URL; без SPA/роутера

```text
index.html              → главная
menu.html               → каталог (имя уточняется с вариантом темы)
css/                    → стили (base, layout, components, themes)
js/                     → theme (ч.1); menu, slider, catalog, modal (ч.2)
assets/                 → images, icons, fonts, favicon
data/                   → products.json / products.js (Часть 2)
```

Детали: [specs/architecture.md](./specs/architecture.md).

---

## D-005: CSS-нейминг — BEM + design tokens

- Status: Accepted
- Date: 2026-09-22
- Почему: предсказуемые классы; темы через CSS-переменные

Классы: `header__logo`, `btn--primary`. Цвета/отступы/типографика — CSS custom properties; светлая/тёмная тема переключает набор переменных (класс/`data-theme` на корне).

---

## D-006: Деплой — GitHub Pages (целевой)

- Status: Accepted
- Date: 2026-09-22
- Почему: бесплатный публичный URL для cross-check; альтернатива Netlify допустима без смены decision, если Pages недоступен

Превью после появления `index.html`: ветка `landing-page`, folder `/`.  
Ожидаемый URL: `https://bogagree.github.io/rsschool-landing-page/`

---

## Pending

### P-001: Вариант выполнения

- Coffee House (Figma) **или** авторский проект.
- После выбора: `Accepted` decision + обновить [specs/overview.md](./specs/overview.md) (тема, URL каталога, макет).
- Указать вариант в описании PR Части 1.
