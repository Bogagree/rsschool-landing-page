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

## D-007: Agent factory и артефакт QA

- Status: Accepted
- Date: 2026-09-23
- Почему: один шаг плана должен идти одним пайплайном, а вердикт QA — жить в репо, не в чате

Скиллы в git: `.cursor/skills/landing-page-orchestrator`, `landing-page-developer`, `landing-page-reviewer`, `landing-page-qa`. Правило: `.cursor/rules/agent-factory.mdc`.

Пайплайн: Developer → Reviewer → QA → PR в part-ветку (`landing-page`, позже `landing-page-part-2`). Не мержить без пользователя. `feat/*` PR — Summary + Test plan, без чеклиста курса и без `Made with Cursor`.

QA-отчёт: `docs/qa/<feat-slug>.md` (`feat/header-footer` → `header-footer.md`): статус и заметки, без PNG в git. Проверки — чеклист шага (семантика, нет горизонтального скролла, 1440/768/380, контраст темы если тема есть, hover не сдвигает соседей). Это не pixel-perfect 375/768/1920. Пока P-001 не `Accepted` и макета нет, QA вёрстки — BLOCKED. Docs-only шаг: QA SKIPPED.

---

## P-001: Вариант выполнения — Coffee House

- Status: Accepted
- Date: 2026-09-23
- Почему: пользователь назвал готовый макет курса, а не авторский проект

Вариант: **Coffee House**. Авторская тема не выбиралась.

| Поле | Значение |
| --- | --- |
| Тема / бренд | Coffee House |
| Макет | [Coffee House 2026Q3](https://www.figma.com/design/yuc5s9NCc4jENkk5LdFfvX/Coffee-House-2026Q3?node-id=0-1) |
| fileKey | `yuc5s9NCc4jENkk5LdFfvX` |
| Известный node | `0:1` (страница из URL курса, `node-id=0-1`) |
| URL каталога | `menu.html` |

Бинарники из Figma в этом шаге не скачаны. `get_metadata` вернул отсутствие edit access; повторный импорт не делался. Заглушки не добавлять. Список для ручного экспорта — в [specs/overview.md](./specs/overview.md). В описании PR Части 1 (`landing-page` → `main`) указать вариант Coffee House.
