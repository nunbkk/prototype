'use strict';

window.TSPCC_VENUES = (() => {
  function markup(rooms, card, shortcuts = '') {
    return `<div class="venue-carousel" role="region" aria-roledescription="สไลด์" aria-label="พื้นที่จัดงาน ${rooms.length} รายการ">
      <div class="venue-slider-shell"><div class="venue-viewport"><div class="venue-track" id="venue-track">${[...rooms,...rooms,...rooms].map((room,i)=>`<div class="venue-slide" role="group" aria-roledescription="สไลด์" aria-label="${i%rooms.length+1} จาก ${rooms.length}" inert aria-hidden="true">${card(room).replace('loading="lazy"','loading="eager"')}</div>`).join('')}</div></div>
      <button class="venue-slide-arrow venue-slide-prev" type="button" data-venue-prev aria-label="เลื่อนห้องประชุมไปทางซ้าย" aria-controls="venue-track"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14 5-7 7 7 7"/></svg></button>
      <button class="venue-slide-arrow venue-slide-next" type="button" data-venue-next aria-label="เลื่อนห้องประชุมไปทางขวา" aria-controls="venue-track"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m10 5 7 7-7 7"/></svg></button></div>
      ${shortcuts}
      <p class="hero-screen-reader" data-venue-status role="status" aria-live="polite"></p>
    </div>`;
  }
  function mount(root) {
    const track=root.querySelector('.venue-track'), viewport=root.querySelector('.venue-viewport');
    const slides=[...track.children], total=slides.length/3;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const events=new AbortController();
    const on=(node,event,handler,options={})=>node.addEventListener(event,handler,{...options,signal:events.signal});
    let index=0, position=total, step=0, timer=0, fallback=0, moving=false, inView=false, hovered=false, focused=false, paused=reduced.matches, pointer=null, suppressClick=false;
    function stop(){clearTimeout(timer);}
    function schedule(){stop();if(!paused&&!hovered&&!focused&&inView&&!document.hidden)timer=setTimeout(()=>move(1),4800);}
    function playback(){root.dataset.autoplay=paused?'paused':'playing';}
    function update(){
      root.dataset.index=index;
      slides.forEach((slide,i)=>{const visible=i>=position&&(i-position)*step+slide.offsetWidth<=viewport.clientWidth+1;slide.inert=!visible;slide.setAttribute('aria-hidden',String(!visible));});
    }
    function finish(){clearTimeout(fallback);moving=false;position=total+index;track.style.transition='none';track.style.transform=`translate3d(${-position*step}px,0,0)`;update();schedule();}
    function show(nextPosition,nextIndex,manual=false){
      if(moving||nextIndex===index)return;
      stop();moving=true;position=nextPosition;index=nextIndex;
      track.getBoundingClientRect();
      track.style.transition=reduced.matches?'none':'transform 850ms cubic-bezier(.22,.61,.36,1)';
      track.style.transform=`translate3d(${-position*step}px,0,0)`;
      update();
      if(manual)root.querySelector('[data-venue-status]').textContent=`พื้นที่ ${index+1} จาก ${total}: ${slides[total+index].querySelector('h3').textContent}`;
      if(reduced.matches)finish();else fallback=setTimeout(finish,900);
    }
    function move(direction,manual=false){show(position+direction,(index+direction+total)%total,manual);}
    on(root.querySelector('[data-venue-prev]'),'click',()=>move(-1,true));
    on(root.querySelector('[data-venue-next]'),'click',()=>move(1,true));
    on(track,'transitionend',e=>{if(e.target===track&&e.propertyName==='transform')finish();});
    on(root,'mouseenter',()=>{hovered=true;stop();});on(root,'mouseleave',()=>{hovered=false;schedule();});
    on(root,'focusin',()=>{focused=true;stop();});on(root,'focusout',e=>{if(!root.contains(e.relatedTarget)){focused=false;schedule();}});
    on(root,'keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1,true);}});
    on(viewport,'pointerdown',e=>{pointer={x:e.clientX,y:e.clientY};suppressClick=false;stop();});
    on(viewport,'pointerup',e=>{if(!pointer)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;pointer=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){suppressClick=true;move(dx<0?1:-1,true);}else schedule();});
    on(viewport,'pointercancel',()=>{pointer=null;schedule();});
    on(viewport,'dragstart',e=>e.preventDefault());
    on(viewport,'click',e=>{if(suppressClick){e.preventDefault();e.stopPropagation();suppressClick=false;}},{capture:true});
    on(document,'visibilitychange',schedule);
    on(reduced,'change',()=>{paused=reduced.matches;playback();finish();});
    const size=new ResizeObserver(()=>{step=slides[1].offsetLeft-slides[0].offsetLeft;finish();});size.observe(viewport);
    const visibility=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;schedule();},{threshold:.25});visibility.observe(root);
    playback();
    return ()=>{stop();clearTimeout(fallback);events.abort();size.disconnect();visibility.disconnect();};
  }
  return {markup,mount};
})();
