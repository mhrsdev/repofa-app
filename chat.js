/* RepoFA chat — lazily loaded on first open of «گفت‌وگو». Contract: docs/webapi.md (config.json → apiBases, /api/*).
   Model and project text are never parsed as HTML: everything goes through textContent / createElement. */
(function () {
  'use strict';
  var BOT_FALLBACK = 'Michael_chatbot'; // FLAG: used only when config.json has no "botUsername"
  var MAX = 1500, KEEP = 30, LS_TOK = 'rf.tok', LS_CHAT = 'rf.chat';
  var C, root, el = {}, coarse = window.matchMedia && matchMedia('(pointer:coarse)').matches;
  var S = { me: null, quota: null, cid: null, msgs: [], cur: null, ctl: null, uid: null, view: '' };
  var tryc = function (f, d) { try { return f(); } catch (e) { return d; } };
  var E = function (t, cls, txt) { var n = document.createElement(t); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; };
  var fa = function (n) { return C.faN(n); };
  /* a line with any Persian letter is RTL even when it opens with a Latin name; otherwise LTR */
  var dirOf = function (t) { return /[\u0600-\u06FF]/.test(t) ? 'rtl' : 'ltr'; };

  /* ---------- auth ---------- */
  function tg() { var t = C.tg(); return t && t.initData ? t : null; }
  function tok() {
    var o = tryc(function () { return JSON.parse(localStorage.getItem(LS_TOK) || 'null'); }, null);
    if (!o || !o.token) return null;
    var exp = typeof o.exp === 'string' ? Date.parse(o.exp) || 0 : +o.exp || 0; if (exp && exp < 1e12) exp *= 1000;
    return !exp || exp > Date.now() + 30e3 ? o : null;
  }
  function authH() { var t = tg(); if (t) return 'tma ' + t.initData; var k = tok(); return k ? 'Bearer ' + k.token : null; }
  function uid() { var t = tg(); if (t) return tryc(function () { return t.initDataUnsafe.user.id; }, 'tg'); var k = tok(); return k ? k.uid || 'web' : null; }
  function logout() { tryc(function () { localStorage.removeItem(LS_TOK); localStorage.removeItem(LS_CHAT); }); S.me = null; S.msgs = []; S.cid = null; stop(true); show(); }

  /* ---------- API ---------- */
  function api(method, path, body, signal) {
    var base = C.api.base;
    if (!base) { var x = new Error('offline'); x.code = 'offline'; return Promise.reject(x); }
    var h = { Accept: 'application/json' }, a = authH(); if (a) h.Authorization = a; if (body) h['Content-Type'] = 'application/json';
    return fetch(base + path, { method: method, headers: h, body: body ? JSON.stringify(body) : undefined, credentials: 'omit', cache: 'no-store', signal: signal })
      .then(function (r) {
        return r.text().then(function (t) {
          var j = tryc(function () { return t ? JSON.parse(t) : {}; }, {});
          if (j && j.quota) setQuota(j.quota);
          if (r.ok) return j || {};
          var e = new Error('http ' + r.status); e.status = r.status; e.hint = j && (j.hint || (j.error && j.error.hint)) || '';
          e.code = (j && j.error && j.error.code) || (r.status === 401 ? 'auth' : r.status === 429 ? 'rate' : r.status === 413 ? 'too_long' : r.status === 400 ? 'bad_request' : r.status === 404 ? 'expired' : 'internal');
          throw e;
        });
      }, function (e) { if (e && e.name === 'AbortError') throw e; var x = new Error('network'); x.code = 'offline'; C.discover(); throw x; });
  }

  /* ---------- storage: last ~30 messages per account ---------- */
  function load() {
    var o = tryc(function () { return JSON.parse(localStorage.getItem(LS_CHAT) || 'null'); }, null);
    if (o && o.u === S.uid && Array.isArray(o.m)) { S.cid = o.c || null; S.msgs = o.m.slice(-KEEP); } else { S.cid = null; S.msgs = []; }
  }
  var saveT;
  function save() { clearTimeout(saveT); saveT = setTimeout(function () { tryc(function () { localStorage.setItem(LS_CHAT, JSON.stringify({ u: S.uid, c: S.cid, m: S.msgs.slice(-KEEP) })); }); }, 250); }

  /* ---------- safe tiny markdown: paragraphs, lists, `code`, ``` fences, **bold**, http(s) links ---------- */
  var LIST = /^\s*([-*•]|\d+[.)])\s+/;
  function md(text, into) {
    var L = String(text || '').replace(/\r\n?/g, '\n').split('\n'), i = 0;
    while (i < L.length) {
      var ln = L[i];
      if (/^\s*```/.test(ln)) {
        var code = []; i++;
        while (i < L.length && !/^\s*```\s*$/.test(L[i])) code.push(L[i++]);
        i++; var pre = E('pre'), c = E('code', null, code.join('\n')); pre.dir = 'ltr'; pre.appendChild(c); into.appendChild(pre); continue;
      }
      if (/^\s*$/.test(ln)) { i++; continue; }
      if (LIST.test(ln)) {
        var ol = /^\s*\d/.test(ln), list = E(ol ? 'ol' : 'ul'); list.dir = dirOf(ln);
        while (i < L.length && LIST.test(L[i])) { var li = E('li'); li.dir = dirOf(L[i]); inline(L[i].replace(LIST, ''), li); list.appendChild(li); i++; }
        into.appendChild(list); continue;
      }
      if (/^#{1,6}\s+/.test(ln)) { var h = E('p', 'm-h'); h.dir = dirOf(ln); inline(ln.replace(/^#{1,6}\s+/, ''), h); into.appendChild(h); i++; continue; }
      var para = [];
      while (i < L.length && !/^\s*$/.test(L[i]) && !/^\s*```/.test(L[i]) && !LIST.test(L[i]) && !/^#{1,6}\s+/.test(L[i])) para.push(L[i++]);
      var p = E('p'); p.dir = dirOf(para.join(' ')); inline(para.join('\n'), p); into.appendChild(p);
    }
  }
  var INL = /(`[^`\n]+`)|(\*\*[^*\n]+\*\*)|(\[[^\]\n]{1,300}\]\((https?:\/\/[^\s)]+)\))|(https?:\/\/[^\s<>()؀-ۿ«»]+[^\s<>().,;:!?،؛«»"'؀-ۿ])/g;
  function inline(s, into) {
    var last = 0, m; INL.lastIndex = 0;
    var re = new RegExp(INL.source, 'g');
    while ((m = re.exec(s))) {
      if (m.index > last) into.appendChild(document.createTextNode(s.slice(last, m.index)));
      if (m[1]) into.appendChild(E('code', null, m[1].slice(1, -1)));
      else if (m[2]) { var b = E('strong'); b.textContent = m[2].slice(2, -2); into.appendChild(b); }
      else if (m[3]) link(m[3].slice(1, m[3].indexOf('](')), m[4], into);
      else if (m[5]) link(m[5], m[5], into);
      last = re.lastIndex;
    }
    if (last < s.length) into.appendChild(document.createTextNode(s.slice(last)));
  }
  function link(text, url, into) {
    var a = E('a', null, text); a.href = url;
    if (!/^https?:$/.test(a.protocol)) { into.appendChild(document.createTextNode(text)); return; }
    a.target = '_blank'; a.rel = 'noopener noreferrer'; a.setAttribute('data-ext', /^https:\/\/t\.me\//.test(a.href) ? 'tg' : 'gh');
    if (text === url) a.dir = 'ltr';
    into.appendChild(a);
  }

  /* ---------- quota line ---------- */
  function when(v) {
    if (v == null || v === '') return '';
    var t = typeof v === 'number' ? (v < 1e12 ? v * 1000 : v) : Date.parse(v); if (!t) return '';
    var s = (t - Date.now()) / 1000;
    if (s <= 60) return 'به‌زودی';
    if (s < 3600) return fa(Math.ceil(s / 60)) + ' دقیقه‌ی دیگر';
    if (s < 86400) return 'ساعت ' + tryc(function () { return new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit' }).format(t); }, '');
    return fa(Math.round(s / 86400)) + ' روز دیگر';
  }
  function setQuota(q) {
    if (!q || typeof q !== 'object') return; S.quota = q;
    if (!el.quota) return;
    var w = when(q.resets_at), rem = +q.remaining || 0, txt;
    if (q.limit != null && rem <= 0) txt = 'سهمیه‌ی امروز تمام شده' + (w ? '؛ بازنشانی ' + w : '');
    else if (q.limit != null) txt = fa(rem) + ' پیام از ' + fa(+q.limit + (+q.bonus || 0)) + ' باقی مانده' + (+q.bonus ? ' (' + fa(+q.bonus) + ' هدیه)' : '') + (w ? '؛ بازنشانی ' + w : '');
    else txt = '';
    el.quota.textContent = txt;
    el.quota.classList.toggle('out', q.limit != null && rem <= 0);
    syncComposer();
  }

  /* ---------- views ---------- */
  function clear() { root.textContent = ''; el = {}; }
  function line(text, retry) {
    clear(); var w = E('div', 'c-line'); w.appendChild(E('p', null, text));
    if (retry) { var b = E('button', 'btn', 'تلاش دوباره'); b.type = 'button'; b.onclick = retry; w.appendChild(b); }
    root.appendChild(w); S.view = 'line';
  }
  /* redirect-mode login (mirror): Telegram appends id, first_name, …, auth_date, hash to the auth URL */
  function consumeRedirectAuth() {
    var q = tryc(function () { return new URLSearchParams(location.search); }, null);
    if (!q || !q.get('tgauth') || !q.get('hash') || !q.get('id')) return false;
    var user = {}; ['id', 'first_name', 'last_name', 'username', 'photo_url', 'auth_date', 'hash'].forEach(function (k) { if (q.get(k) != null) user[k] = k === 'id' || k === 'auth_date' ? +q.get(k) : q.get(k); });
    tryc(function () { history.replaceState(null, '', location.pathname + '#/chat'); });   // the signed fields leave the address bar at once
    loginView(); window.__rfTgAuth(user); return true;
  }
  function show() {
    if (consumeRedirectAuth()) return;
    if (!C.api.base) {
      line('گفت‌وگو در حال حاضر در دسترس نیست. فهرست پروژه‌ها بدون آن کار می‌کند.', function () { line('در حال اتصال…'); C.discover(true).then(show); });
      return;
    }
    if (!authH()) return loginView();
    var u = uid();
    if (S.uid !== u) { S.uid = u; load(); }
    if (S.view !== 'chat') chatView();
    if (!S.me) me();
    var last = S.msgs[S.msgs.length - 1];
    if (last && last.r === 'a' && last.st === 'running' && last.job && !S.cur) run(last);
  }
  function me() {
    if (el.quota && !S.quota) el.quota.textContent = tg() ? 'در حال ورود…' : '';
    api('GET', '/api/me').then(function (j) {
      S.me = j.user || {};
      if (j.features && j.features.chat === false) return line('گفت‌وگو برای این حساب فعال نیست.');
      if (j.quota) setQuota(j.quota);
      if (el.who) el.who.textContent = S.me.name ? S.me.name : '';
    }, function (e) {
      if (e.status === 403) return line('دسترسی این حساب به گفت‌وگو محدود شده است. فهرست پروژه‌ها مثل قبل کار می‌کند.');
      if (e.code === 'auth') return authFail();
      if (el.quota) el.quota.textContent = e.code === 'offline' ? 'اتصال به سرور برقرار نیست' : '';
    });
  }
  /* inside Telegram a 401 means the app was launched from another bot (initData is signed with that bot's token):
     never a login prompt — point to Michael's bot instead. The catalog keeps working without any API call. */
  function botName() { return C.api.cfg && /^[A-Za-z0-9_]{5,32}$/.test(C.api.cfg.botUsername || '') ? C.api.cfg.botUsername : ''; }
  function otherBot() {
    clear(); S.view = 'line'; var w = E('div', 'c-line'), b = botName();
    w.appendChild(E('p', 'm-err-h', 'گفت‌وگو فقط از داخل ربات مایکل کار می‌کند.'));
    w.appendChild(E('p', null, 'این مینی‌اپ از ربات دیگری باز شده است. فهرست پروژه‌ها، جستجو و ذخیره‌شده‌ها همین‌جا کار می‌کنند.'));
    if (b) { var a = E('a', 'btn primary', 'باز کردن در ربات مایکل'); a.href = 'https://t.me/' + b + '?start=repofa'; a.setAttribute('data-ext', 'tg'); a.target = '_blank'; a.rel = 'noopener noreferrer'; w.appendChild(a); }
    root.appendChild(w);
  }
  function authFail() {
    if (tg()) { stop(true); return otherBot(); }
    tryc(function () { localStorage.removeItem(LS_TOK); }); S.me = null; loginView('نشست شما منقضی شده است؛ دوباره وارد شوید.');
  }

  function loginView(note) {
    clear(); S.view = 'login';
    var bot = botName() || BOT_FALLBACK;
    var w = E('div', 'c-login');
    w.appendChild(E('h2', null, 'ورود به گفت‌وگو'));
    if (note) w.appendChild(E('p', 'c-note', note));
    w.appendChild(E('p', null, 'گفت‌وگو با مایکل به حساب تلگرام شما وصل است و از همان سهمیه‌ی روزانه‌ی ربات استفاده می‌کند. فهرست پروژه‌ها بدون ورود هم کار می‌کند.'));
    var box = E('div', 'c-widget'); box.id = 'c-widget'; w.appendChild(box);
    var st = E('p', 'c-sub', 'در حال بارگیری دکمه‌ی ورود تلگرام…'); w.appendChild(st);
    w.appendChild(E('p', 'c-sub', 'تلگرام فقط نام، نام کاربری و شناسه‌ی عمومی حساب را به ربات می‌فرستد؛ نه شماره‌ی تلفن و نه پیام‌ها.'));
    var open = E('p', 'c-sub'); open.appendChild(document.createTextNode('داخل تلگرام ورود لازم نیست: '));
    var a = E('a', 'link', 'باز کردن ربات'); a.href = 'https://t.me/' + bot; a.setAttribute('data-ext', 'tg'); a.target = '_blank'; a.rel = 'noopener noreferrer'; open.appendChild(a); w.appendChild(open);
    root.appendChild(w);
    window.__rfTgAuth = function (user) {
      st.textContent = 'در حال ورود…';
      api('POST', '/api/auth/widget', user).then(function (j) {
        if (!j.token) throw Object.assign(new Error('no token'), { code: 'auth' });
        tryc(function () { localStorage.setItem(LS_TOK, JSON.stringify({ token: j.token, exp: j.expires_at || j.exp, uid: (j.user && j.user.id) || (user && user.id) })); });
        S.view = ''; show();
      }, function (e) { st.textContent = e.code === 'offline' ? 'اتصال به سرور برقرار نیست؛ دوباره تلاش کنید.' : 'ورود تأیید نشد؛ دوباره تلاش کنید.'; });
    };
    var failed = function () {
      if (S.view !== 'login' || box.querySelector('iframe,button')) return;
      st.textContent = 'دکمه‌ی ورود تلگرام بارگیری نشد (telegram.org در دسترس نیست).';
      var r = E('button', 'btn', 'تلاش دوباره'); r.type = 'button'; r.onclick = function () { loginView(note); }; st.after(r);
    };
    var s = document.createElement('script');
    s.async = true; s.src = 'https://telegram.org/js/telegram-widget.js?22';
    s.setAttribute('data-telegram-login', bot); s.setAttribute('data-size', 'large'); s.setAttribute('data-radius', '6');
    // the widget runs data-onauth through eval; under the mirror's strict CSP use its redirect mode instead (signed fields come back in the query)
    if (C.mirror) s.setAttribute('data-auth-url', location.origin + location.pathname + '?tgauth=1#/chat'); else s.setAttribute('data-onauth', '__rfTgAuth(user)');
    s.setAttribute('data-request-access', 'write'); s.setAttribute('data-lang', 'fa');
    s.onerror = failed; box.appendChild(s);
    setTimeout(function () { if (box.querySelector('iframe,button')) st.textContent = ''; else failed(); }, 8000);
    var obs = new MutationObserver(function () { if (box.querySelector('iframe,button')) { st.textContent = ''; obs.disconnect(); } }); obs.observe(box, { childList: true, subtree: true });
  }

  var EXAMPLES = ['یک کلاینت سبک Xray برای اندروید پیشنهاد بده', 'برای مانیتورینگ سرور خانگی چه ابزار سلف‌هاستی هست؟', 'برای ساخت ایجنت با MCP از کدام پروژه‌ها شروع کنم؟'];
  function chatView() {
    clear(); S.view = 'chat';
    var v = E('div', 'cv');
    var head = E('header', 'c-head'), h = E('div', 'c-hl');
    h.appendChild(E('h2', 'c-title', 'گفت‌وگو با مایکل'));
    el.who = E('span', 'c-who'); h.appendChild(el.who);
    var acts = E('div', 'c-acts');
    var nb = E('button', 'link', 'گفت‌وگوی جدید'); nb.type = 'button'; nb.onclick = reset; acts.appendChild(nb);
    if (!tg()) { var lo = E('button', 'link', 'خروج'); lo.type = 'button'; lo.onclick = logout; acts.appendChild(lo); }
    h.appendChild(acts); head.appendChild(h);
    el.quota = E('p', 'c-quota'); el.quota.setAttribute('aria-live', 'polite'); head.appendChild(el.quota);
    v.appendChild(head);
    el.log = E('div', 'c-log'); v.appendChild(el.log);
    var f = E('form', 'composer'); f.noValidate = true;
    var lab = E('label', 'sr', 'پیام به مایکل'); lab.htmlFor = 'c-in'; f.appendChild(lab);
    el.ta = E('textarea'); el.ta.id = 'c-in'; el.ta.rows = 1; el.ta.maxLength = MAX; el.ta.dir = 'auto'; el.ta.placeholder = 'درباره‌ی یک ابزار یا پروژه‌ی متن‌باز بپرسید';
    el.ta.setAttribute('enterkeyhint', coarse ? 'enter' : 'send'); f.appendChild(el.ta);
    el.cnt = E('span', 'c-cnt num'); el.cnt.hidden = true; f.appendChild(el.cnt);
    el.send = E('button', 'c-send'); el.send.type = 'submit'; el.send.setAttribute('aria-label', 'ارسال'); el.send.innerHTML = C.IC('send'); f.appendChild(el.send);
    el.stop = E('button', 'c-stop'); el.stop.type = 'button'; el.stop.setAttribute('aria-label', 'توقف پاسخ'); el.stop.innerHTML = C.IC('stop') + '<span>توقف</span>'; el.stop.hidden = true; f.appendChild(el.stop);
    if (!coarse) { var hint = E('p', 'c-hint', 'Enter ارسال · Shift+Enter خط جدید'); hint.id = 'c-hint'; f.appendChild(hint); el.ta.setAttribute('aria-describedby', 'c-hint'); }
    v.appendChild(f);
    root.appendChild(v); el.form = f;
    f.addEventListener('submit', function (e) { e.preventDefault(); send(el.ta.value); });
    el.ta.addEventListener('input', grow);
    el.ta.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey && !coarse && !e.isComposing) { e.preventDefault(); send(el.ta.value); }
    });
    el.stop.onclick = function () { stop(); };
    if (window.ResizeObserver) new ResizeObserver(function () { document.documentElement.style.setProperty('--comp-h', f.offsetHeight + 'px'); }).observe(f);
    renderAll(); if (S.quota) setQuota(S.quota); syncComposer();
    if (!coarse && C.isDesk()) el.ta.focus({ preventScroll: true });
  }
  function grow() {
    var t = el.ta, n = t.value.length; t.style.height = 'auto';
    var lh = parseFloat(getComputedStyle(t).lineHeight) || 24; t.style.height = Math.min(t.scrollHeight, lh * 5 + 18) + 'px';
    el.cnt.hidden = n < MAX - 300; el.cnt.textContent = n + '/' + MAX; el.cnt.classList.toggle('over', n >= MAX);
  }
  function syncComposer() {
    if (!el.send) return;
    var busy = !!S.cur, out = S.quota && S.quota.limit != null && +S.quota.remaining <= 0;
    el.send.hidden = busy; el.stop.hidden = !busy; el.send.disabled = !!out;
    el.ta.placeholder = out ? 'سهمیه‌ی امروز تمام شده' : 'درباره‌ی یک ابزار یا پروژه‌ی متن‌باز بپرسید';
    el.form.classList.toggle('busy', busy);
  }

  /* ---------- transcript rendering ---------- */
  function atBottom() { return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 96; }
  function toBottom() { window.scrollTo(0, document.documentElement.scrollHeight); }
  function renderAll() {
    el.log.textContent = '';
    if (!S.msgs.length) { el.log.appendChild(empty()); return; }
    S.msgs.forEach(function (m) { el.log.appendChild(msgEl(m)); });
    live(); requestAnimationFrame(toBottom);
  }
  function empty() {
    var w = E('div', 'c-empty');
    var mk = E('i', 'mk st-mark'); mk.setAttribute('aria-hidden', 'true'); w.appendChild(mk);
    w.appendChild(E('h3', null, 'از کاتالوگ ریپو فا بپرسید'));
    w.appendChild(E('p', null, 'مایکل در فهرست پروژه‌های کانال جستجو می‌کند و با پیوند مخزن پاسخ می‌دهد. هر پیام یکی از پیام‌های روزانه‌ی شما در ربات را مصرف می‌کند.'));
    var ul = E('ul', 'c-ex');
    EXAMPLES.forEach(function (x) { var li = E('li'), b = E('button', null); b.type = 'button'; b.innerHTML = C.IC('prompt'); b.appendChild(E('span', null, x)); b.onclick = function () { send(x); }; li.appendChild(b); ul.appendChild(li); });
    w.appendChild(ul); return w;
  }
  function msgEl(m) {
    var n;
    if (m.r === 'u') { n = E('div', 'm m-u'); var p = E('p', null, m.t); p.dir = dirOf(m.t); n.appendChild(p); return n; }
    n = E('div', 'm m-a'); m._el = n; fill(m); return n;
  }
  function evs(m) { // derive tool activity + result rows from events (cumulative or incremental)
    var tool = null, items = [], seen = {};
    (m.ev || []).forEach(function (e) {
      if (!e || typeof e !== 'object') return;
      if (e.type === 'tool') tool = { name: String(e.name || ''), q: String(e.query || ''), done: false };
      else if (e.type === 'projects' && Array.isArray(e.items)) { if (tool) tool.done = true; e.items.forEach(function (it) { if (it && it.id != null && !seen[it.id]) { seen[it.id] = 1; items.push(it); } }); }
    });
    return { tool: tool, items: items };
  }
  function fill(m) {
    var n = m._el; if (!n) return;
    var d = evs(m), running = m.st === 'running';
    n.textContent = ''; n.setAttribute('aria-busy', running ? 'true' : 'false');
    if (d.tool) {
      var search = d.tool.name === 'repofa_search' || !d.tool.name, fin = d.tool.done || !running;
      var tl = E('p', 'm-tool' + (fin ? '' : ' on')), add = function (x) { tl.appendChild(document.createTextNode(x)); };
      add(fin ? (search ? 'جستجوی کاتالوگ' : 'ابزار ' + d.tool.name) : (search ? 'در حال جستجوی کاتالوگ' : 'در حال اجرای ' + d.tool.name));
      if (d.tool.q) { add(': «'); tl.appendChild(E('bdi', null, d.tool.q)); add('»'); }
      add(fin ? ' · ' + (d.items.length ? fa(d.items.length) + ' نتیجه' : 'نتیجه‌ای نبود') : '…');
      n.appendChild(tl);
    }
    if (d.items.length) {
      var list = E('div', 'm-items'); list.setAttribute('role', 'list'); list.setAttribute('aria-label', 'پروژه‌های پیداشده');
      d.items.slice(0, 8).forEach(function (it) { var r = tryc(function () { return C.rowFor(it); }, null); if (r) list.appendChild(r); });
      n.appendChild(list);
    }
    var body = E('div', 'm-body'); md(m.t, body);
    if (running && !m.t && !d.tool) body.appendChild(E('p', 'm-wait', 'در حال نوشتن…'));
    n.appendChild(body);
    if (m.err) n.appendChild(errEl(m));
    if (!running && (m.t || m.st === 'stopped')) {
      var foot = E('div', 'm-foot');
      if (m.t) { var cp = E('button', 'link'); cp.type = 'button'; cp.innerHTML = C.IC('copy'); cp.appendChild(document.createTextNode('کپی پاسخ')); cp.onclick = function () { C.copyText(m.t, 'پاسخ کپی شد'); }; foot.appendChild(cp); }
      if (m.st === 'stopped') foot.appendChild(E('span', 'm-st', 'متوقف شد'));
      n.appendChild(foot);
    }
  }
  var ERR = {
    quota: ['سهمیه‌ی پیام امروز تمام شده است.', ''],
    busy: ['یک پاسخ دیگر هنوز در جریان است.', 'پس از پایان آن دوباره بفرستید؛ هر حساب در هر لحظه یک پرسش فعال دارد.'],
    rate: ['پیام‌ها پشت سر هم ارسال شدند.', 'چند ثانیه صبر کنید و دوباره بفرستید.'],
    bad_request: ['این پیام پذیرفته نشد.', 'متن را کوتاه‌تر یا ساده‌تر کنید.'],
    too_long: ['پیام از ' + '۱۵۰۰ نویسه بلندتر است.', ''],
    offline: ['اتصال به سرور برقرار نیست.', 'اینترنت یا فیلترشکن را بررسی کنید؛ پیام شما حفظ شده است.'],
    expired: ['این پاسخ دیگر روی سرور در دسترس نیست.', ''],
    blocked: ['دسترسی این حساب به گفت‌وگو محدود شده است.', 'فهرست پروژه‌ها و ذخیره‌شده‌ها مثل قبل کار می‌کنند.'],
    internal: ['پاسخ کامل نشد (خطای سرور).', '']
  };
  function errEl(m) {
    var c = m.err.code in ERR ? m.err.code : 'internal', w = E('div', 'm-err' + (c === 'quota' ? ' quota' : '')), x = ERR[c];
    w.setAttribute('role', 'alert');
    w.appendChild(E('p', 'm-err-h', x[0]));
    if (c === 'quota') {
      var wq = S.quota && when(S.quota.resets_at);
      w.appendChild(E('p', null, (wq ? 'سهمیه ' + wq + ' دوباره پر می‌شود. ' : 'سهمیه روزانه دوباره پر می‌شود. ') + 'تا آن زمان فهرست پروژه‌ها و ذخیره‌شده‌ها بدون محدودیت در دسترس‌اند.'));
      if (m.err.hint) { w.appendChild(E('p', null, String(m.err.hint).slice(0, 300))); return w; }   // the server's own hint (text only)
      var more = E('p', null, 'برای پیام بیشتر می‌توانید از دوستان دعوت کنید یا از مایکل در گروه استفاده کنید؛ جزئیات با دستور '), cmd = E('bdi', 'mono', '/help'); cmd.dir = 'ltr';
      more.appendChild(cmd); more.appendChild(document.createTextNode(' در ربات.')); w.appendChild(more);
    } else if (x[1]) w.appendChild(E('p', null, x[1]));
    if (/offline|internal|rate|busy|expired/.test(c) && m.q) { var b = E('button', 'btn', 'ارسال دوباره'); b.type = 'button'; b.onclick = function () { retry(m); }; w.appendChild(b); }
    return w;
  }
  function live() { // only the last answer is a polite live region
    var as = el.log.querySelectorAll('.m-a');
    as.forEach(function (a, i) { if (i === as.length - 1) a.setAttribute('aria-live', 'polite'); else a.removeAttribute('aria-live'); });
  }
  function update(m) { var b = atBottom(); fill(m); live(); if (b) toBottom(); }

  /* ---------- send / poll / stop ---------- */
  function send(text) {
    text = String(text || '').trim();
    if (!text || S.cur || text.length > MAX) return;
    if (S.quota && S.quota.limit != null && +S.quota.remaining <= 0) { var qm = { r: 'a', t: '', st: 'error', err: { code: 'quota' } }; S.msgs.push(qm); renderAll(); return; }
    if (!S.msgs.length) el.log.textContent = '';
    var um = { r: 'u', t: text }, am = { r: 'a', t: '', st: 'running', ev: [], q: text };
    S.msgs.push(um, am); el.log.appendChild(msgEl(um)); el.log.appendChild(msgEl(am)); live(); toBottom();
    el.ta.value = ''; grow(); save();
    S.cur = am; syncComposer(); C.haptic('impact', 'light');
    api('POST', '/api/chat', { message: text, conversation_id: S.cid || undefined }).then(function (j) {
      if (S.cur !== am) return;
      if (j.conversation_id) S.cid = j.conversation_id;
      am.job = j.job; am.seq = 0; save(); run(am);
    }, function (e) { fail(am, e); });
  }
  function run(am) {
    S.cur = am; syncComposer();
    var tries = 0;
    (function poll() {
      if (S.cur !== am) return;
      var ctl = window.AbortController ? new AbortController() : null, guard = setTimeout(function () { if (ctl) ctl.abort(); }, 25000);
      S.ctl = ctl;
      api('GET', '/api/chat/' + encodeURIComponent(am.job) + '?after=' + (am.seq || 0), null, ctl && ctl.signal).then(function (j) {
        clearTimeout(guard); if (S.cur !== am) return; tries = 0;
        var moved = typeof j.seq === 'number' && j.seq !== am.seq;
        if (typeof j.seq === 'number') am.seq = j.seq;
        if (typeof j.text === 'string') am.t = j.text;
        if (Array.isArray(j.events)) mergeEv(am, j.events);
        if (j.status === 'done') { am.st = 'done'; return finish(am); }
        if (j.status === 'error') { var c = j.error && j.error.code || 'internal'; if (c === 'auth') { finish(am); return authFail(); } am.st = 'error'; am.err = { code: c }; return finish(am); }
        update(am); save();
        setTimeout(poll, moved ? 0 : 900);
      }, function (e) {
        clearTimeout(guard);
        if (S.cur !== am) return;
        if (e && e.name === 'AbortError') return setTimeout(poll, 0);   // long-poll guard elapsed: ask again
        if (e.code === 'auth' && e.status !== 403) { finish(am); return authFail(); }
        if (e.code === 'offline' && ++tries <= 4) return setTimeout(poll, 1500 * tries);
        fail(am, e);
      });
    })();
  }
  function mergeEv(am, list) { // the server sends only events newer than `after`; tolerate repeats
    am.ev = am.ev || []; var seen = {};
    am.ev.forEach(function (e) { seen[e && e.seq != null ? 's' + e.seq : JSON.stringify(e)] = 1; });
    list.forEach(function (e) { var k = e && e.seq != null ? 's' + e.seq : JSON.stringify(e); if (!seen[k]) { seen[k] = 1; am.ev.push(e); } });
  }
  function finish(am) { if (S.cur === am) { S.cur = null; S.ctl = null; } update(am); syncComposer(); save(); if (!coarse && C.isDesk() && el.ta) el.ta.focus({ preventScroll: true }); }
  function fail(am, e) { am.st = 'error'; am.err = { code: e && e.status === 403 ? 'blocked' : e && e.code || 'internal', hint: e && e.hint || '' }; if (am.err.code === 'auth') { finish(am); return authFail(); } finish(am); }
  function stop(silent) {
    var am = S.cur; if (!am) return;
    S.cur = null; if (S.ctl) tryc(function () { S.ctl.abort(); }); S.ctl = null;
    am.st = 'stopped'; if (!silent) { update(am); syncComposer(); save(); }
  }
  function retry(m) {
    var i = S.msgs.indexOf(m); if (i < 1) return;
    S.msgs.splice(i - 1, 2); renderAll(); send(m.q);
  }
  function reset() {
    stop(true);
    if (S.cid) api('POST', '/api/chat/reset', { conversation_id: S.cid }).catch(function () { });
    S.cid = null; S.msgs = []; save(); renderAll(); if (el.ta) el.ta.focus({ preventScroll: true });
  }

  /* phone: keep the composer above the on-screen keyboard */
  if (window.visualViewport) {
    var vv = window.visualViewport, kb = function () {
      var k = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      document.documentElement.style.setProperty('--kb', k + 'px'); document.body.classList.toggle('kb-open', k > 80);
    };
    vv.addEventListener('resize', kb); vv.addEventListener('scroll', kb);
  }

  window.__rfChat = { ready: false, init: function (r, core) { C = core; root = r; this.ready = true; show(); }, show: function () { show(); }, _md: md, _s: S };
})();
