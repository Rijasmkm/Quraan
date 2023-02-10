const t = ["./", "/app-index.html", "/manifest.json", "/app.png", "/assets/bg.png", "/assets/fonts/logo.woff", "/sources/quran.json", "/sources/sources.json", "/sources/arabic_words.json", "/sources/morphology.json", "https://fonts.nuqayah.com/kitab-base.woff2?v3", "https://fonts.nuqayah.com/kitab-base-b.woff2?v3", "https://fonts.nuqayah.com/kitab-phrases.woff2?v3", "/assets/ayatt-logo.svg", "https://nuqayah.com/assets/nuqayah.svg"],
    s = ["/get.php", "/get_mushaf.php", "/get_info.php", "/get_word.php"];
self.addEventListener("install", (s => {
    var e;
    s.waitUntil(Promise.all([(e = t => "tafsir-app-v1649708916294" !== t && "tafsir-app-data" !== t, caches.keys().then((t => Promise.all(t.filter(e).map((t => caches.delete(t))))))), caches.open("tafsir-app-v1649708916294").then((s => Promise.all(t.map((t => (async (t, s) => t.put(s, await fetch(`${s}${s.includes("?")?"&":"?"}__nc=${Date.now()}`)))(s, t))))))])), self.skipWaiting()
})), self.addEventListener("fetch", (e => {
    let a = e.request.url.replace(location.origin, "");
    if (s.some((t => a.startsWith(t)))) return void e.respondWith(caches.match(a).then((t => t || function(t, s) {
        const e = t.clone();
        return fetch(e).then((e => {
            if (!e || 200 !== e.status || "basic" !== e.type) return e;
            const a = e.clone();
            return caches.open(s).then((s => {
                s.put(t, a)
            })), e
        }))
    }(e.request, "tafsir-app-data"))));
    "/" === a && (a = "./");
    const n = /^\/((([\w-]+\/)?\d+\/\d+)|(([\w-]+\/)?[ء-ْ -]+)|(help|about|contact))$/.test(a);
    if (!n && !t.includes(a)) return;
    const o = a.startsWith("app-index.html");
    e.respondWith(caches.match(n ? "/" : e.request, {
        ignoreSearch: o
    }).then((t => t || fetch(e.request))))
}));