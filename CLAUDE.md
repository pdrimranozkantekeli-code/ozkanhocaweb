# Özkan Hoca — LGS Öğrenci Koçluğu Web Sitesi

## Proje Sahibi
- **İsim:** Özkan (PDR mezunu, yazılımcı değil)
- **Konum:** Adana
- **Hizmet:** LGS 8. sınıf öğrencilerine birebir koçluk
- **Hedef kitle:** 8. sınıf öğrencisi olan veliler

## Teknik Yapı
- **Domain:** ozkanhoca.com (www subdomain'i de aktif)
- **Repo:** pdrimranozkantekeli-code/ozkanhocaweb (master branch)
- **Hosting:** Vercel (production branch: master, otomatik deploy)
- **Mimari:** Tek HTML dosyası — HTML/CSS/JS (React/framework yok)
- **Ana dosya:** `index.html`

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
- Tek sayfa — yeni sayfa ekleme talebi olmadıkça
- Form doğrulama JS ile, sunucu gerektirmez (Formspree zaten halleder)
- Asla `<form action>` URL'ini değiştirme (Formspree ID sabit: mnjyjldp)
- Yeni özellik eklerken mobile responsive olduğundan emin ol
- 768px ve 480px breakpoint'leri kullan

## Yapılacaklar Listesi
- [ ] Gerçek fotoğraf ekleme ("Hakkımda" bölümüne)
- [ ] KVKK ve Gizlilik Politikası sayfaları
- [ ] Instagram entegrasyonu
- [ ] SSS bölümü
- [ ] Blog bölümü (SEO için)
- [ ] Sayfa hızı optimizasyonu

## Notlar
- `index.html` 1500+ satır tek dosya — değişiklik yaparken `str_replace` ile spesifik bölüm hedefle
- Vercel'de master branch production'a deploy ediyor, push sonrası 1-2 dk bekle
- Favicon değişiklikleri tarayıcı cache'i nedeniyle hemen görünmeyebilir (Ctrl+Shift+R gerekir)
