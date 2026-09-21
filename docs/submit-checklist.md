# Чеклист сдачи Landing Page

В **Cross-Check: Submit** нужна ссылка на **Pull Request**, не на репозиторий и не на деплой отдельно.

---

## Часть 1 (после вёрстки)

1. Работа в ветке `landing-page` (от `main`).
2. Задеплой сайт (GitHub Pages / Netlify). Ссылка должна открывать **главную** в режиме инкогнито.
3. Открой PR: `landing-page` → `main`.
4. **Не мержи и не закрывай** PR.
5. Описание PR по шаблону (ниже / `.github/PULL_REQUEST_TEMPLATE.md`):
   - URL задания
   - скриншот
   - URL деплоя
   - дата сдачи / дедлайн
   - self-check по критериям Части 1
   - вариант: Coffee House или авторский
6. В RS App → **Cross-Check: Submit** вставь ссылку на этот PR.
7. После старта cross-check проверь назначенные работы.

### Пример ссылки для Submit (Часть 1)

```text
https://github.com/Bogagree/rsschool-landing-page/pull/<номер>
```

---

## Часть 2 (после JS)

1. Ветка `landing-page-part-2` от `landing-page`.
2. Обнови деплой.
3. PR: `landing-page-part-2` → `landing-page` (не мержить).
4. Submit ссылки на этот второй PR в RS App.

---

## Деплой через GitHub Pages (когда появится `index.html`)

В ветке `landing-page`, после появления корневого `index.html`:

```powershell
# Settings → Pages → Source: Deploy from a branch
# Branch: landing-page, folder: / (root)
```

Или через CLI (после первого коммита с сайтом):

```powershell
gh api repos/Bogagree/rsschool-landing-page/pages -X POST -f build_type=legacy -f source[branch]=landing-page -f source[path]=/
```

Ожидаемый URL (если логин GitHub = `Bogagree`):

```text
https://bogagree.github.io/rsschool-landing-page/
```

Альтернатива: Netlify Drop / Netlify с Git — тоже подходит по заданию.

---

## Что уже подготовлено в репо

- [x] Публичный репозиторий
- [x] Служебный `main` (README, `.gitignore`, docs, шаблон PR)
- [x] Ветка `landing-page` на remote
- [ ] Реализация Части 1
- [ ] Деплой
- [ ] PR Части 1 → Submit
