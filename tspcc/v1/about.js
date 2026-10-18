'use strict';
window.TSPCC_ABOUT = (() => {
  const sections = [
    ['background','ความเป็นมา'], ['vision-misson','วิสัยทัศน์ / พันธกิจ'],
    ['sdgs','เป้าหมายการพัฒนาที่ยั่งยืน'], ['standard','มาตรฐานของเรา'],
    ['link','หน่วยงานที่เกี่ยวข้อง']
  ];
  const menuIcons = {
    map: '<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    'contact-1': '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/>',
    'join-us': '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12a22 22 0 0 0 18 0M12 11v4"/>',
    background: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'vision-misson': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    sdgs: '<path d="M20 4c-8-1-15 3-15 9a6 6 0 0 0 6 6c6 0 10-7 9-15Z"/><path d="M4 21 15 10"/>',
    standard: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
    link: '<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4H6v4m6-4h6v4"/>'
  };
  const menuIcon = id => menuIcons[id] ? `<svg class="about-menu-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${menuIcons[id]}</svg>` : '';
  const standards = [['standard-asen','AMVS'],['tmvs','TMVS'],['standard-sha','SHA & SHA PLUS+'],['tsems','TSEMS']];
  let navigate = () => {};
  function content(page, sustainability=false) {
    const template = document.createElement('template');
    template.innerHTML = page.html;
    template.content.querySelector('h2')?.remove();
    template.content.querySelectorAll('h2').forEach(el => {
      const heading = document.createElement('h3'); heading.innerHTML = el.innerHTML; el.replaceWith(heading);
    });
    template.content.querySelectorAll('p').forEach(el => {
      if(el.textContent.trim() === 'พันธกิจ (Mission)' || (sustainability && el.textContent.startsWith('ผลการดําเนินงาน'))) {
        const heading = document.createElement('h3'); heading.innerHTML = el.innerHTML; el.replaceWith(heading);
      }
    });
    template.content.querySelectorAll('br').forEach(el=>el.replaceWith(document.createTextNode(' ')));
    // Some imported articles have a full paragraph as a bare text node.
    [...template.content.childNodes].forEach(el => {
      if(el.nodeType === Node.TEXT_NODE && el.textContent.trim()) {
        const p = document.createElement('p'); p.textContent = el.textContent.trim(); el.replaceWith(p);
      }
    });
    return template.innerHTML;
  }
  // Split only at existing phrases; keep every original word and number.
  function standardContent(page, id) {
    const template = document.createElement('template');
    template.innerHTML = content(page);
    const breaks = {
      'standard-asen': ['โดยมีสถานประกอบการ'],
      tmvs: ['ตราสัญลักษณ์ดังกล่าว'],
      'standard-sha': ['1.สุขลักษณะ', '2.การจัดอุปกรณ์', '3.การป้องกัน', 'ซึ่งมาตรการในแต่ละประเภท', 'และเรามีความภาคภูมิใจ', 'และเพื่อเป็นการตอกย้ำ'],
      tsems: ['เนื่องจากแนวโน้ม', 'ทางศูนย์ประชุมฯ']
    };
    template.content.querySelectorAll('p').forEach(p => {
      const text = p.textContent;
      const positions = (breaks[id] || []).map(phrase => text.indexOf(phrase)).filter(pos => pos > 0).sort((a,b) => a-b);
      const boundaries = [0, ...positions, text.length];
      const fragments = boundaries.slice(0,-1).map((start,i) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = text.slice(start,boundaries[i+1]).trim();
        if (/^[123]\./.test(paragraph.textContent)) paragraph.className = 'standard-numbered-item';
        return paragraph;
      });
      p.replaceWith(...fragments);
    });
    return template.innerHTML;
  }
  function render({pages,heading,contactBand,organizationCards,escapeHTML}) {
    const section = (slug,body) => {
      const index=sections.findIndex(([id])=>id===slug);
      return `<section class="about-section" id="about-${slug}" aria-labelledby="about-title-${slug}"><div class="about-section-heading"><h2 id="about-title-${slug}" tabindex="-1">${sections[index][1]}</h2></div>${body}</section>`;
    };
    return heading('เกี่ยวกับเรา','ศูนย์กลางการประชุมและแลกเปลี่ยนความรู้ ในพื้นที่อุทยานวิทยาศาสตร์ประเทศไทย')+
      `<div class="wrap about-layout"><aside class="about-nav"><p class="about-nav-title">รู้จัก TSPCC</p><nav aria-label="หัวข้อในหน้าเกี่ยวกับเรา">${sections.map(([id,label])=>`<a href="#/about-us?section=${id}" data-about-section="${id}">${menuIcon(id)}<span>${label}</span></a>`).join('')}</nav></aside><div class="about-content">`+
      section('background',`<img class="about-building" src="assets/hero-building-premium.webp" alt="อาคารศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย" width="1536" height="1024"><div class="about-facts"><div><strong>4</strong><span>ชั้นของอาคาร</span></div><div><strong>30,000<span>+</span></strong><span>ตารางเมตรพื้นที่ใช้สอย</span></div><div><strong>4,000<span>+</span></strong><span>คนที่สามารถรองรับ</span></div></div><div class="prose source-content">${content(pages.background)}</div>`)+
      section('vision-misson',`<div class="about-vision prose source-content">${content(pages['vision-misson'])}</div>`)+
      section('sdgs',`<div class="prose source-content about-sustainability">${content(pages.sdgs,true)}</div>`)+
      section('standard',`<p class="about-section-intro">มาตรฐานสถานที่จัดงาน การบริการ และการดำเนินงานอย่างยั่งยืนของศูนย์ประชุม</p><div class="about-standards">${standards.map(([id,label])=>`<article class="about-standard" id="about-${id}"><div class="about-standard-heading"><h3 tabindex="-1">${label}</h3><div class="about-certificates standard-heading-logos">${pages[id].images.map((src,i)=>`<button type="button" data-photo="${src}" data-caption="${escapeHTML(pages[id].title)}" aria-label="ขยายภาพมาตรฐาน ${label} ภาพที่ ${i+1}"><img src="${src}" alt="${escapeHTML(pages[id].title)} ภาพที่ ${i+1}" loading="lazy"><span>ขยายภาพ</span></button>`).join('')}</div></div><div class="prose source-content">${standardContent(pages[id],id)}</div></article>`).join('')}</div>`)+
      section('link',`<p class="about-section-intro">เชื่อมต่อหน่วยงานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม</p><div class="content-index organization-links">${organizationCards()}</div>`)+
      `</div></div>`+contactBand();
  }
  function mount(root) {
    const nav=root.querySelector('.about-nav');
    const links=[...nav.querySelectorAll('[data-about-section]')];
    const blocks=sections.map(([id])=>root.querySelector('#about-'+id));
    const events=new AbortController();
    let frame=0;
    const offset=()=>document.querySelector('.nav-shell').getBoundingClientRect().height+24;
    function activate(id) {
      links.forEach(a=>{
        const active=a.dataset.aboutSection===id;
        a.classList.toggle('is-active',active);
        if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
      });
    }
    function track() {
      frame=0;
      const line=offset()+80;
      const passed=blocks.filter(el=>el.getBoundingClientRect().top<=line);
      activate((passed.at(-1)||blocks[0]).id.replace('about-',''));
    }
    function onScroll(){if(!frame)frame=requestAnimationFrame(track);}
    navigate=(id,{smooth=true,focus=true}={})=>{
      const target=root.querySelector('#about-'+(sections.some(([key])=>key===id)||standards.some(([key])=>key===id)?id:'background'));
      if(focus)target.querySelector('h2,h3').focus({preventScroll:true});
      window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-offset(),behavior:smooth&&!matchMedia('(prefers-reduced-motion: reduce)').matches?'smooth':'instant'});
      activate(standards.some(([key])=>key===id)?'standard':id);
    };
    window.addEventListener('scroll',onScroll,{passive:true,signal:events.signal});
    window.addEventListener('resize',onScroll,{passive:true,signal:events.signal});
    track();
    return ()=>{events.abort();cancelAnimationFrame(frame);navigate=()=>{};};
  }
  return {render,mount,menuIcon,navigate:(...args)=>navigate(...args)};
})();
