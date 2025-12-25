/**
 * BISCYNE AGENCY - JavaScript Functionality
 * Mobile-first, lightweight animations and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNav();
    initCountryCards();
    initAccordions();
    initScrollAnimations();
    initSmoothScroll();
    initFormHandler();
    initHeaderScroll();
    initHeroSlideshow();
});

/**
 * Hero Background Slideshow
 */
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 6000; // 6 seconds per slide
    
    // Add zoom class to first slide after a brief delay
    setTimeout(() => {
        slides[0].classList.add('zoom');
    }, 100);
    
    function nextSlide() {
        // Remove active and zoom from current slide
        slides[currentSlide].classList.remove('active', 'zoom');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Reset transform for smooth transition
        slides[currentSlide].style.transform = 'scale(1.1)';
        
        // Force reflow
        slides[currentSlide].offsetHeight;
        
        // Add active class
        slides[currentSlide].classList.add('active');
        
        // Add zoom effect after transition starts
        setTimeout(() => {
            slides[currentSlide].classList.add('zoom');
        }, 100);
    }
    
    // Auto-advance slides
    setInterval(nextSlide, slideInterval);
    
    // Preload images for smoother transitions
    slides.forEach(slide => {
        const bgImage = slide.style.backgroundImage;
        const url = bgImage.match(/url\(["']?(.+?)["']?\)/);
        if (url && url[1]) {
            const img = new Image();
            img.src = url[1];
        }
    });
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !nav) return;
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Country Cards Expand/Collapse
 */
function initCountryCards() {
    const countryCards = document.querySelectorAll('.country-card');
    
    countryCards.forEach(card => {
        const header = card.querySelector('.country-header');
        
        if (!header) return;
        
        header.addEventListener('click', function() {
            // Close other cards
            countryCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Toggle current card
            card.classList.toggle('active');
            
            // Scroll into view if opening
            if (card.classList.contains('active')) {
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
    });
}

/**
 * Accordion Functionality (Jobs & FAQ)
 */
function initAccordions() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        if (!header) return;
        
        header.addEventListener('click', function() {
            const parentAccordion = item.closest('.accordion');
            const siblings = parentAccordion.querySelectorAll('.accordion-item');
            
            // Close other items in the same accordion
            siblings.forEach(sibling => {
                if (sibling !== item && sibling.classList.contains('active')) {
                    sibling.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/**
 * Scroll Animations (Intersection Observer)
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.slide-up');
    
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements
        animatedElements.forEach(el => el.classList.add('visible'));
        return;
    }
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add stagger delay based on index within parent
                const parent = entry.target.parentElement;
                const siblings = Array.from(parent.querySelectorAll('.slide-up'));
                const index = siblings.indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty or just "#" links
            if (!href || href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form Handler with Validation
 */
function initFormHandler() {
    const form = document.getElementById('applyForm');
    const modal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.fullName || !data.phone || !data.job || !data.country) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\+\-]{10,15}$/;
        if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Simulate form submission
        // In production, you would send this to a backend API
        console.log('Form submitted:', data);
        
        // Store in localStorage (for demo purposes)
        const applications = JSON.parse(localStorage.getItem('biscyne_applications') || '[]');
        applications.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('biscyne_applications', JSON.stringify(applications));
        
        // Show success modal
        if (modal) {
            modal.classList.add('active');
        }
        
        // Reset form
        form.reset();
    });
    
    // Close modal
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
        
        // Close modal on backdrop click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Close modal on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    if (!header) return;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        // Add shadow when scrolled
        if (currentScrollY > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Lazy Load Images (if any are added later)
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (!('IntersectionObserver' in window)) {
        // Fallback: load all images
        images.forEach(img => {
            img.src = img.dataset.src;
        });
        return;
    }
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Track click events (for analytics integration later)
 */
function trackEvent(category, action, label) {
    // Placeholder for analytics integration
    // Example: Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', { category, action, label });
    
    // If Google Analytics is available
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track important button clicks
document.addEventListener('click', function(e) {
    const target = e.target.closest('a, button');
    if (!target) return;
    
    // Track WhatsApp clicks
    if (target.href && target.href.includes('wa.me')) {
        trackEvent('Contact', 'WhatsApp Click', target.href);
    }
    
    // Track Call clicks
    if (target.href && target.href.startsWith('tel:')) {
        trackEvent('Contact', 'Phone Click', target.href);
    }
    
    // Track Apply button clicks
    if (target.classList.contains('sticky-apply') || 
        (target.classList.contains('btn-primary') && target.textContent.includes('Apply'))) {
        trackEvent('Conversion', 'Apply Button Click', target.textContent);
    }
});

/**
 * Service Worker Registration (for PWA capabilities - optional)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment below to enable PWA
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker not registered', err));
    });
}

/**
 * Handle online/offline status
 */
window.addEventListener('online', function() {
    console.log('Connection restored');
    // Could show a notification to the user
});

window.addEventListener('offline', function() {
    console.log('Connection lost');
    // Could show a notification to the user
});
