# Docs — Spec-Driven Development

Landing Page ведётся по **SDD** (как в [minigames](https://github.com/Bogagree/minigames)): требования и решения живут в репозитории и эволюционируют вместе с кодом.

## Карта

| Файл / папка | Назначение |
| --- | --- |
| [decisions.md](./decisions.md) | Закрытые решения (`Accepted`) |
| [specs/](./specs/) | Спеки продукта, частей и фич |
| [conventions/](./conventions/) | Код, git, PR |
| [implementation-plan.md](./implementation-plan.md) | Общий порядок работ |
| [part-1-plan.md](./part-1-plan.md) | Чеклист шагов Части 1 |
| [part-2-plan.md](./part-2-plan.md) | Чеклист шагов Части 2 |
| [submit-checklist.md](./submit-checklist.md) | Сдача cross-check |

## Как работать

1. **Задача** → короткая сессия, одна feature-ветка от `landing-page` (или `landing-page-part-2`).
2. **Перед кодом** → нужная спека + `decisions.md`.
3. **Решение принято** → `Accepted` в `decisions.md` (дата, кратко «почему»).
4. **Поведение изменилось** → обновить спеку в том же PR, что и код.
5. **Задача закрыта** → итог в спеке / decision / PR; длинный чат дальше не тащить.

## Источники курса (вне репо)

Канонические критерии — у RS School. Локальные спеки резюмируют их и фиксируют _наши_ договорённости:

- [Общее описание](https://github.com/rolling-scopes-school/tasks/tree/master/fullstack-engineering/tasks/landing-page)
- [Часть 1. Вёрстка](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/landing-page/README-part-1.md)
- [Часть 2. Функциональность](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/landing-page/README-part-2.md)
- [Макет Coffee House](https://www.figma.com/design/yuc5s9NCc4jENkk5LdFfvX/Coffee-House-2026Q3?node-id=0-1) — выбранный вариант ([P-001](./decisions.md))
- [Git convention](https://rs.school/docs/git-convention) · [PR requirements](https://rs.school/docs/short-track/pull-request-requirements)
