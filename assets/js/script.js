// ===================================
// PROTOCOL CANONICALIZATION
// ===================================

(function forceCanonicalHttps() {
    const host = window.location.hostname.toLowerCase();
    const isTargetHost = host === 'betamakine.com' || host === 'www.betamakine.com';

    if (window.location.protocol === 'http:' && isTargetHost) {
        const targetUrl = `https://betamakine.com${window.location.pathname}${window.location.search}${window.location.hash}`;
        window.location.replace(targetUrl);
    }
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

        this.init();
    }

    init() {
        if (!this.header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > this.scrollThreshold) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });
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

        this.init();
    }

    init() {
        if (!this.toggle || !this.nav) return;

        // Toggle menu on button click
        this.toggle.addEventListener('click', () => {
            this.toggle.classList.toggle('active');
            this.nav.classList.toggle('active');
            document.body.style.overflow = this.nav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.toggle.classList.remove('active');
                this.nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
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
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.scrollY + 100;

            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
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
            { selector: '.section-header, .about-wrapper, .stat-item, .faq-item', step: 0.06, maxDelay: 0.24 },
            { selector: '.product-card', step: 0.08, maxDelay: 0.4 }
        ];
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        this.init();
    }

    init() {
        // Add initial hidden state with per-group staggering
        this.revealGroups.forEach(group => {
            const groupElements = document.querySelectorAll(group.selector);
            groupElements.forEach((element, index) => {
                const delay = Math.min(index * group.step, group.maxDelay);
                element.classList.add('scroll-reveal');
                element.style.transitionDelay = `${delay.toFixed(2)}s`;
                this.elements.push(element);
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
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = this.hero.offsetHeight;

            if (scrolled <= heroHeight) {
                const parallaxSpeed = 0.5;
                this.hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
}

// ===================================
// SMOOTH HOVER EFFECT FOR PRODUCT CARDS
// ===================================

class ProductCardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.product-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.cards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.style.opacity = '0.7';
                        otherCard.style.transform = 'scale(0.95)';
                    }
                });
            });

            card.addEventListener('mouseleave', () => {
                this.cards.forEach(otherCard => {
                    otherCard.style.opacity = '1';
                    otherCard.style.transform = 'scale(1)';
                });
            });
        });
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
    try { new BlogSidebarCurrentLink(); } catch (e) { console.debug('BlogSidebarCurrentLink not active on this page'); }

    // Log initialization
    console.log('🚀 Beta Makine - Website Initialized');
});

// ===================================
// TYPEWRITER EFFECT FOR CONTACT PAGE
// ===================================

window.onload = function () {
    const h1Element = document.querySelector('#typewriter-hero h1');
    const pElement = document.querySelector('#typewriter-hero p');
    const cursor = document.getElementById('cursor');

    // Sadece contact sayfasındaysa çalıştır
    if (!h1Element || !cursor) return;

    const targetText = "HAKKIMIZDA";
    let currentIndex = 0;

    function typeWriter() {
        if (currentIndex < targetText.length) {
            // Harfi cursor'dan önce ekle
            const currentText = h1Element.textContent.replace('|', '');
            h1Element.textContent = currentText + targetText.charAt(currentIndex);
            h1Element.appendChild(cursor);
            currentIndex++;
            setTimeout(typeWriter, 150);
        } else {
            // Yazma bitti, cursor'u kaldır
            cursor.style.display = 'none';

            // Alt metni göster (fade-in)
            setTimeout(() => {
                if (pElement) {
                    pElement.classList.add('show');
                }
            }, 300);
        }
    }

    // Başlat
    typeWriter();
};

// ===================================
// COUNTER ANIMATION
// ===================================

// Sayaç animasyonu
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 saniye
    const increment = target / (duration / 16); // 60 FPS için
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = '+' + Math.floor(current).toLocaleString('tr-TR');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = '+' + target.toLocaleString('tr-TR');
        }
    };

    updateCounter();
};

// Intersection Observer ile sayaç başlatma
const observeCounter = () => {
    const counterElements = document.querySelectorAll('.stat-number[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => observer.observe(counter));
};

// Sayfa yüklendiğinde sayaç gözlemleyicisini başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeCounter);
} else {
    observeCounter();
}

