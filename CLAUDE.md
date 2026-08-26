# Özkan Hoca — LGS Öğrenci Koçluğu Web Sitesi

## Proje Sahibi
- **İsim:** Özkan (PDR mezunu, yazılımcı değil)
- **Konum:** Adana
- **Hizmet:** LGS 8. sınıf öğrencilerine birebir koçluk
- **Hedef kitle:** 8. sınıf öğrencisi olan veliler

## Teknik Yapı
- **Domain:** ozkanhoca.com (www subdomain'i de aktif, ozkanhoca.com'a 308 yönleniyor)
- **Repo:** pdrimranozkantekeli-code/ozkanhocaweb
- **Hosting:** Vercel (production branch: master, otomatik deploy)
- **Mimari:** Statik HTML/CSS/JS — framework yok, derleme adımı yok
- **Dosyalar:** `index.html` (ana sayfa) · `adana-lise-taban-puanlari.html` (araç sayfası) · `kvkk.html` · `gizlilik.html` · `blog/index.html` (liste) · `blog/*.html` (13 yazı) · `blog/blog.css`

### Adana lise taban puanları sayfası
`/adana-lise-taban-puanlari` — veli LGS puanını girer, hangi liselerin ulaşılabilir olduğunu görür. 24 okul (fen, Anadolu, sosyal bilimler). Veri sayfanın içindeki `OKULLAR` dizisinde, ayrı dosya yok.

**Veri kuralı:** 2026 taban puanları ve 2025 yüzdelik dilimleri kesin veridir. **2026 yüzdelik dilimleri MEB tarafından açıklanmadı — tahmin yazma.** Açıklandığında `d25` alanlarının yanına `d26` eklenip tablo başlığı güncellenecek. Her yıl yerleştirme sonrası `t26`/`t25` kaydırılarak güncellenmeli.

Blog sayfalarıyla aynı görünüm: `blog.css` + sayfa içi ek stiller. Vanilla JS, kütüphane yok.

### Branch
Çalışılan branch **`master`** — 6 Ağustos 2026'da GitHub'da varsayılan branch de `master` yapıldı, artık temiz bir clone doğru yere düşer.

Depoda hâlâ atıl bir `main` var (6 Haziran'da "Add files via upload" ile donmuş). Silinebilir. Yine de commit öncesi `git branch --show-current` ile doğrulamak iyi alışkanlık.

### ⚠️ cleanUrls
`vercel.json` içinde `"cleanUrls": true`. İç linkler **asla `.html` uzantılı olmayacak** — `/kvkk` doğru, `/kvkk.html` yönlendirmeye takılır ve Search Console'da "Yönlendirmeli sayfa" olarak birikir.

## Entegrasyonlar
- **Form:** Formspree (ID: `mnjyjldp`) — form doldurulunca mail gelir
- **WhatsApp:** `+90 530 677 16 85` — `wa.me/905306771685` linki
- **Google Analytics:** `G-T5M63NSF2L` (aktif)
- **Google Search Console:** doğrulandı, sitemap gönderildi
- **E-posta:** ozkan@ozkanhoca.com

## Marka Kimliği

### Renkler
```css
--gece:    #1A1645;  /* Footer, koyu vurgular */
--indigo:  #26215C;  /* Ana marka rengi, navbar */
--mor:     #534AB7;  /* Aksiyon, bağlantılar */
--lavanta: #7F77DD;  /* Vurgu, butonlar */
--altin:   #FAC775;  /* Başarı, hedef */
```

### Tipografi
- **Başlık:** DM Serif Display (Google Fonts)
- **Gövde:** DM Sans (Google Fonts)
- **Ağırlıklar:** 300, 400, 500

### Logo
- Konsept: "Yolculuk haritası" — adım noktaları + altın yıldız
- Dosyalar: `logo-icon-dark.svg`, `logo-icon-light.svg`
- Favicon: `favicon.svg`, `favicon.ico`, `favicon-32/192/512.png`
- Apple touch: `apple-touch-icon.png`

### Marka Sesi
- Güven veren, samimi, sade, profesyonel
- Veliye konuşur (öğrenciye değil)
- Pazarlama dili yok, net konuşur
- **Asla kullanma:** "Garanti başarı", "En iyi koç", abartılı vaatler
- **Tek cümle marka:** "Akademik + psikolojik + takip — üçü bir arada"

## Sayfa Yapısı
1. **Navbar** — Logo + menü + "Başvuru Formu" CTA
2. **Hero** — Başlık + alt mesaj + WhatsApp/Form butonları + profil kartı
3. **Sorunlar** — "Tanıdık geliyor mu?" 6 sorun kartı
4. **Trust bar** — PDR / 1:1 / Adana / Sınırlı kontenjan
5. **Hizmetler** — Akademik + Psikolojik + Takip (3 kart)
6. **Süreç** — 5 adım (Keşif → Plan → Seans → Rapor → LGS)
7. **Paket** — Tek paket: "LGS Öğrenci Koçluğu — Tam Destek"
8. **Hakkımda** — Profil + biyografi
9. **Başvuru formu** — Formspree entegrasyonlu
10. **Footer**

## İş Akışı
- **Strateji & tasarım:** Claude.ai project'te (ozkanhocaweb)
- **Kod yazma:** Claude Code (VSCode) — burada
- **Deploy:** Git push → Vercel otomatik

## Önemli Kurallar
- Türkçe yorum yaz, dosya isimlerini İngilizce tut (kebab-case)
- Mevcut tasarım sistemine sadık kal (renkler, fontlar, boşluklar)
- Form doğrulama JS ile, sunucu gerektirmez (Formspree zaten halleder)
- Asla `<form action>` URL'ini değiştirme (Formspree ID sabit: mnjyjldp)
- Yeni özellik eklerken mobile responsive olduğundan emin ol
- 768px ve 480px breakpoint'leri kullan

## Nasıl Çalışılır

Özkan yazılımcı değil. Depo içindeki değişiklikleri (yazı, HTML, CSS, sitemap, SEO) tek tek sormadan yap, sonucu özetle. **Canlıya çıkma anında dur:** commit/push öncesi onay al. Alan adı, Vercel, Search Console ve Instagram hesap ayarlarına sormadan dokunma.

Tahmin yürütme, veriye bak. Search Console'a Chrome eklentisiyle doğrudan erişilebiliyor — dosyalara bakıp SEO teşhisi koymak yerine gerçek veriye bak. Yanıldığında açıkça söyle.

### Commit — terminal komutu verme
Commit'e hazır olunca Özkan'a terminal komutu yazdırma. `../../05-operasyon/COMMIT-AT.command` dosyasındaki `VARSAYILAN_MESAJ` satırını o commit'e uygun şekilde güncelle; o dosyaya çift tıklayarak çalıştırıyor.

**Klasörde tek bir `.command` dosyası olur.** İkinci bir tane oluşturma — düzeltme, geri alma, force push dahil hiçbir durumda. Script zaten iki modlu:

1. Yeni commit
2. Son commit'i düzelt — amend + `--force-with-lease` push, öncesinde `yedek-duzeltme-oncesi` etiketi bırakır

Başka bir işlem gerekiyorsa bu dosyaya mod ekle, yeni dosya açma. Değişiklik sonrası `chmod +x` gerekir.

### Depoda git yazma komutu çalıştırma
Sandbox'ın `.git/` altına yazma izni yok. `git add`, `commit`, `remote set-head` gibi komutlar yarım kalıp `.git/index.lock` bırakıyor ve sandbox onu silemediği için sonraki bütün git işlemleri kilitleniyor. Okuma komutları (`git log`, `git status`, `git diff`) sorunsuz. Yazma işleri `.command` script'i üzerinden gider.

### Ölçüm — `analytics.js`
Google Analytics, çerez onayı ve dönüşüm ölçümü tek dosyada: **`/analytics.js`**. Her sayfanın `<head>` bölümünde şu satır bulunmalı:

```html
<script src="/analytics.js" defer></script>
```

25 Ağustos 2026'da kuruldu. Öncesinde ölçüm kodu yalnızca `index.html` içindeydi, bu yüzden 17 sayfa (13 blog yazısı, taban puanları, blog listesi, KVKK, gizlilik) hiç ölçülmüyordu.

Dosya üç iş yapıyor: GA4'ü çalıştırmak, Consent Mode v2 ile çerez onayını yönetmek (varsayılan **red**), ve dönüşümleri `generate_lead` olayıyla bildirmek (`yontem` parametresi: `whatsapp` / `form` / `telefon`).

**Çerez bildirimi:** `index.html`'in kendi kutusu var (`#cookieBanner`), script onu görünce karışmıyor. Diğer sayfalarda kutuyu kendisi üretiyor. İkisi aynı `localStorage` anahtarını kullanıyor (`cookie_consent`), yani bir sayfada verilen onay tüm sitede geçerli.

Ölçüm koduna dokunulduğunda `analytics.js` düzenlenir — sayfalara kod kopyalanmaz.

### Yeni blog yazısı — 6 yer güncellenir
1. Yazının kendi dosyası (`blog/<slug>.html`) — içinde **iki** JSON-LD bloğu olmalı: `BlogPosting` + `BreadcrumbList`
2. `blog/index.html` — kart + `ItemList` şeması (yeni yazı 1. sıraya, diğerlerinin `position` değeri birer kayar)
3. `sitemap.xml` — `<loc>` + **gerçek** `<lastmod>`
4. Mevcut 2-3 yazıya karşılıklı iç link (her yazı en az 2 iç link almalı)
5. Tarih dört yerde geçer: `datePublished`, `dateModified`, `post-date` satırı, `blog/index.html` kartı. **Yazmadan önce `date` çalıştır** — bu projede üç kez yanlış tarih yazıldı.
6. `<head>` içinde `<script src="/analytics.js" defer></script>` ve `</main>` sonrasında `<footer class="site-footer">` — ikisi de her sayfada olmalı (yukarıdaki Ölçüm bölümüne bak)

### Kırıntı navigasyonu (breadcrumb)
Her blog yazısında ve araç sayfasında `BreadcrumbList` şeması var (17 Ağustos 2026'da eklendi). Arama sonucunda `ozkanhoca.com › Blog › Yazı` görünümünü sağlıyor.

Yapı: `Ana Sayfa` (url'li) → `Blog` (url'li) → yazı adı (**url'siz**, son öge item almaz). Son ögenin adı **45 karakteri geçmesin** — tam başlık değil, kısaltılmış bir ad kullan. Ana sayfada breadcrumb yok, gerekmiyor.

### Yazı içi tablo
`blog.css`'te tablo stili var. Kullanımı: `<div class="tablo-sarmal"><table>…</table></div>`. Sarmal, dar ekranda yatay kaydırma sağlıyor — tablosuz kullanma.

### İkonlar — emoji kullanma
Ana sayfadaki 22 ikon, 8 Ağustos 2026'da emojiden SVG'ye çevrildi. Emoji her cihazda farklı görünüyor ve marka paletiyle uyumsuz duruyordu.

Yeni ikon eklerken: `class="ikon"`, 24×24 viewBox, `fill="none" stroke="currentColor" stroke-width="1.6"`, `aria-hidden="true"`. Renk `currentColor` ile kapsayıcıdan gelir — ikonun içine renk yazma. Kapsayıcıların çoğu flex + gap kullanıyor, ikon otomatik hizalanır.

### SEO / meta kuralları
- `<title>` en fazla **60 karakter**, `<meta name="description">` en fazla **158** — üstü arama sonucunda kesilir
- `og:title` / `twitter:title` başlıkla, `og:description` / `twitter:description` açıklamayla aynı olsun
- JSON-LD `headline` alanı sayfanın **H1'i** ile birebir eşleşmeli — `<title>` ile aynı olmak zorunda değil
- `og:image` PNG olacak, **SVG kabul edilmiyor** (`og-image.png`, 1200×630)
- Title yazarken sayfanın gerçekten karşılamadığı vaatte bulunma
- `kvkk.html` ve `gizlilik.html`'de `noindex` var — kasıtlı, kaldırma

## Yapılacaklar Listesi
- [x] Gerçek fotoğraf ekleme ("Hakkımda" bölümüne) — `ozkan-profil.webp`
- [x] KVKK ve Gizlilik Politikası sayfaları
- [x] Instagram entegrasyonu — @ozkanhocalgs
- [x] SSS bölümü
- [x] Blog bölümü (SEO için) — 10 yazı
- [ ] Sayfa hızı optimizasyonu
- [ ] Dış bağlantı çalışması — asıl SEO darboğazı (Google Business Profile, Adana yerel dizinleri, okul rehberlik servisleri)
- [ ] Adana odaklı içeriği artırma — `adana öğrenci koçluğu` en çok gösterim alan sorgu

## Notlar
- `index.html` ~2200 satır — değişiklik yaparken tüm dosyayı yeniden yazma, spesifik bölüm hedefle
- Vercel'de master branch production'a deploy ediyor, push sonrası 1-2 dk bekle
- Favicon değişiklikleri tarayıcı cache'i nedeniyle hemen görünmeyebilir (Ctrl+Shift+R gerekir)
- `gbp-kapak.png` depoda duruyor ama hiçbir HTML'de kullanılmıyor — Google Business Profile için hazırlanmış
- Ayrıntılı SEO durumu ve geçmişi: `../../05-operasyon/seo-dizine-ekleme-plani.md`
