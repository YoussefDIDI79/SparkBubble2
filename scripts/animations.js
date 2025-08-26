// Advanced Animation Controller for SparkBubble Website
class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animationQueue = [];
        this.isAnimating = false;
        this.scrollPosition = 0;
        this.ticking = false;
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupCounterAnimations();
        this.setupProgressBarAnimations();
        this.setupTextRevealAnimations();
        this.setupMouseFollowAnimations();
        this.bindEvents();
    }
    
    // Enhanced Intersection Observer for better performance
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]
        };
        
        this.mainObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fadeInUp';
                const delay = parseFloat(element.dataset.delay) || 0;
                
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        this.triggerAnimation(element, animationType);
                    }, delay * 1000);
                }
            });
        }, options);
        
        // Observe all elements with animation attributes
        document.querySelectorAll('[data-animation]').forEach(el => {
            this.mainObserver.observe(el);
        });
    }
    
    // Advanced scroll-based animations
    setupScrollAnimations() {
        this.scrollElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
        
        // Enhanced scroll observer with better timing
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationDelay = element.style.animationDelay || '0s';
                    
                    setTimeout(() => {
                        element.classList.add('visible');
                        this.addAnimationClass(element);
                    }, parseFloat(animationDelay) * 1000);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        });
        
        this.scrollElements.forEach(el => scrollObserver.observe(el));
    }
    
    // Parallax effect with performance optimization
    setupParallaxEffects() {
        this.parallaxElements = document.querySelectorAll('.parallax, .hero-visual, .code-preview');
        
        if (this.parallaxElements.length === 0) return;
        
        // Use RAF for smooth parallax
        const updateParallax = () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    
                    this.parallaxElements.forEach((element, index) => {
                        const speed = element.dataset.parallaxSpeed || 0.5;
                        const yPos = -(scrolled * speed);
                        const rotation = scrolled * 0.02;
                        
                        if (element.classList.contains('hero-visual')) {
                            element.style.transform = `translateY(${yPos * 0.3}px) rotateY(${rotation}deg)`;
                        } else if (element.classList.contains('code-preview')) {
                            element.style.transform = `translateY(${yPos * 0.2}px) rotateX(${rotation * 0.5}deg)`;
                        } else {
                            element.style.transform = `translateY(${yPos}px)`;
                        }
                    });
                    
                    this.ticking = false;
                });
                this.ticking = true;
            }
        };
        
        window.addEventListener('scroll', updateParallax, { passive: true });
    }
    
    // Animated counters for statistics
    setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const content = entry.target.textContent.trim();

            if (entry.isIntersecting) {
                // Special case: contains a slash
                if (content.includes('/')) {
                    const parts = content.split('/'); // ["7", "7"]
                    const targetNumber = parseInt(parts[0]);
                    let start = 0;
                    const duration = 1000;
                    const increment = targetNumber / (duration / 16);

                    const interval = setInterval(() => {
                        start += increment;
                        if (start >= targetNumber) {
                            start = targetNumber;
                            clearInterval(interval);
                        }
                        entry.target.textContent = Math.floor(start) + '/' + parts[1];
                    }, 16);

                } else {
                    // Normal animation for numeric stats (existing code)
                    this.animateCounter(entry.target);
                }

                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}


    
    // Progress bar animations for skills
    setupProgressBarAnimations() {
        const progressBars = document.querySelectorAll('.skill-fill');
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.dataset.skill;
                    this.animateProgressBar(progressBar, targetWidth);
                    progressObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.3 });
        
        progressBars.forEach(bar => progressObserver.observe(bar));
    }
    
    // Text reveal animations
    setupTextRevealAnimations() {
        const textElements = document.querySelectorAll('.text-reveal, .hero-title .title-line');
        
        textElements.forEach((element, index) => {
            const text = element.textContent;
            element.innerHTML = '';
            
            // Split text into spans for individual letter animation
            text.split('').forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.opacity = '0';
                span.style.transform = 'translateY(50px) rotateX(90deg)';
                span.style.transition = `all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) ${(charIndex * 0.03)}s`;
                element.appendChild(span);
            });
            
            // Trigger animation when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.revealText(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
        });
    }
    
    // Mouse follow animations for interactive elements (disabled)
    setupMouseFollowAnimations() {
        // Disabled for minimal Apple-style design
    }
    
    // Bind events for animation triggers
    bindEvents() {
        // Form animations
        this.setupFormAnimations();
        
        // Button hover effects
        this.setupButtonAnimations();
        
        // Navigation animations
        this.setupNavigationAnimations();
        
        // Loading animations
        this.setupLoadingAnimations();
    }
    
    // Form field animations
    setupFormAnimations() {
        const formFields = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
        
        formFields.forEach(field => {
            field.addEventListener('focus', () => {
                field.parentElement.classList.add('focused');
                this.createFocusRipple(field);
            });
            
            field.addEventListener('blur', () => {
                if (!field.value) {
                    field.parentElement.classList.remove('focused');
                }
            });
            
            field.addEventListener('input', () => {
                if (field.value) {
                    field.parentElement.classList.add('has-content');
                } else {
                    field.parentElement.classList.remove('has-content');
                }
            });
        });
    }
    
    // Enhanced button animations
    setupButtonAnimations() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-link');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.createHoverEffect(button);
            });
            
            button.addEventListener('click', (e) => {
                this.createClickRipple(e, button);
            });
        });
    }
    
    // Navigation smooth animations
    setupNavigationAnimations() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    this.smoothScrollToSection(targetId);
                }
            });
        });
    }
    
    // Loading state animations
    setupLoadingAnimations() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            this.animateLoadingScreen(loadingScreen);
        }
    }
    
    // Animation helper methods
    triggerAnimation(element, animationType) {
        element.classList.add('animate-' + animationType);
        
        // Add stagger effect for grouped elements
        if (element.parentElement.classList.contains('stagger-parent')) {
            const siblings = Array.from(element.parentElement.children);
            const index = siblings.indexOf(element);
            element.style.animationDelay = `${index * 0.1}s`;
        }
    }
    
    addAnimationClass(element) {
        const animationClasses = ['bounce-in', 'slide-in-up', 'fade-in-scale'];
        const randomClass = animationClasses[Math.floor(Math.random() * animationClasses.length)];
        
        element.classList.add(randomClass);
        
        // Remove class after animation completes
        setTimeout(() => {
            element.classList.remove(randomClass);
        }, 1000);
    }
    
    animateCounter(counterElement) {
        const target = parseInt(counterElement.textContent.replace(/[^\d]/g, ''));
        const suffix = counterElement.textContent.replace(/[\d.,]/g, '');
        let current = 0;
        const increment = target / 60; // 60 frames for 1 second
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counterElement.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counterElement.textContent = target + suffix;
            }
        };
        
        updateCounter();
    }
    
    animateProgressBar(progressBar, targetWidth) {
        let currentWidth = 0;
        const increment = targetWidth / 60;
        
        const updateProgress = () => {
            currentWidth += increment;
            if (currentWidth < targetWidth) {
                progressBar.style.width = currentWidth + '%';
                requestAnimationFrame(updateProgress);
            } else {
                progressBar.style.width = targetWidth + '%';
            }
        };
        
        setTimeout(updateProgress, 500);
    }
    
    revealText(textElement) {
        const spans = textElement.querySelectorAll('span');
        spans.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0) rotateX(0deg)';
        });
    }
    
    createFocusRipple(field) {
        const ripple = document.createElement('div');
        ripple.className = 'focus-ripple';
        field.parentElement.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    createHoverEffect(button) {
        const effect = document.createElement('div');
        effect.className = 'hover-effect';
        button.appendChild(effect);
        
        setTimeout(() => effect.remove(), 300);
    }
    
    createClickRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    smoothScrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const targetPosition = targetElement.offsetTop - 72;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutQuart(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        
        requestAnimationFrame(animation);
    }
    
    animateLoadingScreen(loadingScreen) {
        const logo = loadingScreen.querySelector('.loading-logo');
        const spinner = loadingScreen.querySelector('.loading-spinner');
        
        // Animate logo
        logo.style.animation = 'pulse 1s ease-in-out infinite alternate';
        
        // Custom spinner animation
        let rotation = 0;
        const rotateSpinner = () => {
            rotation += 5;
            spinner.style.transform = `rotate(${rotation}deg)`;
            if (!loadingScreen.classList.contains('hidden')) {
                requestAnimationFrame(rotateSpinner);
            }
        };
        rotateSpinner();
    }
    
    // Easing function for smooth scrolling
    easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }
    
    // Public methods for external control
    playAnimation(element, animationType, options = {}) {
        const { delay = 0, duration = 600, easing = 'ease-out' } = options;
        
        setTimeout(() => {
            element.style.transition = `all ${duration}ms ${easing}`;
            this.triggerAnimation(element, animationType);
        }, delay);
    }
    
    pauseAllAnimations() {
        document.body.style.animationPlayState = 'paused';
    }
    
    resumeAllAnimations() {
        document.body.style.animationPlayState = 'running';
    }
    
    // Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.animationQueue = [];
    }
}

// Floating Elements Animation
class FloatingElementsController {
    constructor() {
        this.elements = [];
        this.isActive = true;
        this.init();
    }
    
    init() {
        this.createFloatingElements();
        this.startAnimation();
    }
    
    createFloatingElements() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        // Create floating geometric shapes
        for (let i = 0; i < 5; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.style.cssText = `
                position: absolute;
                width: ${Math.random() * 100 + 50}px;
                height: ${Math.random() * 100 + 50}px;
                background: linear-gradient(45deg, 
                    rgba(0, 122, 255, 0.1), 
                    rgba(88, 86, 214, 0.1));
                border-radius: ${Math.random() > 0.5 ? '50%' : '20%'};
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                pointer-events: none;
                z-index: 0;
            `;
            
            heroSection.appendChild(element);
            this.elements.push({
                element,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 2
            });
        }
    }
    
    startAnimation() {
        const animate = () => {
            if (!this.isActive) return;
            
            this.elements.forEach(item => {
                item.x += item.speedX;
                item.y += item.speedY;
                item.rotation += item.rotationSpeed;
                
                // Bounce off edges
                if (item.x <= 0 || item.x >= window.innerWidth) item.speedX *= -1;
                if (item.y <= 0 || item.y >= window.innerHeight) item.speedY *= -1;
                
                item.element.style.transform = `
                    translate(${item.x}px, ${item.y}px) 
                    rotate(${item.rotation}deg)
                `;
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    stop() {
        this.isActive = false;
    }
    
    destroy() {
        this.stop();
        this.elements.forEach(item => item.element.remove());
        this.elements = [];
    }
}

// Mouse Trail Effect
class MouseTrailController {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 20;
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.addTrailPoint(e.clientX, e.clientY);
        });
        
        this.animate();
    }
    
    addTrailPoint(x, y) {
        const point = document.createElement('div');
        point.className = 'mouse-trail-point';
        point.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            opacity: 1;
            transform: scale(1);
            transition: all 0.3s ease-out;
        `;
        
        document.body.appendChild(point);
        this.trail.push(point);
        
        if (this.trail.length > this.maxTrailLength) {
            const oldPoint = this.trail.shift();
            oldPoint.remove();
        }
    }
    
    animate() {
        this.trail.forEach((point, index) => {
            const life = index / this.trail.length;
            point.style.opacity = life;
            point.style.transform = `scale(${life})`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize all animation controllers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        window.animationController = new AnimationController();
        window.floatingElements = new FloatingElementsController();
        
        // Only add mouse trail on desktop
        if (window.innerWidth > 768) {
            window.mouseTrail = new MouseTrailController();
        }
    }
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (window.animationController) window.animationController.destroy();
        if (window.floatingElements) window.floatingElements.destroy();
    });
});

// Export for external use
window.AnimationController = AnimationController;
window.FloatingElementsController = FloatingElementsController;
window.MouseTrailController = MouseTrailController;
