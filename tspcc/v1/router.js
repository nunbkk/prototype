'use strict';
(() => {
  const base = new URL(window.TSPCC_BASE, location.origin).pathname;
  const relative = path => path.startsWith(base) ? '/' + path.slice(base.length) : path;
  const routePath = () => relative(location.pathname).replace(/index\.php$/, '');
  const pathURL = value => {
    const url = new URL(value.startsWith('#/') ? base + value.slice(2) : value, document.baseURI);
    let path = relative(url.pathname).replace(/index\.php$/, '');
    if (/^\/meeting-package-2\/?$/.test(path)) path = '/package/';
    if (/^\/contact-1\/?$/.test(path)) path = '/contact/';
    if (/^\/sdgs\/?$/.test(path)) path = '/Sustainable-Development-Goals/';
    if (!path.endsWith('/')) path += '/';
    return base + path.slice(1) + url.search;
  };
  window.TSPCC_ROUTER = {routePath};
  function normalize(root) {
    const links = [...(root.matches?.('a[href]') ? [root] : []), ...root.querySelectorAll('a[href]')];
    links.forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      const mapped = window.TSPCC_EXPORT_LINKS?.[decodeURI(href)];
      if (mapped) { a.setAttribute('href', mapped.startsWith('assets/') || mapped.startsWith('#/') ? (mapped.startsWith('#/') ? pathURL(mapped) : base + mapped) : mapped); return; }
      if (base !== '/' && href.startsWith('/') && !href.startsWith('//') && !href.startsWith(base)) { a.setAttribute('href', base + href.slice(1)); return; }
      const url = new URL(href, document.baseURI);
      if (href.startsWith('#/') || (url.origin === location.origin && /^\/(meeting-package-2|contact-1|sdgs)\/?$/.test(relative(url.pathname)))) {
        const next = pathURL(href);
        if (next !== href) a.setAttribute('href', next);
      }
    });
  }
  function migrateHash() { if (location.hash.startsWith('#/')) history.replaceState(null, '', pathURL(location.hash)); }
  migrateHash();
  if (/^\/(contact-1|sdgs|meeting-package-2)\/?$/.test(routePath()) || /index\.php$/.test(location.pathname)) history.replaceState(null, '', pathURL(location.href));
  normalize(document);
  new MutationObserver(records => records.forEach(record => {
    if (record.type === 'attributes') normalize(record.target);
    else record.addedNodes.forEach(node => { if (node.nodeType === 1) normalize(node); });
  })).observe(document.body, {childList:true, subtree:true, attributes:true, attributeFilter:['href']});
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const a = event.target.closest('a[href]');
    if (!a || a.target || a.hasAttribute('download')) return;
    const url = new URL(a.href);
    if (url.origin !== location.origin || !url.pathname.startsWith(base)) return;
    if (a.getAttribute('href') === '#main') { event.preventDefault(); document.querySelector('#main').focus(); return; }
    if (url.hash || /\.[a-z0-9]+$/i.test(url.pathname)) return;
    event.preventDefault();
    const destination = pathURL(url.href);
    if (destination !== location.pathname + location.search) history.pushState(null, '', destination);
    window.dispatchEvent(new Event('routechange'));
  });
  window.addEventListener('popstate', () => window.dispatchEvent(new Event('routechange')));
  window.addEventListener('hashchange', () => { if (location.hash.startsWith('#/')) { migrateHash(); window.dispatchEvent(new Event('routechange')); } });
})();
