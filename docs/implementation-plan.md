# Landing Page — план реализации (общий)

Шаги частей — в отдельных планах. Требования и решения — в SDD-доках, здесь не дублируем.

## SDD (читать сначала)

| Артефакт | Путь |
| --- | --- |
| Как ведём проект | [docs/README.md](./README.md) |
| Закрытые решения | [decisions.md](./decisions.md) |
| Спеки | [specs/](./specs/) |
| Конвенции | [conventions/](./conventions/) |

Курс (баллы, Figma): ссылки в [docs/README.md](./README.md).

---

## Планы по частям

| Часть | План шагов | Спека | Ветка |
| --- | --- | --- | --- |
| Part 1 | [part-1-plan.md](./part-1-plan.md) | [specs/part-1.md](./specs/part-1.md) | `landing-page` |
| Part 2 | [part-2-plan.md](./part-2-plan.md) | [specs/part-2.md](./specs/part-2.md) | `landing-page-part-2` |

---

## Как пользоваться

1. Открыть план текущей части: блок **`## Next`** + её спеку; свериться с **decisions**.
2. Шаги сверху вниз. Один шаг = одна `feat/*` = один короткий контекст чата.
3. После merge шага в part-ветку — `[done]` и сдвиг `## Next`.
4. Git: [conventions/git.md](./conventions/git.md).
5. Не начинать соседний UI-шаг, пока текущий `## Next` не закрыт.
6. Решение или смена поведения → `decisions.md` / спека в том же PR.

---

## Жёсткие ограничения

Делать: semantic HTML, CSS (+ токены), vanilla JS, Chrome latest, адаптив 1440→380, RS git convention.

Не делать: React/Vue/Angular, Bootstrap, TypeScript, Swiper/готовые модалки, вёрстка скриншотами.
