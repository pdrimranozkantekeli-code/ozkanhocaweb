/* ==========================================================================
   ozkanhoca.com — olcum ve cerez onayi
   --------------------------------------------------------------------------
   Bu dosya SITENIN TUM SAYFALARINDA yuklenir. Amaci uc sey:

     1. Google Analytics 4'u calistirmak (G-T5M63NSF2L)
     2. Cerez onayini yonetmek (Consent Mode v2 — varsayilan RED)
     3. Donusumleri olcmek: WhatsApp tiklamasi ve iletisim formu

   NEDEN TEK DOSYA: onceden bu kod sadece index.html icindeydi, o yuzden
   13 blog yazisi, taban puanlari sayfasi ve yasal sayfalar hic olculmuyordu.
   Kodu 18 sayfaya kopyalamak yerine burada topladik — degisiklik gerekince
   tek yer guncelleniyor.

   EKLEME SEKLI (her sayfanin <head> bolumunde, </head> etiketinden once):
       <script src="/analytics.js" defer></script>

   Son guncelleme: 25 Agustos 2026
   ========================================================================== */

(function () {
  'use strict';

  var OLCUM_ID  = 'G-T5M63NSF2L';
  var BIR_YIL   = 365 * 24 * 60 * 60 * 1000;

  /* ---- 1. Google Analytics + Consent Mode v2 --------------------------- */

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  // VARSAYILAN: her sey reddedildi. Kullanici onaylayana kadar cerez yazilmaz.
  // Bu durumda GA4 yine de cerezsiz olcum yapar (sayfa gorunumu modellenir).
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': 500
  });

  gtag('js', new Date());
  gtag('config', OLCUM_ID, { 'anonymize_ip': true });

  // gtag.js dosyasini yukle
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + OLCUM_ID;
  document.head.appendChild(s);

  /* ---- 2. Kayitli onayi uygula ----------------------------------------- */

  function onayDurumu() {
    try {
      var onay = localStorage.getItem('cookie_consent');
      var zaman = localStorage.getItem('cookie_consent_ts');
      if (!onay || !zaman) return null;
      if (Date.now() - parseInt(zaman, 10) >= BIR_YIL) return null;  // 1 yil sonra tekrar sor
      return onay;
    } catch (e) { return null; }
  }

  function onayKaydet(deger) {
    try {
      localStorage.setItem('cookie_consent', deger);
      localStorage.setItem('cookie_consent_ts', Date.now().toString());
    } catch (e) {}
  }

  if (onayDurumu() === 'accepted') {
    gtag('consent', 'update', { 'analytics_storage': 'granted' });
  }

  /* ---- 3. Donusum olcumu ------------------------------------------------
     GA4'un standart 'generate_lead' olayini kullaniyoruz. Tek olay adi,
     'yontem' parametresiyle ayrisiyor — GA4 panelinde tek bir "onemli
     faaliyet" isaretlemek yetiyor.
     ---------------------------------------------------------------------- */

  function donusumBildir(yontem, konum) {
    gtag('event', 'generate_lead', {
      'yontem': yontem,                       // whatsapp | form
      'konum': konum || 'bilinmiyor',         // hangi bolumden tiklandi
      'sayfa': location.pathname              // hangi sayfadan geldi
    });
  }

  // Diger scriptlerin (ornegin index.html'deki form kodu) cagirabilmesi icin
  window.donusumBildir = donusumBildir;

  document.addEventListener('DOMContentLoaded', function () {

    // -- WhatsApp tiklamalari --
    // Sayfadaki tum wa.me linkleri. Hangisinin tiklandigini ayirt edebilmek
    // icin butonun sinifina/konumuna gore etiket veriyoruz.
    document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
      link.addEventListener('click', function () {
        var konum = 'diger';
        if (link.classList.contains('wa-float'))        konum = 'sabit-buton';
        else if (link.classList.contains('btn-wa'))      konum = 'hero';
        else if (link.classList.contains('contact-wa-btn')) konum = 'iletisim';
        else if (link.closest('.faq-section'))           konum = 'sss';
        else if (link.closest('.site-footer'))           konum = 'footer';
        else if (link.closest('.article-cta'))           konum = 'yazi-sonu';
        donusumBildir('whatsapp', konum);
      });
    });

    // -- Telefon tiklamalari (ileride tel: linki eklenirse calisir) --
    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
      link.addEventListener('click', function () {
        donusumBildir('telefon', 'baglanti');
      });
    });

    // -- Cerez bildirimi --
    cerezBildirimi();
  });

  /* ---- 4. Cerez bildirimi ----------------------------------------------
     index.html'in kendi bildirim kutusu var (#cookieBanner) — orada bu
     fonksiyon sadece dugmeleri bagliyor, kutuyu yeniden olusturmuyor.
     Diger sayfalarda kutu olmadigi icin burada uretiliyor.
     ---------------------------------------------------------------------- */

  function cerezBildirimi() {
    if (onayDurumu()) return;                 // karar verilmis, sormaya gerek yok

    var mevcut = document.getElementById('cookieBanner');
    if (mevcut) return;                       // index.html kendi kutusunu yonetiyor

    var stil = document.createElement('style');
    stil.textContent =
      '.oh-cerez{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;' +
      'max-width:720px;margin:0 auto;background:#fff;border:1px solid rgba(127,119,221,.28);' +
      'border-radius:14px;box-shadow:0 8px 28px rgba(26,22,69,.16);padding:16px 18px;' +
      'display:flex;gap:14px;align-items:center;flex-wrap:wrap;' +
      "font-family:'DM Sans',system-ui,sans-serif;opacity:0;transform:translateY(10px);" +
      'transition:opacity .3s ease,transform .3s ease}' +
      '.oh-cerez.gorunur{opacity:1;transform:translateY(0)}' +
      '.oh-cerez-metin{flex:1;min-width:240px;font-size:13px;line-height:1.6;color:#4a4870}' +
      '.oh-cerez-metin strong{color:#26215C}' +
      '.oh-cerez-metin a{color:#534AB7;text-decoration:underline}' +
      '.oh-cerez-dugmeler{display:flex;gap:8px;flex-shrink:0}' +
      '.oh-cerez-btn{font:500 13px/1 "DM Sans",system-ui,sans-serif;padding:10px 18px;' +
      'border-radius:8px;cursor:pointer;border:1px solid transparent;transition:.15s}' +
      '.oh-cerez-red{background:#fff;border-color:rgba(127,119,221,.35);color:#4a4870}' +
      '.oh-cerez-red:hover{background:#f7f6ff}' +
      '.oh-cerez-kabul{background:#534AB7;color:#fff}' +
      '.oh-cerez-kabul:hover{background:#26215C}' +
      '@media(max-width:560px){.oh-cerez{flex-direction:column;align-items:stretch;padding:14px}' +
      '.oh-cerez-dugmeler{width:100%}.oh-cerez-btn{flex:1}}';
    document.head.appendChild(stil);

    var kutu = document.createElement('div');
    kutu.className = 'oh-cerez';
    kutu.setAttribute('role', 'dialog');
    kutu.setAttribute('aria-label', 'Çerez bildirimi');
    kutu.innerHTML =
      '<div class="oh-cerez-metin"><strong>Çerez kullanımı.</strong> ' +
      'İnternet sitemiz ziyaretçi deneyimini geliştirmek için anonim analitik çerezler kullanır. ' +
      'Tercihinizi belirtmediğiniz sürece zorunlu çerezler dışında veri toplanmaz. ' +
      '<a href="/gizlilik">Gizlilik Politikası</a></div>' +
      '<div class="oh-cerez-dugmeler">' +
      '<button type="button" class="oh-cerez-btn oh-cerez-red">Reddet</button>' +
      '<button type="button" class="oh-cerez-btn oh-cerez-kabul">Kabul Et</button>' +
      '</div>';
    document.body.appendChild(kutu);

    setTimeout(function () { kutu.classList.add('gorunur'); }, 600);

    function kapat() {
      kutu.classList.remove('gorunur');
      setTimeout(function () { kutu.remove(); }, 300);
    }

    kutu.querySelector('.oh-cerez-kabul').addEventListener('click', function () {
      onayKaydet('accepted');
      gtag('consent', 'update', { 'analytics_storage': 'granted' });
      kapat();
    });

    kutu.querySelector('.oh-cerez-red').addEventListener('click', function () {
      onayKaydet('rejected');
      kapat();
    });
  }

})();
