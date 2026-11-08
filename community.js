/* RepoFA community chunk (lazy): publishers («ناشرها») and per-post comments. Data: data.json → publishers[], comments/<postid>.json.
   All user/publisher text reaches the DOM through textContent; avatars are <img> from github.com with no referrer. */
(function () {
  'use strict';
  var C, root, el = {}, list = [], view = [], shown = 0, mode = 'score', query = '', rowsN = 60;
  var E = function (t, cls, txt) { var n = document.createElement(t); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; };
  var tryc = function (f, d) { try { return f(); } catch (e) { return d; } };
  var fa = function (n) { return C.faN(n); };
  var MODES = [['score', 'به تشخیص ما'], ['stars', 'بیشترین استار'], ['projects', 'بیشترین پروژه'], ['reactions', 'بیشترین واکنش'], ['recent', 'تازه‌ترین فعالیت']];
  var KEY = { score: function (p) { return p.score; }, stars: function (p) { return p.stars; }, projects: function (p) { return p.n; }, reactions: function (p) { return p.rp; }, recent: function (p) { return p.last; } };

  function norm(x) {
    var n = function (v) { return typeof v === 'number' && isFinite(v) ? v : 0; };
    var ids = Array.isArray(x.projects) ? x.projects.filter(function (id) { return C.project(id); }) : [];
    return { login: String(x.login), ids: ids, n: ids.length, stars: n(x.stars), forks: n(x.forks), rp: n(x.reactions_pos), rn: n(x.reactions_neg),
      cp: n(x.comments_pos), cn: n(x.comments_neg), ct: n(x.comments_total), score: n(x.score), last: Date.parse(x.last_post) || 0, key: String(x.login).toLowerCase() };
  }
  function load() {
    var D = C.data(); if (!D || !Array.isArray(D.publishers)) return false;
    list = D.publishers.filter(function (x) { return x && typeof x.login === 'string' && /^[A-Za-z0-9-]{1,39}$/.test(x.login); }).map(norm);
    return true;
  }
  function sortList() { // instant, deterministic: chosen key desc → score desc → login asc
    var k = KEY[mode], q = query.toLowerCase();
    view = list.filter(function (p) { return !q || p.key.indexOf(q) >= 0; });
    view.sort(function (a, b) { return k(b) - k(a) || b.score - a.score || (a.key < b.key ? -1 : a.key > b.key ? 1 : 0); });
  }

  /* ---------- avatar with an initial-letter fallback (fixed box: no layout shift) ---------- */
  function avatar(login, size) {
    var w = E('span', 'pv'); w.style.setProperty('--s', size + 'px'); w.setAttribute('aria-hidden', 'true');
    w.appendChild(E('span', 'pv-l', login.charAt(0).toUpperCase()));
    var i = E('img'); i.alt = ''; i.loading = 'lazy'; i.decoding = 'async'; i.referrerPolicy = 'no-referrer'; i.width = size; i.height = size;
    i.onerror = function () { i.remove(); }; i.src = 'https://github.com/' + encodeURIComponent(login) + '.png?size=' + (size > 40 ? 120 : 80);
    w.appendChild(i); return w;
  }
  function metaLine(p) {
    var m = [fa(p.n) + ' پروژه'];
    if (p.stars) m.push('★ ' + C.compact(p.stars));
    if (p.forks) m.push('فورک ' + fa(p.forks));
    return m.join(' · ');
  }

  /* ---------- list view ---------- */
  function build() {
    root.textContent = ''; el = {};
    var tb = E('div', 'pb-tb'), r1 = E('div', 'pb-r1');
    r1.appendChild(E('h2', 'scope', 'ناشرها'));
    el.count = E('span', 'count'); el.count.setAttribute('aria-live', 'polite'); r1.appendChild(el.count);
    var sw = E('div', 'pb-sort'), sb = E('button', 'pb-sortb'); sb.type = 'button'; sb.setAttribute('aria-haspopup', 'listbox'); sb.setAttribute('aria-expanded', 'false');
    sb.appendChild(E('span', 'k', 'مرتب‌سازی:')); el.sortLabel = E('span', null, ''); sb.appendChild(el.sortLabel);
    var menu = E('ul', 'pb-menu'); menu.setAttribute('role', 'listbox'); menu.setAttribute('aria-label', 'مرتب‌سازی ناشرها'); menu.hidden = true; menu.tabIndex = -1;
    MODES.forEach(function (m) { var li = E('li', null, m[1]); li.setAttribute('role', 'option'); li.setAttribute('data-mode', m[0]); li.id = 'pbm-' + m[0]; menu.appendChild(li); });
    sw.appendChild(sb); sw.appendChild(menu); r1.appendChild(sw); el.sortb = sb; el.menu = menu;
    tb.appendChild(r1);
    var sf = E('div', 'pb-search'), si = E('input'); si.type = 'search'; si.placeholder = 'جست‌وجوی نام کاربری'; si.setAttribute('aria-label', 'جست‌وجوی نام کاربری ناشر'); si.dir = 'ltr';
    si.autocomplete = 'off'; si.spellcheck = false; si.setAttribute('autocapitalize', 'off'); si.value = query; sf.appendChild(si); tb.appendChild(sf); el.search = si;
    root.appendChild(tb);
    el.list = E('ol', 'pb-list'); el.list.setAttribute('aria-label', 'فهرست ناشرها'); root.appendChild(el.list);
    el.state = E('div', 'state'); el.state.hidden = true; root.appendChild(el.state);
    el.sent = E('div'); el.sent.setAttribute('aria-hidden', 'true'); root.appendChild(el.sent);
    var qt; si.addEventListener('input', function () { clearTimeout(qt); qt = setTimeout(function () { query = si.value.trim(); paint(); }, 100); });
    si.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { e.preventDefault(); focusRow(0); } else if (e.key === 'Escape' && si.value) { si.value = ''; query = ''; paint(); } });
    sb.addEventListener('click', function () { toggleMenu(menu.hidden); });
    sb.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { e.preventDefault(); toggleMenu(true); } });
    menu.addEventListener('click', function (e) { var li = e.target.closest('[data-mode]'); if (li) pick(li.getAttribute('data-mode')); });
    menu.addEventListener('keydown', function (e) {
      var opts = Array.prototype.slice.call(menu.children), i = opts.findIndex(function (o) { return o.id === menu.getAttribute('aria-activedescendant'); });
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); i = (i + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length; active(opts[i]); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (i >= 0) pick(opts[i].getAttribute('data-mode')); }
      else if (e.key === 'Escape' || e.key === 'Tab') { toggleMenu(false); sb.focus(); }
    });
    document.addEventListener('click', function (e) { if (!menu.hidden && !e.target.closest('.pb-sort')) toggleMenu(false); });
    el.list.addEventListener('keydown', function (e) {
      var r = e.target.closest('.pb-row'); if (!r) return;
      var all = Array.prototype.slice.call(el.list.querySelectorAll('.pb-row')), i = all.indexOf(r);
      if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); if (i === all.length - 1) more(); focusRow(i + 1); }
      else if (e.key === 'ArrowUp' || e.key === 'k') { e.preventDefault(); if (i === 0) el.search.focus(); else focusRow(i - 1); }
      else if (e.key === 'Home') { e.preventDefault(); focusRow(0); }
      else if (e.key === 'Escape') { e.preventDefault(); el.search.focus(); }
    });
    el.list.addEventListener('click', function (e) { var r = e.target.closest('.pb-row'); if (r) open(r.getAttribute('data-login')); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { if (en[0].isIntersecting) more(); }, { rootMargin: '600px 0px' }).observe(el.sent);
  }
  function toggleMenu(on) {
    el.menu.hidden = !on; el.sortb.setAttribute('aria-expanded', on ? 'true' : 'false');
    if (on) { active(el.menu.querySelector('[data-mode="' + mode + '"]')); el.menu.focus(); }
  }
  function active(li) { el.menu.querySelectorAll('[role=option]').forEach(function (o) { o.setAttribute('aria-selected', o === li ? 'true' : 'false'); }); el.menu.setAttribute('aria-activedescendant', li.id); }
  function pick(m) { mode = m; toggleMenu(false); el.sortb.focus(); paint(); C.haptic('select'); }
  function focusRow(i) { var all = el.list.querySelectorAll('.pb-row'); var r = all[Math.max(0, Math.min(i, all.length - 1))]; if (r) { all.forEach(function (x) { x.tabIndex = -1; }); r.tabIndex = 0; r.focus(); } }
  function rowEl(p, rank) {
    var li = E('li'), b = E('button', 'pb-row'); b.type = 'button'; b.tabIndex = -1; b.setAttribute('data-login', p.login);
    b.appendChild(E('span', 'pb-rank num', rank)); b.appendChild(avatar(p.login, 32));
    var m = E('span', 'pb-main'), lg = E('bdi', 'pb-login', p.login); lg.dir = 'ltr'; m.appendChild(lg); m.appendChild(E('span', 'pb-meta', metaLine(p)));
    b.appendChild(m);
    var fig = mode === 'score' ? fa(p.score) : mode === 'reactions' ? (p.rp ? '+' + fa(p.rp) : '') : mode === 'recent' ? (p.last ? C.rel(p.last) : '') : '';
    if (fig) b.appendChild(E('span', 'pb-fig', fig));
    b.setAttribute('aria-label', p.login + '، ' + metaLine(p) + (mode === 'score' ? '، امتیاز ' + fa(p.score) : ''));
    li.appendChild(b); return li;
  }
  function paint() {
    sortList(); shown = 0; el.list.textContent = '';
    el.sortLabel.textContent = MODES.filter(function (m) { return m[0] === mode; })[0][1];
    el.count.textContent = fa(view.length) + ' ناشر';
    el.state.hidden = !!view.length;
    if (!view.length) { el.state.textContent = ''; el.state.appendChild(E('h3', null, query ? 'ناشری با «' + query + '» پیدا نشد' : 'فهرست ناشرها هنوز منتشر نشده')); el.state.appendChild(E('p', null, query ? 'بخشی از نام کاربری گیت‌هاب را امتحان کنید.' : 'ربات این بخش را همراه فهرست پروژه‌ها منتشر می‌کند.')); }
    more(); var f = el.list.querySelector('.pb-row'); if (f) f.tabIndex = 0;
  }
  function more() { // chunked: 60 rows at a time (≈900 publishers stay smooth)
    if (shown >= view.length) return;
    var fr = document.createDocumentFragment(), end = Math.min(view.length, shown + rowsN);
    for (var i = shown; i < end; i++) fr.appendChild(rowEl(view[i], C.faN(i + 1)));
    shown = end; el.list.appendChild(fr);
  }
  function showList(r, core) {
    C = core; root = r;
    if (!list.length && !load()) { root.textContent = ''; var st = E('div', 'state'); st.appendChild(E('h3', null, 'فهرست ناشرها هنوز منتشر نشده')); st.appendChild(E('p', null, 'ربات این بخش را همراه فهرست پروژه‌ها منتشر می‌کند.')); root.appendChild(st); return; }
    if (!el.list || !root.contains(el.list)) build();
    paint();
  }

  /* ---------- publisher detail (pane / sheet) ---------- */
  function open(login) {
    if (!list.length) load();
    var key = String(login).toLowerCase(), p = list.filter(function (x) { return x.key === key; })[0];
    if (!p) { C.notice('ناشری با این نام در فهرست نیست.'); return; }
    var d = E('article', 'd pd');
    var h = E('div', 'pd-h'); h.appendChild(avatar(p.login, 56));
    var ht = E('div', 'pd-ht'), t = E('h2', 'pd-login'); t.id = 'd-title'; var lg = E('bdi', null, p.login); lg.dir = 'ltr'; t.appendChild(lg); ht.appendChild(t);
    var a = E('a', 'link', 'پروفایل در GitHub'); a.href = 'https://github.com/' + encodeURIComponent(p.login); a.target = '_blank'; a.rel = 'noopener noreferrer'; a.setAttribute('data-ext', 'gh'); a.insertAdjacentHTML('beforeend', C.IC('ext')); ht.appendChild(a);
    h.appendChild(ht); d.appendChild(h);
    var dl = E('dl', 'pd-tot');
    [['پروژه', fa(p.n)], ['استار', p.stars ? C.compact(p.stars) : '—'], ['فورک', p.forks ? fa(p.forks) : '—'], ['امتیاز', fa(p.score)]].forEach(function (x) { var w = E('div'); w.appendChild(E('dt', null, x[0])); var dd = E('dd', x[0] === 'استار' ? 'num' : null, x[1]); w.appendChild(dd); dl.appendChild(w); });
    d.appendChild(dl);
    var how = E('details', 'pd-how'); how.appendChild(E('summary', null, 'امتیاز چطور حساب می‌شود؟'));
    how.appendChild(E('p', null, '۳ × استار + ۲ × واکنش مثبت + ۱ × کامنت مثبت − ۱ × واکنش منفی'));
    how.appendChild(E('p', 'pd-calc', 'برای این ناشر: ۳ × ' + fa(p.stars) + ' + ۲ × ' + fa(p.rp) + ' + ۱ × ' + fa(p.cp) + ' − ۱ × ' + fa(p.rn) + ' ≈ ' + fa(p.score)));
    how.appendChild(E('p', 'pd-note', 'واکنش‌ها و کامنت‌های هر پست به صاحب اولین مخزن آن پست نسبت داده می‌شود؛ وزن‌ها در ربات قابل تنظیم‌اند.'));
    d.appendChild(how);
    var sec = E('section', 'd-sec'); sec.appendChild(E('h3', 'd-h', 'پروژه‌ها · ' + fa(p.n)));
    var ul = E('div', 'pd-rows'); ul.setAttribute('role', 'list');
    p.ids.slice(0, 100).forEach(function (id) { var r = tryc(function () { return C.rowFor(C.project(id)); }, null); if (r) ul.appendChild(r); });
    sec.appendChild(ul); d.appendChild(sec);
    var f = E('button', 'btn primary pd-filter', 'نمایش این ناشر در فهرست اصلی'); f.type = 'button'; f.onclick = function () { C.setPub(p.login, p.ids); };
    d.appendChild(f);
    C.openPanel(d);
    tryc(function () { history.replaceState(history.state, '', location.pathname + location.search + '#/p/' + encodeURIComponent(p.login)); });
  }

  /* ---------- comments of a post: ./comments/<postid>.json ---------- */
  var SENT = { p: ['مثبت', 'pos'], n: ['منفی', 'neg'], g: ['خنثی', 'neu'] };
  function comments(box, p, core) {
    C = core; box.textContent = ''; box.setAttribute('aria-busy', 'true');
    var more = function () { var a = E('a', 'link', 'بیشتر در گروه'); var u = /^https:\/\/t\.me\/[A-Za-z0-9_]{4,32}\/\d+$/.test(p.tg_url || '') ? p.tg_url + '?comment=1' : p.tg_url; if (!u) return null; a.href = u; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.setAttribute('data-ext', 'tg'); return a; };
    C.feed('comments/' + encodeURIComponent(p.id) + '.json', { cache: 'no-cache' }).then(function (r) { if (r.status === 404) return null; if (!r.ok) throw r.status; return r.json(); }).then(function (j) {
      box.setAttribute('aria-busy', 'false');
      var items = j && Array.isArray(j.items) ? j.items.filter(function (x) { return x && x.t != null; }).slice(-50) : [];
      if (!items.length) { box.appendChild(E('p', 'cm-none', 'کامنتی ثبت نشده است.')); var m0 = more(); if (m0) box.appendChild(m0); return; }
      var head = E('p', 'cm-sum'); head.textContent = fa(+j.n || items.length) + ' کامنت' + (+j.pos ? ' · ' + fa(+j.pos) + ' مثبت' : '') + (+j.neg ? ' · ' + fa(+j.neg) + ' منفی' : ''); box.appendChild(head);
      var ids = {}; items.forEach(function (x) { ids[x.id] = 1; });
      var ol = E('ol', 'cm-list');
      items.forEach(function (x) {
        var li = E('li', 'cm-i' + (x.r != null && ids[x.r] ? ' re' : '')), s = SENT[x.s] || SENT.g;
        var hd = E('p', 'cm-h'), dot = E('span', 'cm-dot ' + s[1]); dot.setAttribute('role', 'img'); dot.setAttribute('aria-label', 'لحن: ' + s[0]);
        hd.appendChild(dot); var au = E('bdi', 'cm-a', String(x.a || 'ناشناس').slice(0, 64)); hd.appendChild(au);
        var at = Date.parse(x.d); if (at) hd.appendChild(E('time', 'cm-d', C.rel(at)));
        li.appendChild(hd);
        var tx = E('p', 'cm-t', String(x.t).slice(0, 600)); tx.dir = 'auto'; li.appendChild(tx);
        ol.appendChild(li);
      });
      box.appendChild(ol); var m = more(); if (m) box.appendChild(m);
    }).catch(function () {
      box.setAttribute('aria-busy', 'false'); box.appendChild(E('p', 'cm-none', 'کامنت‌ها بارگیری نشد.'));
      var b = E('button', 'btn', 'تلاش دوباره'); b.type = 'button'; b.onclick = function () { comments(box, p, core); }; box.appendChild(b);
    });
  }

  window.__rfPubs = { list: showList, open: function (login) { open(login); }, comments: comments, focusSearch: function () { if (el.search && document.contains(el.search)) { el.search.focus(); el.search.select(); return true; } return false; } };
})();
