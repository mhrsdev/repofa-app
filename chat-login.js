/* RepoFA chat — browser login screen (Telegram Login Widget). Loaded by chat.js only when someone outside Telegram has to sign in. */
(function () {
  'use strict';
  window.__rfChatLogin = function (X, note, search) {
    var C = X.C, E = X.E, S = X.S, tryc = X.tryc;
    var bot = X.bot, w = E('div', 'c-login');
    w.appendChild(E('h2', null, 'ورود به گفت‌وگو'));
    if (note) w.appendChild(E('p', 'c-note', note));
    w.appendChild(E('p', null, 'گفت‌وگو با مایکل به حساب تلگرام شما وصل است و از همان سهمیه‌ی روزانه‌ی ربات استفاده می‌کند. فهرست پروژه‌ها بدون ورود هم کار می‌کند.'));
    var box = E('div', 'c-widget'); box.id = 'c-widget'; w.appendChild(box);
    var st = E('p', 'c-sub', 'در حال بارگیری دکمه‌ی ورود تلگرام…'); w.appendChild(st);
    w.appendChild(E('p', 'c-sub', 'تلگرام فقط نام، نام کاربری و شناسه‌ی عمومی حساب را به ربات می‌فرستد؛ نه شماره‌ی تلفن و نه پیام‌ها.'));
    var open = E('p', 'c-sub'); open.appendChild(document.createTextNode('داخل تلگرام ورود لازم نیست: '));
    var a = E('a', 'link', 'باز کردن ربات'); a.href = 'https://t.me/' + bot; a.setAttribute('data-ext', 'tg'); a.target = '_blank'; a.rel = 'noopener noreferrer'; open.appendChild(a); w.appendChild(open);
    X.root.appendChild(w);
    window.__rfTgAuth = function (user) {
      st.textContent = 'در حال ورود…';
      X.api('POST', '/api/auth/widget', user).then(function (j) {
        if (!j.token) throw Object.assign(new Error('no token'), { code: 'auth' });
        tryc(function () { localStorage.setItem(X.tok, JSON.stringify({ token: j.token, exp: j.expires_at || j.exp, uid: (j.user && j.user.id) || (user && user.id) })); });
        S.view = ''; X.show();
      }, function (e) { st.textContent = e.code === 'offline' ? 'اتصال به سرور برقرار نیست؛ دوباره تلاش کنید.' : 'ورود تأیید نشد؛ دوباره تلاش کنید.'; });
    };
    var failed = function () {
      if (S.view !== 'login' || box.querySelector('iframe,button')) return;
      st.textContent = 'دکمه‌ی ورود تلگرام بارگیری نشد (telegram.org در دسترس نیست).';
      var r = E('button', 'btn', 'تلاش دوباره'); r.type = 'button'; r.onclick = function () { X.login(note); }; st.after(r);
    };
    var s = document.createElement('script');
    s.async = true; s.src = 'https://telegram.org/js/telegram-widget.js?22';
    s.setAttribute('data-telegram-login', bot); s.setAttribute('data-size', 'large'); s.setAttribute('data-radius', '6');
    // data-onauth needs eval: the mirror's CSP forbids it, so use redirect mode there
    if (C.mirror) s.setAttribute('data-auth-url', location.origin + location.pathname + '?tgauth=1#/chat'); else s.setAttribute('data-onauth', '__rfTgAuth(user)');
    s.setAttribute('data-request-access', 'write'); s.setAttribute('data-lang', 'fa');
    s.onerror = failed; box.appendChild(s);
    setTimeout(function () { if (box.querySelector('iframe,button')) st.textContent = ''; else failed(); }, 8000);
    var obs = new MutationObserver(function () { if (box.querySelector('iframe,button')) { st.textContent = ''; obs.disconnect(); } }); obs.observe(box, { childList: true, subtree: true });
    // redirect mode (the mirror's CSP forbids the widget's eval): Telegram appends the signed fields to the auth URL
    var q = tryc(function () { return new URLSearchParams(search || ''); }, null);
    if (q && q.get('hash') && q.get('id')) {
      var user = {}; ['id', 'first_name', 'last_name', 'username', 'photo_url', 'auth_date', 'hash'].forEach(function (k) { if (q.get(k) != null) user[k] = k === 'id' || k === 'auth_date' ? +q.get(k) : q.get(k); });
      window.__rfTgAuth(user);
    }
  };
})();
