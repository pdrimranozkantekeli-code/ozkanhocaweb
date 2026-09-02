# Özkan Hoca — LGS Öğrenci Koçluğu Web Sitesi

## Proje Sahibi
- **İsim:** Özkan Hoca — tam adı **Psk. Dan. İmran Özkan Tekeli** (yazılımcı değil)
- **Eğitim:** Hasan Kalyoncu Üniversitesi, Psikolojik Danışmanlık ve Rehberlik, **2017 mezunu** (lisans; yüksek lisans yok)
- **Deneyim:** 2026 itibarıyla **7 yıldır** LGS öğrencileriyle çalışıyor — *bu sayı her yıl güncellenmeli*
- **Konum:** Adana
- **Hizmet:** LGS 8. sınıf öğrencilerine birebir koçluk
- **Hedef kitle:** 8. sınıf öğrencisi olan veliler

## Teknik Yapı
- **Domain:** ozkanhoca.com (www subdomain'i de aktif, ozkanhoca.com'a 308 yönleniyor)
- **Repo:** pdrimranozkantekeli-code/ozkanhocaweb
- **Hosting:** Vercel (production branch: master, otomatik deploy)
- **Mimari:** Statik HTML/CSS/JS — framework yok, derleme adımı yok
- **Dosyalar:** `index.html` (ana sayfa) · `yks.html` (YKS hizmet sayfası) · `adana-lise-taban-puanlari.html` ve `net-hesaplama.html` (araç sayfaları) · `kvkk.html` · `gizlilik.html` · `blog/index.html` (liste) · `blog/*.html` (14 yazı) · `blog/blog.css`
- **Ortak script'ler:** `analytics.js` (ölçüm + çerez + dönüşüm) · `nav.js` (menüdeki Araçlar açılır listesi). İkisi de **tüm sayfalarda** `defer` ile yüklenir; koda dokunulunca dosya düzenlenir, sayfalara kopyalanmaz.

### Adana lise taban puanları sayfası
`/adana-lise-taban-puanlari` — veli LGS puanını girer, hangi liselerin ulaşılabilir olduğunu görür. 24 okul (fen, Anadolu, sosyal bilimler). Veri sayfanın içindeki `OKULLAR` dizisinde, ayrı dosya yok.

**Veri kuralı:** 2026 taban puanları ve 2025 yüzdelik dilimleri kesin veridir. **2026 yüzdelik dilimleri MEB tarafından açıklanmadı — tahmin yazma.** Açıklandığında `d25` alanlarının yanına `d26` eklenip tablo başlığı güncellenecek. Her yıl yerleştirme sonrası `t26`/`t25` kaydırılarak güncellenmeli.

**Okul okul bölümü (26 Ağustos 2026):** Sayfanın alt yarısında 24 okulun her biri için statik HTML kartı var — `<h3>` başlık, `#okul-slug` anchor, veri tablosu ve okula özgü yorum. Üstündeki araç JS ile çalışıyor; Google JS'i beklemeden içeriği görebilsin diye bu bölüm statik yazıldı.

Sebebi Search Console verisi: veliler tek tek okul adı arayıp bizi buluyor ("eczacı bahattin-sevinç erdinç fen lisesi taban puanı", "ceyhan fen lisesi taban puanı 2025", "bahtiyar vahabzade sosyal bilimler lisesi taban puanı"). Genel `adana lise taban puanları` sorgusunda devlerle yarışamayız ama **tek okul adı** sorgularında rekabet düşük.

`OKULLAR` dizisi güncellenirse alttaki kartlar da elle güncellenmeli — ikisi ayrı yerde duruyor. Yorum metinleri veriye dayalı (puan, yüzdelik, kontenjan, ilçe, yıllık değişim); **okul hakkında doğrulanmamış bilgi yazma** (yurt, kulüp, öğretmen kadrosu vb.).

Blog sayfalarıyla aynı görünüm: `blog.css` + sayfa içi ek stiller. Vanilla JS, kütüphane yok.

### LGS net hesaplama sayfası
`/net-hesaplama` (29 Ağustos 2026) — doğru/yanlış girilir, ders ders ve toplam net çıkar. Sözel (50 soru) ve sayısal (40 soru) ayrı hesaplanır, toplam 90.

**Formül:** `net = doğru − yanlış/3`. Ders listesi sayfa içindeki `DERSLER` dizisinde; soru sayıları toplamı 90 olmalı.

**Negatif net gizlenmiyor** — 2 doğru 9 yanlış = −1 net. Deneme karneleri de böyle gösteriyor; sıfıra yuvarlamak gerçeği saklar. Bunu "düzeltmeye" kalkma.

**LGS puanı hesaplanmıyor ve bu bilinçli.** Puan, ham puanın o yılki Türkiye ortalaması ve standart sapmasıyla standart puana çevrilmesiyle bulunuyor; bu istatistikler sınavdan sonra açıklanıyor. Sayfada "Neden burada LGS puanı yazmıyor?" başlığıyla açıkça anlatılıyor. **Puan ya da yüzdelik dilim tahmini ekleme.**

### YKS hizmet sayfası
`/yks` (29 Ağustos 2026) — 12. sınıf ve mezun adaylara yönelik hizmet sayfası. Site LGS ana kimliğini koruyor; YKS ikinci hizmet. Ana sayfada "Lisede bir çocuğunuz da mı var?" bandı **hakkımda bölümünden sonra** duruyor, LGS ikna akışını bölmesin diye — yerini değiştirme.

### Menü: Araçlar açılır listesi
Menüde `Ana Sayfa · YKS · Araçlar · Blog · Başvuru` var. "Araçlar" altında net hesaplama ve taban puanları duruyor. Davranışı `nav.js` yönetiyor: tıklamayla açılır (dokunmatik ekranda hover yok), Escape ve dışarı tıklama kapatır, klavyeyle gezilir.

**Bulunulan sayfa kendiliğinden işaretleniyor** — `nav.js` içindeki `ARAC_YOLLARI` listesine bakarak. Yani 20 sayfada aynı menü işaretlemesi durur, sayfalara elle `class="active"` yazılmaz.

**Yeni araç eklerken iki yer:** `nav.js` içindeki `ARAC_YOLLARI` dizisi + sayfalardaki `.nav-arac-menu` bloğu.

**KVKK ve gizlilik sayfalarının menüsü farklı** (`doc-navbar`, sadece "Ana Sayfa"). Toplu menü değişikliği yaparken bu ikisi eşleşmez; 29 Ağustos'ta bir toplu değişiklik menüyü bulamayıp bu iki sayfanın **footer'ına** yazdı. Menü işlemlerinden sonra "açılır menü sadece `<nav>` içinde mi" diye kontrol et.

### Branch
Çalışılan branch **`master`** — 6 Ağustos 2026'da GitHub'da varsayılan branch de `master` yapıldı, artık temiz bir clone doğru yere düşer.

Depoda hâlâ atıl bir `main` var (6 Haziran'da "Add files via upload" ile donmuş). Silinebilir. Yine de commit öncesi `git branch --show-current` ile doğrulamak iyi alışkanlık.

### ⚠️ cleanUrls
`vercel.json` içinde `"cleanUrls": true`. İç linkler **asla `.html` uzantılı olmayacak** — `/kvkk` doğru, `/kvkk.html` yönlendirmeye takılır ve Search Console'da "Yönlendirmeli sayfa" olarak birikir.

## Entegrasyonlar
- **Form:** Formspree (ID: `mnjyjldp`) — form doldurulunca mail gelir. Teslim adresi Formspree panelinde ayarlı, kodda değil.
- **Telefon:** `0540 677 16 85` (`+905406771685`) — işletme hattı, 2 Eylül 2026'da geçildi. Kişisel numara `0530...` sitede geçmez.
- **E-posta:** `ozkanhocalgsyks@gmail.com`
- **WhatsApp:** `+90 540 677 16 85` — `wa.me/905406771685` linki
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

### ⚠️ Unvan kullanımı
Özkan **PDR lisans mezunu**. Yüksek lisansı ve koçluk sertifikası **yok**.

**Kullanılacak:** "PDR mezunu", "PDR kökenli", "Psikolojik Danışman", "PDR mezunu bir koç olarak", "psikolojik danışmanlık ve rehberlik eğitimimden yola çıkarak"

**Kullanılmayacak:** "PDR uzmanı", "PDR Uzmanlığı", "Sertifikalı koç", "uzman koç" — Türkiye'de "uzman" unvanı yüksek lisans çağrıştırıyor, doğrulanamayan bir iddia olur. 26 Ağustos 2026'da sitedeki 10 kullanım temizlendi.

İstisna: başka kişilerden ("bir uzmandan destek almak", "kısa bir sertifika programı bitirmiş biri") söz ederken bu kelimeler serbest — kastedilen Özkan değil.
- **Tek cümle marka:** "Akademik + psikolojik + takip — üçü bir arada"

## Sayfa Yapısı
1. **Navbar** — Logo + menü + "Başvuru Formu" CTA
2. **Hero** — Başlık + alt mesaj + WhatsApp/Form butonları + profil kartı
3. **Sorunlar** — "Tanıdık geliyor mu?" 6 sorun kartı
4. **Trust bar** — PDR / 1:1 / Adana / Sınırlı kontenjan
5. **Hizmetler** — Akademik + Psikolojik + Takip (3 kart)
6. **Süreç** — 5 adım (Keşif → Plan → Seans → Rapor → LGS)
7. **Paket** — Tek paket: "LGS ve YKS Öğrenci Koçluğu — Tam Destek"
8. **Hakkımda** — Profil + biyografi
9. **YKS bandı** — `/yks` sayfasına yönlendiren şerit (hakkımda'dan sonra, bilinçli)
10. **Blogdan son yazılar** — üç kart
11. **Veli yorumları**
12. **Başvuru formu** — Formspree entegrasyonlu
13. **Footer**

## İş Akışı
- **Strateji & tasarım:** Claude.ai project'te (ozkanhocaweb)
- **Kod yazma:** Claude Code (VSCode) — burada
- **Deploy:** Git push → Vercel otomatik

## Önemli Kurallar
- Türkçe yorum yaz, dosya isimlerini İngilizce tut (kebab-case)
- Mevcut tasarım sistemine sadık kal (renkler, fontlar, boşluklar)
- Form doğrulama JS ile, sunucu gerektirmez (Formspree zaten halleder)
- Asla `<form action>` URL'ini değiştirme (Formspree ID sabit: mnjyjldp)
- **Formspree tuzağı:** formun mesajları hangi adrese düştüğü **Formspree hesabının ayarında** tutuluyor, kodda değil. Sitedeki e-postayı değiştirmek başvuruların yeni kutuya düşmesini sağlamaz — Özkan'ın panelden teslim adresini de değiştirmesi gerekir. E-posta değişikliğinde mutlaka hatırlat.
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

### Yeni blog yazısı — 7 yer güncellenir
1. Yazının kendi dosyası (`blog/<slug>.html`) — içinde **iki** JSON-LD bloğu olmalı: `BlogPosting` + `BreadcrumbList`
2. `blog/index.html` — kart + `ItemList` şeması (yeni yazı 1. sıraya, diğerlerinin `position` değeri birer kayar)
3. `sitemap.xml` — `<loc>` + **gerçek** `<lastmod>`
4. Mevcut 2-3 yazıya karşılıklı iç link (her yazı en az 2 iç link almalı)
5. Tarih dört yerde geçer: `datePublished`, `dateModified`, `post-date` satırı, `blog/index.html` kartı. **Yazmadan önce `date` çalıştır** — bu projede üç kez yanlış tarih yazıldı.
6. `<head>` içinde `<script src="/analytics.js" defer></script>` **ve** `<script src="/nav.js" defer></script>`; `</main>` sonrasında `<footer class="site-footer">` ve sabit WhatsApp butonu (`#waFloat` + görünürlük script'i). Menüde Araçlar bloğu (`.nav-arac`) bulunmalı. En kolayı mevcut bir yazıyı şablon alıp kopyalamak.
7. Kontrol: `.html` uzantılı iç link kalmadı mı, JSON-LD blokları geçerli mi, sitemap'te gelecek tarihli `lastmod` var mı.

### Yazı sonu CTA'sı
Her yazının sonunda `.article-cta` kutusu var; içinde **iki** seçenek bulunur (25 Ağustos 2026'da ikinciye çevrildi):

```html
<div class="article-cta-actions">
  <a href="/#iletisim" class="article-cta-btn">Ücretsiz Görüşme Planla</a>
  <a href="https://wa.me/905406771685?text=..." class="article-cta-wa" target="_blank" rel="noopener">…WhatsApp'tan sorun</a>
</div>
```

Blog okuyan veli çoğunlukla başvuru aşamasında değil, sorusu var — form yüksek eşikli, WhatsApp tek tık. İkisi eşit ağırlıkta duruyor.

**WhatsApp ön dolgu mesajı sayfa bağlamına göre değişir** — böylece gelen mesaja bakınca ziyaretçinin nereden geldiği belli oluyor. Yeni sayfa eklerken o sayfaya uygun bir metin yaz, gelişigüzel kopyalama:

| Sayfa | Mesaj |
|---|---|
| Ana sayfa | "…öğrenci koçluğu hakkında bilgi almak istiyorum." (SSS bölümünde "…bir sorum var.") |
| Blog yazıları | "…sitenizdeki yazıyı okudum ve bir sorum var." |
| `/yks` | "…YKS koçluğu hakkında bilgi almak istiyorum." |
| `/net-hesaplama` | "…deneme netlerimi değerlendirmenizi istiyorum." |
| `/adana-lise-taban-puanlari` | "…Adana liseleri ve tercih hakkında bir sorum var." |

Ana sayfadaki mesaj 29 Ağustos 2026'da "LGS koçluğu"ndan "öğrenci koçluğu"na çevrildi — site artık YKS de veriyor, mesajın ziyaretçiyi tek sınava hapsetmemesi gerekiyor. Metin `text=` parametresinde **URL kodlu** durur; elle yazarken Türkçe karakterleri kodlamayı unutma.

### Kırıntı navigasyonu (breadcrumb)
Her blog yazısında ve araç sayfasında `BreadcrumbList` şeması var (17 Ağustos 2026'da eklendi). Arama sonucunda `ozkanhoca.com › Blog › Yazı` görünümünü sağlıyor.

Yapı: `Ana Sayfa` (url'li) → `Blog` (url'li) → yazı adı (**url'siz**, son öge item almaz). Son ögenin adı **45 karakteri geçmesin** — tam başlık değil, kısaltılmış bir ad kullan. Ana sayfada breadcrumb yok, gerekmiyor.

### Yazı içi tablo
`blog.css`'te tablo stili var. Kullanımı: `<div class="tablo-sarmal"><table>…</table></div>`. Sarmal, dar ekranda yatay kaydırma sağlıyor — tablosuz kullanma.

### WhatsApp buton rengi
Butonlar **#0F7C6F** (hover **#0B655A**). WhatsApp'ın bilinen parlak yeşili `#25D366` **kullanılmıyor** — beyaz metinle kontrast oranı 1,98 çıkıyor ve WCAG AA sınırı olan 4,5'in çok altında kalıyor. Lighthouse 28 Ağustos 2026'da bunu hata olarak işaretledi. Yeni yeşil 5,08 veriyor.

### Hız — bilinenler
- `analytics.js` içindeki `gtag.js` **`load` olayından sonra** yükleniyor. 163 KB'lık bu dosya sayfayla birlikte inince LCP geciktiriyordu. Erken yüklemeye geri çevirme.
- Sabit WhatsApp butonunun kaydırma kodu `requestAnimationFrame` kullanır ve **yalnızca durum değiştiğinde** `classList` yazar. Her kaydırmada DOM'a yazmak Lighthouse'ta 93 ms'lik zorunlu yeniden düzenlemeye yol açıyordu.
**Ölçüm geçmişi (mobil, Moto G Power / yavaş 4G):**

| Tarih | Perf. | Erişil. | FCP | LCP | TBT | SI |
|---|---|---|---|---|---|---|
| 28 Ağu 18:08 | 78 | 94 | 3,0 sn | 4,6 sn | 50 ms | 3,5 sn |
| **29 Ağu 12:24** | **89** | **100** | **2,9 sn** | **3,0 sn** | **10 ms** | **2,9 sn** |

Aradaki değişiklikler: `gtag.js` ertelendi, WhatsApp buton rengi düzeltildi, yıldızlara `role="img"`, kaydırma kodu yalnızca durum değişince DOM'a yazıyor. **LCP 1,6 saniye, TBT 40 ms düştü; erişilebilirlik 100'e çıktı.**

**Masaüstü (29 Ağu):** Performans 99 · Erişilebilirlik 97 · En İyi Uygulamalar 100 · SEO 100 · FCP/LCP/SI 0,8 sn · TBT 10 ms.

⚠️ Masaüstünde bir kontrast uyarısı kalmış (mobilde yok). Paylaşılan PDF'te "Başarısız Öğeler" listesi açık olmadığı için hangi öğe olduğu tespit edilemedi. Navbar renkleri elle hesaplandı, hepsi geçiyor (en düşüğü 6,93). Bir sonraki ölçümde o bölüm açılıp bakılmalı.

- Kalan darboğaz: `index.html` ~107 KB (43 KB'ı sayfa içi CSS) ve Google Fonts'un harici sunucudan gelmesi. LCP'yi 2,5 sn altına indirmek için fontları kendi sitemize taşımak gerekebilir — 89 puan zaten iyi, bu iş isteğe bağlı.

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
- [x] Instagram entegrasyonu — @ozkanhocalgsyks
- [x] SSS bölümü
- [x] Blog bölümü (SEO için) — 14 yazı
- [x] Ücretsiz araçlar — taban puanları, net hesaplama
- [x] YKS hizmet sayfası — `/yks`
- [ ] Sayfa hızı optimizasyonu
- [ ] Dış bağlantı çalışması — asıl SEO darboğazı (Google Business Profile, Adana yerel dizinleri, okul rehberlik servisleri)
- [ ] Adana odaklı içeriği artırma — `adana öğrenci koçluğu` en çok gösterim alan sorgu

## Notlar
- `index.html` ~2200 satır — değişiklik yaparken tüm dosyayı yeniden yazma, spesifik bölüm hedefle
- Vercel'de master branch production'a deploy ediyor, push sonrası 1-2 dk bekle
- Favicon değişiklikleri tarayıcı cache'i nedeniyle hemen görünmeyebilir (Ctrl+Shift+R gerekir)
- `gbp-kapak.png` depoda duruyor ama hiçbir HTML'de kullanılmıyor — Google Business Profile için hazırlanmış
- Ayrıntılı SEO durumu ve geçmişi: `../../05-operasyon/seo-dizine-ekleme-plani.md`
