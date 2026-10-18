'use strict';

window.TSPCC_HERO = (() => {
  const slides = [
    { src:'assets/hero-boardroom-premium.webp', alt:'ห้องบอร์ดรูมสำหรับการประชุมผู้บริหาร', position:'center 53%', mobilePosition:'62% center' },
    { src:'assets/hero-building-premium.webp', alt:'อาคารศูนย์ประชุมอุทยานวิทยาศาสตร์ประเทศไทย', position:'center 48%', mobilePosition:'64% 50%' },
    { src:'assets/hero-grandhall-premium.webp', alt:'พื้นที่จัดนิทรรศการภายในห้องแกรนด์ฮอลล์', position:'center 50%', mobilePosition:'60% center' }
  ];
  const arrow = direction => `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="${direction === 'previous' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}"/></svg>`;
  const playbackIcon = paused => paused
    ? '<svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'
    : '<svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';

  function markup() {
    const images = [slides[2], ...slides, slides[0]].map((slide, position) => {
      const clone = position === 0 || position === 4;
      const index = position - 1;
      return `<div class="hero-slide" ${clone ? 'data-clone="true" aria-hidden="true"' : `data-slide="${index}" role="group" aria-roledescription="สไลด์" aria-label="${index + 1} จาก 3" aria-hidden="${index !== 0}"`}><img class="home-hero-image" src="${slide.src}" alt="${clone ? '' : slide.alt}" style="--slide-position:${slide.position};--slide-mobile-position:${slide.mobilePosition}" ${position === 1 ? 'fetchpriority="high"' : 'loading="eager"'} draggable="false"></div>`;
    }).join('');
    return `<div class="hero-slide-viewport"><div class="hero-slide-track" id="hero-slide-track">${images}</div></div>
      <div class="hero-carousel-controls" role="group" aria-label="ควบคุมสไลด์หน้าแรก">
        <button class="hero-arrow" type="button" data-hero-previous aria-label="ภาพก่อนหน้า" aria-controls="hero-slide-track">${arrow('previous')}</button>
        <button class="hero-playback" type="button" data-hero-playback aria-label="หยุดสไลด์อัตโนมัติ" aria-controls="hero-slide-track">${playbackIcon(false)}</button>
        <button class="hero-arrow" type="button" data-hero-next aria-label="ภาพถัดไป" aria-controls="hero-slide-track">${arrow('next')}</button>
      </div>
      <div class="hero-position"><span class="hero-count"><b data-hero-count>01</b> / 03</span><div class="hero-dots" role="group" aria-label="เลือกภาพแบนเนอร์">${slides.map((s,i) => `<button type="button" class="hero-dot ${i === 0 ? 'is-active' : ''}" data-hero-dot="${i}" aria-label="แสดงภาพที่ ${i + 1}: ${s.alt}" aria-pressed="${i === 0}" aria-controls="hero-slide-track"><span aria-hidden="true"></span></button>`).join('')}</div></div>
      <p class="hero-screen-reader" data-hero-status role="status" aria-live="polite" aria-atomic="true"></p>`;
  }

  function mount(root) {
    const track = root.querySelector('.hero-slide-track');
    const dots = [...root.querySelectorAll('[data-hero-dot]')];
    const originals = [...root.querySelectorAll('[data-slide]')];
    const playback = root.querySelector('[data-hero-playback]');
    const status = root.querySelector('[data-hero-status]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const events = new AbortController();
    const listen = (node, type, handler, options = {}) => node.addEventListener(type, handler, { ...options, signal:events.signal });
    let index = 0, position = 1, timer = 0, transitionTimer = 0;
    let paused = reducedMotion.matches, hovered = false, focusPaused = false, inView = true, moving = false, pointer = null;

    function stopTimer() { window.clearTimeout(timer); timer = 0; }
    function schedule() {
      stopTimer();
      if (!paused && !hovered && !focusPaused && !document.hidden && inView && root.isConnected) {
        timer = window.setTimeout(() => move(1), 6500);
      }
    }
    function updatePlayback() {
      playback.innerHTML = playbackIcon(paused);
      playback.setAttribute('aria-label', paused ? 'เริ่มสไลด์อัตโนมัติ' : 'หยุดสไลด์อัตโนมัติ');
      playback.setAttribute('title', paused ? 'เริ่มสไลด์อัตโนมัติ' : 'หยุดสไลด์อัตโนมัติ');
      root.dataset.autoplay = paused ? 'paused' : 'playing';
    }
    function finishTransition() {
      window.clearTimeout(transitionTimer);
      if (!moving) return;
      moving = false;
      position = index + 1;
      track.style.transition = 'none';
      track.style.transform = `translate3d(-${position * 100}%,0,0)`;
      schedule();
    }
    function show(nextPosition, nextIndex, manual = false) {
      if (moving || nextIndex === index) return;
      stopTimer();
      index = nextIndex;
      position = nextPosition;
      moving = true;
      // Commit a previous clone-to-original reset before the next transition.
      void track.offsetWidth;
      track.style.transition = reducedMotion.matches ? 'none' : '';
      track.style.transform = `translate3d(-${position * 100}%,0,0)`;
      root.dataset.slide = String(index + 1);
      root.querySelector('[data-hero-count]').textContent=String(index+1).padStart(2,'0');
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
        dot.setAttribute('aria-pressed', String(i === index));
      });
      originals.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== index)));
      if (manual) status.textContent = `ภาพที่ ${index + 1} จาก 3: ${slides[index].alt}`;
      if (reducedMotion.matches) finishTransition();
      else transitionTimer = window.setTimeout(finishTransition, 800);
    }
    function move(direction, manual = false) {
      show(position + direction, (index + direction + slides.length) % slides.length, manual);
    }

    listen(track, 'transitionend', event => {
      if (event.target === track && event.propertyName === 'transform') finishTransition();
    });
    listen(root.querySelector('[data-hero-previous]'), 'click', () => move(-1, true));
    listen(root.querySelector('[data-hero-next]'), 'click', () => move(1, true));
    dots.forEach((dot, i) => listen(dot, 'click', () => show(i + 1, i, true)));
    listen(playback, 'click', () => { paused = !paused; focusPaused = false; updatePlayback(); schedule(); });
    listen(root, 'pointerenter', event => { if (event.pointerType === 'mouse') { hovered = true; stopTimer(); } });
    listen(root, 'pointerleave', event => { if (event.pointerType === 'mouse') { hovered = false; schedule(); } });
    listen(root, 'focusin', event => { if (event.target !== playback) { focusPaused = true; stopTimer(); } });
    listen(root, 'focusout', event => { if (!root.contains(event.relatedTarget)) { focusPaused = false; schedule(); } });
    listen(document, 'visibilitychange', schedule);
    listen(root, 'keydown', event => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1, true);
      }
    });
    listen(root, 'pointerdown', event => {
      if (event.pointerType !== 'touch' || event.target.closest('a,button')) return;
      pointer = { id:event.pointerId, x:event.clientX, y:event.clientY };
      stopTimer();
      root.setPointerCapture(event.pointerId);
    });
    listen(root, 'pointerup', event => {
      if (!pointer || event.pointerId !== pointer.id) return;
      const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
      pointer = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) move(dx < 0 ? 1 : -1, true);
      else schedule();
    });
    listen(root, 'pointercancel', () => { pointer = null; schedule(); });
    listen(reducedMotion, 'change', () => {
      if (reducedMotion.matches) { paused = true; updatePlayback(); finishTransition(); }
      schedule();
    });
    const visibility = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; schedule(); }, { threshold:0.1 });
    visibility.observe(root);
    root.dataset.slide = '1';
    updatePlayback();
    schedule();
    return () => {
      stopTimer();
      window.clearTimeout(transitionTimer);
      events.abort();
      visibility.disconnect();
    };
  }
  return { markup, mount };
})();
