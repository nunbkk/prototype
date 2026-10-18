<?php
if (!isset($tspccBase)) { http_response_code(404); exit; }
header('Content-Type: text/html; charset=UTF-8');
?>
<!doctype html>
<html lang="th">
<head>
  <base href="<?= htmlspecialchars($tspccBase, ENT_QUOTES, 'UTF-8') ?>">
<script>window.TSPCC_BASE = <?= json_encode($tspccBase, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?>;</script>
  <script defer src="export-links.js"></script>
  <script defer src="router.js?v=20261018-package93"></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#47afca">
  <meta name="description" content="ศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย พื้นที่สำหรับการประชุม สัมมนา นิทรรศการ และงานจัดเลี้ยง">
  <title>TSPCC — ศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย</title>
  <link rel="preload" href="assets/CSChatThai.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="premium.css">
  <link rel="stylesheet" href="brand-guide.css?v=20261018-hover115">
  <link rel="stylesheet" href="navigation.css?v=20261017-menu56">
  <link rel="stylesheet" href="typography.css?v=20261018-room118">
  <link rel="stylesheet" href="about.css?v=20261018-sidebar108">
  <script defer src="content.js"></script>
  <script defer src="article-media.js"></script>
  <script defer src="gallery-crops.js"></script>
  <script defer src="hero-carousel.js?v=20261017-premium22"></script>
  <script defer src="venue-carousel.js?v=20261018-controls85"></script>
  <script defer src="navigation.js?v=20261018-party97"></script>
  <script defer src="scroll-reveal.js?v=20261017-about43"></script>
  <script defer src="about.js?v=20261017-layout72"></script>
  <script defer src="news-content.js?v=20261017-layout51"></script>
  <script defer src="app.js?v=20261018-room118"></script>
</head>
<body>
  <a class="skip" href="#main">ข้ามไปยังเนื้อหา</a>
  <header>
    <div class="parent-bar wrap">
      <a href="https://www.sciencepark.or.th/" class="parent-brand"><img src="assets/sciencepark-logo.png" alt="Thailand Science Park"></a>
      <a class="wordmark parent-wordmark" href="#/" aria-label="TSPCC หน้าแรก">TSPCC<span>CONVENTION CENTER</span></a>
      <a class="parent-link button secondary" href="https://www.sciencepark.or.th/">กลับสู่เว็บไซต์อุทยานวิทยาศาสตร์ประเทศไทย <span aria-hidden="true">↗</span></a>
    </div>
    <div class="nav-shell"><div class="navigation wrap"><a class="navigation-label" href="#/">ศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย</a><a class="parent-link mobile-parent-link" href="https://www.sciencepark.or.th/">กลับสู่เว็บไซต์อุทยานวิทยาศาสตร์ประเทศไทย <span aria-hidden="true">↗</span></a><button class="menu-toggle" aria-expanded="false" aria-controls="nav">เมนู <span aria-hidden="true">☰</span></button><nav id="nav" aria-label="เมนูหลัก"></nav><a class="button nav-quote" href="#/room-reservation">ขอใบเสนอราคา</a></div></div>
  </header>
  <main id="main" tabindex="-1"></main>
  <footer><div class="wrap footer-top"><div><a class="wordmark" href="#/">TSPCC<span>THAILAND SCIENCE PARK CONVENTION CENTER</span></a><p>ศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย<br>130 อุทยานวิทยาศาสตร์ประเทศไทย (อาคาร 14)<br>ถนนพหลโยธิน ตำบลคลองหนึ่ง อำเภอคลองหลวง<br>จังหวัดปทุมธานี 12120</p></div><div><h3>ค้นพบ TSPCC</h3><a href="#/about-us">เกี่ยวกับเรา</a><a href="#/gallery">ห้องประชุมและพื้นที่จัดงาน</a><a href="#/standard">มาตรฐานของเรา</a><a href="#/news">ข่าวสาร</a><a href="#/articles">บทความ</a></div><div><h3>วางแผนการจัดงาน</h3><a href="#/service">บริการของเรา</a><a href="#/package">แพ็กเกจ</a><a href="#/room-reservation">ขอใบเสนอราคา</a><a href="#/map">แผนที่การเดินทาง</a><a href="#/parking">ที่จอดรถในร่ม</a><a href="#/sitemap">แผนผังเว็บไซต์</a></div><div><h3>ติดต่อเรา</h3><a class="footer-phone footer-contact-link" href="tel:025647170"><svg class="footer-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg><span>0 2564 7170</span></a><a class="footer-contact-link" href="mailto:tspcc@nstda.or.th"><svg class="footer-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="1"/><path d="m2 5 10 8L22 5"/></svg><span>tspcc@nstda.or.th</span></a><a class="footer-contact-link" href="https://www.facebook.com/TSPConventionCenter" target="_blank" rel="noopener"><svg class="footer-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h9v-8h-3v-3h3V9c0-3 1.8-4 4-4h2v3h-2c-.8 0-1 .5-1 1v2h3l-.5 3H16v8h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/></svg><span>Facebook</span></a></div></div><div class="wrap footer-bottom"><span>© Thailand Science Park Convention Center</span><a href="#/nstda-privacy-policy">นโยบายความเป็นส่วนตัว</a></div></footer>
  <dialog id="lightbox"><button class="close" aria-label="ปิดภาพ">×</button><img alt=""><p></p></dialog>
</body>
</html>
