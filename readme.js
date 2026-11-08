/* RepoFA README viewer — lazy chunk, loaded on the first «نمایش README».
   Source: ./readme/<owner>__<name>.md on the Pages origin only (the bot refreshes READMEs in one nightly pass; clients never call
   GitHub). localStorage keeps the last copy for instant and offline display.
   Untrusted text only ever reaches the DOM through createElement / textContent / validated attributes. */
(function () {
  'use strict';
  var CAP = 200 * 1024, C = null;
  var tryc = function (f, d) { try { return f(); } catch (e) { return d; } };
  var E = function (t, cls, txt) { var n = document.createElement(t); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; };
  var dirOf = function (t) { return /[؀-ۿ]/.test(t) ? 'rtl' : 'ltr'; };

  /* ---------- fetching: only our Pages copy (the server refreshes READMEs once a night; clients never call GitHub) ---------- */
  function lsGet(k) { return tryc(function () { return JSON.parse(localStorage.getItem('rf.rd.' + k) || 'null'); }, null); }
  function lsSet(k, v) { if (!tryc(function () { localStorage.setItem('rf.rd.' + k, JSON.stringify(v)); return 1; }, 0)) tryc(function () { pruneLS(); localStorage.setItem('rf.rd.' + k, JSON.stringify(v)); }); }
  function pruneLS() { var ks = []; for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k && k.indexOf('rf.rd.') === 0) ks.push(k); } ks.slice(0, Math.ceil(ks.length / 2)).forEach(function (k) { localStorage.removeItem(k); }); }

  /* ---------- view ---------- */
  function open(box, r, core) {
    C = core; var key = (r.owner + '__' + r.name).toLowerCase(), gh = 'https://github.com/' + r.owner + '/' + r.name;
    box.textContent = ''; box.setAttribute('aria-busy', 'true');
    var note = E('p', 'rd-note'), body = E('div', 'md'), shown = null;
    var sk = E('div', 'rd-skel'); for (var i = 0; i < 5; i++) sk.appendChild(E('i')); sk.setAttribute('aria-label', 'در حال بارگیری README');
    box.appendChild(note); box.appendChild(sk); box.appendChild(body);
    var swept = C.sweptAt && C.sweptAt(), stamp = swept ? 'آخرین به‌روزرسانی: ' + C.rel(swept) : '';
    var ghLink = function () { var g = E('a', 'link', 'مشاهده در GitHub'); g.href = gh; g.target = '_blank'; g.rel = 'noopener noreferrer'; g.setAttribute('data-ext', 'gh'); return g; };
    var show = function (t, offline) { if (t === shown) return; shown = t; sk.remove(); body.textContent = ''; render(t, body, r, false, gh); note.textContent = offline ? 'نسخه‌ی ذخیره‌شده روی این دستگاه' + (stamp ? ' · ' + stamp : '') : stamp; box.setAttribute('aria-busy', 'false'); };
    var cached = lsGet(key);
    if (cached && cached.t) show(cached.t);
    fetch(C.dataUrl('readme/' + key + '.md'), { cache: 'no-cache', credentials: 'omit' }).then(function (res) {   // conditional (ETag) via the HTTP cache / service worker
      if (res.status === 404) return null;
      if (!res.ok) throw res.status;
      return res.text();
    }).then(function (t) {
      if (t == null) {
        if (cached) tryc(function () { localStorage.removeItem('rf.rd.' + key); });
        sk.remove(); body.textContent = ''; box.setAttribute('aria-busy', 'false');
        note.textContent = 'README این مخزن هنوز ذخیره نشده است.';
        var w = E('p', 'rd-acts'); w.appendChild(ghLink()); box.appendChild(w); return;
      }
      lsSet(key, { t: t.slice(0, CAP), at: Date.now() }); show(t);
    }).catch(function () {
      if (shown) { note.textContent = 'نسخه‌ی ذخیره‌شده روی این دستگاه' + (stamp ? ' · ' + stamp : ''); return; }
      sk.remove(); box.setAttribute('aria-busy', 'false'); note.textContent = 'README بارگیری نشد.';
      var a = E('button', 'btn', 'تلاش دوباره'); a.type = 'button'; a.onclick = function () { open(box, r, core); };
      var w = E('p', 'rd-acts'); w.appendChild(a); w.appendChild(ghLink()); box.appendChild(w);
    });
  }

  /* ---------- markdown → DOM (safe subset) ---------- */
  var RAW, BLOB;
  function url(u, img) { // http(s)/mailto only; relative paths resolve against the repo
    u = String(u || '').trim().replace(/^<|>$/g, '');
    if (!u || /^(javascript|data|vbscript|file):/i.test(u.replace(/[\s\x00-\x1f]/g, ''))) return null;
    if (u[0] === '#') return null;
    var base = img ? RAW : BLOB, out = tryc(function () { return new URL(u, base).href; }, null);
    if (!out) return null;
    if (img) return /^https:\/\//.test(out) ? out : null;
    return /^(https?:|mailto:)/.test(out) ? out : null;
  }
  function render(text, into, r, plain, gh) {   // plain: kept for .rst/.txt copies
    RAW = 'https://raw.githubusercontent.com/' + r.owner + '/' + r.name + '/HEAD/'; BLOB = gh + '/blob/HEAD/';
    var t = String(text).replace(/\r\n?/g, '\n'), cut = false;
    var fa = (t.slice(0, 20000).match(/[\u0600-\u06FF]/g) || []).length, la = (t.slice(0, 20000).match(/[A-Za-z]/g) || []).length;
    into.dir = fa > la * 0.3 ? 'rtl' : 'ltr';   // the document's own direction; paragraphs still pick theirs
    if (t.length > CAP) { t = t.slice(0, t.lastIndexOf('\n', CAP) > 0 ? t.lastIndexOf('\n', CAP) : CAP); cut = true; }
    if (plain) { var pre = E('pre', 'rd-plain'); pre.dir = 'ltr'; pre.appendChild(E('code', null, t)); into.appendChild(pre); }
    else {
      var refs = {}; t = t.replace(/^ {0,3}\[([^\]\n]+)\]:\s*<?(\S+?)>?(?:\s+["'(].*["')])?\s*$/gm, function (m, k, v) { refs[k.toLowerCase()] = v; return ''; });
      var blocks = parse(t.split('\n'), refs, 0), i = 0;
      // chunked: the first screen at once, the rest in idle-sized slices so a 150 KB README never blocks input
      var step = function (budget) { var end = performance.now() + (budget || 12); while (i < blocks.length && performance.now() < end) into.appendChild(blocks[i++]()); if (i < blocks.length) setTimeout(step, 0); };
      step(40);
    }
    if (cut) { var more = E('p', 'rd-more'), a = E('a', 'link', 'ادامه در GitHub'); a.href = gh + '#readme'; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.setAttribute('data-ext', 'gh'); more.appendChild(a); into.appendChild(more); }
  }
  var LI = /^(\s*)([-*+]|\d{1,9}[.)])\s+(.*)$/;
  function parse(L, refs, depth) { // returns a list of thunks that build block nodes (lazy for chunking)
    var out = [], i = 0;
    if (depth > 8) { out.push(function () { return E('p', null, L.join('\n')); }); return out; }
    while (i < L.length) {
      var ln = L[i], m;
      if (/^\s*$/.test(ln)) { i++; continue; }
      if ((m = /^\s*(`{3,}|~{3,})\s*([\w+#.-]*)/.exec(ln))) {
        var fence = m[1], code = []; i++;
        while (i < L.length && L[i].trim().indexOf(fence) !== 0) code.push(L[i++]);
        i++; out.push(codeBlock.bind(null, code.join('\n'), m[2])); continue;
      }
      if ((m = /^ {0,3}(#{1,6})\s+(.*?)\s*#*\s*$/.exec(ln))) { out.push(heading.bind(null, Math.min(6, m[1].length + 2), m[2], refs)); i++; continue; }
      if (/^ {0,3}([-*_])(\s*\1){2,}\s*$/.test(ln)) { out.push(function () { return E('hr'); }); i++; continue; }
      if (/^\s*>/.test(ln)) {
        var q = []; while (i < L.length && /^\s*>/.test(L[i])) q.push(L[i++].replace(/^\s*>\s?/, ''));
        out.push(function (q) { return function () { var b = E('blockquote'); parse(q, refs, depth + 1).forEach(function (f) { b.appendChild(f()); }); return b; }; }(q)); continue;
      }
      if (/\|/.test(ln) && i + 1 < L.length && /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(L[i + 1])) {
        var rows = [ln]; i += 2; while (i < L.length && /\|/.test(L[i]) && !/^\s*$/.test(L[i])) rows.push(L[i++]);
        out.push(table.bind(null, rows, refs)); continue;
      }
      if (LI.test(ln)) {
        var items = []; while (i < L.length && (LI.test(L[i]) || (/^\s{2,}\S/.test(L[i]) && items.length) || (/^\s*$/.test(L[i]) && i + 1 < L.length && (LI.test(L[i + 1]) || /^\s{2,}\S/.test(L[i + 1]))))) items.push(L[i++]);
        out.push(list.bind(null, items, refs, depth)); continue;
      }
      if (i + 1 < L.length && /^ {0,3}(=+|-+)\s*$/.test(L[i + 1]) && !/^\s*</.test(ln)) { out.push(heading.bind(null, L[i + 1].trim()[0] === '=' ? 3 : 4, ln, refs)); i += 2; continue; }
      var para = [];
      while (i < L.length && !/^\s*$/.test(L[i]) && !/^\s*(`{3,}|~{3,})/.test(L[i]) && !/^ {0,3}#{1,6}\s/.test(L[i]) && !/^\s*>/.test(L[i]) && !(para.length && LI.test(L[i]))) para.push(L[i++]);
      out.push(paragraph.bind(null, para.join('\n'), refs));
    }
    return out;
  }
  function codeBlock(code, lang) {
    var w = E('div', 'rd-code'), pre = E('pre'), c = E('code', null, code); pre.dir = 'ltr'; pre.appendChild(c); w.appendChild(pre);
    var b = E('button', 'rd-copy', 'کپی'); b.type = 'button'; b.setAttribute('aria-label', 'کپی کد' + (lang ? ' ' + lang : '')); b.onclick = function () { C.copyText(code, 'کد کپی شد'); };
    w.appendChild(b); return w;
  }
  function heading(lv, txt, refs) { var h = E('h' + lv); h.dir = dirOf(txt); inline(txt, h, refs, 0); return h; }
  function paragraph(txt, refs) { var p = E('p'); p.dir = dirOf(txt.replace(/<[^>]*>/g, '')); inline(txt, p, refs, 0); return p; }
  function table(rows, refs) {
    var cells = function (l) { return l.trim().replace(/^\|/, '').replace(/\|$/, '').replace(/\\\|/g, '\u0000').split('|').map(function (c) { return c.replace(/\u0000/g, '|').trim(); }); };
    var w = E('div', 'rd-tbl'), tb = E('table'), th = E('thead'), tr = E('tr'), body = E('tbody');
    cells(rows[0]).forEach(function (c) { var x = E('th'); x.dir = dirOf(c); inline(c, x, refs, 0); tr.appendChild(x); });
    th.appendChild(tr); tb.appendChild(th);
    rows.slice(1).forEach(function (l) { var r = E('tr'); cells(l).forEach(function (c) { var x = E('td'); x.dir = dirOf(c); inline(c, x, refs, 0); r.appendChild(x); }); body.appendChild(r); });
    tb.appendChild(body); w.appendChild(tb); return w;
  }
  function list(lines, refs, depth) {
    var first = LI.exec(lines[0]), ind = first[1].length, ol = /\d/.test(first[2]), L = E(ol ? 'ol' : 'ul'), cur = null, sub = [];
    var flush = function () { if (cur && sub.length) parse(sub, refs, depth + 1).forEach(function (f) { cur.appendChild(f()); }); sub = []; };
    lines.forEach(function (ln) {
      var m = LI.exec(ln);
      if (m && m[1].length <= ind + 1) {
        flush(); cur = E('li'); var t = m[3], tk = /^\[([ xX])\]\s+/.exec(t);
        if (tk) { var c = E('span', 'rd-task' + (tk[1] !== ' ' ? ' on' : '')); c.setAttribute('role', 'img'); c.setAttribute('aria-label', tk[1] !== ' ' ? 'انجام‌شده' : 'انجام‌نشده'); cur.appendChild(c); t = t.slice(tk[0].length); }
        cur.dir = dirOf(t); inline(t, cur, refs, 0); L.appendChild(cur);
      } else sub.push(ln.replace(new RegExp('^\\s{0,' + (ind + 4) + '}'), ''));
    });
    flush(); L.dir = dirOf(lines[0]); return L;
  }

  /* inline: code, images, links, autolinks, emphasis, strike, and an allow-listed slice of raw HTML (rebuilt, never parsed as HTML) */
  var INLINE = /(`+)([\s\S]*?[^`])\1(?!`)|!\[([^\]\n]*)\]\(\s*<?([^)\s>]+)>?(?:\s+["']([^"'\n]*)["'])?\s*\)|\[((?:[^\[\]\n]|\[[^\]\n]*\])*)\]\(\s*<?([^)\s>]+)>?(?:\s+["'][^"'\n]*["'])?\s*\)|\[([^\]\n]+)\]\[([^\]\n]*)\]|<(https?:\/\/[^\s>]+)>|(\*\*|__)(?=\S)([\s\S]*?\S)\11|(\*|_)(?=\S)([\s\S]*?\S)\13(?![\w*])|~~(?=\S)([\s\S]*?\S)~~|(https?:\/\/[^\s<>()]+[^\s<>().,;:!?'"،؛])|<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b((?:[^<>"']|"[^"]*"|'[^']*')*)\/?>|( {2,}|\\)\n/g;
  var KEEP = { b: 'strong', strong: 'strong', i: 'em', em: 'em', code: 'code', kbd: 'kbd', sup: 'sup', sub: 'sub', a: 'a', p: 'p', br: 'br', img: 'img', details: 'details', summary: 'summary', pre: 'pre',
    h1: 'h3', h2: 'h4', h3: 'h5', h4: 'h6', h5: 'h6', h6: 'h6', picture: 'span', source: null, div: 'div', center: 'div', span: 'span', ul: 'ul', ol: 'ol', li: 'li', table: 'table', tr: 'tr', td: 'td', th: 'th', thead: 'thead', tbody: 'tbody', blockquote: 'blockquote', hr: 'hr', strike: 's', s: 's', del: 's' };
  var SKIP = /^(script|style|iframe|object|embed|template|noscript|svg|math|textarea|select|form|button|input|link|meta|base|frame|frameset|applet|title|head)$/i;
  function attrs(s) { var o = {}, m, re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g; while ((m = re.exec(s))) o[m[1].toLowerCase()] = m[2] != null ? m[2] : m[3] != null ? m[3] : m[4] != null ? m[4] : ''; return o; }
  function img(src, alt, title, a) {
    var u = url(src, true); if (!u) return document.createTextNode(alt || '');
    var w = +(a && a.width) || 0, h = +(a && a.height) || 0; if ((w && w <= 2) || (h && h <= 2)) return document.createTextNode('');   // tracking pixels
    var n = E('img'); n.src = u; n.alt = String(alt || '').slice(0, 300); n.loading = 'lazy'; n.decoding = 'async'; n.referrerPolicy = 'no-referrer';
    if (title) n.title = String(title).slice(0, 300);
    if (w && w <= 2000) n.width = w; if (h && h <= 2000) n.height = h;
    if (a && /^(left|right|center)$/i.test(a.align || '')) n.setAttribute('align', a.align.toLowerCase());
    return n;
  }
  function link(href, kids) { var u = url(href, false), a; if (!u) { a = E('span'); } else { a = E('a'); a.href = u; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.setAttribute('data-ext', /^https:\/\/t\.me\//.test(u) ? 'tg' : 'gh'); } kids(a); return a; }
  function inline(s, into, refs, depth) {
    if (depth > 6) { into.appendChild(document.createTextNode(s)); return; }
    var stack = [into], top = function () { return stack[stack.length - 1]; }, last = 0, m, re = new RegExp(INLINE.source, 'g'), skipTo = null;
    var text = function (t) { if (t) top().appendChild(document.createTextNode(t.replace(/\\([\\`*_{}\[\]()#+\-.!|<>~])/g, '$1'))); };
    while ((m = re.exec(s))) {
      if (skipTo) { if (m[17] === '/' && m[18].toLowerCase() === skipTo) { skipTo = null; last = re.lastIndex; } continue; }
      text(s.slice(last, m.index)); last = re.lastIndex;
      if (m[1]) top().appendChild(E('code', null, m[2].replace(/^ (.*) $/, '$1')));
      else if (m[4] != null && m[0][0] === '!') top().appendChild(img(m[4], m[3], m[5]));
      else if (m[7] != null) top().appendChild(link(m[7], function (a) { inline(m[6], a, refs, depth + 1); }));
      else if (m[8] != null) { var ref = refs[(m[9] || m[8]).toLowerCase()]; if (ref) top().appendChild(link(ref, function (a) { inline(m[8], a, refs, depth + 1); })); else text(m[0]); }
      else if (m[10]) top().appendChild(link(m[10], function (a) { a.textContent = m[10]; a.dir = 'ltr'; }));
      else if (m[11]) { var b = E('strong'); inline(m[12], b, refs, depth + 1); top().appendChild(b); }
      else if (m[13]) { var it = E('em'); inline(m[14], it, refs, depth + 1); top().appendChild(it); }
      else if (m[15] != null) { var st = E('s'); inline(m[15], st, refs, depth + 1); top().appendChild(st); }
      else if (m[16]) top().appendChild(link(m[16], function (a) { a.textContent = m[16]; a.dir = 'ltr'; }));
      else if (m[18]) {
        var tag = m[18].toLowerCase(), close = m[17] === '/', a = attrs(m[19] || '');
        if (SKIP.test(tag)) { if (!close && !/\/\s*$/.test(m[19] || '')) skipTo = tag; continue; }
        if (!(tag in KEEP)) continue;
        var to = KEEP[tag];
        if (close) { for (var k = stack.length - 1; k > 0; k--) if (stack[k]._tag === tag) { stack.length = k; break; } continue; }
        if (tag === 'img') { top().appendChild(img(a.src, a.alt, a.title, a)); continue; }
        if (tag === 'br') { top().appendChild(E('br')); continue; }
        if (tag === 'hr') { top().appendChild(E('hr')); continue; }
        if (!to || stack.length > 40) continue;
        var n = tag === 'a' ? link(a.href, function () { }) : E(to);
        if (a.title && tag !== 'a') n.title = a.title.slice(0, 300);
        if (/^(left|right|center)$/i.test(a.align || '')) n.setAttribute('align', a.align.toLowerCase());
        if (tag === 'details' && 'open' in a) n.open = true;
        n._tag = tag; top().appendChild(n); stack.push(n);
      }
      else if (m[20] != null) top().appendChild(E('br'));
    }
    if (!skipTo) text(s.slice(last));
  }

  window.__rfReadme = { open: open, _render: function (t, into, r) { render(t, into, r, false, 'https://github.com/' + r.owner + '/' + r.name); } };
})();
