// ===================================
// HERO SLIDER FUNCTIONALITY
// ===================================

class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        // Auto-slide every 5 seconds
        this.startAutoSlide();
        
        // Previous button
        this.prevBtn.addEventListener('click', () => {
            this.changeSlide(this.currentSlide - 1);
            this.resetAutoSlide();
        });
        
        // Next button
        this.nextBtn.addEventListener('click', () => {
            this.changeSlide(this.currentSlide + 1);
            this.resetAutoSlide();
        });
        
        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.changeSlide(index);
                this.resetAutoSlide();
            });
        });
    }
    
    changeSlide(index) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Calculate new slide index (loop around)
        this.currentSlide = (index + this.slides.length) % this.slides.length;
        
        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }
    
    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.changeSlide(this.currentSlide + 1);
        }, 5000);
    }
    
    resetAutoSlide() {
        clearInterval(this.slideInterval);
        this.startAutoSlide();
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
        this.elements = document.querySelectorAll('.product-card, .about-wrapper, .section-header, .stat-item');
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        // Add initial hidden state to all elements
        this.elements.forEach((element, index) => {
            element.classList.add('scroll-reveal');
            element.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-reveal-active');
                    // Optional: Stop observing after animation
                    // observer.unobserve(entry.target);
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
// INITIALIZE ALL COMPONENTS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new HeroSlider();
    new HeaderScroll();
    new MobileMenu();
    new SmoothScroll();
    new ActiveNavTracker();
    new ScrollReveal();
    new CounterAnimation();
    new ParallaxEffect();
    new ProductCardEffects();
    
    // Log initialization
    console.log('🚀 Beta Makine - Website Initialized');
    console.log('✨ Scroll Animations Active');
    console.log('🎯 All Interactive Features Loaded');
});

// ===================================
// TYPEWRITER EFFECT FOR CONTACT PAGE
// ===================================

window.onload = function() {
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

