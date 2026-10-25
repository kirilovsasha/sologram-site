"""Build guide.html from the CRM's docs/user-guide.html.

Run after the guide changes in the CRM repo:
    python tools/build_guide.py ../telegram-crm/docs/user-guide.html
The guide itself stays the single source; this adds the site's head tags and the bot buttons.
"""

import sys
from pathlib import Path

BOT = "https://t.me/sologram_crm_bot?start=site"

HEAD = """<title>Руководство пользователя Sologram — CRM в Telegram</title>
<meta name="description" content="Как работать в Sologram: записи, онлайн-запись в боте, чаты с клиентами, заказы и оплаты, чеки НПД, подписка и настройки.">
<link rel="canonical" href="https://sologram.pro/guide.html">
<meta property="og:type" content="article">
<meta property="og:locale" content="ru_RU">
<meta property="og:site_name" content="Sologram">
<meta property="og:url" content="https://sologram.pro/guide.html">
<meta property="og:title" content="Руководство пользователя Sologram">
<meta property="og:description" content="Записи, чаты с клиентами, заказы, оплаты и чеки НПД — как всё устроено.">
<meta property="og:image" content="https://sologram.pro/og.png">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">"""

STYLE = """  .site-bar { position: sticky; top: 0; z-index: 5; display: flex; justify-content: space-between; align-items: center;
    gap: 12px; margin: 0 -16px 4pt; padding: 10px 16px; background: #030d33; color: #e9f4ff; }
  .site-bar a.home { display: flex; align-items: center; gap: 10px; color: inherit; text-decoration: none; font-weight: 700; font-size: 13pt; }
  .site-bar img { width: 32px; height: 32px; border-radius: 9px; }
  .site-btn { display: inline-block; color: #02123d; text-decoration: none; font-weight: 600; border-radius: 10px;
    padding: 9px 14px; font-size: 11pt; background: linear-gradient(100deg, #46e3ff, #2f9bff 45%, #2a5bff); }
  .site-end { text-align: center; margin: 28pt 0 36pt; }
  @media print { .site-bar, .site-end { display: none; } }
</style>"""

BAR = f"""<body>
<div class="site-bar"><a class="home" href="/"><img src="/img/logo-128.webp" width="32" height="32" alt="">Sologram</a><a class="site-btn" href="{BOT}" data-goal="open_bot" rel="noopener">Открыть бота</a></div>"""

END = f"""<div class="site-end"><a class="site-btn" href="{BOT}" data-goal="open_bot" rel="noopener">Открыть бота — 7 дней бесплатно</a></div>
</body>"""


def replace_once(text: str, old: str, new: str) -> str:
    if text.count(old) != 1:
        sys.exit(f"build_guide: expected exactly one {old!r} in the guide")
    return text.replace(old, new)


def main() -> None:
    src = Path(sys.argv[1]).read_text(encoding="utf-8")
    start, end = src.index("<title>"), src.index("</title>") + len("</title>")
    out = src[:start] + HEAD + src[end:]
    out = replace_once(out, "</style>", STYLE)
    out = replace_once(out, "<body>", BAR)
    out = replace_once(out, "</body>", END)
    out = replace_once(out, "<h1>Telegram CRM</h1>", "<h1>Sologram — руководство пользователя</h1>")
    Path(__file__).resolve().parent.parent.joinpath("guide.html").write_text(out, encoding="utf-8")


if __name__ == "__main__":
    main()
