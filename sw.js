/* RepoFA service worker. Version = the deployer's .site-hash (passed as ?v=), so a new deploy installs a new worker.
   Shell + fonts: cache-first. data.json / config.json / readme/*.md, comments/*.json: stale-while-revalidate. Never: /api/, other origins (API tunnel, GitHub, Telegram). */
'use strict';
var V = new URL(self.location.href).searchParams.get('v') || 'dev';
var SHELL = 'rf-shell-' + V, DATA = 'rf-data';
var FILES = ['./', 'index.html', 'app.css', 'app.js', 'chat.css', 'chat.js', 'readme.css', 'readme.js', 'community.css', 'community.js', 'manifest.webmanifest', 'favicon.svg', 'brand/mark.svg',
  'fonts/vz-fa-400.woff2', 'fonts/vz-fa-700.woff2', 'fonts/vz-la-400.woff2', 'fonts/vz-la-700.woff2', 'fonts/iosevka-400.woff2', 'fonts/iosevka-600.woff2'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(SHELL).then(function (c) { return c.addAll(FILES.map(function (f) { return new Request(f, { cache: 'reload' }); })); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k.indexOf('rf-shell-') === 0 && k !== SHELL; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
function swr(req, notify) {
  return caches.open(DATA).then(function (c) {
    return c.match(req, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && res.ok) {
          var et = res.headers.get('etag') || res.headers.get('last-modified') || '', old = hit && (hit.headers.get('etag') || hit.headers.get('last-modified') || '');
          c.put(req.url.split('?')[0], res.clone());
          if (notify && hit && et !== old) self.clients.matchAll().then(function (cl) { cl.forEach(function (x) { x.postMessage({ type: 'data-updated' }); }); });
        }
        return res;
      });
      if (hit) { net.catch(function () { }); return hit; }
      return net;
    });
  });
}
self.addEventListener('fetch', function (e) {
  var req = e.request, u = new URL(req.url);
  if (req.method !== 'GET' || u.pathname.indexOf('/api/') >= 0) return;
  var name = u.pathname.split('/').pop(), feed = name === 'data.json' || /\/(readme|comments)\//.test(u.pathname);
  if (u.origin !== self.location.origin) { if (feed && u.protocol === 'https:') e.respondWith(swr(req, name === 'data.json')); return; }   // a copy reading our feed (config.dataBase): cached per origin
  if (feed || name === 'config.json') { e.respondWith(swr(req, name === 'data.json')); return; }
  if (name === 'sw.js' || name === '.site-hash') return;
  if (req.mode === 'navigate') { e.respondWith(caches.match('index.html').then(function (r) { return r || fetch(req); })); return; }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(function (r) { return r || fetch(req); }));
});
