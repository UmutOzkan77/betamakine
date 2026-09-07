/* Progressive enhancements: content and links remain usable without JavaScript. */
(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const panel = document.querySelector('#mobile-menu');
  const narrow = window.matchMedia('(max-width: 900px)');
  if (menu && panel && typeof panel.showModal === 'function') {
    document.documentElement.classList.add('nav-ready');
    const sync = () => {
      menu.hidden = !narrow.matches;
      if (!narrow.matches && panel.open) panel.close();
    };
    panel.addEventListener('close', () => {
      menu.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      if (narrow.matches) menu.focus({preventScroll: true});
    });
    menu.addEventListener('click', () => {
      if (!narrow.matches) return;
      panel.showModal();
      menu.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    });
    panel.querySelector('.menu-close').addEventListener('click', () => panel.close());
    panel.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const links = [...panel.querySelectorAll('a[href], button:not([disabled])')];
      const first = links[0], last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    panel.addEventListener('click', event => {
      if (event.target.closest('a')) panel.close();
      if (event.target === panel) {
        const rect = panel.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) panel.close();
      }
    });
    narrow.addEventListener('change', sync);
    sync();
  }
  const mainImage = document.querySelector('.gallery-main');
  document.querySelectorAll('[data-gallery-src]').forEach(thumb => {
    thumb.addEventListener('click', event => {
      if (!mainImage || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      mainImage.src = thumb.dataset.gallerySrc;
      mainImage.alt = thumb.getAttribute('aria-label');
      document.querySelectorAll('[data-gallery-src]').forEach(other => other.removeAttribute('aria-current'));
      thumb.setAttribute('aria-current', 'true');
    });
  });
  window.dataLayer = window.dataLayer || [];
  document.addEventListener('click', event => {
    const a = event.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const type = href.startsWith('tel:') ? 'phone_click' : href.startsWith('https://wa.me/') ? 'whatsapp_click' : href === '/contact/' ? 'quote_click' : '';
    if (type) {
      const fields = {page_path: location.pathname, link_location: a.closest('.whatsapp-corner') ? 'whatsapp_corner' : a.closest('.contact-dock') ? 'contact_dock' : a.closest('.mobile-menu') ? 'mobile_menu' : 'page'};
      window.dataLayer.push({event: type, ...fields});
      if (typeof window.gtag === 'function') window.gtag('event', type, fields);
    }
  });
  // Retain the existing Google Ads account; never load analytics on localhost.
  if (location.hostname === 'www.betamakine.com' || location.hostname === 'betamakine.com') {
    window.addEventListener('load', () => {
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', 'AW-17920513521');
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17920513521';
      document.head.appendChild(script);
    });
  }
})();
