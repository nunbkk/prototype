'use strict';
window.TSPCC_NAV = (() => {
  let nav, menuButton, entries;
  const desktop = matchMedia('(min-width:1360px)');
  const chevron = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>';
  function closePanels() {
    nav.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('is-open');
      item.querySelector('.submenu-toggle').setAttribute('aria-expanded', 'false');
      item.querySelector('.nav-panel').hidden = true;
    });
  }
  function openPanel(item) {
    closePanels();
    item.classList.add('is-open');
    item.querySelector('.submenu-toggle').setAttribute('aria-expanded', 'true');
    item.querySelector('.nav-panel').hidden = false;
  }
  function closeAll() {
    closePanels();
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
  function init({title, rooms}) {
    nav = document.querySelector('#nav');
    menuButton = document.querySelector('.menu-toggle');
    // Let the logo row scroll away while keeping only the navigation row pinned.
    const brandBar = document.querySelector('.parent-bar');
    const navShell = document.querySelector('.nav-shell');
    const measureHeader = () => {
      document.documentElement.style.setProperty('--brand-bar-height', `${brandBar.getBoundingClientRect().height}px`);
      document.documentElement.style.setProperty('--navigation-height', `${navShell.getBoundingClientRect().height}px`);
    };
    const headerResize = new ResizeObserver(measureHeader);
    headerResize.observe(brandBar);
    headerResize.observe(navShell);
    measureHeader();
    const roomLinks = rooms.map(room => [room.slug, room.name]);
    entries = [
      {slug:'about-us', label:'เกี่ยวกับเรา', groups:[
        {label:'รู้จักศูนย์ประชุม', links:[['about-us','ภาพรวมเกี่ยวกับเรา'],['background','ความเป็นมา'],['vision-misson','วิสัยทัศน์ / พันธกิจ'],['sdgs','เป้าหมายการพัฒนาที่ยั่งยืน'],['link','ลิงก์หน่วยงานต่าง ๆ']]},
        {label:'มาตรฐานต่าง ๆ', slug:'standard', links:[['standard-asen','AMVS'],['tmvs','TMVS'],['standard-sha','SHA & SHA PLUS+'],['tsems','TSEMS']]}
      ]},
      {slug:'gallery', label:'พื้นที่จัดงาน', groups:[{label:'ห้องประชุมและพื้นที่จัดงาน', slug:'gallery', links:roomLinks}]},
      {slug:'service', label:'บริการและแพ็กเกจ', groups:[
        {label:'บริการของเรา', slug:'service', links:[['promotion','โปรโมชั่น']]},
        {label:'แพ็กเกจ', slug:'package', links:[['meeting-package-2','แพ็กเกจจัดงานประชุม'],['party-package-2','แพ็กเกจจัดงานเลี้ยง'],['food-beverage','อาหารและเครื่องดื่ม']]},
        {label:'สิ่งอำนวยความสะดวก', slug:'facilities', links:[['parking','ที่จอดรถในร่ม']]}
      ]},
      {slug:'news-event-2', label:'ข่าวและกิจกรรม', groups:[{links:[['news','ข่าวสาร'],['event-picture','ภาพกิจกรรมต่าง ๆ'],['articles','บทความ']]}]},
      {slug:'contact', label:'ติดต่อเรา', groups:[{links:[['map','แผนที่การเดินทาง'],['contact-1','ช่องทางติดต่อ'],['join-us','ร่วมงานกับเรา']]}]}
    ];
    const externalMenuLinks = {
      'join-us':'https://zebra.nstda.or.th/recruit/hrms/pages/pub.publish.php',
      'event-picture':'https://www.facebook.com/TSPConventionCenter'
    };
    const aboutSections=new Set(['background','vision-misson','sdgs','standard','standard-asen','tmvs','standard-sha','tsems','link']);
    const menuHref=slug=>slug==='party-package-2'?'#/package?section=party-package-2':aboutSections.has(slug)?`#/about-us?section=${slug}`:`#/${slug}`;
    const anchor = ([slug,label]) => externalMenuLinks[slug] ? `<a href="${externalMenuLinks[slug]}" target="_blank" rel="noopener noreferrer">${label || title(slug)}</a>` : `<a href="${menuHref(slug)}" data-route="${slug}">${label || title(slug)}</a>`;
    nav.innerHTML = entries.map(entry => `<div class="nav-item" data-section="${entry.slug}"><div class="nav-topline"><a class="nav-primary" href="#/${entry.slug==='news-event-2'?'news':entry.slug}" data-route="${entry.slug}">${entry.label}</a><button type="button" class="submenu-toggle" aria-label="เมนูย่อย${entry.label}" aria-expanded="false" aria-controls="submenu-${entry.slug}">${chevron}</button></div><div class="nav-panel ${entry.groups.length>1?'nav-panel-wide':''}" id="submenu-${entry.slug}" hidden><div class="nav-panel-heading">${entry.label}<span>TSPCC</span></div><div class="nav-panel-groups">${entry.groups.map(group => `<section class="nav-group">${group.label?`<h2>${group.slug?anchor([group.slug,group.label]):group.label}</h2>`:''}<ul>${group.links.map(item=>`<li>${anchor(item)}</li>`).join('')}</ul></section>`).join('')}</div></div></div>`).join('');
    nav.querySelectorAll('.nav-item').forEach(item => {
      const toggle = item.querySelector('.submenu-toggle');
      toggle.addEventListener('click', () => item.classList.contains('is-open') ? closePanels() : openPanel(item));
      item.querySelector('.nav-primary').addEventListener('pointerenter', event => { if (desktop.matches && event.pointerType === 'mouse') openPanel(item); });
      item.addEventListener('pointerleave', event => { if (desktop.matches && event.pointerType === 'mouse' && !item.contains(document.activeElement)) closePanels(); });
      item.addEventListener('focusout', event => { if (!item.contains(event.relatedTarget)) closePanels(); });
      item.querySelector('.nav-topline').addEventListener('keydown', event => {
        if(event.key !== 'ArrowDown') return;
        event.preventDefault(); openPanel(item); item.querySelector('.nav-panel a').focus();
      });
    });
    menuButton.addEventListener('click', () => {
      const open = !nav.classList.contains('open');
      closePanels(); nav.classList.toggle('open', open); menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', event => { if(event.target.closest('a')) closeAll(); });
    document.addEventListener('click', event => { if(!event.target.closest('.navigation')) closeAll(); });
    document.addEventListener('keydown', event => {
      if(event.key !== 'Escape') return;
      const toggle = nav.querySelector('.is-open .submenu-toggle');
      if(toggle) { closePanels(); toggle.focus(); }
      else if(nav.classList.contains('open')) { closeAll(); menuButton.focus(); }
    });
    desktop.addEventListener('change', closeAll);
  }
  function update(slug) {
    closeAll();
    nav.querySelectorAll('[data-route]').forEach(a => {
      a.classList.toggle('active',a.dataset.route === slug);
      if(a.dataset.route === slug) a.setAttribute('aria-current','page');
      else a.removeAttribute('aria-current');
    });
    entries.forEach(entry => {
      const active = entry.slug === slug || entry.groups.some(group => group.slug === slug || group.links.some(([target])=>target === slug));
      nav.querySelector(`[data-section="${entry.slug}"]`).classList.toggle('section-active',active);
    });
  }
  return {init, update};
})();

