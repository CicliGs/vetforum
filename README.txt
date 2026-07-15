Демо-лендинг vetforum.by (статическая версия)
=============================================

Структура исходников
--------------------
partials/          — HTML-фрагменты страницы (navbar, hero, секции, модалки и т.д.)
index.src.html     — шаблон с маркерами <!-- PARTIAL:имя -->
build.ps1          — собирает итоговый index.html из шаблона и partials/

css/               — стили
  bootstrap.min.css
  tokens.css, base.css, responsive.css
  main.css         — точка входа (@import модулей)
  components/      — кнопки, навбар, модалки, утилиты
  sections/        — стили секций (hero, about, footer и др.)
style.css          — совместимый вход: @import url("css/main.css"); в HTML лучше подключать css/main.css напрямую

js/                — скрипты
  jquery-1.12.0.js, bootstrap.js, jquery.maskedinput.min.js
  main.js          — основная логика страницы
  regmodal.js      — модалки регистрации/входа
  demo.js          — демо-режим форм

Как собрать перед деплоем
-------------------------
1. Внесите правки в partials/*.html и/или index.src.html, css/, js/.
2. В этой папке выполните:
     powershell -File .\build.ps1
3. Проверьте обновлённый index.html (ссылки на css/main.css, js/main.js, js/regmodal.js, js/demo.js).
4. Задеплойте содержимое (для GitHub Pages — push; workflow обновит gh-pages).

Как открыть локально
--------------------
1. После сборки откройте index.html в браузере (двойной клик).
2. Или в этой папке: python -m http.server 8080 → http://localhost:8080

GitHub Pages
------------
1. Settings → Pages → Deploy from a branch → gh-pages / (root)
2. Запушьте эту папку в репозиторий vetforum
3. Workflow сам обновит ветку gh-pages после push в main
4. Сайт: https://cicligs.github.io/vetforum/

prune-for-pages.ps1 оставляет нужные css/ (включая components/ и sections/) и js/ (main.js, regmodal.js, demo.js и зависимости).

Работает: вёрстка, меню, карусель, модалки регистрации и входа.
Не работает: реальная отправка заявок на почту.

Модалки:
- «Зарегистрироваться» / «Принять участие»
- «Стать партнером» / «Стать спикером»
- «Акт сдачи-приемки…» в футере (вход)
