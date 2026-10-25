# sologram.pro

Лендинг Sologram — CRM для самозанятых в Telegram. Статический сайт на GitHub Pages, без сборки.

- `index.html` — главная (оффер, возможности, цена, вопросы, кнопка «Открыть бота»).
- `guide.html` — руководство пользователя. Собирается из `docs/user-guide.html` репозитория CRM, руками не править:
  `python tools/build_guide.py ../telegram-crm/docs/user-guide.html`, затем коммит.
- `og.png` — картинка для превью ссылки (1200×630); логотип — `img/`, `favicon.ico`, `favicon-48.png`, `apple-touch-icon.png`.
- `CNAME` — домен `sologram.pro`; `robots.txt`, `sitemap.xml`, `404.html`.

Кнопки ведут на `https://t.me/sologram_crm_bot?start=site`: бот принимает неизвестный параметр как обычный старт.

## Публикация

Settings → Pages → Source: **Deploy from a branch**, ветка `main`, папка `/ (root)`. Custom domain: `sologram.pro`,
после выдачи сертификата — **Enforce HTTPS**.

DNS у регистратора `sologram.pro` (запись `crm` для Mini App не трогать):

| Тип | Имя | Значение |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | kirilovsasha.github.io |

## Аналитика

Яндекс Метрика 113790224: код в `<head>` `index.html` и в `tools/metrika.html` (его подставляет сборка руководства). В скрипте внизу
`index.html` (`YM_ID`) и руководства клики по кнопкам с `data-goal="open_bot"` уходят целью `open_bot`.
