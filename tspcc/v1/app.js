'use strict';
const content=window.TSPCC_CONTENT;
const pages=Object.fromEntries(content.map(p=>[p.slug,p]));
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arrow='';
const titles={'background':'ความเป็นมา','map':'แผนที่การเดินทาง','facilities':'สิ่งอำนวยความสะดวก','about-us':'เกี่ยวกับเรา','service':'บริการของเรา','package':'แพ็กเกจ','meeting-package-2':'แพ็กเกจจัดงานประชุม','party-package-2':'แพ็กเกจจัดงานเลี้ยง','gallery':'ห้องประชุมและพื้นที่จัดงาน','news-event-2':'ข่าวสารและกิจกรรม','news':'ข่าวสาร','articles':'บทความ','contact':'ติดต่อเรา','contact-1':'ช่องทางติดต่อ','room-reservation':'ขอใบเสนอราคา','standard':'มาตรฐานของเรา','promotion':'โปรโมชัน','food-beverage':'อาหารและเครื่องดื่ม','sitemap':'แผนผังเว็บไซต์','event-picture':'ภาพกิจกรรม','join-us':'ร่วมงานกับเรา'};
const title=s=>titles[s]||pages[s]?.title||s;
const groups={
 'about-us':['background','vision-misson','sdgs','standard','link'],
 'standard':['standard-asen','tmvs','standard-sha','tsems'],
 'service':['promotion','package','food-beverage','facilities','parking','gallery'],
 'package':['meeting-package-2','party-package-2','food-beverage'],
 'contact':['contact-1','map','join-us'],
 'news-event-2':['news','event-picture','articles']
};
const rooms=[
 {slug:'auditorium',en:'Auditorium',name:'ห้องประชุมใหญ่ออดิทอเรียม',cap:376,capacity:'376 ที่นั่ง',type:'ประชุมวิชาการ · งานสัมมนา',image:'assets/60d0a38be42a3aa8.jpg'},
 {slug:'grand-hall',en:'Grand Hall',name:'ห้องแกรนด์ฮอลล์',cap:1500,capacity:'สูงสุด 1,500 คน',type:'นิทรรศการ · งานเลี้ยง · งานแสดงสินค้า',image:'assets/fc18445fc866998a.jpg'},
 {slug:'training-seminar-room',en:'Meeting & Seminar Rooms',name:'ห้องประชุมขนาดกลางและขนาดเล็ก',cap:70,capacity:'25–70 คน',type:'ประชุม · อบรม · สัมมนา',image:'assets/22acd0ac725026d2.jpg'},
 {slug:'boardroom',en:'Boardroom',name:'ห้องบอร์ดรูม',cap:61,capacity:'61 ที่นั่ง',type:'ประชุมผู้บริหาร · ประชุมคณะกรรมการ',image:'assets/284bf1835847833e.jpg'},
 {slug:'vip-room',en:'VIP Rooms',name:'ห้องรับรอง (VIP)',cap:0,capacity:'ห้องรับรอง 7 ห้อง',type:'รับรองวิทยากร · เตรียมงาน',image:pages['vip-room'].images[0]},
 {slug:'event-square',en:'Event Square',name:'ลานกิจกรรม Event Square',cap:220,capacity:'สูงสุด 220 คน',type:'นิทรรศการ · กิจกรรม · งานเลี้ยง',image:pages['event-square'].images[0]}
];
rooms.forEach(r=>{titles[r.slug]=r.name;});
const menuSlugs=new Set([...Object.keys(groups),...Object.values(groups).flat(),...rooms.map(r=>r.slug),'gallery','news','room-reservation','site-map-tspcc','contact-1','map','facilities','parking','terms-of-service','nstda-privacy-policy']);
const allNews=content.filter(p=>!menuSlugs.has(p.slug)&&p.categories.length&&p.slug!=='event-picture').sort((a,b)=>b.date.localeCompare(a.date));
const featured=['nac2026','ricefit','young-researcher-camp4'];
const newsImages={'nac2026':'assets/e453314287a2a7c8.jpg','ricefit':'assets/0d5b4e5b29ce303e.jpg','young-researcher-camp4':'assets/2f156986c94a9f3e.jpg','250b':'assets/6b3b5426e78856fe.jpg'};
const storyImage=p=>window.TSPCC_MEDIA[p.slug]?.lead||'';
const archive=allNews.filter(p=>storyImage(p));
const articleSlugs=new Set(['work-on-1-3-5','ถ้าคุณต้องการมีการประช','4-what-to-do','10-natureforcovid-19','วิธีการรับมือ-โควิดสาย','pdpa1','5-ประโยชน์ของการจัดอบรมส']);
const isArticle=p=>articleSlugs.has(decodeURIComponent(p.slug));
const articles=archive.filter(isArticle);
const newsArchive=archive.filter(p=>!isArticle(p));
const unpublishedNews=new Set(allNews.filter(p=>!storyImage(p)).map(p=>p.slug));
// High-resolution banner assets are separate from the source galleries.
const bannerImages={
 'about-us':'assets/hero-building-premium.webp','background':'assets/hero-building-premium.webp',
 'vision-misson':'assets/hero-boardroom-premium.webp','gallery':'assets/banner-auditorium-premium.webp',
 'auditorium':'assets/banner-auditorium-premium.webp','grand-hall':'assets/hero-grandhall-premium.webp',
 'training-seminar-room':'assets/banner-training-premium.webp','boardroom':'assets/hero-boardroom-premium.webp',
 'vip-room':'assets/banner-vip-premium.webp','event-square':'assets/banner-event-square-premium.webp',
 'service':'assets/hero-grandhall-premium.webp','package':'assets/banner-training-premium.webp',
 'meeting-package-2':'assets/banner-training-premium.webp','party-package-2':'assets/banner-banquet-premium.webp',
 'food-beverage':'assets/banner-dining-premium.webp','facilities':'assets/hero-building-premium.webp',
 'parking':'assets/hero-building-premium.webp','news':'assets/hero-grandhall-premium.webp','articles':'assets/hero-grandhall-premium.webp',
 'news-event-2':'assets/hero-grandhall-premium.webp','event-picture':'assets/hero-grandhall-premium.webp',
 'room-reservation':'assets/hero-boardroom-premium.webp','promotion':'assets/banner-training-premium.webp',
 'standard':'assets/hero-boardroom-premium.webp','sdgs':'assets/hero-building-premium.webp'
};
function bannerImage(slug){return bannerImages[slug]||'assets/hero-building-premium.webp';}
const unavailableExternal=["https://nstda-tspcc.cms.opendata.go.th/tspcc", "https://www.nstda.or.th/th/547-nstda-privacy-policy", "https://shorturl.asia/hNV4E?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExT2JadlYxeVI1SHdGM1V5dQEejeTpTpZxC4yrJgFXJwbe9H6kv1d7JGUZyDBkJRO031zlD7F44auo78wV9vg_aem_dl4jJiB1cqUnWsUkBRgglQ", "https://docs.google.com/forms/d/e/1FAIpQLSftPfXlvumrXpYr6ceAUv7daqeuYDtOT-zii3TQ5m4T-BV3Kw/viewform", "https://shorturl.asia/KXRT8", "https://shorturl.asia/rjFyk", "https://forms.gle/ELV2n2UmCt3qLEpi6"];
const main=document.querySelector('main');
let currentRoute='',newsPage=1;
let destroyHeroCarousel=()=>{};
let destroyVenueCarousel=()=>{};
window.TSPCC_NAV.init({title,rooms});
function link(slug,label,cls='button'){if(cls==='text-link')cls='button tertiary';else if(cls==='button'&&slug!=='room-reservation')cls='button secondary';return `<a class="${cls}" href="#/${slug}">${label||title(slug)}</a>`;}
function breadcrumb(){return '';}
function breadcrumbItems(route=currentRoute,fallback=''){
 const aliases={'meeting-package-2':'package','contact':'contact-1','Sustainable-Development-Goals':'sdgs','site-map-tspcc':'sitemap'};
 route=aliases[route]||route;
 const parents={background:'about-us','vision-misson':'about-us',sdgs:'about-us',standard:'about-us',link:'about-us',
  'standard-asen':'standard',tmvs:'standard','standard-sha':'standard',tsems:'standard',
  promotion:'service',package:'service','party-package-2':'package','food-beverage':'service',facilities:'service',parking:'service',
  map:'contact-1','join-us':'contact-1',news:'news-event-2',articles:'news-event-2','event-picture':'news-event-2'};
 rooms.forEach(room=>{parents[room.slug]='gallery';});
 const story=archive.find(page=>page.slug===route);
 if(story)parents[route]=['250b','sshdiscount25','package-meeting','next-normal'].includes(route)?'promotion':isArticle(story)?'articles':'news';
 const publicSlug=slug=>({'contact-1':'contact',sdgs:'Sustainable-Development-Goals'}[slug]||slug);
 const label=slug=>slug==='contact-1'?'ติดต่อเรา':slug===route&&fallback&&!pages[slug]&&!titles[slug]?fallback:title(slug);
 const chain=[];let item=route;
 while(item){chain.unshift({label:label(item),href:'/'+publicSlug(item)+'/',current:item===route});item=parents[item];}
 return chain;
}
function bannerBreadcrumb(label){
 return `<div class="banner-breadcrumb" role="navigation" aria-label="เส้นทางนำทาง"><ol>${breadcrumbItems(currentRoute,label).map((item,i)=>`<li>${i?'<span class="breadcrumb-separator" aria-hidden="true">/</span>':''}${item.current?`<span aria-current="page">${escapeHTML(item.label)}</span>`:`<a href="${item.href}">${escapeHTML(item.label)}</a>`}</li>`).join('')}</ol></div>`;
}
function heading(label,desc='',en='',breadcrumbLabel=label){
 const story=archive.find(p=>p.slug===currentRoute);
 const image=bannerImage(story?'news-event-2':currentRoute);
 if(story){label=isArticle(story)?'บทความ':'ข่าวสารและกิจกรรม';desc=isArticle(story)?'ความรู้และคำแนะนำด้านการทำงาน การประชุม และเรื่องน่ารู้':'ติดตามข่าวสาร การประชุม และภาพกิจกรรมจาก TSPCC';}
 return `<section class="page-banner" aria-label="Hero banner ${escapeHTML(label)}"><div class="banner-media"><img src="${image}" alt="${escapeHTML(rooms.find(r=>r.slug===currentRoute)?.name||'ศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย')}" fetchpriority="high"></div><div class="banner-shade"></div><div class="wrap banner-content">${bannerBreadcrumb(breadcrumbLabel)}<div class="banner-title">${en?`<p class="english">${escapeHTML(en)}</p>`:''}<${story?'h2':'h1'}>${escapeHTML(label)}</${story?'h2':'h1'}>${desc?`<p>${desc}</p>`:''}</div></div></section>`;
}
function dateLabel(s){return new Date(s).toLocaleDateString('th-TH',{day:'numeric',month:'long',year:'numeric'});}
function roomCard(r,i=0){return `<a class="room-card" href="#/${r.slug}"><div class="image" style="${galleryCropStyle(r.image,16/9)}"><img src="${r.image}" alt="${r.name}" loading="lazy"><span class="room-thumbnail-overlay" aria-hidden="true">คลิ๊กดูรายละเอียด</span><span class="number">${r.en}</span></div><div class="caption"><div><h3>${r.name}</h3><p>${r.capacity} · ${r.type}</p></div></div><span class="button secondary">ดูรายละเอียด</span></a>`;}
const homeNewsImages={'nac2026':'assets/nac2026-landscape.png','ricefit':'assets/ricefit-landscape.png','young-researcher-camp4':'assets/young-researcher-camp4-landscape.png'};
function newsCard(p,homepage=false){homepage=homepage===true;const image=homeNewsImages[p.slug]||storyImage(p);if(!image)return '';return `<a class="news-card" href="#/${p.slug}"><div class="news-image"><img src="${image}" alt="${escapeHTML(p.title)}" width="900" height="600" loading="eager"><span class="news-thumbnail-overlay" aria-hidden="true">อ่านเพิ่มเติม</span></div><div class="news-card-copy"><p class="meta news-card-date"><svg class="news-calendar" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2M8 18h2"/></svg><span>${dateLabel(p.date)}</span></p><h3>${escapeHTML(p.title)}</h3><span class="button ${homepage?'secondary':'tertiary'}">อ่านเพิ่มเติม${homepage?ctaArrow:''}</span></div></a>`;}
const ctaArrow='<svg class="cta-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h16M13 5l7 7-7 7"/></svg>';
const homePromotions=[
 {slug:'250b',label:'MEETING PACKAGE',description:'จัดประชุมแบบครบวงจร เริ่มต้นเพียง 250 บาท/ท่าน พร้อมอุปกรณ์และบริการดูแลงานประชุม สัมมนา และเวิร์กชอป'},
 {slug:'sshdiscount25',label:'ACCOMMODATION',description:'ข้อเสนอห้องพักบ้านวิทยาศาสตร์สิรินธร พร้อมส่วนลด 25% สำหรับพนักงาน สวทช. และบุคลากรบริษัทผู้เช่าในอุทยานฯ',note:'สิ้นสุดโปรโมชั่น 30 กันยายน 2566'},
 {slug:'package-meeting',label:'STANDARD MEETING',description:'แพ็กเกจงานประชุมพร้อมห้องประชุม อุปกรณ์ครบครัน และทีมงานผู้เชี่ยวชาญคอยดูแลอย่างใกล้ชิด'},
 {slug:'next-normal',label:'NEXT NORMAL',description:'บริการประชุมทั้ง Online และ Onsite พร้อมข้อเสนอใช้ห้องประชุมหรือสัมมนา 5 ครั้ง รับฟรี 1 ครั้ง',note:'สอบถามเงื่อนไขและระยะเวลาโปรโมชั่นก่อนใช้บริการ'}
];
function promotionCard(item){const p=pages[item.slug];return `<a class="promotion-card" href="#/${p.slug}"><div class="promotion-image" style="--promotion-art:url('${storyImage(p)}')"><img src="${storyImage(p)}" alt="${escapeHTML(p.title)}" loading="lazy"><span class="promotion-thumbnail-overlay" aria-hidden="true">คลิ๊กดูรายละเอียด</span></div><div class="promotion-copy"><span class="promotion-label">${item.label}</span><h3>${escapeHTML(p.title)}</h3>${item.note?`<small class="promotion-period">${item.note}</small>`:''}<span class="button secondary">ดูรายละเอียด ${ctaArrow}</span></div></a>`;}
function homePromotionSection(){return `<section class="wrap section home-promotions" aria-labelledby="home-promotions-title"><div class="section-head"><div><h2 id="home-promotions-title">โปรโมชั่น</h2><p>ข้อเสนอสำหรับการจัดประชุมและการเข้าพัก</p></div>${link('promotion','ดูโปรโมชั่นทั้งหมด '+ctaArrow)}</div><div class="promotion-grid">${homePromotions.map(promotionCard).join('')}</div></section>`;}
function homePackages(){
 const items=[
  {title:'ประชุมพร้อมคอฟฟี่เบรก',price:'250',description:'คอฟฟี่เบรก 1 ช่วง',icon:'<path d="M4 9h13v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Zm13 1h2a3 3 0 0 1 0 6h-2M2 22h18M7 2c-2 2 2 3 0 5m4-5c-2 2 2 3 0 5m4-5c-2 2 2 3 0 5"/>'},
  {title:'ประชุมครึ่งวัน',price:'520',description:'คอฟฟี่เบรก 1 ช่วง<br>พร้อมอาหารกลางวัน',icon:'<circle cx="12" cy="12" r="10"/><path d="M12 5v7l5 3"/>'},
  {title:'ประชุมเต็มวัน',price:'580',description:'คอฟฟี่เบรก 2 ช่วง<br>พร้อมอาหารกลางวัน',icon:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M7 2v5m10-5v5M3 10h18M8 14h1m6 0h1M8 18h1m6 0h1"/>'}
 ];
 return `<section class="package-band package-feature"><div class="wrap package-content"><div class="section-head"><div><h2>แพ็กเกจประชุมและสัมมนา</h2><p>แพ็กเกจการประชุมที่รวมพื้นที่ อุปกรณ์ และบริการอาหารไว้ด้วยกัน</p></div>${link('package','ดูแพ็กเกจและบริการ '+ctaArrow,'button outline')}</div><div class="package-cards">${items.map(item=>`<a class="package-card" href="#/package"><div class="package-card-heading"><span class="package-icon"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${item.icon}</svg></span><h3>${item.title}</h3></div><p class="package-card-price">${item.price}<span>บาท / ท่าน</span></p><p class="package-description">${item.description}</p></a>`).join('')}</div><p class="package-price-note">กรุณาสอบถามราคาและเงื่อนไขล่าสุดก่อนจัดงาน</p></div></section>`;
}
function featuredRoomCard(r){return `<a class="room-card featured-room-card" href="#/${r.slug}"><div class="image" style="${galleryCropStyle(r.image,2)}"><img src="${r.image}" alt="${r.name}" loading="lazy"><span class="room-thumbnail-overlay" aria-hidden="true">คลิ๊กดูรายละเอียด</span><span class="room-label">${r.en}</span><span class="room-capacity">${r.capacity}</span></div><div class="caption"><h3>${r.name}</h3><p>${r.type}</p><span class="room-detail-link">ดูรายละเอียด<span class="round-arrow">${ctaArrow}</span></span></div></a>`;}
function venueShortcuts(){
 const icons=[
  '<path d="M14 27h36l8 22H6l8-22ZM12 49v7m40-7v7M19 27v-5a6 6 0 0 1 12 0v5m4 0v-5a6 6 0 0 1 12 0v5M10 33H6a4 4 0 0 0-4 4v8m52-12h4a4 4 0 0 1 4 4v8"/><circle cx="25" cy="12" r="4"/><circle cx="41" cy="12" r="4"/>',
  '<path d="M19 20h26l9 28H10l9-28ZM16 48v8m32-8v8M27 48v10h10V48M11 26H7v17h5m41-17h4v17h-5M26 20v-5h12v5"/><circle cx="32" cy="7" r="4"/><circle cx="7" cy="19" r="3"/><circle cx="57" cy="19" r="3"/>',
  '<path d="M7 34V23a8 8 0 0 1 16 0v11M5 33h20v15H5V33Zm3 15v6m14-6v6M41 34V23a8 8 0 0 1 16 0v11M39 33h20v15H39V33Zm3 15v6m14-6v6M28 47h8m-4 0V24m-7 0h14L36 9h-8l-3 15ZM26 55h12"/>',
  '<path d="M5 38V8h54v30M5 16h54M13 8v30m38-30V8M5 8l8 8m0-8-8 8M17 8l8 8m0-8-8 8M29 8l8 8m0-8-8 8M41 8l8 8m0-8-8 8M51 8l8 8m0-8-8 8M7 57v-8a6 6 0 0 1 12 0v8H7Zm19 0v-8a6 6 0 0 1 12 0v8H26Zm19 0v-8a6 6 0 0 1 12 0v8H45Z"/><circle cx="13" cy="36" r="4"/><circle cx="32" cy="36" r="4"/><circle cx="51" cy="36" r="4"/>'
 ];
 return `<div class="venue-shortcuts" aria-label="พื้นที่จัดงานเพิ่มเติม">${rooms.slice(2).map((r,i)=>`<a href="#/${r.slug}" class="venue-shortcut"><svg class="venue-shortcut-icon" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[i]}</svg><span class="venue-shortcut-name">${r.name}</span><span class="round-arrow">${ctaArrow}</span></a>`).join('')}</div>`;
}
function contactBand(){return `<section class="contact-band"><div class="wrap"><div class="contact-copy"><h2>วางแผนการประชุม<br>กับทีมงาน TSPCC</h2><p>บอกความต้องการของคุณ ให้เราช่วยวางแผนพื้นที่และบริการที่เหมาะสม</p>${link('room-reservation','ขอคำแนะนำเลือกพื้นที่บริการ '+ctaArrow,'button light')}</div><img class="contact-building" src="assets/21de5c9dcbf0af7d.jpg" alt="อาคาร 14 ศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย" loading="lazy" width="644" height="644"></div></section>`;}
function home(){return `<section class="home-masthead" role="region" aria-roledescription="สไลด์ภาพ" aria-label="Hero banner TSPCC">${window.TSPCC_HERO.markup()}<div class="home-hero-shade"></div><div class="wrap home-hero-content"><div class="home-hero-copy"><p class="hero-identity">THAILAND SCIENCE PARK CONVENTION CENTER</p><h1><span class="hero-name">ศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย</span><span class="hero-message">พื้นที่สำหรับความคิด<br>การแลกเปลี่ยน และ<span class="hero-highlight">ความสำเร็จร่วมกัน</span></span></h1><div class="actions">${link('room-reservation','วางแผนการจัดงาน '+ctaArrow,'button')}${link('gallery','ค้นหาพื้นที่จัดงาน '+ctaArrow,'button secondary')}</div></div></div></section>
 <section class="facts wrap" aria-label="ข้อมูลศูนย์ประชุม"><div class="facts-intro"><p>รองรับการประชุม<br>หลากหลายขนาดและรูปแบบ</p></div><div class="fact-stat"><span class="fact-icon" aria-hidden="true"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V5l7-3 7 3v16M3 21h18M9 7v2m6-2v2M9 11v2m6-2v2M9 15v2m6-2v2M10 21v-3h4v3"/></svg></span><div><strong>30,000<span> ตร.ม.</span></strong><span>พื้นที่ใช้สอยของอาคาร</span></div></div><div class="fact-stat"><span class="fact-icon" aria-hidden="true"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 11a5 5 0 1 1 8 0M7 21v-5m10 5v-5M4 21v-6a3 3 0 0 1 3-3h1l4 3 4-3h1a3 3 0 0 1 3 3v6M2 18h20"/></svg></span><div><strong>376<span> ที่นั่ง</span></strong><span>ห้องประชุม Auditorium</span></div></div><div class="fact-stat"><span class="fact-icon" aria-hidden="true"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M6 21v-5a6 6 0 0 1 12 0v5H6ZM4 5a3 3 0 0 0 0 6m16-6a3 3 0 0 1 0 6M4 13a4 4 0 0 0-3 4v4h3m16-8a4 4 0 0 1 3 4v4h-3"/></svg></span><div><strong>1,500<span> คน</span></strong><span>รองรับใน Grand Hall</span></div></div></section>
 <section class="section wrap venue-showcase"><div class="section-head"><div><h2>ห้องประชุมและพื้นที่จัดงาน</h2><p>รองรับการประชุม สัมมนา และงานวิชาการ ด้วยพื้นที่หลากหลายขนาดให้เหมาะกับรูปแบบงานของคุณ</p></div>${link('gallery','สำรวจพื้นที่ทั้งหมด '+ctaArrow)}</div>${window.TSPCC_VENUES.markup(rooms,featuredRoomCard,venueShortcuts())}</section>
 ${homePromotionSection()}
 ${homePackages()}
 <section class="section wrap home-news"><div class="section-head"><div><h2>ข่าวและกิจกรรม</h2><p>ข่าวสาร กิจกรรม และการแลกเปลี่ยนความรู้ในพื้นที่ของเรา</p></div>${link('news','ดูข่าวทั้งหมด '+ctaArrow)}</div><div class="news-grid">${featured.map(s=>newsCard(pages[s],true)).join('')}</div></section>
 <section class="wrap section trust"><div><h2>มาตรฐานที่สร้างความมั่นใจ</h2><p>รู้จักมาตรฐานสถานที่จัดงาน และแนวทางการดำเนินงานเพื่อความยั่งยืนของศูนย์ประชุม</p>${link('sdgs','การพัฒนาที่ยั่งยืน '+ctaArrow)}</div><div class="standards">${['AMVS','TMVS','SHA & SHA PLUS+','TSEMS'].map(label=>link('standard',label,'')).join('')}</div></section>${contactBand()}`;}
function serviceItems(){
 return [
 ['promotion','ข้อเสนอสำหรับการประชุมและการจัดงาน','<path d="m7 5 12 12-6 6L1 11l3-3a3 3 0 0 0 3-3Z"/><path d="m10 10 2 2m2 2 2 2M19 2v6m-3-3h6"/>'],
 ['package','เลือกแพ็กเกจให้เหมาะกับรูปแบบการประชุม','<rect x="3" y="4" width="16" height="17" rx="2"/><path d="M7 2v4m8-4v4M3 10h16m-12 5 2 2 4-4"/><path d="M17 14h5v9h-5"/>'],
 ['food-beverage','อาหารและเครื่องดื่มสำหรับผู้เข้าร่วมงาน','<circle cx="13" cy="13" r="6"/><circle cx="13" cy="13" r="4"/><path d="M2 9h3v6a2 2 0 0 1-4 0V9m1-6v3m20-3v18m-2-18v6h4V3"/>'],
 ['facilities','อุปกรณ์และสิ่งอำนวยความสะดวกสำหรับการจัดงาน','<path d="M2 3h17M4 3v12h13V3M10 15v5m-4 3 4-3 4 3"/><rect x="18" y="10" width="4" height="8" rx="2"/><path d="M16 15v1a4 4 0 0 0 8 0v-1m-4 5v3m-3 0h6"/>'],
 ['parking','ข้อมูลพื้นที่จอดรถสำหรับผู้เข้าร่วมงาน','<path d="m2 7 10-5 10 5M5 13l2-4h10l2 4"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M6 20v2m12-2v2M6 16h2m8 0h2"/>'],
 ['gallery','เลือกพื้นที่ให้เหมาะกับจำนวนผู้เข้าร่วมและรูปแบบงาน','<path d="M6 2h12v7H6zM5 13h14l3 4H2zM6 17v6m12-6v6M1 12v7h3v4m19-11v7h-3v4"/>']
 ];
}
function serviceMenuIcon(slug){
 const item=serviceItems().find(([id])=>id===slug);
 return item?`<svg class="service-menu-icon" width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${item[2]}</svg>`:'';
}
function serviceCards(){
 const items=serviceItems();
 return `<div class="service-card-grid">${items.map(([slug,description,icon])=>`<a class="service-menu-card" href="#/${slug}"><span class="service-icon"><svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg></span><h3>${title(slug)}</h3><p>${description}</p><span class="service-card-cta">ดูรายละเอียด <span aria-hidden="true">→</span></span></a>`).join('')}</div>`;
}
function indexPage(slug){const descriptions={'about-us':'ศูนย์กลางการประชุมและแลกเปลี่ยนความรู้ ในพื้นที่อุทยานวิทยาศาสตร์ประเทศไทย','service':'เลือกบริการให้เหมาะกับรูปแบบงาน พร้อมทีมงานดูแลตั้งแต่การเตรียมงานจนถึงวันจัดงาน','package':'พื้นที่ อาหาร และการบริการ สำหรับการประชุมและโอกาสพิเศษของคุณ','standard':'ข้อมูลมาตรฐานและการรับรองตามที่เผยแพร่บนเว็บไซต์ต้นฉบับ','contact':'วางแผนการเดินทาง หรือพูดคุยกับทีมงานศูนย์ประชุม','news-event-2':'ติดตามข่าวสาร การประชุม และภาพกิจกรรมจาก TSPCC'};return breadcrumb(title(slug))+heading(title(slug),descriptions[slug])+`<section class="wrap bottom-space">${slug==='service'?serviceCards():`<div class="content-index">${groups[slug].map((s,i)=>`<a class="index-link" href="#/${s}"><span class="index-number">0${i+1}</span><h3>${title(s)}</h3>${arrow}</a>`).join('')}</div>`}</section>`+(slug==='contact'?contactDetails():'')+contactBand();}
function contactDetails(){return `<section class="package-band"><div class="wrap section package-layout"><div><h2>ติดต่อทีมงาน TSPCC</h2><p>ศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย (อาคาร 14)<br>130 อุทยานวิทยาศาสตร์ประเทศไทย ถนนพหลโยธิน<br>ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120</p></div><div><h3><a href="tel:025647170">โทร. 0 2564 7170</a></h3><p><a href="mailto:tspcc@nstda.or.th">tspcc@nstda.or.th</a><br>โทรสาร 0 2564 7160</p>${link('map','ดูแผนที่และการเดินทาง')}</div></div></section>`;}
const roomEventTypes=[
 {id:'academic',label:'ประชุมวิชาการ',rooms:['auditorium']},
 {id:'exhibition',label:'นิทรรศการ · งานเลี้ยง · งานแสดงสินค้า',rooms:['grand-hall','event-square']},
 {id:'seminar',label:'ประชุม · อบรม · สัมมนา',rooms:['training-seminar-room']},
 {id:'executive',label:'ประชุมผู้บริหาร · ประชุมคณะกรรมการ',rooms:['boardroom']},
 {id:'reception',label:'ห้องรับรอง',rooms:['vip-room']}
];
function venues(){return breadcrumb(title('gallery'))+heading(title('gallery'),'ค้นหาห้องประชุมและพื้นที่จัดงานที่เหมาะกับรูปแบบงานของคุณ')+`<section class="wrap bottom-space"><div class="filter-bar venue-filters"><label for="room-name">ชื่อห้องประชุม<select id="room-name"><option value="all">ห้องประชุมและพื้นที่จัดงานทั้งหมด</option>${rooms.map(r=>`<option value="${r.slug}">${r.name}</option>`).join('')}</select></label><label for="room-event-type">ประเภท รูปแบบงาน<select id="room-event-type"><option value="all">รูปแบบงานทั้งหมด</option>${roomEventTypes.map(type=>`<option value="${type.id}">${type.label}</option>`).join('')}</select></label><label for="room-capacity">จำนวนผู้เข้าร่วมทั้งหมด<select id="room-capacity"><option value="all">จำนวนผู้เข้าร่วมทั้งหมด</option><option value="small">ไม่เกิน 70 คน</option><option value="medium">71–400 คน</option><option value="large">มากกว่า 400 คน</option></select></label></div><div class="venue-grid" id="venue-results"></div></section>`+contactBand();}
function updateRooms(){
 const name=document.querySelector('#room-name').value;
 const eventType=roomEventTypes.find(type=>type.id===document.querySelector('#room-event-type').value);
 const capacity=document.querySelector('#room-capacity').value;
 const capacityMatches=room=>capacity==='all'||(capacity==='small'&&room.cap>0&&room.cap<=70)||(capacity==='medium'&&room.cap>70&&room.cap<=400)||(capacity==='large'&&room.cap>400);
 const list=rooms.filter(room=>(name==='all'||room.slug===name)&&(!eventType||eventType.rooms.includes(room.slug))&&capacityMatches(room));
 document.querySelector('#venue-results').innerHTML=list.map(roomCard).join('')||'<p class="empty">ไม่พบพื้นที่ที่ตรงกับเงื่อนไข กรุณาเปลี่ยนชื่อห้องประชุม รูปแบบงาน หรือจำนวนผู้เข้าร่วม</p>';
}
function galleryCropStyle(src,ratio=1.5){
 const crop=window.TSPCC_GALLERY_CROPS?.[src];
 if(!crop)return '';
 const [width,height,left,top,right,bottom]=crop;
 const croppedWidth=right-left,croppedHeight=bottom-top;
 const scale=Math.max(ratio/croppedWidth,1/croppedHeight);
 const percent=n=>(n*100).toFixed(4)+'%';
 return `--gallery-image-width:${percent(width*scale/ratio)};--gallery-image-height:${percent(height*scale)};--gallery-image-left:${percent(((ratio-croppedWidth*scale)/2-left*scale)/ratio)};--gallery-image-top:${percent((1-croppedHeight*scale)/2-top*scale)}`;
}
function photoGallery(p,room=false){return p.images.length?`<div class="photo-grid ${room?'':'article-gallery'}">${p.images.slice(0,room?12:30).map((src,i)=>`<button style="${galleryCropStyle(src)}" data-photo="${src}" data-caption="${escapeHTML(p.title)} · ภาพที่ ${i+1}" aria-label="ขยายภาพ ${i+1} ${escapeHTML(p.title)}"><img loading="lazy" src="${src}" alt="${escapeHTML(p.title)} ภาพที่ ${i+1}"></button>`).join('')}</div>`:'';}
function sidebar(slug){let group=Object.values(groups).find(g=>g.includes(slug));if(rooms.some(r=>r.slug===slug))group=rooms.map(r=>r.slug);if(!group)group=['news','gallery','package','contact'];return `<aside class="side-nav${group.includes('map')?' contact-side-nav':''}${rooms.some(r=>r.slug===slug)?' room-side-nav':''}" aria-label="หน้าที่เกี่ยวข้อง">${group.map(s=>`<a class="${s===slug?'active':''}" href="${s==='join-us'?'https://zebra.nstda.or.th/recruit/hrms/pages/pub.publish.php':'#/'+s}" ${s==='join-us'?'target="_blank" rel="noopener noreferrer"':''}>${serviceMenuIcon(s)||window.TSPCC_ABOUT.menuIcon(s)}<span>${title(s)}</span></a>`).join('')}</aside>`;}
function storyDetail(p){
 const image=storyImage(p);
 const otherImages={...p,images:(window.TSPCC_MEDIA[p.slug]?.images||[]).filter(src=>src!==image)};
 const related=(isArticle(p)?articles:newsArchive).filter(x=>x.slug!==p.slug).slice(0,3);
 return heading(title(p.slug))+
 `<section class="wrap story-layout"><article class="story-article prose"><header class="story-heading"><h1>${escapeHTML(p.title)}</h1><p class="meta story-date"><svg class="news-calendar" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2M8 18h2"/></svg><span>${dateLabel(p.date)}</span></p></header><figure class="article-lead"><button data-photo="${image}" data-caption="${escapeHTML(p.title)}" aria-label="ขยายภาพประกอบข่าว"><img src="${image}" alt="${escapeHTML(p.title)}"></button><figcaption>ภาพประกอบ: ${escapeHTML(p.title)}</figcaption></figure><div class="story-copy source-content news-formatted">${window.TSPCC_NEWS_HTML?.[p.slug]||p.html}</div>${photoGallery(otherImages)}</article></section><section class="related-news"><div class="wrap section"><div class="section-head"><h2>เรื่องราวอื่นที่น่าสนใจ</h2>${link(isArticle(p)?'articles':'news','ดูทั้งหมด')}</div><div class="news-grid">${related.map(newsCard).join('')}</div></div></section>`;
}
function facilitiesContent(page){
 const template=document.createElement('template');template.innerHTML=page.html;
 const paragraphs=[...template.content.querySelectorAll('p')].map(p=>p.textContent.trim());
 const items=[
  ['ที่จอดรถ','assets/6dd9a6fa2f9b855d.jpg','แผนผังพื้นที่จอดรถภายในอุทยานวิทยาศาสตร์ประเทศไทย'],
  ['อินเทอร์เน็ตไร้สาย','assets/1fef7d9cd9915ef6.png','บริการ NSTDA Free Wi-Fi'],
  ['ร้านอาหารและเครื่องดื่ม','assets/a9da4a15c87b85ab.png','ร้านอาหาร Science Café และบริการอาหารและเครื่องดื่ม'],
  ['ศูนย์บริการธุรกิจ'],
  ['การปฐมพยาบาลเบื้องต้นและโรงพยาบาล'],
  ['ร้านสะดวกซื้อ'],
  ['ธนาคาร']
 ];
 return `<div class="facilities-content"><h2 data-keep-heading>สิ่งอำนวยความสะดวก</h2><div class="facilities-sections">${items.map(([name,image,alt],i)=>`<section class="facility-section" aria-labelledby="facility-${i}"><div class="facility-heading"><span class="facility-number" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><h3 id="facility-${i}">${name}</h3></div><div class="facility-copy"><p>${escapeHTML(paragraphs[i].replaceAll('อินเตอร์เน็ต','อินเทอร์เน็ต').replace('อาคาร19','อาคาร 19').replace('ต่างๆ','ต่าง ๆ'))}</p>${image?`<figure class="facility-figure facility-image-${i}"><button type="button" data-photo="${image}" data-caption="${alt}" aria-label="ขยายภาพ${alt}"><img src="${image}" alt="${alt}" loading="lazy"></button><figcaption>คลิกภาพเพื่อขยาย</figcaption></figure>`:''}</div></section>`).join('')}</div></div>`;
}
function detailContent(page,slug){
 if(slug==='food-beverage'){
  const template=document.createElement('template');template.innerHTML=page.html;
  const heading=template.content.querySelector('h2');
  if(heading)heading.textContent='อาหารและเครื่องดื่ม (Food & Beverage)';
  template.content.querySelectorAll('p').forEach(p=>{if(p.textContent.trim()==='Food & Beverage')p.remove();});
  return template.innerHTML;
 }
 if(slug==='facilities')return facilitiesContent(page);
 if(slug==='sdgs'){
  const template=document.createElement('template');template.innerHTML=page.html;
  template.content.querySelectorAll('p').forEach(p=>{
   if(p.textContent.trim().startsWith('ผลการดําเนินงาน'))p.classList.add('sdgs-performance-heading');
  });
  return template.innerHTML;
 }
 if(slug==='contact-1'){
  const template=document.createElement('template');template.innerHTML=page.html;
  const website=template.content.querySelector('a[href="https://nstda-tspcc.cms.opendata.go.th/tspcc"]');
  if(website){website.href='https://www.sciencepark.or.th/tspcc';website.textContent='https://www.sciencepark.or.th/tspcc';}
  const icons=[
   ['อีเมล์','<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>'],
   ['โทร :','<path d="M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2Z"/>'],
   ['โทรสาร','<path d="M7 8V3h10v5M7 17H3V8h18v9h-4"/><path d="M7 13h10v8H7zM17 11h1M10 16h4M10 18h4"/>'],
   ['Website','<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>'],
   ['Facebook','<path d="M14 21v-8h3l1-4h-4V7c0-1 0-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8"/>']
  ];
  template.content.querySelectorAll('p').forEach(p=>{
   const item=icons.find(([prefix])=>p.textContent.trim().startsWith(prefix));if(!item)return;
   p.classList.add('contact-detail-row');
   p.innerHTML=`<svg class="contact-detail-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${item[1]}</svg><span>${p.innerHTML}</span>`;
  });
  return template.innerHTML;
 }
 if(slug!=='map')return page.html;
 const map='<figure class="campus-map"><button type="button" data-photo="assets/thailand-science-park-map.png" data-caption="แผนผังอุทยานวิทยาศาสตร์ประเทศไทย" aria-label="ขยายแผนผังอุทยานวิทยาศาสตร์ประเทศไทย"><img src="assets/thailand-science-park-map.png" alt="แผนผังอุทยานวิทยาศาสตร์ประเทศไทย แสดงอาคารและลานจอดรถ โดยศูนย์ประชุมอยู่ที่อาคาร 14" width="1024" height="759" loading="lazy"></button><figcaption>คลิกภาพเพื่อขยายแผนผัง</figcaption></figure>';
 const googleMap=`<section class="google-map-section" aria-labelledby="google-map-title"><h3 id="google-map-title">แผนที่การเดินทาง</h3><div class="google-map-frame"><iframe title="Google Maps: ศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย" src="https://maps.google.com/maps?q=${encodeURIComponent('ศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย')}&t=m&z=12&output=embed&iwloc=near" width="900" height="450" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe></div><div class="google-map-footer"><span>ศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย (อาคาร 14)</span><a class="button secondary" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('ศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย')}" target="_blank" rel="noopener noreferrer">เปิด Google Maps</a></div></section>`;
 const template=document.createElement('template');template.innerHTML=page.html;
 const pin='<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>';
 const car='<path d="m5 8 2-5h10l2 5M4 17v3m16-3v3M3 8h18v9H3zM6 12h2m8 0h2"/>';
 const bus='<rect x="5" y="3" width="14" height="17" rx="3"/><path d="M5 11h14M12 3v8M7 20v2m10-2v2M8 15h1m6 0h1"/>';
 const train='<rect x="5" y="2" width="14" height="17" rx="4"/><path d="M5 10h14M12 2v8m-4 6h1m6 0h1M8 19l-3 3m11-3 3 3"/>';
 const icon=paths=>`<span class="travel-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg></span>`;
 const methods=new Map([['รถโดยสารส่วนบุคคล',car],['รถแท็กซี่',car],['รถโดยสารประจำทาง',bus],['รถไฟ',train]]);
 const wrapper=document.createElement('div');wrapper.className='travel-content';
 wrapper.innerHTML=`<div class="travel-heading"><div><h2>ที่ตั้งและแผนที่</h2><p>ศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย · อาคาร 14</p></div></div>${googleMap}<section class="travel-campus"><h2>แผนที่ภายในอุทยานวิทยาศาสตร์ประเทศไทย</h2>${map}</section><div class="travel-options"><h2>วิธีเดินทางมายังศูนย์ประชุม</h2></div>`;
 wrapper.querySelector('.google-map-section h3').remove();
 const options=wrapper.querySelector('.travel-options');let section=options;
 [...template.content.children].forEach(node=>{
  const text=node.textContent.trim();
  if(node.tagName==='H2'||['แผนที่การเดินทาง','แผนที่ภายในอุทยานวิทยาศาสตร์ประเทศไทย'].includes(text))return;
  if(methods.has(text)){
   section=document.createElement('section');section.className='travel-method';
   section.innerHTML=`<h3>${icon(methods.get(text))}<span>${escapeHTML(text)}</span></h3><div class="travel-method-body"></div>`;
   options.append(section);section=section.querySelector('.travel-method-body');return;
  }
  if(node.tagName==='TABLE'){
   const rows=[...node.querySelectorAll('tr')];
   const minibus=document.createElement('section');minibus.className='travel-method travel-minibus';
   minibus.innerHTML=`<h3>${icon(bus)}<span>${escapeHTML(rows.shift().textContent.trim())}</span></h3><dl class="travel-facts"></dl>`;
   rows.forEach(row=>{const cells=row.querySelectorAll('td');if(cells.length!==2)return;const dt=document.createElement('dt');dt.textContent=cells[0].textContent.trim();const dd=document.createElement('dd');dd.innerHTML=cells[1].innerHTML;minibus.querySelector('dl').append(dt,dd);});
   options.append(minibus);return;
  }
  if(text==='สำหรับคนขับรถแท็กซี่'){
   const note=document.createElement('aside');note.className='travel-driver';note.innerHTML='<h4>สำหรับคนขับรถแท็กซี่</h4>';section.append(note);section=note;return;
  }
  if(node.tagName==='P'&&node.querySelector('br')){
   node.innerHTML.split(/<br\s*\/?>(?:\s*)/i).forEach(part=>{if(!part.trim())return;const para=document.createElement('p');para.innerHTML=part;section.append(para);});
  }else section.append(node);
 });
 return wrapper.outerHTML;
}
function combinedPackages(){
 const menu=groups.service.map(slug=>`<a class="${slug==='package'?'active':''}" href="#/${slug}" ${slug==='package'?'aria-current="page"':''}>${serviceMenuIcon(slug)}<span>${title(slug)}</span></a>`).join('');
 const sections=['meeting-package-2','party-package-2'].map(slug=>{
  const page=pages[slug];
  const template=document.createElement('template');template.innerHTML=page.html;
  template.content.querySelectorAll('h2').forEach(h=>{if(['แพ็คเกจ','แพ็กเกจ'].includes(h.textContent.trim()))h.remove();});
  template.content.querySelectorAll('p').forEach(paragraph=>{
   const text=paragraph.textContent.trim();
   if(text==='Meeting Package'||text==='Party Package'){paragraph.remove();return;}
   if (text==='Meeting Package'||text==='Party Package') { paragraph.classList.add('package-english-label'); return; }
   if (text.startsWith('“ศูนย์ประชุม')) paragraph.classList.add('package-callout');
   if (text.startsWith('“ให้เรา')) paragraph.classList.add('package-closing');
   if (paragraph.querySelector('a')) { paragraph.classList.add('package-download'); return; }
   if (!paragraph.querySelector('strong') && !paragraph.closest('table')) {
    const chunks=paragraph.innerHTML.split(/<br\s*\/?>(?:\s*)|(?=ทุกห้องเพียบพร้อม)/i);
    if(chunks.length>1) paragraph.replaceWith(...chunks.map(chunk=>{const p=document.createElement('p');p.innerHTML=chunk.trim();return p;}));
   }
  });
  template.content.querySelectorAll('table').forEach(table=>{
   table.classList.add('package-pricing');
   const firstRow=table.querySelector('tr');
   firstRow.querySelectorAll('td').forEach(td=>{const th=document.createElement('th');th.scope='col';th.innerHTML=td.innerHTML;td.replaceWith(th);});
   const head=document.createElement('thead');head.append(firstRow);table.prepend(head);
  });
  return `<section class="combined-package-section" aria-labelledby="package-title-${slug}"><h2 id="package-title-${slug}">${title(slug)}${slug==='meeting-package-2'?' (<strong>Meeting Package</strong>)':' (<strong>Party Package</strong>)'}</h2><div class="source-content">${template.innerHTML}</div>${photoGallery(page)}</section>`;
 }).join('');
 return breadcrumb('แพ็กเกจ')+heading('แพ็กเกจ')+`<section class="wrap detail-body combined-packages"><aside class="side-nav" aria-label="บริการของเรา">${menu}</aside><article class="prose"><h2>แพ็กเกจ</h2>${sections}</article></section>`+contactBand();
}
function detail(slug){const p=pages[slug];if(archive.some(x=>x.slug===slug))return storyDetail(p);const r=rooms.find(r=>r.slug===slug);const isNews=archive.some(x=>x.slug===slug);return breadcrumb(title(slug))+heading(title(slug),'',r?.en||'')+`${r?`<section class="wrap detail-hero"><div class="detail-photo" style="${galleryCropStyle(r.image,16/9)}"><img src="${r.image}" alt="${r.name}"></div><div class="detail-summary"><h3>${r.en}</h3><p>${r.type}</p><div class="stat"><strong>${r.cap||7}</strong> ${r.cap?'คน':'ห้องรับรอง'}<br>${r.slug==='grand-hall'?'พื้นที่ 2,070 ตารางเมตร':r.slug==='boardroom'?'ที่นั่งประจำ 31 ที่นั่ง':r.slug==='training-seminar-room'?'รองรับผู้เข้าร่วม 25–70 คน':r.slug==='event-square'?'ขนาด 17 × 25 เมตร · 24 บูท':'พื้นที่สำหรับงานของคุณ'}</div><a class="button" href="#/room-reservation?room=${r.slug}">ขอใบเสนอราคาห้องนี้ ${arrow}</a></div></section>`:''}<section class="wrap detail-body">${sidebar(slug)}<article class="prose">${slug==='background'?'<h2>ความเป็นมา</h2>':slug==='parking'?'<h2>ที่จอดรถในร่ม</h2>':''}${isNews?`<div class="archive-label">ข่าวและบทความจากเว็บไซต์ต้นฉบับ · ${dateLabel(p.date)}</div>`:''}${['promotion'].includes(slug)?'<p class="note">ข้อมูลจากเว็บไซต์ต้นฉบับ กรุณาตรวจสอบราคา เงื่อนไข และข้อมูลการเดินทางล่าสุดกับศูนย์ประชุม</p>':''}<div class="source-content">${detailContent(p,slug)}</div>${slug==='facilities'?'':photoGallery(p,!!r)}</article></section>${r||['meeting-package-2','party-package-2','food-beverage'].includes(slug)?contactBand():''}`;}
function newsListing(slug='news'){return breadcrumb(title(slug))+heading(title(slug),slug==='promotion'?'ข้อเสนอและแพ็กเกจที่เผยแพร่บนเว็บไซต์ต้นฉบับ โปรดสอบถามเงื่อนไขล่าสุดก่อนใช้บริการ':slug==='articles'?'ความรู้และคำแนะนำด้านการทำงาน การประชุม และเรื่องน่ารู้':'คลังข่าวและกิจกรรมจากศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย')+`<section class="wrap bottom-space">${slug==='promotion'?'':`<div class="filter-bar"><input id="news-search" type="search" aria-label="${slug==='articles'?'ค้นหาบทความ':'ค้นหาข่าว'}" placeholder="${slug==='articles'?'ค้นหาบทความ':'ค้นหาข่าวหรือกิจกรรม'}"></div><p class="result-count" id="news-count"></p>`}<div class="news-grid" id="news-results"></div><div class="pagination" id="pagination" aria-label="${slug==='articles'?'หน้าบทความ':'หน้าข่าว'}"></div></section>`;}
function updateNews(){const q=(document.querySelector('#news-search')?.value||'').toLowerCase();const source=currentRoute==='promotion'?['250b','sshdiscount25','package-meeting','next-normal'].map(s=>pages[s]):currentRoute==='articles'?articles:newsArchive;const list=source.filter(p=>storyImage(p)&&p.title.toLowerCase().includes(q));const total=Math.ceil(list.length/9);newsPage=Math.min(newsPage,total||1);const count=document.querySelector('#news-count');if(count)count.textContent=`พบ ${list.length} รายการ`;document.querySelector('#news-results').innerHTML=list.slice((newsPage-1)*9,newsPage*9).map(newsCard).join('')||'<p class="empty">ไม่พบรายการที่ตรงกับคำค้น ลองใช้คำค้นอื่น</p>';document.querySelector('#pagination').innerHTML=Array.from({length:total},(_,i)=>`<button data-page="${i+1}" class="${newsPage===i+1?'active':''}" aria-label="${currentRoute==='articles'?'บทความ':'ข่าว'}หน้า ${i+1}" ${newsPage===i+1?'aria-current="page"':''}>${i+1}</button>`).join('');}
function field(label,name,type='text',required=true){
 const attributes=type==='number'?'min="1" max="4000"':type==='email'?'autocomplete="email"':type==='tel'?'autocomplete="tel-national" inputmode="numeric" maxlength="10" pattern="0[0-9]{9}" placeholder="0891234567" aria-describedby="phone-hint" data-hint="phone-hint"':'';
 return `<label><span>${label}${required?' <span class="required-mark" aria-hidden="true">*</span>':''}</span><input name="${name}" type="${type}" ${required?'required':''} ${attributes}>${type==='tel'?'<span class="date-hint" id="phone-hint">เบอร์มือถือ 10 หลัก เริ่มต้นด้วย 0</span>':''}</label>`;
}
function formatMobile(value){
 return value.replace(/[^0-9]/g,'').slice(0,10);
}
function setupMobilePhone(form){
 const input=form.elements.phone;
 function apply(value,digitPosition){
  input.value=formatMobile(value);
  const cursor=Math.min(digitPosition,input.value.length);
  input.setSelectionRange(cursor,cursor);
 }
 input.addEventListener('input',()=>{
  const digitPosition=input.value.slice(0,input.selectionStart).replace(/[^0-9]/g,'').length;
  apply(input.value,digitPosition);
 });
 input.addEventListener('paste',event=>{
  event.preventDefault();
  const start=input.selectionStart,end=input.selectionEnd;
  const digits=event.clipboardData.getData('text').replace(/[^0-9]/g,'');
  const prefix=input.value.slice(0,start);
  apply(prefix+digits+input.value.slice(end),prefix.replace(/[^0-9]/g,'').length+digits.length);
  if(input.hasAttribute('aria-invalid'))validateQuoteField(input);
 });
 input.addEventListener('blur',()=>{if(input.value||input.hasAttribute('aria-invalid'))validateQuoteField(input);});
}

function parseEventDate(value){
 const text=value.trim().replace(/^(\d{2})(\d{2})(\d{4})$/,'$1/$2/$3');
 const match=/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text);
 if(!match)return null;
 const [,day,month,year]=match.map(Number);
 if(year<1000||year>9999)return null;
 const date=new Date(year,month-1,day);
 if(date.getFullYear()!==year||date.getMonth()!==month-1||date.getDate()!==day)return null;
 return `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}
function displayEventDate(iso){return iso.split('-').reverse().join('/');}
function eventDateField(){return `<div class="date-field"><label for="event-date"><span>วันที่จัดงาน <span class="required-mark" aria-hidden="true">*</span></span></label><div class="date-input-wrap"><input id="event-date" name="date" type="text" inputmode="numeric" placeholder="dd/mm/yyyy" maxlength="10" autocomplete="off" required aria-describedby="event-date-hint" data-hint="event-date-hint"><button type="button" class="date-picker-trigger" aria-label="เลือกวันที่จากปฏิทิน"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg></button><input type="date" class="native-date-picker" tabindex="-1" aria-hidden="true"></div><span class="date-hint" id="event-date-hint">วัน/เดือน/ปี ค.ศ.</span></div>`;}
function setupEventDate(form){
 const input=form.elements.date,picker=form.querySelector('.native-date-picker');
 const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
 const part=type=>parts.find(p=>p.type===type).value;
 input.dataset.min=picker.min=`${part('year')}-${part('month')}-${part('day')}`;
 input.addEventListener('blur',()=>{
  const iso=parseEventDate(input.value);
  picker.value=iso||'';
  if(iso)input.value=displayEventDate(iso);
  if(input.value||input.hasAttribute('aria-invalid'))validateQuoteField(input);
 });
 picker.addEventListener('change',()=>{
  input.value=picker.value?displayEventDate(picker.value):'';
  validateQuoteField(input);
  input.focus();
 });
 form.querySelector('.date-picker-trigger').addEventListener('click',()=>{
  picker.value=parseEventDate(input.value)||'';
  if(typeof picker.showPicker==='function')picker.showPicker();
  else {picker.focus();picker.click();}
 });
}
function validateQuoteField(input){
 const value=input.value.trim(),validity=input.validity;
 let message='';
 if(input.required&&!value)message=input.tagName==='SELECT'?'กรุณาเลือกรายการนี้':'กรุณากรอกข้อมูลในช่องนี้';
 else if(input.name==='date'){
  const iso=parseEventDate(value);
  if(!iso)message='กรุณากรอกวันที่ที่ถูกต้องในรูปแบบ dd/mm/yyyy เช่น 25/12/2026';
  else if(iso<input.dataset.min)message='กรุณาเลือกวันที่ปัจจุบันหรือวันที่ในอนาคต';
 }
 else if(validity.typeMismatch&&input.type==='email')message='กรุณากรอกอีเมลให้ถูกต้อง เช่น name@example.com';
 else if(input.type==='tel'&&!/^0[0-9]{9}$/.test(value))message='กรุณากรอกเบอร์มือถือ 10 หลัก เริ่มต้นด้วย 0 เช่น 0891234567';
 else if((validity.rangeUnderflow||validity.rangeOverflow||validity.stepMismatch)&&input.name==='attendees')message='กรุณาระบุจำนวนผู้เข้าร่วมเป็นจำนวนเต็ม 1–4,000 คน';
 else if(validity.rangeUnderflow&&input.type==='date')message='กรุณาเลือกวันที่ปัจจุบันหรือวันที่ในอนาคต';
 else if(!validity.valid)message='กรุณาตรวจสอบข้อมูลในช่องนี้';
 else if(input.name==='room'){
  const selected=rooms.find(room=>room.slug===value);
  if(selected?.cap>0&&Number(input.form.elements.attendees.value)>selected.cap)message=`${selected.name} รองรับได้สูงสุด ${selected.cap.toLocaleString('th-TH')} คน กรุณาเลือกพื้นที่อื่น ลดจำนวนผู้เข้าร่วม หรือเลือกให้ทีมงานแนะนำพื้นที่`;
 }
 const id='field-error-'+input.name;
 let note=document.getElementById(id);
 if(message){
  if(!note){note=document.createElement('span');note.id=id;note.className='field-error';note.setAttribute('role','alert');input.after(note);}
  note.textContent=message;note.hidden=false;
  input.setAttribute('aria-invalid','true');input.setAttribute('aria-describedby',[input.dataset.hint,id].filter(Boolean).join(' '));
 }else{
  if(note){note.hidden=true;note.textContent='';}
  input.removeAttribute('aria-invalid');
  if(input.dataset.hint)input.setAttribute('aria-describedby',input.dataset.hint);else input.removeAttribute('aria-describedby');
 }
 return !message;
}
function validateQuoteForm(form){
 const fields=[...form.querySelectorAll('input,select,textarea')].filter(input=>input.name);
 const invalid=fields.filter(input=>!validateQuoteField(input));
 if(invalid.length)invalid[0].focus();
 return !invalid.length;
}
function reservation(){return breadcrumb(title('room-reservation'))+heading('ให้เราช่วยวางแผนงานของคุณ','แจ้งรายละเอียดเบื้องต้น เพื่อเลือกพื้นที่และบริการที่เหมาะสมกับงาน','','ติดต่อขอใบเสนอราคา')+`<section class="wrap form-layout"><div><form id="quote-form" novalidate><fieldset><legend>ติดต่อขอใบเสนอราคา</legend><div class="form-grid">${field('ชื่องาน','event')}<label><span>รูปแบบงาน <span class="required-mark" aria-hidden="true">*</span></span><select name="type" required><option value="">เลือกรูปแบบงาน</option><option>ประชุม / สัมมนา</option><option>อบรม</option><option>นิทรรศการ / งานแสดงสินค้า</option><option>งานเลี้ยง</option><option>งานแถลงข่าว</option><option>พิธีลงนามความร่วมมือ</option><option>Hybrid / Virtual Event</option><option>อื่น ๆ</option></select></label>${eventDateField()}${field('จำนวนผู้เข้าร่วม','attendees','number')}<label class="full">พื้นที่ที่สนใจ<select name="room"><option value="">ให้ทีมงานแนะนำพื้นที่</option>${rooms.map(r=>`<option value="${r.slug}">${r.name}</option>`).join('')}</select></label><label class="full">บริการอาหารและเครื่องดื่ม<select name="package"><option>ขอคำแนะนำจากทีมงาน</option><option>คอฟฟี่เบรก 1 ช่วง</option><option>ประชุมครึ่งวัน พร้อมอาหารกลางวัน</option><option>ประชุมเต็มวัน พร้อมอาหารกลางวัน</option><option>งานเลี้ยง</option></select></label></div></fieldset><fieldset><legend>ข้อมูลผู้ติดต่อ</legend><div class="form-grid">${field('ชื่อ–นามสกุล','name')}${field('หน่วยงาน / บริษัท','organization')}${field('อีเมล','email','email')}${field('เบอร์โทรศัพท์','phone','tel')}<label class="full">รายละเอียดเพิ่มเติม<textarea name="notes" placeholder="เช่น รูปแบบการจัดห้อง อุปกรณ์ที่ต้องการ หรืองบประมาณ"></textarea></label></div></fieldset><button class="button" type="submit">ตรวจสอบคำขอใบเสนอราคา ${arrow}</button></form><div id="quote-summary" class="hidden"></div></div><aside class="form-aside quote-room-preview" id="quote-room-preview" aria-label="ข้อมูลพื้นที่ที่สนใจ" aria-live="polite" aria-atomic="true"></aside></section>`;}
const quoteRoomDetails={
 'auditorium':{description:'ห้องประชุมขนาดใหญ่สไตล์เธียเตอร์ พร้อมอุปกรณ์สำหรับการประชุม เหมาะสำหรับการประชุมประจำปี งานเปิดตัวผลิตภัณฑ์ และงานมอบเกียรติบัตร',features:[]},
 'grand-hall':{description:'โถงนิทรรศการและพื้นที่จัดเลี้ยง สามารถปรับเปลี่ยนการใช้สอยได้ตามรูปแบบงาน',features:['พื้นที่ใช้สอย 2,070 ตารางเมตร','ขนาดห้อง 42 × 48 เมตร สูง 6.5 เมตร','จอโปรเจคเตอร์ขนาด 5 × 6 เมตร']},
 'training-seminar-room':{description:'ห้องประชุมขนาดเล็กและขนาดกลาง พร้อมอุปกรณ์สำหรับการประชุม อบรม และสัมมนา สามารถปรับเปลี่ยนรูปแบบการจัดห้องได้ตามความต้องการ',features:[]},
 'boardroom':{description:'ห้องประชุมสำหรับผู้บริหาร การอบรม และสัมมนา มีที่นั่งประจำ 31 ที่นั่ง พร้อมอุปกรณ์สำหรับการนำเสนอ',features:['ไมโครโฟน Conference','จอ LCD Screen Projector','โทรทัศน์ LED ขนาด 50 นิ้ว']},
 'vip-room':{description:'ห้องอเนกประสงค์สำหรับรับรองวิทยากร หรือใช้เป็นห้องทีมงานในการจัดเตรียมงาน',features:[]},
 'event-square':{description:'ลานอเนกประสงค์บริเวณชั้น 2 ของอาคารศูนย์ประชุม รองรับนิทรรศการ กิจกรรม และงานจัดเลี้ยง',features:['พื้นที่กว่า 400 ตารางเมตร','ขนาดพื้นที่ 17 × 25 เมตร','ติดตั้งบูทขนาด 3 × 3 เมตรได้ 24 บูท']}
};
function updateQuoteRoomPreview(form){
 const room=rooms.find(item=>item.slug===form.elements.room.value);
 const preview=document.querySelector('#quote-room-preview');
 if(!room){
  preview.innerHTML=`<div class="quote-room-copy"><p class="quote-room-eyebrow">พื้นที่ที่สนใจ</p><h3>ให้ทีมงานแนะนำพื้นที่</h3><p>ยังไม่ได้เลือกห้องประชุม ทีมงานจะช่วยแนะนำพื้นที่ให้เหมาะกับจำนวนผู้เข้าร่วมและรูปแบบงานของคุณ</p><button type="button" class="button secondary" data-change-room>เลือกพื้นที่ที่สนใจ</button></div>`;
  return;
 }
 preview.innerHTML=`<img class="quote-room-image" src="${room.image}" alt="${escapeHTML(room.name)}" width="640" height="360"><div class="quote-room-copy"><p class="quote-room-eyebrow">พื้นที่ที่คุณเลือก · ${room.en}</p><h3>${room.name}</h3><dl><div><dt>${room.cap?'รองรับผู้เข้าร่วม':'จำนวนห้องรับรอง'}</dt><dd>${room.capacity}</dd></div><div><dt>เหมาะสำหรับ</dt><dd>${room.type}</dd></div></dl><section class="quote-room-details"><h4>รายละเอียดห้อง</h4><p>${quoteRoomDetails[room.slug].description}</p>${quoteRoomDetails[room.slug].features.length?`<ul>${quoteRoomDetails[room.slug].features.map(text=>`<li>${text}</li>`).join('')}</ul>`:''}</section></div>`;
}
function quoteReviewSection(label,rows){
 return `<section class="quote-review-section"><h3>${label}</h3><dl>${rows.map(([key,value])=>`<div class="quote-review-row"><dt>${key}</dt><dd>${escapeHTML(value)}</dd></div>`).join('')}</dl></section>`;
}
function setupReservation(query){
 const form=document.querySelector('#quote-form');
 const summary=document.querySelector('#quote-summary');
 form.elements.room.value=new URLSearchParams(query).get('room')||'';
 setupEventDate(form);setupMobilePhone(form);updateQuoteRoomPreview(form);
 form.addEventListener('input',event=>{
  if(event.target.name==='room')updateQuoteRoomPreview(form);
  if(event.target.getAttribute('aria-invalid')==='true')validateQuoteField(event.target);
  if(['attendees','room'].includes(event.target.name))validateQuoteField(form.elements.room);
 });
 form.elements.room.addEventListener('change',()=>{updateQuoteRoomPreview(form);validateQuoteField(form.elements.room);});
 document.querySelector('#quote-room-preview').addEventListener('click',event=>{if(event.target.closest('[data-change-room]')){edit();form.elements.room.focus();}});
 function focusSummary(){
  summary.querySelector('h2').focus({preventScroll:true});
  window.scrollTo({top:summary.getBoundingClientRect().top+window.scrollY-document.querySelector('.nav-shell').getBoundingClientRect().height-24,behavior:'instant'});
 }
 function edit(){
  summary.classList.add('hidden');form.classList.remove('hidden');
  form.elements.event.focus();
 }
 function review(data){
  summary.innerHTML=`<div class="quote-review" aria-labelledby="quote-review-title">
   <p class="quote-step">ขั้นตอน 2 · ตรวจสอบข้อมูล <span>ยังไม่ได้ส่งคำขอ</span></p>
   <h2 id="quote-review-title" tabindex="-1">ตรวจสอบข้อมูลก่อนส่งคำขอ</h2>
   <p class="quote-review-intro">ตรวจสอบรายละเอียดให้ถูกต้อง หรือเลือกแก้ไขข้อมูลก่อนยืนยัน</p>
   ${quoteReviewSection('รายละเอียดการจัดงาน',[
    ['ชื่องาน',data.event],['รูปแบบงาน',data.type],['วันที่จัดงาน',data.date],
    ['จำนวนผู้เข้าร่วม',Number(data.attendees).toLocaleString('th-TH')+' คน'],
    ['พื้นที่ที่สนใจ',data.room?title(data.room):'ให้ทีมงานแนะนำพื้นที่'],['บริการอาหารและเครื่องดื่ม',data.package]
   ])}
   ${quoteReviewSection('ข้อมูลผู้ติดต่อ',[
    ['ชื่อ–นามสกุล',data.name],['หน่วยงาน / บริษัท',data.organization],['อีเมล',data.email],['เบอร์มือถือ',data.phone]
   ])}
   ${quoteReviewSection('รายละเอียดเพิ่มเติม',[['ความต้องการเพิ่มเติม',data.notes||'ไม่ได้ระบุ']])}
   <div class="quote-actions"><button type="button" class="button secondary" id="edit-quote">แก้ไขข้อมูล</button><button type="button" class="button" id="confirm-quote">ยืนยันข้อมูล ${arrow}</button></div>
  </div>`;
  form.classList.add('hidden');summary.classList.remove('hidden');
  summary.querySelector('#edit-quote').addEventListener('click',edit);
  summary.querySelector('#confirm-quote').addEventListener('click',()=>{
   summary.innerHTML=`<div class="quote-review quote-demo-complete" aria-labelledby="quote-complete-title">
    <p class="quote-step">ขั้นตอน 3 · ส่งข้อมูลเรียบร้อยแล้ว</p>
    <h2 id="quote-complete-title" tabindex="-1">ขอบคุณที่ท่านให้ความสนใจ</h2>
    <p>เจ้าหน้าที่จะรีบติดต่อกลับหลังได้รับข้อความ</p>
    <img class="quote-success-banner" src="assets/quote-thank-you-banner.png" alt="" width="2172" height="724">
    <div class="quote-actions">${link('','กลับหน้าแรก','button secondary')}</div>
   </div>`;
   focusSummary();
  });
  focusSummary();
 }
 form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!validateQuoteForm(form))return;
  form.elements.date.value=displayEventDate(parseEventDate(form.elements.date.value));
  review(Object.fromEntries(new FormData(form)));
 });
}
function organizationCards(){
 const organizations=[['กระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม','https://www.mhesi.go.th/home/'],['สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ (สวทช.)','https://www.nstda.or.th/th/'],['ศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย','#/'],['ศูนย์เทคโนโลยีอิเล็กทรอนิกส์และคอมพิวเตอร์แห่งชาติ (NECTEC)','https://www.nectec.or.th/'],['ศูนย์พันธุวิศวกรรมและเทคโนโลยีชีวภาพแห่งชาติ (BIOTEC)','https://www.biotec.or.th/'],['ศูนย์เทคโนโลยีโลหะและวัสดุแห่งชาติ (MTEC)','https://www.mtec.or.th/'],['ศูนย์นาโนเทคโนโลยีแห่งชาติ (NANOTEC)','https://www.nanotec.or.th/th/']];
 return organizations.map(([name,url])=>`<a class="index-link" href="${url}" ${url.startsWith('https:')?'target="_blank" rel="noopener"':''}><h3>${name}</h3><span class="organization-website"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg>เข้าชมเว็บไซต์</span></a>`).join('');
}
function standardsPage(){
 const items=[['standard-asen','AMVS'],['tmvs','TMVS'],['standard-sha','SHA & SHA PLUS+'],['tsems','TSEMS']];
 return heading('มาตรฐานของเรา','มาตรฐานสถานที่จัดงานและการรับรองของศูนย์ประชุม')+`<section class="wrap detail-body standards-layout">${sidebar('standard')}<div class="standards-content">${items.map(([slug,label])=>{const p=pages[slug];return `<article class="standard-section" id="standard-${slug}"><div class="about-standard-heading"><p class="standard-label">${label}</p><div class="about-certificates standard-heading-logos">${p.images.map((src,i)=>`<button type="button" data-photo="${src}" data-caption="${escapeHTML(p.title)}" aria-label="ขยายภาพมาตรฐาน ${label} ภาพที่ ${i+1}"><img src="${src}" alt="${escapeHTML(p.title)} ภาพที่ ${i+1}" loading="lazy"><span>ขยายภาพ</span></button>`).join('')}</div></div><div class="prose source-content">${p.html}</div></article>`;}).join('')}</div></section>`;
}
function organizationLinks(){return heading('ลิงก์หน่วยงานต่าง ๆ','เชื่อมต่อหน่วยงานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม')+`<section class="wrap detail-body organization-layout">${sidebar('link')}<div class="organization-content"><div class="content-index organization-links">${organizationCards()}</div></div></section>`+contactBand();}
function sitemap(){return breadcrumb('แผนผังเว็บไซต์')+heading('แผนผังเว็บไซต์','เข้าถึงทุกหมวดเนื้อหาและหน้ารายละเอียดของ TSPCC')+`<section class="wrap bottom-space"><div class="all-links"><a href="#/">หน้าแรก</a>${[...new Set([...menuSlugs,...rooms.map(r=>r.slug)])].filter(s=>pages[s]||groups[s]||s==='articles').map(s=>`<a href="#/${s}">${serviceMenuIcon(s)||window.TSPCC_ABOUT.menuIcon(s)}<span>${title(s)}</span></a>`).join('')}</div><h2 style="margin-top:50px">คลังข่าวและบทความ</h2><div class="all-links">${archive.map(p=>`<a href="#/${p.slug}">${escapeHTML(p.title)}</a>`).join('')}</div></section>`;}
function cleanSource(){document.querySelectorAll('.source-content').forEach(el=>{el.querySelectorAll('a').forEach(a=>{const href=a.getAttribute('href')||'';if(!a.textContent.trim()){a.remove();return;}if(href.includes('547-nstda-privacy-policy')){a.href='#/nstda-privacy-policy';return;}if(unavailableExternal.includes(href)){const note=document.createElement('span');note.className='unavailable-reference';note.textContent=a.textContent+((el.classList.contains('news-formatted')||currentRoute==='contact-1')?'':' (ลิงก์อ้างอิงเดิม: ยังยืนยันการเข้าถึงไม่ได้)');a.replaceWith(note);return;}if(href.startsWith('#/')){let slug=href.slice(2).split('?')[0].replace(/\/$/,'');if(slug.startsWith('category/'))slug='news';if(slug==='site-map-tspcc')slug='sitemap';if(!pages[slug]&&!groups[slug]&&!['sitemap','articles',''].includes(slug)){a.replaceWith(...a.childNodes);}else a.href='#/'+slug;}else if(href.startsWith('http')){a.target='_blank';a.rel='noopener';}});const first=el.querySelector('h2');if(first&&!first.hasAttribute('data-keep-heading')&&first.textContent.trim()===title(currentRoute))first.remove();el.querySelectorAll('p,h2,h3,h4').forEach(n=>{if(!n.textContent.trim())n.remove();});});}
let destroyAbout=()=>{};
let destroyScrollReveal=()=>{};
function render(){destroyAbout();destroyAbout=()=>{};destroyScrollReveal();destroyScrollReveal=()=>{};destroyVenueCarousel();destroyVenueCarousel=()=>{};destroyHeroCarousel();destroyHeroCarousel=()=>{};const raw=window.TSPCC_ROUTER.routePath()+location.search;const [path,query]=raw.split('?');let slug=path.replace(/^\//,'').replace(/\/$/,'');if(slug==='site-map-tspcc')slug='sitemap';if(slug.startsWith('category/'))slug='news';if(unpublishedNews.has(slug)){location.replace(window.TSPCC_BASE+'news/');return;}if(slug==='Sustainable-Development-Goals')slug='sdgs';if(slug==='contact')slug='contact-1';currentRoute=slug;newsPage=1;
 window.TSPCC_NAV.update(archive.some(p=>p.slug===slug)?(isArticle(pages[slug])?'articles':'news'):slug);
 if(!slug)main.innerHTML=home();else if(slug==='about-us')main.innerHTML=window.TSPCC_ABOUT.render({pages,heading,contactBand,organizationCards,escapeHTML});else if(slug==='gallery')main.innerHTML=venues();else if(slug==='room-reservation')main.innerHTML=reservation();else if(slug==='sitemap')main.innerHTML=sitemap();else if(slug==='news'||slug==='promotion'||slug==='articles')main.innerHTML=newsListing(slug);else if(slug==='package'||slug==='meeting-package-2')main.innerHTML=combinedPackages();else if(slug==='standard')main.innerHTML=standardsPage();else if(groups[slug])main.innerHTML=indexPage(slug);else if(slug==='event-picture')main.innerHTML=breadcrumb('ภาพกิจกรรม')+heading('ภาพกิจกรรม','ติดตามภาพกิจกรรมเพิ่มเติมจากช่องทาง Facebook ของศูนย์ประชุม')+`<div class="wrap bottom-space"><p>ชมภาพบรรยากาศการประชุม สัมมนา และกิจกรรมต่าง ๆ ผ่านช่องทาง Facebook ของศูนย์ประชุม</p><a class="button" href="https://www.facebook.com/TSPConventionCenter" target="_blank" rel="noopener">ดูภาพกิจกรรมบน Facebook ${arrow}</a></div>`;else if(slug==='join-us')main.innerHTML=breadcrumb('ร่วมงานกับเรา')+heading('ร่วมงานกับเรา','ตรวจสอบตำแหน่งงานและรายละเอียดการสมัครผ่านระบบรับสมัครงานของ สวทช.')+`<div class="wrap bottom-space"><a class="button" href="https://zebra.nstda.or.th/recruit/hrms/pages/pub.publish.php" target="_blank" rel="noopener">เปิดระบบรับสมัครงาน สวทช. ${arrow}</a></div>`;else if(slug==='link')main.innerHTML=organizationLinks();else if(pages[slug])main.innerHTML=detail(slug);else main.innerHTML=breadcrumb('ไม่พบหน้า')+heading('ไม่พบหน้าที่ต้องการ','เลือกเนื้อหาจากแผนผังเว็บไซต์เพื่อไปต่อ')+`<div class="wrap bottom-space">${link('sitemap','เปิดแผนผังเว็บไซต์','button')}</div>`;
 document.title=(slug?title(slug):'ศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย')+' | TSPCC';

 cleanSource();if(!slug){destroyHeroCarousel=window.TSPCC_HERO.mount(main.querySelector('.home-masthead'));destroyVenueCarousel=window.TSPCC_VENUES.mount(main.querySelector('.venue-carousel'));}if(slug==='gallery'){updateRooms();document.querySelector('#room-name').addEventListener('change',updateRooms);document.querySelector('#room-event-type').addEventListener('change',updateRooms);document.querySelector('#room-capacity').addEventListener('change',updateRooms);}if(slug==='news'||slug==='promotion'||slug==='articles'){updateNews();document.querySelector('#news-search')?.addEventListener('input',()=>{newsPage=1;updateNews();});}
 if(slug==='room-reservation')setupReservation(query);
 window.scrollTo({top:0,left:0,behavior:'instant'});
 destroyScrollReveal=window.TSPCC_REVEAL.mount(main);
 if(slug==='package'&&new URLSearchParams(query||'').get('section')==='party-package-2'){
  requestAnimationFrame(()=>{
   if(currentRoute!=='package')return;
   const target=document.getElementById('package-title-party-package-2');
   target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
   window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-document.querySelector('.nav-shell').getBoundingClientRect().height-24,behavior:'instant'});
  });
 }

 if(slug==='about-us'){
  destroyAbout=window.TSPCC_ABOUT.mount(main);
  const section=new URLSearchParams(query||'').get('section');
  if(section)requestAnimationFrame(()=>{if(currentRoute==='about-us')window.TSPCC_ABOUT.navigate(section,{smooth:false});});
 }
}
main.addEventListener('click',e=>{const b=e.target.closest('[data-photo]');if(b){const d=document.querySelector('#lightbox');d.querySelector('img').src=b.dataset.photo;d.querySelector('img').alt=b.dataset.caption;d.querySelector('p').textContent=b.dataset.caption;d.showModal();}const pg=e.target.closest('[data-page]');if(pg){newsPage=Number(pg.dataset.page);updateNews();window.scrollTo(0,document.querySelector('#news-results').getBoundingClientRect().top+window.scrollY-document.querySelector('.nav-shell').getBoundingClientRect().height-24);}});
const dialog=document.querySelector('#lightbox');dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
window.addEventListener('routechange',()=>{
 if(location.hash==='#main'){main.focus();return;}
 const path=window.TSPCC_ROUTER.routePath().replace(/\/$/,'');const query=location.search.slice(1);
 if(currentRoute==='about-us' && path==='/about-us'){
  window.TSPCC_NAV.update('about-us');
  const section=new URLSearchParams(query||'').get('section');
  if(section)window.TSPCC_ABOUT.navigate(section);
  else window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  return;
 }
 render();
});render();
