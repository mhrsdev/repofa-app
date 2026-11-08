/* RepoFA mini app — dependency-free. Data: ./data.json (see README). All search/filtering runs on-device. */
(function () {
  'use strict';
  var DATA_URL = './data.json', CHUNK = 30, DEBOUNCE = 120, MAX_AGE_REFRESH = 5 * 60e3, NOTE_MAX = 140, DAY = 864e5;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var tryc = function (f, d) { try { return f(); } catch (e) { return d; } };
  var ls = {
    get: function (k) { return tryc(function () { return localStorage.getItem(k); }, null); },
    set: function (k, v) { tryc(function () { localStorage.setItem(k, v); }); }
  };
  var TG = null; // Telegram.WebApp when running inside Telegram
  var deskMQ = window.matchMedia ? matchMedia('(min-width: 960px)') : { matches: false };
  var isDesk = function () { return deskMQ.matches; };
  var MAC = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  /* ---------- digits by context (README): Persian digits inside Persian phrases (counts, times, Jalali dates, prose);
     Latin mono for data beside identifiers (★, sidebar counts, note counter) ---------- */
  var FA = '۰۱۲۳۴۵۶۷۸۹';
  var toFa = function (s) { return String(s).replace(/[0-9]/g, function (d) { return FA[d]; }); };
  var nfFa = tryc(function () { return new Intl.NumberFormat('fa-IR'); }, null);
  var faN = function (n) { return nfFa ? nfFa.format(n) : toFa(n); };
  var nfEn = new Intl.NumberFormat('en-US');
  var mkDF = function (o) { return tryc(function () { return new Intl.DateTimeFormat('fa-IR-u-ca-persian', o); }, null); };
  var jal = mkDF({ day: 'numeric', month: 'long', year: 'numeric' }), jalMonth = mkDF({ month: 'long', year: 'numeric' });
  /* star counts: <1000 exact · 1.0k–99.9k one decimal · 100k–999k whole k · ≥1M one decimal M (rounded half up, trailing .0 dropped) */
  function compact(n) {
    if (n == null) return '';
    var d = function (x) { return String(Math.round(x * 10) / 10); };
    if (n >= 999950) return d(n / 1e6) + 'M';
    if (n >= 99950) return Math.round(n / 1e3) + 'k';
    if (n >= 1000) return d(n / 1e3) + 'k';
    return String(n);
  }
  function rel(t) {
    if (!t) return '';
    var s = (Date.now() - t) / 1000;
    if (s < 90) return 'همین الان';
    if (s < 3600) return faN(Math.round(s / 60)) + ' دقیقه پیش';
    if (s < 86400) return faN(Math.round(s / 3600)) + ' ساعت پیش';
    if (s < 2 * 86400) return 'دیروز';
    if (s < 7 * 86400) return faN(Math.floor(s / 86400)) + ' روز پیش';
    if (s < 35 * 86400) return faN(Math.floor(s / 604800)) + ' هفته پیش';
    return fullDate(t);
  }
  function fullDate(t) { return jal ? jal.format(t) : toFa(new Date(t).toISOString().slice(0, 10)); }
  /* published prose: Arabic-Indic → Persian; standalone Latin numbers → Persian; numbers glued to Latin words (V2Ray, SOCKS5, 1.75) untouched */
  function proseDigits(s) {
    return String(s || '').replace(/[٠-٩]/g, function (d) { return FA[d.charCodeAt(0) - 1632]; })
      .replace(/(^|[^A-Za-z0-9._\/:#-])([0-9]+)(?![A-Za-z0-9_.\/-])/g, function (m, a, n) { return a + toFa(n); });
  }
  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); };
  /* same normalisation as the pipeline's `q` field */
  function normCh(c) {
    if (/[يى]/.test(c)) return 'ی'; if (c === 'ك') return 'ک'; if (c === 'ة') return 'ه';
    if (/[‌‍\s]/.test(c)) return ' '; if (/[ً-ٟـ]/.test(c)) return '';
    var k = c.charCodeAt(0); if (k >= 1632 && k <= 1641) return String(k - 1632); if (k >= 1776 && k <= 1785) return String(k - 1776);
    return c.toLowerCase();
  }
  function norm(s) {
    return String(s == null ? '' : s).toLowerCase().replace(/[يى]/g, 'ی').replace(/ك/g, 'ک').replace(/ة/g, 'ه')
      .replace(/[‌‍]/g, ' ').replace(/[ً-ٟـ]/g, '')
      .replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 1632; }).replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 1776; })
      .replace(/\s+/g, ' ').trim();
  }
  /* <mark> the query tokens inside original text (maps normalised offsets back to source characters) */
  function hl(text, tokens) {
    text = String(text || '');
    if (!tokens || !tokens.length) return esc(text);
    var N = '', map = [], i, j;
    for (i = 0; i < text.length; i++) { var n = normCh(text[i]); for (j = 0; j < n.length; j++) { N += n[j]; map.push(i); } }
    var marks = [];
    tokens.forEach(function (t) { if (t.length < 1) return; var at = N.indexOf(t); while (at >= 0) { marks.push([map[at], map[at + t.length - 1] + 1]); at = N.indexOf(t, at + t.length); } });
    if (!marks.length) return esc(text);
    marks.sort(function (a, b) { return a[0] - b[0]; });
    var out = '', pos = 0;
    marks.forEach(function (m) { if (m[0] < pos) m[0] = pos; if (m[1] <= m[0]) return; out += esc(text.slice(pos, m[0])) + '<mark>' + esc(text.slice(m[0], m[1])) + '</mark>'; pos = m[1]; });
    return out + esc(text.slice(pos));
  }
  var slug = function (s) { return String(s || '').toLowerCase().replace(/[\s_.\-]+/g, ''); };
  /* the bot's title is often the repo slug re-capitalised: show it only when it says something the name doesn't */
  var titleWorth = function (p) { var r = p.repos[0]; return !r || slug(p.title) !== slug(r.name); };

  /* GitHub's own language colours: real information to this audience, kept as 8px dots only */
  var LANG_COLORS = { JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Go: '#00ADD8', Rust: '#dea584', Kotlin: '#A97BFF', Dart: '#00B4AB', 'C++': '#f34b7d', C: '#555555', Java: '#b07219', Shell: '#89e051', Swift: '#F05138', PHP: '#4F5D95', Ruby: '#701516', HTML: '#e34c26', CSS: '#563d7c', Vue: '#41b883', 'C#': '#178600', Lua: '#000080', Nix: '#7e7eff' };
  var lcol = function (l) { return LANG_COLORS[l] || '#8b8b94'; };
  var dot = function (l) { return '<i class="dot" style="--lc:' + lcol(l) + '" aria-hidden="true"></i>'; };
  var IC = function (n, c) { return '<svg class="ic' + (c ? ' ' + c : '') + '" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; };
  var SEP = '<i class="sep" aria-hidden="true">·</i>';
  var tagBtn = function (t, extra) { return '<button type="button" class="tag' + (/[\u0600-\u06FF]/.test(t) ? ' fa' : '') + '"' + (extra || '') + ' data-tag="' + esc(t) + '">#' + esc(t) + '</button>'; };
  var repoPath = function (r) { return r ? (r.owner ? r.owner + '/' : '') + r.name : ''; };
  var cloneCmd = function (r) { return 'git clone ' + String(r.url).replace(/\/+$/, '') + '.git'; };
  function dPath(r) { // detail: may break only after "/"; an over-long name ellipsises (full path in title)
    return (r.owner ? '<span class="o">' + esc(r.owner) + '</span><span class="sl">/</span><wbr>' : '') + '<span class="nm" title="' + esc(repoPath(r)) + '">' + esc(r.name) + '</span>';
  }

  /* ---------- state ---------- */
  var S = { tab: 'all', q: '', cat: '', col: '', tag: '', lang: '', sort: 'new', fs: '', sel: null };
  var D = null, P = [], byId = new Map(), colById = new Map();
  var rankNew = [], rankStars = [], rankViews = [], order = [], orderStars = [], orderViews = [], hasViews = false;
  var catIdx = new Map(), catCount = {}, tagCount = new Map(), langCount = new Map(), repoTotal = 0;
  var indexReady = false, view = [], shown = 0, newestT = 0, rows = new Map(), grpCount = null, lastGk = null, curTokens = [];
  var favs = new Map();   // id -> {s:'l'|'f', n:note, t:savedAt}
  var etag = null, lastFetch = 0, dirty = false, noteOpen = {};

  var el = {};
  ['app', 'top', 'q', 'q-clear', 'list', 'sentinel', 'state', 'toolbar', 'scope-h', 'scope-x', 'count', 'sort', 'fav-seg', 'tokens', 'notice', 'notice-t', 'notice-x', 'tabs', 'fav-n', 'theme',
    'toast', 't-msg', 't-act', 'sheet', 'sheet-root', 'backdrop', 'updated', 'search-form', 'side', 'cat-list', 'col-list', 'sec-cols', 'lang-list', 'tag-list', 'n-all', 'n-fav',
    'pane', 'fav-tools', 'brand-meta', 'k-hint', 'chat', 'tab-chat', 'nav-chat']
    .forEach(function (id) { el[id] = document.getElementById(id); });

  /* ---------- data load ---------- */
  function setData(d, quiet) {
    if (!d || !Array.isArray(d.projects)) throw new Error('bad data');
    D = d; buildIndex(); renderSide(); renderBrand(); el.app.setAttribute('data-ready', ''); el.toolbar.hidden = false;
    indexReady = true; apply();
    var hid = /^#p=(\d+)/.exec(location.hash);
    if (hid && byId.has(+hid[1]) && sheetId == null) openDetail(+hid[1], { fromHash: true });
    else if (isDesk()) renderPane();
    measure();
    if (quiet) toast('فهرست به‌روز شد');
  }
  var monthMemo = {};
  function monthKey(t) { // Jalali month label, memoised per day so Intl runs a few dozen times, not once per project
    var k = Math.floor(t / DAY);
    return monthMemo[k] || (monthMemo[k] = jalMonth ? jalMonth.format(t) : new Date(t).toISOString().slice(0, 7));
  }
  function buildIndex() { // ONCE per data payload — never on filter / sort / search
    var t0 = performance.now(), i, p, k, r, now = Date.now();
    P = D.projects.filter(function (p) { return p && p.id != null; });
    hasViews = false; byId = new Map(); rows = new Map(); catCount = {}; tagCount = new Map(); langCount = new Map(); catIdx = new Map(); colById = new Map(); repoTotal = 0;
    (D.categories || []).forEach(function (c) { catIdx.set(c.id, c); });
    (D.collections || []).forEach(function (c) { if (c && c.id && Array.isArray(c.project_ids)) colById.set(c.id, { id: c.id, title: c.title, ids: c.project_ids, set: new Set(c.project_ids) }); });
    for (i = 0; i < P.length; i++) {
      p = P[i]; p._i = i;
      p.repos = Array.isArray(p.repos) ? p.repos.filter(function (x) { return x && x.name; }) : [];
      p.title = p.title || (p.repos[0] && p.repos[0].name) || '—';
      p.tags = Array.isArray(p.tags) ? p.tags : [];
      p.summary = proseDigits(p.summary);
      p._t = Date.parse(p.date) || 0;
      var best = 0, names = '';
      for (k = 0; k < p.repos.length; k++) { r = p.repos[k]; if (r.stars > best) best = r.stars; names += ' ' + (r.owner || '') + ' ' + (r.name || ''); }
      repoTotal += p.repos.length;
      r = p.repos[0];
      p._s = r && r.stars ? r.stars : 0;
      p._v = typeof p.views === 'number' && p.views >= 0 ? p.views : -1; if (p._v >= 0) hasViews = true;   // the shown repo's stars (sort and meta agree with the anchor)
      p._l = (r && r.lang) || p.language || '';
      p._n = norm(names + ' ' + p.title);
      var ct = catIdx.get(p.category);
      p._g = norm(p.tags.join(' ') + ' ' + p._l + ' ' + (ct ? ct.title : ''));
      p._q = p.q ? p.q : norm([p.title, p.summary, p.tags.join(' '), names].join(' '));
      var age = now - p._t;   // log-style groups for the newest-first list
      p._gk = age < 7 * DAY ? 'w' : age < 30 * DAY ? 'm' : monthKey(p._t);
      byId.set(p.id, p);
      catCount[p.category || ''] = (catCount[p.category || ''] || 0) + 1;
      for (k = 0; k < p.tags.length; k++) tagCount.set(p.tags[k], (tagCount.get(p.tags[k]) || 0) + 1);
      if (p._l) langCount.set(p._l, (langCount.get(p._l) || 0) + 1);
    }
    var idx = P.map(function (_, i) { return i; });
    idx.sort(function (a, b) { return P[b]._t - P[a]._t || P[b].id - P[a].id; });
    order = idx; rankNew = new Array(P.length); idx.forEach(function (v, r) { rankNew[v] = r; });
    orderStars = idx.slice().sort(function (a, b) { return P[b]._s - P[a]._s || rankNew[a] - rankNew[b]; });
    rankStars = new Array(P.length); orderStars.forEach(function (v, r) { rankStars[v] = r; });
    // views: unknown sorts last (-1), ties keep recency
    orderViews = idx.slice().sort(function (a, b) { return P[b]._v - P[a]._v || rankNew[a] - rankNew[b]; });
    rankViews = new Array(P.length); orderViews.forEach(function (v, r) { rankViews[v] = r; });
    newestT = idx.length ? P[idx[0]]._t : 0;
    window.__indexMs = Math.round((performance.now() - t0) * 10) / 10;
  }

  function fetchData(manual) {
    lastFetch = Date.now();
    return fetch(DATA_URL, { cache: D ? 'no-cache' : 'default', credentials: 'same-origin' }).then(function (res) {   // first fetch can take the <link rel=preload>
      if (!res.ok) throw new Error('HTTP ' + res.status);
      var et = res.headers.get('etag') || res.headers.get('last-modified');
      if (D && et && et === etag) { notice(''); if (manual) toast('فهرست به‌روز است'); return; }
      return res.text().then(function (txt) {
        var d = JSON.parse(txt);
        if (D && d.generated_at && D.generated_at === d.generated_at) { etag = et; notice(''); if (manual) toast('فهرست به‌روز است'); return; }
        var had = !!D; etag = et; setData(d, had); notice('');
        ls.set('rf.cache', txt); ls.set('rf.etag', et || '');
      });
    }).catch(function (err) {
      window.__lastErr = String(err);
      if (D) notice('اتصال برقرار نیست؛ نسخه‌ی ذخیره‌شده روی این دستگاه نمایش داده می‌شود' + (D.generated_at ? ' (به‌روزرسانی ' + rel(Date.parse(D.generated_at)) + ')' : '') + '.');
      else showError(err);
    });
  }
  function boot() { // skeleton paints first; the index is built in the next task
    var c = ls.get('rf.cache');
    requestAnimationFrame(function () {
      setTimeout(function () {
        if (c) tryc(function () { setData(JSON.parse(c)); etag = ls.get('rf.etag') || null; });
        fetchData().then(function () { window.__loaded = true; });
      }, 0);
    });
  }

  /* ---------- filtering / ranking ---------- */
  function pass(p, noFilters) {
    if (S.tab === 'fav') { var f = favs.get(p.id); if (!f || (S.fs && f.s !== S.fs)) return false; }
    if (noFilters) return true;
    if (S.col) { var c = colById.get(S.col); if (!c || !c.set.has(p.id)) return false; }
    if (S.cat && p.category !== S.cat) return false;
    if (S.tag && p.tags.indexOf(S.tag) < 0) return false;
    if (S.lang && p._l !== S.lang) return false;
    return true;
  }
  function tokensOf(q) { return q ? norm(q.replace(/^#/, '')).split(' ').filter(Boolean) : []; }
  function compute(noFilters) {
    var out = [], tokens = tokensOf(S.q), i, j, p, sc;
    var rank = S.sort === 'stars' ? rankStars : S.sort === 'views' ? rankViews : rankNew;
    if (!tokens.length) {
      if (S.tab === 'fav') {
        favs.forEach(function (f, id) { var q = byId.get(id); if (q && pass(q)) out.push(q._i); });
        return out.sort(function (a, b) { return favs.get(P[b].id).t - favs.get(P[a].id).t; });
      }
      if (S.col && colById.has(S.col)) { // a collection keeps its own display order
        colById.get(S.col).ids.forEach(function (id) { var q = byId.get(id); if (q && pass(q)) out.push(q._i); });
        return out;
      }
      var src = S.sort === 'stars' ? orderStars : S.sort === 'views' ? orderViews : order;
      for (i = 0; i < src.length; i++) if (pass(P[src[i]])) out.push(src[i]);
      return out;
    }
    var scores = {};
    for (i = 0; i < P.length; i++) {
      p = P[i]; if (p._ext || !pass(p, noFilters)) continue; sc = 0;
      for (j = 0; j < tokens.length; j++) {
        var t = tokens[j], n = p._n.indexOf(t);
        if (n >= 0) sc += (n === 0 || p._n.charAt(n - 1) === ' ') ? 8 : 5;
        else if (p._g.indexOf(t) >= 0) sc += 4;
        else if (p._q.indexOf(t) >= 0) sc += 1;
        else { sc = -1; break; }
      }
      if (sc > 0) { out.push(i); scores[i] = sc; }
    }
    return out.sort(function (a, b) { return scores[b] - scores[a] || rank[a] - rank[b]; });
  }

  /* ---------- sidebar / filter panel ---------- */
  function topEntries(m, n) { return Array.from(m.entries()).sort(function (a, b) { return b[1] - a[1] || (a[0] < b[0] ? -1 : 1); }).slice(0, n); }
  function navBtn(attr, val, label, n, cls, pre) {
    return '<li><button type="button" class="nav' + (cls ? ' ' + cls : '') + '" ' + attr + '="' + esc(val) + '">' + (pre || '') + '<span>' + label + '</span><b class="n">' + n + '</b></button></li>';
  }
  function renderSide() {
    el['cat-list'].innerHTML = (D.categories || []).filter(function (c) { return catCount[c.id]; })
      .map(function (c) { return navBtn('data-cat', c.id, esc(c.title), catCount[c.id]); }).join('');
    // per-category «top-*» collections duplicate «category + sort by stars»; the sidebar lists only the catalog-wide ones
    var cols = Array.from(colById.values()).filter(function (c) { return !/^top-/.test(c.id) && c.ids.some(function (id) { return byId.has(id); }); });
    el['sec-cols'].hidden = !cols.length;
    el['col-list'].innerHTML = cols.map(function (c) { return navBtn('data-col', c.id, esc(c.title), c.ids.filter(function (id) { return byId.has(id); }).length); }).join('');
    el['lang-list'].innerHTML = topEntries(langCount, 10).map(function (e) { return navBtn('data-lang', e[0], '<bdi dir="ltr">' + esc(e[0]) + '</bdi>', e[1], 'lng', dot(e[0])); }).join('');
    el['tag-list'].innerHTML = topEntries(tagCount, 20).map(function (e) { return navBtn('data-tag', e[0], '<bdi dir="ltr">#' + esc(e[0]) + '</bdi>', e[1], 'tg'); }).join('');
    el['n-all'].textContent = P.length;
  }
  function syncSide() {
    var cur = function (sel, on) { el.side.querySelectorAll(sel).forEach(function (b) { b.setAttribute('aria-current', on(b) ? 'true' : 'false'); }); };
    cur('[data-scope]', function (b) { var s = b.getAttribute('data-scope'); return s === 'fav' || s === 'chat' ? S.tab === s : S.tab === 'all' && !S.cat && !S.col && !S.tag && !S.lang; });
    cur('[data-cat]', function (b) { return S.tab !== 'fav' && b.getAttribute('data-cat') === S.cat; });
    cur('[data-col]', function (b) { return S.tab !== 'fav' && b.getAttribute('data-col') === S.col; });
    cur('[data-lang]', function (b) { return S.tab !== 'fav' && b.getAttribute('data-lang') === S.lang; });
    cur('[data-tag]', function (b) { return S.tab !== 'fav' && b.getAttribute('data-tag') === S.tag; });
  }
  function renderBrand() {
    var when = Date.parse(D.generated_at) || newestT;
    el['brand-meta'].textContent = faN(P.length) + ' پروژه';
    el.updated.textContent = when ? 'به‌روزرسانی فهرست: ' + rel(when) : '';
  }

  /* ---------- rows ---------- */
  function rowEl(i) {
    var p = P[i], e = rows.get(p.id); if (e) return e;
    e = buildRow(p, 'r-'); rows.set(p.id, e); syncRow(e, p.id);
    return e;
  }
  function buildRow(p, idp) {
    var r = p.repos[0], c = catIdx.get(p.category), f = favs.get(p.id);
    var arch = !!(r && r.archived), e = document.createElement('article'), sid = idp + p.id + '-s';
    e.className = 'row'; e.id = idp + p.id; e.setAttribute('data-id', p.id); e.setAttribute('role', 'listitem');
    e.innerHTML = '<div class="r-main">' +
      '<div class="r-a"><button type="button" class="r-open" style="--ol:' + (r && r.owner ? String(r.owner).length : 0) + '" data-open="' + p.id + '" tabindex="-1" aria-describedby="' + sid + '">' +
      (r ? (r.owner ? '<span class="o"></span><span class="sl">/</span>' : '') + '<span class="nm"></span>' : '<span class="t"></span>') + '</button>' +
      (p.repos.length > 1 ? '<span class="r-more" title="' + faN(p.repos.length) + ' مخزن در این پست"><bdi dir="ltr">+' + faN(p.repos.length - 1) + '</bdi></span>' : '') +
      (arch ? '<span class="r-arch">بایگانی‌شده</span>' : '') +
      '<button type="button" class="r-save" tabindex="-1" data-fav="' + p.id + '" aria-pressed="false">' + IC('bm') + '</button></div>' +
      (p.summary ? '<p class="r-sum" id="' + sid + '"></p>' : '') +
      (f && f.n ? '<p class="r-note">' + esc(f.n) + '</p>' : '') +
      '<p class="r-meta">' +
      (p._t ? '<time class="mi" datetime="' + esc(p.date) + '">' + esc(rel(p._t)) + '</time>' : '') +
      (p._l ? '<span class="mi">' + SEP + '<span class="lang">' + dot(p._l) + esc(p._l) + '</span></span>' : '') +
      (p._s ? '<span class="mi">' + SEP + '<span class="st" title="' + nfEn.format(p._s) + ' ستاره">' + IC('star', 's12') + compact(p._s) + '</span></span>' : '') +
      (c ? '<span class="r-cat">' + SEP + ' ' + esc(c.title) + '</span>' : '') +
      '<span class="sv" hidden></span>' +
      (p.tags.length ? '<span class="r-tags">' + p.tags.map(function (t) { return tagBtn(t, ' tabindex="-1"'); }).join('') + '</span>' : '') +
      '</p></div>';
    e._q = null; decorate(e, p, []);
    return e;
  }
  function decorate(e, p, tokens) { // (re)write the matchable text with or without <mark>
    var key = tokens.join(' ');
    if (e._q === key) return; e._q = key;
    var r = p.repos[0];
    if (r) { var o = e.querySelector('.o'); if (o) o.innerHTML = hl(r.owner, tokens); e.querySelector('.nm').innerHTML = hl(r.name, tokens); }
    else e.querySelector('.t').innerHTML = hl(p.title, tokens);
    var s = e.querySelector('.r-sum'); if (s) s.innerHTML = hl(p.summary, tokens);
    e.querySelectorAll('.r-tags .tag').forEach(function (b) { b.innerHTML = hl('#' + b.getAttribute('data-tag'), tokens); });
  }
  function syncRow(e, id) {
    var b = e.querySelector('.r-save'), f = favs.get(id), p = byId.get(id), name = p ? (p.repos[0] ? repoPath(p.repos[0]) : p.title) : '';
    b.setAttribute('aria-pressed', f ? 'true' : 'false');
    b.setAttribute('aria-label', f ? 'حذف ' + name + ' از ذخیره‌شده' : 'ذخیره‌ی ' + name);
    b.querySelector('use').setAttribute('href', f ? '#i-bm-on' : '#i-bm');
    var sv = e.querySelector('.sv'); sv.hidden = !(f && S.tab === 'fav'); sv.innerHTML = f ? SEP + ' ' + (f.s === 'f' ? 'علاقه‌مندی' : 'بعداً می‌خوانم') : '';
    var rc = e.querySelector('.r-cat'); if (rc) rc.hidden = !!S.cat;
    e.setAttribute('aria-current', S.sel === id && isDesk() ? 'true' : 'false');
  }
  function grpLabel(k) { return k === 'w' ? 'هفت روز اخیر' : k === 'm' ? 'سی روز اخیر' : k; }
  function appendRows(from, to, frag) {
    for (var i = from; i < to; i++) {
      var p = P[view[i]];
      if (grpCount && p._gk !== lastGk) {
        lastGk = p._gk;
        var h = document.createElement('div'); h.className = 'grp'; h.setAttribute('role', 'presentation');
        h.innerHTML = '<b>' + esc(grpLabel(p._gk)) + '</b><span>' + faN(grpCount[p._gk]) + ' مورد</span>';
        frag.appendChild(h);
      }
      var e = rowEl(view[i]); decorate(e, p, curTokens); syncRow(e, p.id); frag.appendChild(e);
    }
  }
  function paintList() {
    var f = document.createDocumentFragment(); lastGk = null;
    appendRows(0, Math.min(shown, view.length), f);
    el.list.replaceChildren(f); roving();
  }
  function more() {
    if (!indexReady || shown >= view.length) return;
    var from = shown, f = document.createDocumentFragment();
    shown = Math.min(shown + CHUNK, view.length);
    appendRows(from, shown, f); el.list.appendChild(f);
  }
  /* one Tab stop for the whole list: the selected row, else the first */
  var rovingEl = null;
  function roving(target) {
    var r = target || (S.sel != null && rows.get(S.sel) && rows.get(S.sel).isConnected ? rows.get(S.sel) : el.list.querySelector('.row[data-id]'));
    if (rovingEl && rovingEl !== r) { var o = rovingEl.querySelector('.r-open'); if (o) o.tabIndex = -1; }
    rovingEl = r || null; if (r) r.querySelector('.r-open').tabIndex = 0;
  }

  /* ---------- the one place that decides what is visible ---------- */
  function scopeTitle() {
    if (S.tab === 'fav') return 'ذخیره‌شده';
    if (S.col && colById.has(S.col)) return colById.get(S.col).title;
    if (S.cat && catIdx.has(S.cat)) return catIdx.get(S.cat).title;
    return 'همه‌ی پروژه‌ها';
  }
  function apply(scroll) {
    if (!indexReady) return;
    var t = S.tab;
    el.app.setAttribute('data-tab', t);
    el['q-clear'].hidden = !el.q.value;
    el.tabs.querySelectorAll('button').forEach(function (b) { b.getAttribute('data-tab') === t ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current'); });
    syncSide();
    var chat = t === 'chat'; syncTgLine();
    el.chat.hidden = !chat; el.toolbar.hidden = chat; el.list.hidden = chat; el.sentinel.hidden = chat;
    if (chat) { el.state.hidden = true; el['fav-tools'].hidden = true; mountChat(); updateBack(); return; }
    el['fav-seg'].hidden = t !== 'fav'; el.sort.hidden = t === 'fav' || (!!S.col && !S.q);
    el['fav-tools'].hidden = !(t === 'fav' && favs.size);
    curTokens = tokensOf(S.q);
    view = compute(); shown = Math.min(CHUNK, view.length);
    grpCount = null;
    if (t !== 'fav' && !S.q && !S.col && S.sort === 'new' && view.length > 8) {
      grpCount = {}; for (var i = 0; i < view.length; i++) { var k = P[view[i]]._gk; grpCount[k] = (grpCount[k] || 0) + 1; }
    }
    el['scope-h'].textContent = scopeTitle();
    el['scope-x'].hidden = !(t !== 'fav' && (S.cat || S.col));
    el['scope-x'].setAttribute('aria-label', S.col ? 'حذف فیلتر مجموعه' : 'حذف فیلتر دسته');
    el.count.textContent = faN(view.length) + (S.q ? ' نتیجه' : ' پروژه');
    el.sort.querySelector('[data-sort="views"]').hidden = !hasViews; if (!hasViews && S.sort === 'views') S.sort = 'new';
    el.sort.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-sort') === S.sort ? 'true' : 'false'); });
    el['fav-seg'].querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-fs') === S.fs ? 'true' : 'false'); });
    renderTokens();
    paintList(); renderState();
    if (scroll === 'top' && window.scrollY > 0) window.scrollTo(0, 0);
    updateBack();
  }
  function renderTokens() {
    var h = '', n = 0, x = '<span class="x">' + IC('close') + '</span>';
    if (S.tab !== 'fav') {
      if (S.tag) { h += '<button type="button" class="token" data-untoken="tag" aria-label="حذف فیلتر برچسب ' + esc(S.tag) + '"><bdi dir="ltr">#' + esc(S.tag) + '</bdi>' + x + '</button>'; n++; }
      if (S.lang) { h += '<button type="button" class="token" data-untoken="lang" aria-label="حذف فیلتر زبان ' + esc(S.lang) + '">' + dot(S.lang) + '<bdi dir="ltr">' + esc(S.lang) + '</bdi>' + x + '</button>'; n++; }
      if (n && (S.cat || S.col)) h += '<button type="button" class="clear-all" data-clear="filters">حذف همه‌ی فیلترها</button>';
    }
    el.tokens.hidden = !h; el.tokens.innerHTML = h;
  }

  function activeFilterNames() {
    var a = [];
    if (S.col && colById.has(S.col)) a.push('مجموعه‌ی «' + colById.get(S.col).title + '»');
    if (S.cat && catIdx.has(S.cat)) a.push('دسته‌ی «' + catIdx.get(S.cat).title + '»');
    if (S.tag) a.push('#' + S.tag);
    if (S.lang) a.push(S.lang);
    return a;
  }
  function renderState() {
    var s = el.state;
    if (view.length) { s.hidden = true; return; }
    s.hidden = false;
    var filt = activeFilterNames();
    if (!P.length) s.innerHTML = '<h3>فهرست خالی است</h3><p>فایل data.json بارگیری شد اما هنوز پروژه‌ای در آن نیست. ربات فهرست را روزانه به‌روز می‌کند.</p><div class="acts"><button type="button" class="btn primary" data-retry="1">' + IC('refresh') + 'بررسی دوباره</button></div>';
    else if (S.tab === 'fav' && !favs.size) s.innerHTML = '<h3>هنوز چیزی ذخیره نشده</h3><p>با نشانک کنار هر ردیف، پروژه را برای بعد نگه دارید و یادداشتی کوتاه برایش بنویسید. داخل تلگرام، ذخیره‌ها با حساب شما همگام می‌شوند.</p><div class="acts"><button type="button" class="btn" data-go="all">رفتن به فهرست</button></div>';
    else if (S.tab === 'fav') s.innerHTML = '<h3>در این گروه ذخیره‌ای نیست</h3><p>' + faN(favs.size) + ' پروژه‌ی ذخیره‌شده در گروه‌های دیگر هست.</p><div class="acts"><button type="button" class="btn" data-fs-reset="1">نمایش همه‌ی ذخیره‌ها</button></div>';
    else if (S.q) {
      var wide = filt.length ? compute(true).length : 0;
      s.innerHTML = '<h3>برای «<bdi>' + esc(S.q) + '</bdi>» نتیجه‌ای نیست</h3>' +
        '<p>جست‌وجو در نام مخزن، عنوان، خلاصه، برچسب‌ها و زبان انجام می‌شود' + (filt.length ? '، فقط داخل ' + esc(filt.join(' و ')) : '') + '.</p>' +
        '<ul><li>بخشی از نام را امتحان کنید، مثلاً <bdi dir="ltr" class="mono">xray</bdi> به‌جای <bdi dir="ltr" class="mono">xray-core</bdi>.</li><li>نوشتن «ي» و «ك» عربی یا اعداد فارسی مشکلی ایجاد نمی‌کند.</li></ul>' +
        '<div class="acts">' + (wide ? '<button type="button" class="btn primary" data-clear="filters">جست‌وجو بدون فیلتر (' + faN(wide) + ' نتیجه)</button>' : '') +
        '<button type="button" class="btn" data-clear="all">پاک‌کردن جست‌وجو</button></div>';
    } else s.innerHTML = '<h3>با این فیلترها پروژه‌ای نیست</h3><p>' + esc(filt.join(' + ')) + '</p><div class="acts"><button type="button" class="btn" data-clear="filters">حذف فیلترها</button></div>';
  }
  function showError(err) {
    indexReady = false; el.list.replaceChildren(); el.toolbar.hidden = true;
    el.state.hidden = false;
    el.state.innerHTML = '<h3>فهرست بارگیری نشد</h3><p>فایل فهرست در دسترس نیست و نسخه‌ی ذخیره‌شده‌ای هم روی این دستگاه وجود ندارد. اتصال اینترنت یا فیلترشکن را بررسی کنید.</p>' +
      '<div class="acts"><button type="button" class="btn primary" data-retry="1">' + IC('refresh') + 'تلاش دوباره</button><a class="link" href="https://t.me/RepoFA" data-ext="tg">کانال ریپو فا</a></div>' +
      '<p class="code">GET ./data.json → ' + esc(String(err && err.message || err)) + '</p>';
    el.pane.innerHTML = '';
  }

  /* ---------- bookmarks: two states + short note, CloudStorage with localStorage fallback ---------- */
  var CH = 3400;
  function serialize() { var a = []; favs.forEach(function (f, id) { a.push([id, f.s === 'f' ? 1 : 0, f.n || '', f.t]); }); return JSON.stringify(a); }
  function ingest(txt, override) {
    var n = 0;
    tryc(function () { JSON.parse(txt).forEach(function (r) { if (r && r[0] != null && (override || !favs.has(+r[0]))) { favs.set(+r[0], { s: r[1] ? 'f' : 'l', n: String(r[2] || '').slice(0, NOTE_MAX), t: +r[3] || Date.now() }); n++; } }); });
    return n;
  }
  function loadFavs() { var raw = ls.get('rf.fav2'); if (raw) ingest(raw, true); updateFavUI(); }
  var cloudOK = function () { return TG && TG.CloudStorage && tryc(function () { return TG.isVersionAtLeast('6.9'); }, false); };
  function cloudLoad() {
    if (!cloudOK()) return;
    tryc(function () {
      TG.CloudStorage.getItem('fav_n', function (err, v) {
        var n = +v; if (err || !n || n > 12) return;
        var keys = []; for (var i = 0; i < n; i++) keys.push('fav_' + i);
        TG.CloudStorage.getItems(keys, function (e2, o) {
          if (e2 || !o) return;
          var txt = keys.map(function (k) { return o[k] || ''; }).join('');
          if (ingest(txt, false)) { updateFavUI(); ls.set('rf.fav2', serialize()); rows.forEach(function (c, id) { syncRow(c, id); }); if (indexReady && S.tab === 'fav') apply(); }
        });
      });
    });
  }
  var saveT;
  function saveFavs() {
    var s = serialize(); ls.set('rf.fav2', s);
    clearTimeout(saveT);
    if (!cloudOK()) return;
    saveT = setTimeout(function () {
      tryc(function () {
        var parts = []; for (var i = 0; i < s.length; i += CH) parts.push(s.slice(i, i + CH));
        if (parts.length > 12) return;
        var o = { fav_n: String(parts.length) }; parts.forEach(function (p, i) { o['fav_' + i] = p; });
        Object.keys(o).forEach(function (k) { TG.CloudStorage.setItem(k, o[k], function () { }); });
      });
    }, 400);
  }
  function updateFavUI() {
    el['fav-n'].hidden = !favs.size; el['fav-n'].textContent = favs.size;
    el['n-fav'].textContent = favs.size ? favs.size : '';
  }
  function refreshRow(id) { // re-create a row whose content (note, state) changed
    rows.delete(id); var p = byId.get(id); if (!p) return;
    var o = document.getElementById('r-' + id); if (o) { var e = rowEl(p._i); decorate(e, p, curTokens); o.replaceWith(e); if (rovingEl === o) roving(e); }
  }
  function afterFavChange(id) {
    saveFavs(); updateFavUI(); refreshRow(id);
    document.querySelectorAll('.row[data-id="' + id + '"]').forEach(function (x) { if (rows.get(id) !== x) syncRow(x, id); });
    if (detailId() === id) renderSave();
    if (indexReady) el['fav-tools'].hidden = !(S.tab === 'fav' && favs.size);
  }
  function setFav(id, val) { // val: object | null; returns an undo function
    var prev = favs.get(id); prev = prev ? { s: prev.s, n: prev.n, t: prev.t } : null;
    if (val) favs.set(id, val); else favs.delete(id);
    afterFavChange(id);
    if (S.tab === 'fav' && !val) { if (sheetId != null) dirty = true; else apply(); }
    return function () { setFav(id, prev); if (S.tab === 'fav') apply(); };
  }
  function toggleFav(id) {
    var on = !favs.has(id);
    var undo = setFav(id, on ? { s: 'l', n: '', t: Date.now() } : null);
    haptic('impact', 'light');
    toast(on ? 'ذخیره شد' : 'از ذخیره‌شده حذف شد', undo);
  }
  function setFavState(id, s) { var f = favs.get(id); if (!f) { f = { s: s, n: '', t: Date.now() }; favs.set(id, f); } f.s = s; afterFavChange(id); haptic('select'); if (S.tab === 'fav') dirty = true; }
  var noteT;
  function setNote(id, v) {
    var f = favs.get(id); if (!f) return; f.n = v.slice(0, NOTE_MAX);
    clearTimeout(noteT); noteT = setTimeout(function () { saveFavs(); if (isDesk() && sheetId == null) refreshRow(id); else dirty = true; }, 500);
  }
  function exportText() {
    var arr = Array.from(favs.entries()).sort(function (a, b) { return b[1].t - a[1].t; }), out = [];
    arr.forEach(function (e, i) {
      var p = byId.get(e[0]); if (!p) return; var r = p.repos[0], f = e[1];
      out.push((i + 1) + '. ' + (r ? repoPath(r) : p.title) + (f.s === 'f' ? ' (علاقه‌مندی)' : '') + (r ? '\n' + r.url : (p.tg_url ? '\n' + p.tg_url : '')) + (f.n ? '\nیادداشت: ' + f.n : ''));
    });
    return 'ذخیره‌شده‌های من از ریپو فا\n\n' + out.join('\n\n') + '\n\nhttps://t.me/RepoFA';
  }

  /* ---------- detail: one renderer, two containers (pane on desktop, sheet below 960) ---------- */
  var sheetId = null, lastFocus = null;
  var detailId = function () { return sheetId != null ? sheetId : (isDesk() ? S.sel : null); };
  var detailBox = function () { return sheetId != null ? el.sheet : el.pane; };
  function cloneBox(r) {
    return '<div class="clone"><code><span class="pr">$ </span>' + esc(cloneCmd(r)) + '</code><button type="button" data-copy="' + esc(cloneCmd(r)) + '" data-copymsg="دستور clone کپی شد" aria-label="کپی دستور git clone برای ' + esc(repoPath(r)) + '">' + IC('copy') + '<span>کپی</span></button></div>';
  }
  function detailHTML(p) {
    var c = catIdx.get(p.category), r = p.repos[0];
    var meta = [];
    if (p._l) meta.push('<span class="lang">' + dot(p._l) + esc(p._l) + '</span>');
    if (p.repos.length > 1) meta.push('<span>' + faN(p.repos.length) + ' مخزن</span>');
    if (r && r.stars != null) meta.push('<span class="st" title="ستاره در GitHub">' + IC('star', 's12') + nfEn.format(r.stars) + '</span>');
    if (c) meta.push('<button type="button" class="catl" data-cat="' + esc(c.id) + '">' + esc(c.title) + '</button>');
    if (p._t) meta.push('<time datetime="' + esc(p.date) + '">' + esc(fullDate(p._t)) + '</time>');
    if (p.kind === 'collection') meta.push('<span>فهرست/مجموعه</span>');
    if (r && r.archived) meta.push('<span class="arch">بایگانی‌شده (فقط‌خواندنی)</span>');
    var others = p.repos.slice(1).map(function (x) {
      return '<div class="repo"><p class="d-path">' + dPath(x) + '</p><p class="repo-meta">' + (x.lang ? '<span class="lang">' + dot(x.lang) + esc(x.lang) + '</span>' : '') +
        (x.stars != null ? '<span class="num">★ ' + nfEn.format(x.stars) + '</span>' : '') + (x.archived ? '<span class="r-arch">بایگانی‌شده</span>' : '') +
        '<a class="link" href="' + esc(x.url) + '" data-ext="gh" target="_blank" rel="noopener noreferrer">GitHub' + IC('ext') + '</a></p>' + cloneBox(x) + '</div>';
    }).join('');
    var tags = p.tags.map(function (t) { return tagBtn(t); }).join('');
    return '<article class="d">' +
      '<h2 class="d-path" id="d-title">' + (r ? dPath(r) : '<bdi dir="auto" style="font-family:var(--sans)">' + esc(p.title) + '</bdi>') + '</h2>' +
      '<p class="d-meta">' + meta.join(SEP) + '</p>' +
      (r ? cloneBox(r) : '') +
      '<div class="d-actions">' + (r ? '<a class="btn primary d-gh" href="' + esc(r.url) + '" data-ext="gh" target="_blank" rel="noopener noreferrer">' + IC('ext') + 'باز کردن در GitHub</a>' : '') +
      '<button type="button" class="btn" id="d-fav" data-fav="' + p.id + '"></button></div>' +
      (r && titleWorth(p) ? '<h3 class="d-title"><bdi dir="auto">' + esc(p.title) + '</bdi></h3>' : '') +
      (p.summary ? '<p class="d-sum">' + esc(p.summary) + '</p>' : '') +
      (tags ? '<p class="d-tags">' + tags + '</p>' : '') + engagement(p) +
      (r ? '<section class="d-sec d-rd"><h3 class="d-h">README</h3>' +
        (p.repos.length > 1 ? '<div class="seg rd-repos" role="group" aria-label="مخزن">' + p.repos.map(function (x, i) { return '<button type="button" data-rd-i="' + i + '" aria-pressed="' + (i === 0) + '"><bdi dir="ltr">' + esc(x.name) + '</bdi></button>'; }).join('') + '</div>' : '') +
        '<button type="button" class="btn rd-open" data-readme="1">نمایش README</button><div class="rd" hidden></div></section>' : '') +
      (others ? '<section class="d-sec"><h3 class="d-h">مخزن‌های دیگر این پست</h3>' + others + '</section>' : '') +
      '<div id="d-save"></div>' +
      '<p class="d-links">' + (p.tg_url ? '<a class="link" href="' + esc(p.tg_url) + '" data-ext="tg" target="_blank" rel="noopener noreferrer">' + IC('send') + 'پست کانال</a>' : '') +
      '<button type="button" class="link" data-share="1">' + IC('share') + 'اشتراک‌گذاری</button></p></article>';
  }
  /* channel numbers for the post (optional fields; nothing is shown for unknown values) */
  function faCompact(n) { return toFa(compact(n)).replace('.', '٫'); }
  function engagement(p) {
    var parts = [], num = function (v) { return typeof v === 'number' && v >= 0 ? v : null; }, rx = p.reactions, rt = null, top = [];
    if (typeof rx === 'number') rt = rx;
    else if (rx && typeof rx === 'object') {
      rt = num(rx.total) != null ? rx.total : num(rx.n);
      var t = rx.top; if (Array.isArray(t)) top = t.map(function (x) { return [x.emoji || x.e || x.r, x.count || x.n]; }); else if (t && typeof t === 'object') top = Object.keys(t).map(function (k) { return [k, t[k]]; });
      top = top.filter(function (x) { return typeof x[0] === 'string' && x[0].length <= 8 && num(x[1]) != null; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 3);
    }
    if (num(p.views) != null) parts.push('بازدید ' + faCompact(p.views));
    if (num(p.forwards) != null) parts.push('فوروارد ' + faCompact(p.forwards));
    if (num(rt) != null) parts.push('واکنش ' + faCompact(rt) + (top.length ? ' <span class="rx">' + top.map(function (x) { return '<span>' + esc(x[0]) + ' ' + faCompact(x[1]) + '</span>'; }).join('') + '</span>' : ''));
    if (!parts.length) return '';
    var at = Date.parse(p.engagement_at);
    return '<p class="d-eng"' + (at ? ' title="آمار تا ' + esc(fullDate(at)) + '"' : '') + '>' + parts.join(SEP) + (at ? '<span class="d-eng-at">آمار تا ' + esc(fullDate(at)) + '</span>' : '') + '</p>';
  }
  function renderSave() {
    var box = detailBox(), id = detailId(), f = favs.get(id), b = $('#d-fav', box), sv = $('#d-save', box); if (!b || !sv) return;
    b.setAttribute('aria-pressed', f ? 'true' : 'false');
    b.innerHTML = IC(f ? 'bm-on' : 'bm') + (f ? 'ذخیره‌شده' : 'ذخیره');
    if (!f) { sv.innerHTML = ''; sv.className = ''; sv.removeAttribute('data-id'); return; }
    var withNote = !!(noteOpen[id] || f.n);
    if (sv.className === 'save-box' && sv.getAttribute('data-id') === String(id) && !!$('textarea', sv) === withNote) { // keep the textarea (and its caret) alive
      sv.querySelectorAll('[data-st]').forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-st') === f.s ? 'true' : 'false'); }); return;
    }
    sv.setAttribute('data-id', id);
    sv.className = 'save-box';
    sv.innerHTML = '<div class="seg" role="group" aria-label="نوع ذخیره">' +
      '<button type="button" data-st="l" aria-pressed="' + (f.s === 'l') + '">بعداً می‌خوانم</button><button type="button" data-st="f" aria-pressed="' + (f.s === 'f') + '">علاقه‌مندی</button></div>' +
      (withNote ? '<label class="note-l" for="d-note"><span>یادداشت شخصی</span><span class="num" id="d-cnt">' + (f.n || '').length + '/' + NOTE_MAX + '</span></label>' +
        '<textarea id="d-note" maxlength="' + NOTE_MAX + '" rows="2" placeholder="مثلاً: جایگزین nginx در سرور خانگی">' + esc(f.n || '') + '</textarea>' : '') +
      '<div class="save-foot">' + (withNote ? '<span>ذخیره در ' + esc(fullDate(f.t)) + '</span>' : '<button type="button" class="link" data-note="1">افزودن یادداشت</button>') +
      '<button type="button" class="link danger" data-unsave="1">حذف از ذخیره‌شده</button></div>';
  }
  function renderPane() {
    if (!isDesk() || !indexReady) return;
    var p = S.sel != null && byId.get(S.sel);
    if (p) { el.pane.innerHTML = detailHTML(p); renderSave(); el.pane.scrollTop = 0; return; }
    var when = Date.parse(D.generated_at), K = MAC ? '⌘' : 'Ctrl';
    el.pane.innerHTML = '<div class="about"><h2>ریپو فا</h2><p>مخزن‌ها و ابزارهای متن‌بازی که در کانال ریپو فا معرفی شده‌اند. با انتخاب یک ردیف، دستور clone و خلاصه‌ی کامل همین‌جا نمایش داده می‌شود.</p>' +
      '<dl><dt>پروژه</dt><dd>' + faN(P.length) + '</dd><dt>مخزن گیت‌هاب</dt><dd>' + faN(repoTotal) + '</dd>' +
      (newestT ? '<dt>آخرین پست</dt><dd>' + esc(fullDate(newestT)) + '</dd>' : '') + (when ? '<dt>به‌روزرسانی فهرست</dt><dd>' + esc(rel(when)) + '</dd>' : '') + '</dl>' +
      '<div class="keys"><h3>صفحه‌کلید</h3><ul>' +
      '<li>جست‌وجو<span><kbd>/</kbd><kbd>' + K + '</kbd><kbd>K</kbd></span></li>' +
      '<li>حرکت در فهرست<span><kbd>↑</kbd><kbd>↓</kbd></span></li>' +
      '<li>ذخیره / حذف ذخیره<span><kbd>S</kbd></span></li>' +
      '<li>کپی دستور git clone<span><kbd>C</kbd></span></li>' +
      '<li>باز کردن در GitHub<span><kbd>O</kbd></span></li>' +
      '<li>بازگشت به جست‌وجو<span><kbd>Esc</kbd></span></li></ul></div></div>';
  }
  function select(id) {
    if (S.sel === id) return;
    var prev = S.sel != null && rows.get(S.sel); if (prev) prev.setAttribute('aria-current', 'false');
    S.sel = id; var e = rows.get(id); if (e) { e.setAttribute('aria-current', 'true'); roving(e); }
    renderPane();
    tryc(function () { history.replaceState(null, '', id != null ? '#p=' + id : location.pathname + location.search); });
  }
  function openDetail(id, o) {
    o = o || {};
    if (!byId.has(id)) return;
    if (isDesk()) { select(id); return; }
    openSheet(id, o.fromHash);
  }
  function openSheet(id, fromHash) {
    var p = byId.get(id); if (!p) return;
    sheetId = id; lastFocus = document.activeElement;
    el.sheet.innerHTML = '<div class="grab" id="grab" aria-hidden="true"></div>' +
      '<button type="button" class="icon-btn s-close" data-close="1" aria-label="بستن">' + IC('close') + '</button>' +
      '<div class="s-scroll">' + detailHTML(p) + '</div>';
    renderSave();
    el['sheet-root'].setAttribute('data-show', ''); el['sheet-root'].setAttribute('aria-hidden', 'false');
    el.app.inert = true; document.body.style.overflow = 'hidden'; document.body.classList.add('sheet-open'); el.sheet.style.transform = '';
    tryc(function () { el.sheet.querySelector('.s-close').focus({ preventScroll: true }); });
    if (!fromHash && !(history.state && history.state.sheet)) tryc(function () { history.pushState({ sheet: id }, '', '#p=' + id); });
    haptic('impact', 'light'); tgMain(p); updateBack();
  }
  function closeSheet(viaPop) {
    if (sheetId == null) return;
    sheetId = null; hideSheetUi();
    if (!viaPop && history.state && history.state.sheet) tryc(function () { history.back(); });
    else if (/^#p=/.test(location.hash)) tryc(function () { history.replaceState(null, '', location.pathname + location.search); });
    tryc(function () { if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true }); });
    tgMain(null); updateBack();
    if (dirty) { dirty = false; apply(); }
  }
  function hideSheetUi() { el['sheet-root'].removeAttribute('data-show'); el['sheet-root'].setAttribute('aria-hidden', 'true'); el.app.inert = false; document.body.style.overflow = ''; document.body.classList.remove('sheet-open'); }
  /* drag to dismiss: from the handle, or from anywhere while the content is scrolled to the top; closes on distance or flick */
  (function () {
    var y0 = null, t0 = 0, dy = 0;
    el.sheet.addEventListener('touchstart', function (e) {
      var sc = $('.s-scroll', el.sheet), tg = e.target;
      if (tg.closest('textarea,input,.clone code')) return;
      if (!(tg.closest('.grab') || (sc && sc.scrollTop <= 0))) return;
      y0 = e.touches[0].clientY; t0 = Date.now(); dy = 0; el.sheet.style.transition = 'none';
    }, { passive: true });
    el.sheet.addEventListener('touchmove', function (e) {
      if (y0 == null) return; dy = e.touches[0].clientY - y0;
      if (dy < 0) { dy = 0; } el.sheet.style.transform = dy ? 'translateY(' + dy + 'px)' : '';
    }, { passive: true });
    el.sheet.addEventListener('touchend', function () {
      if (y0 == null) return; var v = dy / Math.max(1, Date.now() - t0); y0 = null;
      el.sheet.style.transition = ''; el.sheet.style.transform = '';
      if (dy > el.sheet.offsetHeight * 0.3 || (dy > 40 && v > 0.5)) closeSheet();
    });
  })();
  window.addEventListener('popstate', function () {
    var h = /^#p=(\d+)/.exec(location.hash), st = history.state;
    if (h && indexReady && byId.has(+h[1]) && (isDesk() || (st && st.sheet))) { if (sheetId !== +h[1]) openDetail(+h[1], { fromHash: true }); }
    else if (sheetId != null) closeSheet(true);
  });
  deskMQ.addEventListener && deskMQ.addEventListener('change', function () {
    if (isDesk() && sheetId != null) { var id = sheetId; closeSheet(true); S.sel = null; select(id); }
    if (S.tab === 'cats' && isDesk()) S.tab = 'all';
    if (indexReady) { apply(); renderPane(); } measure();
  });

  /* ---------- keyboard: / and Ctrl/⌘K search, ↑↓ rows, Enter, S, C, O, Esc ---------- */
  function rowList() { return Array.prototype.slice.call(el.list.querySelectorAll('.row[data-id]')); }
  function focusRow(r) {
    if (!r) return; roving(r);
    r.querySelector('.r-open').focus({ preventScroll: true }); r.scrollIntoView({ block: 'nearest' });
    if (isDesk()) select(+r.getAttribute('data-id'));
  }
  function keyTarget() { var a = document.activeElement, r = a && a.closest && a.closest('.row'); if (r) return +r.getAttribute('data-id'); return detailId(); }
  var curRow = function () { return (S.sel != null && rows.get(S.sel) && rows.get(S.sel).isConnected) ? rows.get(S.sel) : rowList()[0]; };
  document.addEventListener('keydown', function (e) {
    var a = document.activeElement, tag = a && a.tagName, typing = tag === 'INPUT' || tag === 'TEXTAREA';
    if (sheetId != null) {
      if (e.key === 'Escape') { e.preventDefault(); return closeSheet(); }
      if (e.key === 'Tab') {
        var f = el.sheet.querySelectorAll('a[href],button:not([disabled]),textarea'); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && a === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
      }
      if (typing) return;
    }
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); el.q.focus(); el.q.select(); return; }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (a === el.q) {
      if (e.key === 'ArrowDown') { e.preventDefault(); focusRow(curRow()); }
      else if (e.key === 'Escape') { e.preventDefault(); if (el.q.value) { el.q.value = ''; clearTimeout(qt); runSearch(); } else el.q.blur(); }
      return;
    }
    if (e.key === 'Escape' && el.pane.contains(a) && S.sel != null && rows.get(S.sel) && rows.get(S.sel).isConnected) { e.preventDefault(); return focusRow(rows.get(S.sel)); }
    if (typing) { if (e.key === 'Escape') a.blur(); return; }
    if (e.key === '/') { e.preventDefault(); el.q.focus(); el.q.select(); return; }
    var row = a && a.closest && a.closest('.row');
    if (row && (e.key === 'ArrowDown' || e.key === 'j' || e.key === 'ArrowUp' || e.key === 'k' || e.key === 'Home' || e.key === 'End')) {
      e.preventDefault();
      var rl = rowList(), i = rl.indexOf(row), down = e.key === 'ArrowDown' || e.key === 'j';
      if (e.key === 'Home') return focusRow(rl[0]);
      if (e.key === 'End') { while (shown < view.length && shown < 300) more(); rl = rowList(); return focusRow(rl[rl.length - 1]); }
      if (down && i === rl.length - 1) { more(); rl = rowList(); }
      if (!down && i === 0) { el.q.focus(); return; }
      return focusRow(rl[i + (down ? 1 : -1)]);
    }
    if (row && e.key === 'Escape') { e.preventDefault(); el.q.focus(); return; }
    if (!row && !el.pane.contains(a) && !el.side.contains(a) && (e.key === 'ArrowDown' || e.key === 'j') && isDesk() && indexReady && S.tab !== 'chat') { e.preventDefault(); return focusRow(curRow()); }
    var id = keyTarget(); if (id == null || !byId.has(id)) return;
    var p = byId.get(id), r = p.repos[0], k = e.key.toLowerCase();
    if (k === 's') { e.preventDefault(); toggleFav(id); }
    else if (k === 'c' && r) { e.preventDefault(); copyText(cloneCmd(r), 'دستور clone کپی شد'); }
    else if (k === 'o' && r) { e.preventDefault(); if (!openUrl(r.url, 'gh')) window.open(r.url, '_blank', 'noopener'); }
  });
  /* sidebar: ↑↓ move between filter buttons */
  el.side.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    var bs = Array.prototype.slice.call(el.side.querySelectorAll('button.nav')), i = bs.indexOf(document.activeElement); if (i < 0) return;
    e.preventDefault(); var n = bs[i + (e.key === 'ArrowDown' ? 1 : -1)]; if (n) n.focus();
  });
  el.list.addEventListener('focusin', function (e) { var r = e.target.closest('.row'); if (r && e.target.classList.contains('r-open')) { roving(r); if (isDesk()) select(+r.getAttribute('data-id')); } });

  /* ---------- links, copy, share ---------- */
  function openUrl(url, kind) {
    if (!TG) return false;
    var ok = true;
    if (kind === 'tg' && TG.openTelegramLink) tryc(function () { TG.openTelegramLink(url); }, (ok = false));
    else if (TG.openLink) tryc(function () { TG.openLink(url, { try_instant_view: false }); }, (ok = false));
    else ok = false;
    return ok;
  }
  function copyText(t, msg, btn) {
    var done = function () {
      haptic('notify', 'success'); toast(msg || 'کپی شد');
      if (btn) { var s = btn.querySelector('span'), u = btn.querySelector('use'); btn.setAttribute('data-done', ''); if (s) s.textContent = 'کپی شد'; if (u) u.setAttribute('href', '#i-check');
        setTimeout(function () { btn.removeAttribute('data-done'); if (s) s.textContent = 'کپی'; if (u) u.setAttribute('href', '#i-copy'); }, 1600); }
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(done, function () { legacyCopy(t) ? done() : toast('کپی نشد؛ متن را دستی انتخاب کنید'); });
    else legacyCopy(t) ? done() : toast('کپی نشد؛ متن را دستی انتخاب کنید');
  }
  function legacyCopy(t) {
    return tryc(function () { var a = document.createElement('textarea'); a.value = t; a.setAttribute('readonly', ''); a.style.cssText = 'position:fixed;opacity:0;top:0'; document.body.appendChild(a); a.select(); var ok = document.execCommand('copy'); a.remove(); return ok; }, false);
  }
  function shareUrl(link, text) {
    var u = 'https://t.me/share/url?url=' + encodeURIComponent(link) + '&text=' + encodeURIComponent(text);
    if (TG && TG.openTelegramLink) return tryc(function () { TG.openTelegramLink(u); });
    if (navigator.share) return navigator.share({ text: text, url: link }).catch(function () { });
    window.open(u, '_blank', 'noopener');
  }
  function share(p) { var r = p.repos[0]; shareUrl(p.tg_url || (D && D.source) || location.href, (r ? repoPath(r) : p.title) + '\n' + (p.summary || '')); }

  /* ---------- ui helpers ---------- */
  var toastT, toastUndo = null;
  function toast(m, undo) {
    if (sheetId != null) document.documentElement.style.setProperty('--sheet-h', el.sheet.getBoundingClientRect().height + 'px'); // sit just above the sheet
    el['t-msg'].textContent = m; toastUndo = undo || null; el['t-act'].hidden = !undo;
    el.toast.setAttribute('data-on', ''); clearTimeout(toastT);
    toastT = setTimeout(function () { el.toast.removeAttribute('data-on'); toastUndo = null; }, undo ? 4500 : 1800);
  }
  el['t-act'].addEventListener('click', function () { var u = toastUndo; toastUndo = null; el.toast.removeAttribute('data-on'); if (u) { u(); haptic('select'); } });
  function notice(m) { el.notice.hidden = !m; el['notice-t'].textContent = m || ''; }
  el['notice-x'].addEventListener('click', function () { notice(''); });
  function haptic(kind, v) {
    if (!TG || !TG.HapticFeedback) return;
    tryc(function () { kind === 'impact' ? TG.HapticFeedback.impactOccurred(v) : kind === 'notify' ? TG.HapticFeedback.notificationOccurred(v) : TG.HapticFeedback.selectionChanged(); });
  }
  function setTab(t) {
    if (t === 'cats' && isDesk()) t = 'all';
    if (S.tab === t) { if (t === 'all') window.scrollTo(0, 0); return; }
    S.tab = t; haptic('select'); window.scrollTo(0, 0); apply();
  }
  function setFilter(k, v, toggle) { // from the side panel (toggles), a tag or a category link (sets)
    if (sheetId != null) { sheetId = null; hideSheetUi(); if (history.state && history.state.sheet) tryc(function () { history.back(); }); tgMain(null); }
    var off = toggle && S[k] === v && S.tab !== 'fav';
    S[k] = off ? '' : v;
    if (k === 'cat') S.col = ''; else if (k === 'col') S.cat = '';
    S.tab = 'all'; haptic('select'); apply(); window.scrollTo(0, 0);
  }
  function clearFilters(all) { S.cat = ''; S.col = ''; S.tag = ''; S.lang = ''; if (all) { S.q = ''; el.q.value = ''; } apply('top'); }

  /* measured sticky offsets (text-zoom safe) */
  function measure() {
    var r = document.documentElement, fs = parseFloat(getComputedStyle(r).fontSize) || 16;
    r.classList.toggle('big-text', fs >= 24);
    r.style.setProperty('--top-hm', (isDesk() ? el.top.offsetHeight : 0) + 'px');
    r.style.setProperty('--tb-hm', (el.toolbar.offsetHeight || 0) + 'px');
  }
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(function () { measure(); }); ro.observe(el.top); ro.observe(el.toolbar);
    new ResizeObserver(function () { if (sheetId != null) document.documentElement.style.setProperty('--sheet-h', el.sheet.getBoundingClientRect().height + 'px'); }).observe(el.sheet);
  }
  window.addEventListener('resize', measure);

  /* ---------- theme: follows Telegram colorScheme / OS; tokens stay ours ---------- */
  var BG = { light: '#FDFCFA', dark: '#141310' };
  function curTheme() { return ls.get('rf.theme') || (TG && TG.colorScheme) || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
  function applyTheme() {
    var t = curTheme(); document.documentElement.setAttribute('data-theme', t);
    var m = $('meta[name=theme-color]'); if (m) m.setAttribute('content', BG[t]);
    el.theme.innerHTML = IC(t === 'dark' ? 'sun' : 'moon');
    el.theme.setAttribute('aria-label', t === 'dark' ? 'پوسته‌ی روشن' : 'پوسته‌ی تیره');
    if (TG) { tryc(function () { TG.setHeaderColor(BG[t]); }); tryc(function () { TG.setBackgroundColor(BG[t]); }); tryc(function () { TG.setBottomBarColor && TG.setBottomBarColor(BG[t]); }); }
  }

  /* ---------- Telegram ---------- */
  function insets() {
    if (!TG) return;
    var r = document.documentElement.style, sa = TG.safeAreaInset || {}, ca = TG.contentSafeAreaInset || {};
    r.setProperty('--tg-sa-t', ((sa.top || 0) + (ca.top || 0)) + 'px'); r.setProperty('--tg-sa-b', ((sa.bottom || 0) + (ca.bottom || 0)) + 'px');
    if (TG.viewportStableHeight) r.setProperty('--app-h', TG.viewportStableHeight + 'px');
    measure();
  }
  function updateBack() {
    if (!TG || !TG.BackButton) return;
    tryc(function () { (sheetId != null || S.tab !== 'all' || S.cat || S.col || S.tag || S.lang) ? TG.BackButton.show() : TG.BackButton.hide(); });
  }
  function onBack() {
    if (sheetId != null) closeSheet();
    else if (S.tab !== 'all') setTab('all');
    else if (S.tag || S.lang) { S.tag = ''; S.lang = ''; apply('top'); }
    else if (S.cat || S.col) { S.cat = ''; S.col = ''; apply('top'); }
  }
  var mbFn = null;
  function tgMain(p) { // native MainButton keeps the user's Telegram button colour (platform convention)
    if (!TG || !TG.MainButton) return;
    tryc(function () {
      var mb = TG.MainButton; if (mbFn) { mb.offClick(mbFn); mbFn = null; }
      var r = p && p.repos[0];
      if (r) {
        mb.setParams({ text: 'باز کردن در GitHub', is_visible: true });
        mbFn = function () { haptic('impact', 'medium'); openUrl(r.url, 'gh'); }; mb.onClick(mbFn); document.body.classList.add('tg-mb');
      } else { mb.hide(); document.body.classList.remove('tg-mb'); }
    });
  }
  function initTelegram() {
    var w = window.Telegram && window.Telegram.WebApp;
    if (!w || TG === w || !(w.initData || (w.platform && w.platform !== 'unknown'))) return;
    TG = w;
    tryc(function () { TG.ready(); }); tryc(function () { TG.expand(); });
    tryc(function () { TG.disableVerticalSwipes && TG.disableVerticalSwipes(); });
    tryc(function () { TG.BackButton.onClick(onBack); });
    tryc(function () { TG.onEvent('themeChanged', applyTheme); });
    ['viewportChanged', 'safeAreaChanged', 'contentSafeAreaChanged', 'fullscreenChanged'].forEach(function (ev) { tryc(function () { TG.onEvent(ev, insets); }); });
    insets(); applyTheme(); cloudLoad(); updateBack();
    if (sheetId != null) tgMain(byId.get(sheetId));
  }

  /* ---------- events ---------- */
  var qt;
  function runSearch() { S.q = el.q.value; if (S.tab === 'cats' || S.tab === 'chat') S.tab = 'all'; apply('top'); }
  el.q.addEventListener('input', function () { el['q-clear'].hidden = !el.q.value; clearTimeout(qt); qt = setTimeout(runSearch, DEBOUNCE); });
  el['search-form'].addEventListener('submit', function (e) {
    e.preventDefault(); clearTimeout(qt); runSearch();
    if (isDesk()) focusRow(rowList()[0]); else el.q.blur();
  });
  el['q-clear'].addEventListener('click', function () { el.q.value = ''; clearTimeout(qt); runSearch(); el.q.focus(); });
  el.sort.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; S.sort = b.getAttribute('data-sort'); haptic('select'); apply(); });
  el['fav-seg'].addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; S.fs = b.getAttribute('data-fs'); haptic('select'); apply(); });
  el.tabs.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) setTab(b.getAttribute('data-tab')); });
  el.theme.addEventListener('click', function () { ls.set('rf.theme', curTheme() === 'dark' ? 'light' : 'dark'); applyTheme(); haptic('select'); });
  el.backdrop.addEventListener('click', function () { closeSheet(); });
  document.addEventListener('input', function (e) {
    if (e.target.id !== 'd-note') return;
    setNote(detailId(), e.target.value); var c = $('#d-cnt', detailBox()); if (c) c.textContent = e.target.value.length + '/' + NOTE_MAX;
  });

  document.addEventListener('click', function (e) {
    var t = e.target, b;
    if ((b = t.closest('[data-fav]'))) return toggleFav(+b.getAttribute('data-fav'));
    if ((b = t.closest('[data-open]'))) { var rr = b.closest('.row'); if (rr) roving(rr); openDetail(+b.getAttribute('data-open')); if (e.detail === 0 && isDesk()) el.pane.focus({ preventScroll: true }); return; }
    if ((b = t.closest('[data-st]'))) return setFavState(detailId(), b.getAttribute('data-st'));
    if (t.closest('[data-note]')) { var nid = detailId(); noteOpen[nid] = true; renderSave(); var ta = $('#d-note', detailBox()); if (ta) ta.focus(); return; }
    if (t.closest('[data-unsave]')) { var uid = detailId(); var undo = setFav(uid, null); haptic('impact', 'light'); return toast('از ذخیره‌شده حذف شد', undo); }
    if ((b = t.closest('[data-tag]'))) return setFilter('tag', b.getAttribute('data-tag'), !!b.closest('.side'));
    if ((b = t.closest('[data-lang]'))) return setFilter('lang', b.getAttribute('data-lang'), !!b.closest('.side'));
    if ((b = t.closest('[data-cat]'))) return setFilter('cat', b.getAttribute('data-cat'), !!b.closest('.side'));
    if ((b = t.closest('[data-col]'))) return setFilter('col', b.getAttribute('data-col'), !!b.closest('.side'));
    if ((b = t.closest('[data-scope]'))) { var scp = b.getAttribute('data-scope'); if (scp === 'fav' || scp === 'chat') return setTab(scp); S.tab = 'all'; return clearFilters(); }
    if (t.closest('[data-chat-retry]')) { chatLoad = 0; return mountChat(); }
    if ((b = t.closest('[data-readme]'))) { var sec = b.closest('.d-rd'), on = sec.querySelector('[data-rd-i][aria-pressed="true"]'); return loadReadme(sec, on ? +on.getAttribute('data-rd-i') : 0); }
    if ((b = t.closest('[data-rd-i]'))) { var sc2 = b.closest('.d-rd'); sc2.querySelectorAll('[data-rd-i]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); if (!sc2.querySelector('.rd').hidden) loadReadme(sc2, +b.getAttribute('data-rd-i')); return; }
    if (t.closest('#scope-x')) { S.cat = ''; S.col = ''; return apply('top'); }
    if ((b = t.closest('[data-untoken]'))) { var k = b.getAttribute('data-untoken'); S[k] = ''; return apply('top'); }
    if ((b = t.closest('[data-clear]'))) return clearFilters(b.getAttribute('data-clear') === 'all');
    if (t.closest('[data-fs-reset]')) { S.fs = ''; return apply(); }
    if (t.closest('[data-retry]')) { el.state.innerHTML = '<p class="code">GET ./data.json …</p>'; return fetchData(true).then(function () { if (D) { el.toolbar.hidden = false; indexReady = true; apply(); renderPane(); } }); }
    if ((b = t.closest('[data-go]'))) return setTab(b.getAttribute('data-go'));
    if (t.closest('[data-close]')) return closeSheet();
    if ((b = t.closest('[data-copy]'))) return copyText(b.getAttribute('data-copy'), b.getAttribute('data-copymsg'), b);
    if (t.closest('[data-share]')) return share(byId.get(detailId()));
    if ((b = t.closest('[data-export]'))) { var tx = exportText(); return b.getAttribute('data-export') === 'copy' ? copyText(tx, 'فهرست کپی شد') : shareUrl('https://t.me/RepoFA', tx.length > 3500 ? tx.slice(0, 3490) + '…' : tx); }
    if ((b = t.closest('a[data-ext]'))) { if (TG && openUrl(b.href, b.getAttribute('data-ext'))) e.preventDefault(); }
  });

  if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { if (en[0].isIntersecting) more(); }, { rootMargin: '800px 0px' }).observe(el.sentinel);
  else window.addEventListener('scroll', function () { if (innerHeight + scrollY > document.body.scrollHeight - 900) more(); }, { passive: true });
  document.addEventListener('visibilitychange', function () { if (!document.hidden && Date.now() - lastFetch > MAX_AGE_REFRESH) fetchData(); });
  window.addEventListener('online', function () { fetchData(); discover(true); });
  var tgs = document.getElementById('tg-sdk'); if (tgs) tgs.addEventListener('load', initTelegram);
  if (window.matchMedia) tryc(function () { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { if (!ls.get('rf.theme')) applyTheme(); }); });

  /* ---------- chat: API discovery (off the critical path) + lazily loaded chat.js/chat.css ---------- */
  var API = { state: 'idle', base: null, cfg: null, next: 0, fails: 0, busy: null, seen: false };
  function probe(b) {
    var c = window.AbortController ? new AbortController() : null, tm = setTimeout(function () { if (c) c.abort(); }, 4000);
    return fetch(b + '/api/health', { signal: c && c.signal, credentials: 'omit', cache: 'no-store' })
      .then(function (r) { clearTimeout(tm); return r.ok; }, function () { clearTimeout(tm); return false; });
  }
  function discover(force) { // config.json lists tunnel URLs; the first base whose /api/health answers wins
    if (API.busy) return API.busy;
    if (!force && Date.now() < API.next) return Promise.resolve(API.base);
    API.busy = fetch('./config.json?t=' + Date.now(), { cache: 'no-store', credentials: 'omit' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (cfg) {
        API.cfg = cfg && typeof cfg === 'object' ? cfg : null;
        var bases = API.cfg && Array.isArray(API.cfg.apiBases) ? API.cfg.apiBases.filter(function (b) { return /^https?:\/\/[^\s]+$/.test(b); }) : [], i = 0;
        var next = function () { if (i >= bases.length) return null; var b = String(bases[i++]).replace(/\/+$/, ''); return probe(b).then(function (ok) { return ok ? b : next(); }); };
        return next();
      })
      .catch(function () { return null; })
      .then(function (b) {
        API.busy = null; API.base = b; API.state = b ? 'ok' : 'none'; if (b) API.seen = true;
        API.fails = b ? 0 : API.fails + 1;
        API.next = Date.now() + (b ? 30e3 : Math.min(30e3 * Math.pow(2, API.fails - 1), 300e3));   // ≥30 s, backoff to 5 min
        syncChatTab();
        if (b && location.hash === '#chat' && S.tab !== 'chat') setTab('chat');
        return b;
      });
    return API.busy;
  }
  /* browser (not Telegram): a slim line that deep-links to the bot; the login entry appears once chat is reachable */
  function syncTgLine() {
    var inTg = !!(TG || (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData));
    var off = tryc(function () { return localStorage.getItem('rf.tgline') === '0'; }, false);
    var el2 = document.getElementById('tgline'); if (!el2) return;
    el2.hidden = inTg || off;
    var bot = API.cfg && /^[A-Za-z0-9_]{5,32}$/.test(API.cfg.botUsername || '') ? API.cfg.botUsername : 'Michael_chatbot';
    document.getElementById('tgl-open').href = 'https://t.me/' + bot + '?start=repofa';
    document.getElementById('tgl-login').hidden = !API.seen || S.tab === 'chat' || !!tryc(function () { return localStorage.getItem('rf.tok'); }, null);
  }
  function syncChatTab() { // hidden until a base has answered once; afterwards the chat view reports its own connection state
    var on = API.seen; el['tab-chat'].hidden = !on; el['nav-chat'].parentNode.hidden = !on; syncTgLine();
  }
  var chatLoad = 0;
  function mountChat() {
    if (window.__rfChat && window.__rfChat.ready) return window.__rfChat.show();
    if (chatLoad) return; chatLoad = 1;
    el.chat.innerHTML = '<p class="chat-boot">در حال بارگیری گفت‌وگو…</p>';
    var n = 0, ok = true, done = function () {
      if (++n < 2) return;
      if (ok && window.__rfChat) window.__rfChat.init(el.chat, CORE);
      else { chatLoad = 0; el.chat.innerHTML = '<p class="chat-boot">بارگیری گفت‌وگو ناموفق بود. <button type="button" class="link" data-chat-retry="1">تلاش دوباره</button></p>'; }
    };
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'chat.css'; l.onload = done; l.onerror = function () { ok = false; done(); }; document.head.appendChild(l);
    var sc = document.createElement('script'); sc.src = 'chat.js'; sc.async = true; sc.onload = done; sc.onerror = function () { ok = false; done(); }; document.head.appendChild(sc);
  }
  /* a project from a chat answer: the catalog's own record when known, else a normalised stand-in */
  function ensureProject(it) {
    var id = it && it.id; if (id == null) return null;
    if (byId.has(id)) return byId.get(id);
    var repos = (Array.isArray(it.repos) ? it.repos : []).map(function (r) {
      var m = /github\.com\/([^\/\s]+)\/([^\/\s#?]+)/i.exec(String(r && r.url || ''));
      return m ? { url: r.url, owner: m[1], name: m[2].replace(/\.git$/, ''), stars: typeof r.stars === 'number' ? r.stars : undefined } : null;
    }).filter(Boolean);
    var p = { id: id, title: String(it.title || (repos[0] && repos[0].name) || '—'), summary: proseDigits(it.summary || ''), tags: Array.isArray(it.tags) ? it.tags.map(String) : [],
      language: it.language || '', repos: repos, tg_url: /^https:\/\/t\.me\//.test(it.tg_url || '') ? it.tg_url : '', _ext: true, _t: 0 };
    p._s = repos[0] && repos[0].stars ? repos[0].stars : 0; p._l = p.language; p._i = P.length; P.push(p); byId.set(id, p);
    return p;
  }
  /* README viewer: lazy readme.js/readme.css on the first «نمایش README» */
  var rdLoad = null;
  function loadReadme(sec, i) {
    var p = byId.get(detailId()); if (!p) return;
    var r = p.repos[i || 0], box = sec.querySelector('.rd'), btn = sec.querySelector('.rd-open'); if (!r || !box) return;
    box.hidden = false; if (btn) btn.hidden = true;
    rdLoad = rdLoad || new Promise(function (ok, bad) {
      var n = 0, fail = false, done = function () { if (++n === 2) (fail || !window.__rfReadme ? bad : ok)(); };
      var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'readme.css'; l.onload = done; l.onerror = function () { fail = true; done(); }; document.head.appendChild(l);
      var sc = document.createElement('script'); sc.src = 'readme.js'; sc.async = true; sc.onload = done; sc.onerror = function () { fail = true; done(); }; document.head.appendChild(sc);
    });
    box.textContent = 'در حال بارگیری…';
    rdLoad.then(function () { window.__rfReadme.open(box, r, CORE); }, function () { rdLoad = null; box.textContent = 'نمایشگر README بارگیری نشد.'; if (btn) btn.hidden = false; });
  }
  var chatRowN = 0;
  function rowFor(it) { var p = ensureProject(it); if (!p) return null; var e = buildRow(p, 'c' + (++chatRowN) + '-'); syncRow(e, p.id); return e; }
  var CORE = { S: S, api: API, discover: discover, tg: function () { return TG; }, rowFor: rowFor, openDetail: openDetail, isDesk: isDesk, faN: faN, rel: rel,
    toast: toast, haptic: haptic, openUrl: openUrl, copyText: copyText, setTab: setTab, IC: IC };

  /* service worker: versioned by the deployer's .site-hash; every step guarded (Telegram WebViews may not have SW) */
  function registerSW() {
    if (!('serviceWorker' in navigator) || !window.isSecureContext) return;
    tryc(function () {
      if (localStorage.getItem('rf.swnew') === '1') { localStorage.removeItem('rf.swnew'); setTimeout(function () { toast('نسخه‌ی جدید فعال شد'); }, 800); }
    });
    fetch('./.site-hash', { cache: 'no-store' }).then(function (r) { return r.ok ? r.text() : 'dev'; }, function () { return null; }).then(function (h) {
      if (h == null) return;   // offline: keep whatever worker is installed
      var v = (String(h).trim().match(/^[0-9a-f]{8,64}$/) || ['dev'])[0].slice(0, 16), had = !!navigator.serviceWorker.controller;
      navigator.serviceWorker.register('sw.js?v=' + v).catch(function () { });
      navigator.serviceWorker.addEventListener('controllerchange', function () { if (had) tryc(function () { localStorage.setItem('rf.swnew', '1'); }); });   // shown on next open; no reload
    });
    navigator.serviceWorker.addEventListener('message', function (e) { if (e.data && e.data.type === 'data-updated') fetchData(); });
  }
  document.getElementById('tgl-x').addEventListener('click', function () { tryc(function () { localStorage.setItem('rf.tgline', '0'); }); syncTgLine(); });

  loadFavs(); applyTheme(); initTelegram(); measure(); boot();
  setTimeout(function () { discover(true); syncTgLine(); }, 1200);
  window.addEventListener('load', function () { setTimeout(registerSW, 2000); });
  window.__rf = { core: CORE, S: S, get view() { return view; }, get P() { return P; }, compute: compute, norm: norm, apply: apply, favs: favs, select: select, openDetail: openDetail, hl: hl };
})();
