// Cookie consent for sologram.pro: Yandex Metrica loads only after the visitor agrees
// (Belarus: Law 99-Z; Russia: 152-FZ). The choice is kept in this browser; the footer link
// "Настройки cookies" (window.sgCookieSettings) shows the banner again.
(function () {
  var KEY = "sg_cookie_consent";
  var YM_ID = 113790224;

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* private mode: ask again next time */ }
  }

  function loadMetrica() {
    if (window.__sgMetrica) return;
    window.__sgMetrica = true;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
      k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=" + YM_ID, "ym");
    window.ym(YM_ID, "init", { ssr: true, webvisor: true, clickmap: true, ecommerce: "dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce: true, trackLinks: true });
  }

  var css =
    ".sg-cookie{position:fixed;left:0;right:0;bottom:0;z-index:40;padding:12px max(12px,env(safe-area-inset-right,0px)) calc(12px + env(safe-area-inset-bottom,0px)) max(12px,env(safe-area-inset-left,0px))}" +
    ".sg-cookie>div{max-width:760px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:12px 16px;padding:16px 18px;border-radius:18px;" +
    "background:#0b2263;color:#e9f4ff;box-shadow:0 20px 50px -10px rgba(0,0,0,.7),inset 0 0 0 1px rgba(140,200,255,.25);" +
    "font:15px/1.5 Onest,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif}" +
    ".sg-cookie p{margin:0;flex:1 1 300px;color:#c9d8f0}.sg-cookie a{color:#39d7ff}" +
    ".sg-cookie .b{display:flex;gap:8px;flex:0 0 auto}" +
    ".sg-cookie button{min-height:44px;padding:0 18px;border-radius:12px;border:0;font:600 15px/1 inherit;font-family:inherit;cursor:pointer}" +
    ".sg-cookie .y{background:linear-gradient(100deg,#46e3ff,#5aa8ff);color:#02123d}" +
    ".sg-cookie .n{background:transparent;color:#e9f4ff;box-shadow:inset 0 0 0 1.5px rgba(140,200,255,.35)}" +
    ".sg-cookie button:focus-visible{outline:2px solid #39d7ff;outline-offset:2px}" +
    "body.sg-cookie-open .sticky-cta{display:none!important}";

  function showBanner() {
    if (document.querySelector(".sg-cookie")) return;
    if (!document.getElementById("sg-cookie-css")) {
      var style = document.createElement("style");
      style.id = "sg-cookie-css";
      style.textContent = css;
      document.head.appendChild(style);
    }
    var box = document.createElement("div");
    box.className = "sg-cookie";
    box.setAttribute("role", "region");
    box.setAttribute("aria-label", "Согласие на cookies");
    box.innerHTML =
      '<div><p>Мы используем cookies и Яндекс Метрику, чтобы понимать, как посетители пользуются сайтом. ' +
      'Подробнее — в <a href="/privacy.html">политике конфиденциальности</a>.</p>' +
      '<div class="b"><button type="button" class="n">Отказаться</button><button type="button" class="y">Принять</button></div></div>';
    function close(value) {
      write(value);
      box.remove();
      document.body.classList.remove("sg-cookie-open");
      if (value === "yes") loadMetrica();
    }
    box.querySelector(".y").addEventListener("click", function () { close("yes"); });
    box.querySelector(".n").addEventListener("click", function () { close("no"); });
    document.body.appendChild(box);
    document.body.classList.add("sg-cookie-open");
  }

  window.sgCookieSettings = function () { showBanner(); return false; };

  function start() {
    var choice = read();
    if (choice === "yes") loadMetrica();
    else if (choice !== "no") showBanner();
  }
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();
