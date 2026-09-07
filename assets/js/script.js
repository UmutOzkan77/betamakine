/* Progressive enhancements: content and links remain usable without JavaScript. */
(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const narrow = window.matchMedia('(max-width: 800px)');
  if (menu && nav) {
    const close = () => {
      menu.hidden = !narrow.matches;
      menu.setAttribute('aria-expanded', 'false');
      nav.classList.toggle('is-collapsed', narrow.matches);
    };
    close();
    narrow.addEventListener('change', close);
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-collapsed', !open);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        close(); menu.focus();
      }
    });
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
      const fields = {page_path: location.pathname, link_location: a.closest('.contact-dock') ? 'contact_dock' : 'page'};
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
