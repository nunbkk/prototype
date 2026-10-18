'use strict';

window.TSPCC_REVEAL = (() => {
  const selector = [
    '.about-section-heading', '.about-building', '.about-facts', '.about-standard', '.facts', '.section-head', '.venue-viewport', '.venue-shortcuts',
    '.promotion-grid > *', '.package-cards > *', '.package-price-note',
    '.news-grid > *', '.venue-grid > *', '.trust > *', '.contact-band > .wrap',
    '.content-index > *', '.detail-hero > *', '.photo-grid > *',
    '.source-content :is(h2,h3,h4,p,ul,ol,table,figure,img,video,iframe)', '.prose > .note',
    '.prose > p', '.side-nav', '.story-aside', '.article-lead',
    '.filter-bar', '.result-count', '.pagination', '.all-links > *',
    '.bottom-space > :is(h2,p,.button)', '.package-layout > *',
    'fieldset > legend', '.form-grid > *', '.form-aside', '#quote-form > .button', '.quote-review-section', '.quote-demo-note', '.quote-actions'
  ].join(', ');
  function mount(root) {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) return () => {};
    const targets = new Set();
    const registered = new WeakSet();
    const events = new AbortController();
    function finish(element) {
      element.classList.remove('reveal-pending', 'reveal-entering');
      element.style.removeProperty('--reveal-delay');
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.replace('reveal-pending', 'reveal-entering');
        observer.unobserve(target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
    function register(element) {
      if (registered.has(element) || !root.contains(element)) return;
      // Animate a complete card, list, or figure rather than nested parts twice.
      if (element.parentElement.closest(selector)) return;
      registered.add(element);
      // Keep the initial viewport immediately readable, including browser scroll restoration.
      if (element.getBoundingClientRect().top < window.innerHeight - 24) return;
      targets.add(element);
      const siblings = [...element.parentElement.children];
      const staggered = element.parentElement.matches('.promotion-grid, .package-cards, .news-grid, .venue-grid, .content-index, .photo-grid, .form-grid');
      element.style.setProperty('--reveal-delay', `${staggered ? Math.min(siblings.indexOf(element), 3) * 70 : 0}ms`);
      element.classList.add('reveal-pending');
      element.addEventListener('animationend', event => {
        if (event.target === element && event.animationName === 'content-reveal') finish(element);
      }, { signal: events.signal });
      observer.observe(element);
    }
    function scan(node) {
      if (!(node instanceof Element)) return;
      if (node.matches(selector)) register(node);
      node.querySelectorAll(selector).forEach(register);
    }
    scan(root);
    // Listings are replaced when filters or pagination change.
    const changes = new MutationObserver(records => {
      targets.forEach(element => {
        if (!root.contains(element)) { observer.unobserve(element); targets.delete(element); }
      });
      records.forEach(record => record.addedNodes.forEach(scan));
    });
    changes.observe(root, { childList: true, subtree: true });
    root.addEventListener('focusin', event => {
      const element = event.target.closest('.reveal-pending, .reveal-entering');
      if (element) { observer.unobserve(element); finish(element); }
    }, { signal: events.signal });
    function cleanup() {
      observer.disconnect();
      changes.disconnect();
      events.abort();
      targets.forEach(finish);
    }
    reduced.addEventListener('change', event => { if (event.matches) cleanup(); }, { signal: events.signal });
    return cleanup;
  }
  return { mount };
})();
