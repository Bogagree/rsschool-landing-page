# Git & PR

Источники: [RS Git convention](https://rs.school/docs/git-convention), [PR requirements](https://rs.school/docs/short-track/pull-request-requirements).

## Ветки

```text
main
 └── landing-page                    ← Часть 1; сюда мержим feat/*
      ├── feat/...
      └── PR landing-page → main     ← cross-check, НЕ мержить

 landing-page-part-2 от landing-page
 └── PR landing-page-part-2 → landing-page  ← сдать, НЕ мержить
```

- Feature: `feat/<kebab-case>` (от текущей part-ветки).
- Один шаг плана ≈ одна ветка ≈ один короткий PR в part-ветку.

## Коммиты

- История по шагам, не 1–2 огромных коммита.
- Сообщения по RS convention (`feat:`, `fix:`, `refactor:`, `docs:`, …).

## PR `feat/*` → `landing-page` | `landing-page-part-2`

Кратко: Summary + Test plan + ссылки на затронутые `docs/specs/…` и `docs/decisions.md`.  
Чеклист курса (Task / Screenshot / Deployment / Score) **не заполнять**.  
Футер `Made with Cursor` **не добавлять**.

## PR part → база (cross-check)

Только здесь — полный чеклист курса. Шаблон: `.github/PULL_REQUEST_TEMPLATE.md`.

1. Task URL  
2. Screenshot  
3. Deployment URL  
4. Done / deadline  
5. Self-check / Score  

См. [submit-checklist.md](../submit-checklist.md).
