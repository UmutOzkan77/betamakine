// ===================================
// PROTOCOL CANONICALIZATION
// ===================================

(function forceCanonicalHttps() {
    const host = window.location.hostname.toLowerCase();
    const isTargetHost = host === 'betamakine.com' || host === 'www.betamakine.com';
    const canonicalHost = 'www.betamakine.com';
    const needsHttps = window.location.protocol !== 'https:';
    const needsWwwHost = host !== canonicalHost;

    if (isTargetHost && (needsHttps || needsWwwHost)) {
        const targetUrl = `https://${canonicalHost}${window.location.pathname}${window.location.search}${window.location.hash}`;
        window.location.replace(targetUrl);
    }
})();

// ===================================
// CLOUDFLARE WEB ANALYTICS (RUM)
// ===================================

// Set this once to enable Cloudflare Web Analytics on all pages that load script.js
const CLOUDFLARE_WEB_ANALYTICS_TOKEN = '';

(function initCloudflareWebAnalytics() {
    const token = (window.CLOUDFLARE_WEB_ANALYTICS_TOKEN || CLOUDFLARE_WEB_ANALYTICS_TOKEN || '').trim();
    if (!token) return;

    const beaconSrc = 'https://static.cloudflareinsights.com/beacon.min.js';
    if (document.querySelector(`script[src="${beaconSrc}"]`)) return;

    const beaconScript = document.createElement('script');
    beaconScript.defer = true;
    beaconScript.src = beaconSrc;
    beaconScript.setAttribute('data-cf-beacon', JSON.stringify({ token }));
    document.head.appendChild(beaconScript);
})();

// ===================================
// HERO SLIDER FUNCTIONALITY
// ===================================

class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.autoSlideStartTimeout = null;
        this.autoSlideDelayMs = 7000;
        this.viewportQuery = window.matchMedia('(max-width: 768px)');
        this.isMobileViewport = this.viewportQuery.matches;

        this.init();
    }

    init() {
        if (!this.slides.length) return;

        // Ensure first visible hero image is loaded with the right source.
        this.ensureSlideBackground(this.currentSlide);

        // Defer non-critical image prefetch so LCP can settle first.
        this.deferNextSlidePreload();

        // Auto-slide starts after first content has already rendered.
        if (this.slides.length > 1) {
            this.startAutoSlide();
        }

        const handleViewportChange = () => {
            const nextViewport = this.viewportQuery.matches;
            if (nextViewport === this.isMobileViewport) return;

            this.isMobileViewport = nextViewport;
            this.ensureSlideBackground(this.currentSlide);
            this.preloadSlideBackground((this.currentSlide + 1) % this.slides.length);
        };

        if (typeof this.viewportQuery.addEventListener === 'function') {
            this.viewportQuery.addEventListener('change', handleViewportChange);
        } else if (typeof this.viewportQuery.addListener === 'function') {
            this.viewportQuery.addListener(handleViewportChange);
        }

        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.changeSlide(index);
                if (this.slides.length > 1) {
                    this.resetAutoSlide();
                }
            });
        });
    }

    changeSlide(index) {
        if (!this.slides.length) return;

        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.remove('active');
        }

        // Calculate new slide index (loop around)
        this.currentSlide = (index + this.slides.length) % this.slides.length;

        this.ensureSlideBackground(this.currentSlide);
        this.preloadSlideBackground((this.currentSlide + 1) % this.slides.length);

        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.add('active');
        }
    }

    startAutoSlide(delayMs = this.autoSlideDelayMs) {
        clearInterval(this.slideInterval);
        clearTimeout(this.autoSlideStartTimeout);

        const start = () => {
            this.slideInterval = setInterval(() => {
                this.changeSlide(this.currentSlide + 1);
            }, this.autoSlideDelayMs);
        };

        if (delayMs > 0) {
            this.autoSlideStartTimeout = setTimeout(start, delayMs);
            return;
        }

        start();
    }

    resetAutoSlide() {
        clearInterval(this.slideInterval);
        clearTimeout(this.autoSlideStartTimeout);
        this.startAutoSlide(0);
    }

    deferNextSlidePreload() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        const deferredPreload = () => this.preloadSlideBackground(nextIndex);

        if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(deferredPreload, { timeout: 3000 });
            return;
        }

        setTimeout(deferredPreload, 2000);
    }

    getPreferredBackground(slide) {
        const mobileBg = slide.dataset.bgMobile;
        const desktopBg = slide.dataset.bg;

        if (this.isMobileViewport && mobileBg) {
            return mobileBg;
        }

        return desktopBg;
    }

    ensureSlideBackground(index) {
        const slide = this.slides[index];
        if (!slide) return;

        const bg = this.getPreferredBackground(slide);
        if (!bg) return;

        if (slide.dataset.bgApplied !== bg) {
            slide.style.backgroundImage = `url('${bg}')`;
            slide.dataset.bgApplied = bg;
        }
    }

    preloadSlideBackground(index) {
        const slide = this.slides[index];
        if (!slide) return;

        const bg = this.getPreferredBackground(slide);
        if (!bg || slide.dataset.prefetchedBg === bg) return;

        const preloader = new Image();
        preloader.src = bg;
        slide.dataset.prefetchedBg = bg;
    }
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================

class HeaderScroll {
    constructor() {
        this.header = document.getElementById('header');
        this.scrollThreshold = 50;
        this.handleScroll = this.handleScroll.bind(this);
        this.syncHeaderOffset = this.syncHeaderOffset.bind(this);

        this.init();
    }

    init() {
        if (!this.header) return;

        this.syncHeaderOffset();
        this.handleScroll();
        window.addEventListener('resize', this.syncHeaderOffset);
        window.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    handleScroll() {
        if (window.scrollY > this.scrollThreshold) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }

    syncHeaderOffset() {
        const headerHeight = Math.round(this.header.offsetHeight);
        if (headerHeight > 0) {
            document.documentElement.style.setProperty('--header-offset', `${headerHeight}px`);
        }
    }
}

// ===================================
// MOBILE MENU TOGGLE
// ===================================

class MobileMenu {
    constructor() {
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.nav = document.querySelector('.nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileViewport = window.matchMedia('(max-width: 768px)');
        this.onToggleClick = this.onToggleClick.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onDocumentKeydown = this.onDocumentKeydown.bind(this);
        this.onViewportChange = this.onViewportChange.bind(this);

        this.init();
    }

    init() {
        if (!this.toggle || !this.nav) return;
        this.toggle.setAttribute('aria-expanded', 'false');
        this.nav.setAttribute('aria-hidden', 'true');

        this.toggle.addEventListener('click', this.onToggleClick);
        document.addEventListener('click', this.onDocumentClick);
        document.addEventListener('keydown', this.onDocumentKeydown);

        if (typeof this.mobileViewport.addEventListener === 'function') {
            this.mobileViewport.addEventListener('change', this.onViewportChange);
        } else if (typeof this.mobileViewport.addListener === 'function') {
            this.mobileViewport.addListener(this.onViewportChange);
        }

        // Close menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }

    isOpen() {
        return this.nav.classList.contains('active');
    }

    onToggleClick() {
        if (this.isOpen()) {
            this.closeMenu();
            return;
        }
        this.openMenu();
    }

    onDocumentClick(event) {
        if (!this.mobileViewport.matches || !this.isOpen()) return;
        const clickedInsideMenu = this.nav.contains(event.target) || this.toggle.contains(event.target);
        if (!clickedInsideMenu) {
            this.closeMenu();
        }
    }

    onDocumentKeydown(event) {
        if (event.key === 'Escape' && this.isOpen()) {
            this.closeMenu();
            this.toggle.focus();
        }
    }

    onViewportChange(event) {
        if (!event.matches && this.isOpen()) {
            this.closeMenu();
        }
    }

    openMenu() {
        this.toggle.classList.add('active');
        this.toggle.setAttribute('aria-expanded', 'true');
        this.nav.classList.add('active');
        this.nav.setAttribute('aria-hidden', 'false');
        document.body.classList.add('mobile-menu-open');
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.toggle.classList.remove('active');
        this.toggle.setAttribute('aria-expanded', 'false');
        this.nav.classList.remove('active');
        this.nav.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('mobile-menu-open');
        document.body.style.overflow = '';
    }
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Skip if it's just "#"
                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll indicator click
        if (this.scrollIndicator) {
            this.scrollIndicator.addEventListener('click', () => {
                const productsSection = document.querySelector('#urunler');
                if (productsSection) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = productsSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
}

// ===================================
// ACTIVE NAVIGATION LINK TRACKING
// ===================================

class ActiveNavTracker {
    constructor() {
        this.sections = Array.from(document.querySelectorAll('section[id]'));
        this.navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
        this.onScroll = this.onScroll.bind(this);

        this.init();
    }

    init() {
        if (!this.sections.length || !this.navLinks.length) return;
        window.addEventListener('scroll', this.onScroll, { passive: true });
        this.onScroll();
    }

    onScroll() {
        let current = '';
        const scrollPosition = window.scrollY + 120;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        if (!current) return;

        this.navLinks.forEach(link => {
            const isCurrent = link.getAttribute('href') === `#${current}`;
            link.classList.toggle('active', isCurrent);
        });
    }
}

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================

class ScrollReveal {
    constructor() {
        this.elements = [];
        this.revealGroups = [
            { selector: '.section-header, .about-wrapper, .stat-item, .faq-item, .blog-hub-top, .model-advisor, .compare-lab, .purchase-guide-panel', step: 0.05, maxDelay: 0.25 },
            { selector: '.product-card, .contact-card, .blog-card, .mv-card, .value-card, .why-item', step: 0.07, maxDelay: 0.42 }
        ];
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        this.init();
    }

    init() {
        const seenElements = new Set();

        // Add initial hidden state with per-group staggering
        this.revealGroups.forEach(group => {
            const groupElements = document.querySelectorAll(group.selector);
            groupElements.forEach((element, index) => {
                if (seenElements.has(element)) return;
                const delay = Math.min(index * group.step, group.maxDelay);
                element.classList.add('scroll-reveal');
                element.style.transitionDelay = `${delay.toFixed(2)}s`;
                this.elements.push(element);
                seenElements.add(element);
            });
        });

        if (!this.elements.length) return;

        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe all elements
        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// ===================================
// COUNTER ANIMATION FOR STATS
// ===================================

class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.animated = false;

        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateCounters();
                    this.animated = true;
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = counter.textContent;
            const number = parseInt(target.replace(/\D/g, ''));
            const suffix = target.replace(/[0-9]/g, '');
            const duration = 2000;
            const increment = number / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < number) {
                    counter.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            counter.textContent = '0' + suffix;
            updateCounter();
        });
    }
}

// ===================================
// PARALLAX EFFECT FOR HERO
// ===================================

class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.mediaQuery = window.matchMedia('(min-width: 1025px)');
        this.reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.ticking = false;
        this.handleScroll = this.handleScroll.bind(this);
        this.init();
    }

    init() {
        if (!this.hero) return;
        if (!this.mediaQuery.matches || this.reduceMotionQuery.matches) {
            this.hero.style.transform = '';
            return;
        }

        window.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    handleScroll() {
        if (this.ticking) return;
        this.ticking = true;

        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroHeight = this.hero.offsetHeight;

            if (scrolled <= heroHeight) {
                const parallaxSpeed = 0.2;
                this.hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            } else {
                this.hero.style.transform = '';
            }

            this.ticking = false;
        });
    }
}

// ===================================
// SMOOTH HOVER EFFECT FOR PRODUCT CARDS
// ===================================

class ProductCardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.product-card');
        this.hoverCapableQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
        this.init();
    }

    resetCardStates() {
        this.cards.forEach(card => {
            card.style.opacity = '';
            card.style.transform = '';
        });
    }

    init() {
        if (!this.cards.length || !this.hoverCapableQuery.matches) return;

        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.cards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.style.opacity = '0.85';
                        otherCard.style.transform = 'scale(0.98)';
                    }
                });
            });

            card.addEventListener('mouseleave', () => {
                this.resetCardStates();
            });
        });
    }
}

// ===================================
// PRODUCT SEO CLUSTER FLOATING PANEL
// ===================================

class ProductSeoClusterFloatingPanel {
    constructor() {
        this.panel = document.querySelector('.product-detail .seo-cluster-links');
        this.desktopQuery = window.matchMedia('(min-width: 1200px)');
        this.mobileQuery = window.matchMedia('(max-width: 968px)');
        this.reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.panelHeading = this.panel ? this.panel.querySelector('h2') : null;
        this.defaultHeadingText = this.panelHeading ? this.panelHeading.textContent.trim() : '';
        this.mobileHeadingText = 'Doğru Ürünü Seçmene yardımcı olabiliriz';
        this.minimizeDelayMs = 5000;
        this.minimizeTimer = null;
        this.handleViewportChange = this.handleViewportChange.bind(this);
        this.handleMotionChange = this.handleMotionChange.bind(this);
        this.handlePanelActivate = this.handlePanelActivate.bind(this);
        this.handlePanelKeydown = this.handlePanelKeydown.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleDocumentKeydown = this.handleDocumentKeydown.bind(this);
        this.init();
    }

    init() {
        if (!this.panel) return;

        this.updateState();

        if (typeof this.desktopQuery.addEventListener === 'function') {
            this.desktopQuery.addEventListener('change', this.handleViewportChange);
        } else if (typeof this.desktopQuery.addListener === 'function') {
            this.desktopQuery.addListener(this.handleViewportChange);
        }

        if (typeof this.mobileQuery.addEventListener === 'function') {
            this.mobileQuery.addEventListener('change', this.handleViewportChange);
        } else if (typeof this.mobileQuery.addListener === 'function') {
            this.mobileQuery.addListener(this.handleViewportChange);
        }

        if (typeof this.reduceMotionQuery.addEventListener === 'function') {
            this.reduceMotionQuery.addEventListener('change', this.handleMotionChange);
        } else if (typeof this.reduceMotionQuery.addListener === 'function') {
            this.reduceMotionQuery.addListener(this.handleMotionChange);
        }
    }

    handleViewportChange() {
        this.updateState();
    }

    handleMotionChange() {
        this.updateState();
    }

    clearMinimizeTimer() {
        if (!this.minimizeTimer) return;
        window.clearTimeout(this.minimizeTimer);
        this.minimizeTimer = null;
    }

    collapseMobilePanel() {
        if (!this.panel) return;
        this.panel.classList.remove('is-expanded');
        this.panel.setAttribute('aria-expanded', 'false');
    }

    toggleMobilePanel() {
        const shouldExpand = !this.panel.classList.contains('is-expanded');
        this.panel.classList.toggle('is-expanded', shouldExpand);
        this.panel.setAttribute('aria-expanded', shouldExpand ? 'true' : 'false');
    }

    handlePanelActivate(event) {
        if (!this.mobileQuery.matches) return;
        if (event.target.closest('.seo-cluster-list a')) return;
        event.preventDefault();
        this.toggleMobilePanel();
    }

    handlePanelKeydown(event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        this.toggleMobilePanel();
    }

    handleDocumentClick(event) {
        if (!this.mobileQuery.matches) return;
        if (!this.panel.classList.contains('seo-cluster-mobile-tabbar')) return;
        if (this.panel.contains(event.target)) return;
        this.collapseMobilePanel();
    }

    handleDocumentKeydown(event) {
        if (event.key !== 'Escape') return;
        this.collapseMobilePanel();
    }

    scheduleMinimize(delay = this.minimizeDelayMs) {
        this.clearMinimizeTimer();

        this.minimizeTimer = window.setTimeout(() => {
            const isInteracting = this.panel.matches(':hover') || this.panel.matches(':focus-within');
            if (isInteracting) {
                this.scheduleMinimize(1200);
                return;
            }

            this.panel.classList.add('is-minimized');
        }, delay);
    }

    updateState() {
        if (!this.panel) return;

        const shouldFloat = this.desktopQuery.matches;
        const shouldUseMobileTabbar = this.mobileQuery.matches;
        document.body.classList.toggle('has-mobile-seo-cluster-tabbar', shouldUseMobileTabbar);
        this.clearMinimizeTimer();
        this.panel.classList.remove('seo-cluster-mobile-tabbar', 'is-expanded');
        this.panel.classList.toggle('seo-cluster-floating', shouldFloat);
        this.panel.classList.remove('is-minimized');
        this.panel.removeEventListener('click', this.handlePanelActivate);
        this.panel.removeEventListener('keydown', this.handlePanelKeydown);
        document.removeEventListener('click', this.handleDocumentClick);
        document.removeEventListener('keydown', this.handleDocumentKeydown);
        this.panel.removeAttribute('role');
        this.panel.removeAttribute('tabindex');
        this.panel.removeAttribute('aria-label');
        this.panel.removeAttribute('aria-expanded');

        if (this.panelHeading && this.defaultHeadingText) {
            this.panelHeading.textContent = this.defaultHeadingText;
        }

        if (shouldUseMobileTabbar) {
            this.panel.classList.remove('seo-cluster-floating');
            this.panel.classList.add('seo-cluster-mobile-tabbar');

            if (this.panelHeading) {
                this.panelHeading.textContent = this.mobileHeadingText;
            }

            this.panel.setAttribute('tabindex', '0');
            this.panel.setAttribute('aria-label', this.mobileHeadingText);
            this.panel.setAttribute('aria-expanded', 'false');
            this.panel.addEventListener('click', this.handlePanelActivate);
            this.panel.addEventListener('keydown', this.handlePanelKeydown);
            document.addEventListener('click', this.handleDocumentClick);
            document.addEventListener('keydown', this.handleDocumentKeydown);
            return;
        }

        if (!shouldFloat || this.reduceMotionQuery.matches) return;
        this.scheduleMinimize();
    }
}

// ===================================
// BLOG SIDEBAR ACTIVE LINK
// ===================================

class BlogSidebarCurrentLink {
    constructor() {
        this.links = document.querySelectorAll('.blog-sidebar-link');
        this.init();
    }

    normalizePath(pathname) {
        if (!pathname) return '/';
        const cleanPath = pathname.split('#')[0].split('?')[0];
        const normalized = cleanPath.replace(/\/+$/, '');
        return normalized || '/';
    }

    init() {
        if (!this.links.length) return;

        const currentPath = this.normalizePath(window.location.pathname);

        this.links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;

            const linkUrl = new URL(href, window.location.href);
            const linkPath = this.normalizePath(linkUrl.pathname);
            const isCurrent = currentPath === linkPath;

            link.classList.toggle('is-current', isCurrent);
            if (isCurrent) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }
}

// ===================================
// FLOATING WHATSAPP BUTTON
// ===================================

class WhatsAppFloatingButton {
    constructor() {
        this.href = 'https://wa.me/905364615330';
        this.buttonClass = 'whatsapp-float-button';
        this.init();
    }

    init() {
        if (!document.body) return;
        if (document.querySelector(`.${this.buttonClass}`)) return;

        const button = document.createElement('a');
        button.className = this.buttonClass;
        button.href = this.href;
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
        button.setAttribute('aria-label', "WhatsApp'tan bize yazın");

        button.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
        `;

        document.body.appendChild(button);
    }
}

// ===================================
// INITIALIZE ALL COMPONENTS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components with safe guards
    try { new HeroSlider(); } catch (e) { console.debug('HeroSlider not active on this page'); }
    try { new HeaderScroll(); } catch (e) { console.debug('HeaderScroll not active on this page'); }
    try { new MobileMenu(); } catch (e) { console.error('MobileMenu failed:', e); }
    try { new SmoothScroll(); } catch (e) { console.debug('SmoothScroll not active on this page'); }
    try { new ActiveNavTracker(); } catch (e) { console.debug('ActiveNavTracker not active on this page'); }
    try { new ScrollReveal(); } catch (e) { console.debug('ScrollReveal not active on this page'); }
    try { new CounterAnimation(); } catch (e) { console.debug('CounterAnimation not active on this page'); }
    try { new ParallaxEffect(); } catch (e) { console.debug('ParallaxEffect not active on this page'); }
    try { new ProductCardEffects(); } catch (e) { console.debug('ProductCardEffects not active on this page'); }
    try { new ProductSeoClusterFloatingPanel(); } catch (e) { console.debug('ProductSeoClusterFloatingPanel not active on this page'); }
    try { new BlogSidebarCurrentLink(); } catch (e) { console.debug('BlogSidebarCurrentLink not active on this page'); }
    try { new WhatsAppFloatingButton(); } catch (e) { console.error('WhatsAppFloatingButton failed:', e); }

    // Log initialization
    console.log('Beta Makine - Website Initialized');
});

// ===================================
// TYPEWRITER EFFECT FOR CONTACT PAGE
// ===================================

window.addEventListener('load', () => {
    const h1Element = document.querySelector('#typewriter-hero h1');
    const pElement = document.querySelector('#typewriter-hero p');
    const cursor = document.getElementById('cursor');

    // Cursor elementi yoksa efekti zorlamadan mevcut başlığı koru.
    if (!h1Element || !cursor) return;

    const targetText = h1Element.dataset.typewriterText || h1Element.textContent.trim();
    let currentIndex = 0;
    h1Element.textContent = '';
    h1Element.appendChild(cursor);

    function typeWriter() {
        if (currentIndex < targetText.length) {
            const currentText = h1Element.textContent.replace('|', '');
            h1Element.textContent = currentText + targetText.charAt(currentIndex);
            h1Element.appendChild(cursor);
            currentIndex++;
            setTimeout(typeWriter, 150);
        } else {
            cursor.style.display = 'none';

            setTimeout(() => {
                if (pElement) {
                    pElement.classList.add('show');
                }
            }, 300);
        }
    }

    typeWriter();
});

