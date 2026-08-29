/* ==========================================================================
   ozkanhoca.com — menudeki "Araclar" acilir listesi
   --------------------------------------------------------------------------
   Bu dosya SITENIN TUM SAYFALARINDA yuklenir ve iki is yapar:

     1. "Araclar" dugmesini ac/kapa yapar (tiklama, klavye, disari tiklama,
        Escape). Sadece :hover ile yapmadik cunku dokunmatik ekranda hover yok.
     2. Bulundugun sayfaya gore "Araclar" dugmesini ve ilgili satiri
        kendiliginden isaretler. Boylece 21 sayfada ayni isaretleme durabiliyor,
        her sayfaya elle class yazmak gerekmiyor.

   YENI ARAC EKLERKEN: asagidaki ARAC_YOLLARI listesine yolu ekle, bir de
   sayfalardaki .nav-arac-menu bloguna satiri ekle. Baska yeri degistirmeye
   gerek yok.

   Olusturulma: 29 Agustos 2026
   ========================================================================== */

(function () {
  'use strict';

  var ARAC_YOLLARI = ['/net-hesaplama', '/adana-lise-taban-puanlari'];

  function yolAyikla(yol) {
    // cleanUrls acik: /net-hesaplama ve /net-hesaplama/ ayni sayfa.
    // Yerelde dosyadan acilirsa .html uzantisi da gelebiliyor.
    return yol.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/';
  }

  function kur(kap) {
    var btn  = kap.querySelector('.nav-arac-btn');
    var liste = kap.querySelector('.nav-arac-menu');
    if (!btn || !liste) return;

    function ac()   { kap.classList.add('acik');    btn.setAttribute('aria-expanded', 'true'); }
    function kapat(){ kap.classList.remove('acik'); btn.setAttribute('aria-expanded', 'false'); }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (kap.classList.contains('acik')) kapat(); else ac();
    });

    // Disari tiklayinca kapansin.
    document.addEventListener('click', function (e) {
      if (!kap.contains(e.target)) kapat();
    });

    // Escape kapatsin, odak dugmeye donsun.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && kap.classList.contains('acik')) { kapat(); btn.focus(); }
    });

    // Listedeki son baglantidan sonra Tab'a basilinca kapansin —
    // yoksa acik menu, arkasindaki baglantilarin ustunde asili kaliyor.
    liste.addEventListener('focusout', function () {
      setTimeout(function () { if (!kap.contains(document.activeElement)) kapat(); }, 0);
    });
  }

  function isaretle() {
    var suan = yolAyikla(location.pathname);
    if (ARAC_YOLLARI.indexOf(suan) === -1) return;

    Array.prototype.forEach.call(document.querySelectorAll('.nav-arac'), function (kap) {
      var btn = kap.querySelector('.nav-arac-btn');
      if (btn) btn.classList.add('active');
      Array.prototype.forEach.call(kap.querySelectorAll('.nav-arac-menu a'), function (a) {
        if (yolAyikla(a.getAttribute('href') || '') === suan) a.classList.add('active');
      });
    });

    // Mobil menudeki (ana sayfa) duz liste icin de ayni isaretleme.
    Array.prototype.forEach.call(document.querySelectorAll('.mobile-menu a'), function (a) {
      if (yolAyikla(a.getAttribute('href') || '') === suan) a.classList.add('active');
    });
  }

  function baslat() {
    Array.prototype.forEach.call(document.querySelectorAll('.nav-arac'), kur);
    isaretle();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', baslat);
  else baslat();

})();
