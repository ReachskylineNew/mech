// ===================================
// REVOLUTIONARY MECHANICAL ENGINEERING LANDING PAGE
// Interactive Features & Animations
// ===================================

// Smooth scroll functions
function scrollToPrograms() {
    const programs = document.getElementById('programs');
    if (programs) {
        programs.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===================================
// FLOATING ACTION BUTTON
// ===================================

window.addEventListener('scroll', () => {
    const fab = document.getElementById('fabButton');
    if (window.scrollY > 500) {
        fab.classList.add('visible');
    } else {
        fab.classList.remove('visible');
    }
});

// ===================================
// HERO PARTICLES ANIMATION
// ===================================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(245, 158, 11, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 5}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// ===================================
// CIRCULAR PROGRESS ANIMATION
// ===================================

function animateCircularProgress(circle) {
    const progress = parseInt(circle.getAttribute('data-progress'));
    const circumference = 2 * Math.PI * 70;

    // Set initial hidden state
    circle.style.strokeDashoffset = circumference;

    // Animate to target progress
    setTimeout(() => {
        const offset = circumference - (progress / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }, 200);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate circles
            const circles = entry.target.querySelectorAll('.circle-fill');
            circles.forEach(circle => animateCircularProgress(circle));

            // Animate numbers
            const numbers = entry.target.querySelectorAll('.circle-number');
            numbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                animateCounter(num, target);
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-circular');

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// PROGRAMS CAROUSEL
// ===================================


// ===================================
// ACCORDION
// ===================================

function toggleAccordion(element) {
    const wasActive = element.classList.contains('active');

    // Close all accordions
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
    });

    // Open clicked accordion if it wasn't active
    if (!wasActive) {
        element.classList.add('active');
    }
}



const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Create particles
    createParticles();

    // Initialize carousel dots


    // Observe stats section
    const statsSection = document.querySelector('.stats-circular');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Animate sections on scroll
    const sections = document.querySelectorAll('.programs-carousel, .features-modern, .values-timeline, .lab-life-section, .video-demos');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInObserver.observe(section);
    });

    // Animate cards
    const cards = document.querySelectorAll('.carousel-card, .feature-card, .timeline-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        cardObserver.observe(card);
    });

    // Carousel scroll sync
    const carousel = document.getElementById('programsCarousel');
    if (carousel) {
        carousel.addEventListener('scroll', () => {
            const cardWidth = carousel.querySelector('.carousel-card').offsetWidth;
            const gap = 32;
            currentSlide = Math.round(carousel.scrollLeft / (cardWidth + gap));
            updateCarouselDots();
        });
    }
});

// ===================================
// RIPPLE EFFECT ON BUTTONS
// ===================================

document.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===================================
// CONSOLE LOG
// ===================================

console.log('🎓 Department of Mechanical Engineering - Revolutionary Design Loaded');
console.log('✨ Features: Diagonal Hero, Circular Stats, Carousel, Accordion, Timeline, Wizard Form');
console.log('📧 Contact: hodmech@kanchiuniv.ac.in');
console.log('📞 Phone: +91 44 2747 2005');

// ===================================
// ALUMNI CONTINUOUS CAROUSEL
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.alumni-track');
    const wrapper = document.querySelector('.alumni-carousel-wrapper');

    if (!track || !wrapper) return;

    // Double the tracks for seamless loop
    const originalCards = Array.from(track.children);
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    let currentOffset = 0;
    let isPaused = false;
    const scrollSpeed = 0.8; // Smoothness factor

    function animate() {
        if (!isPaused) {
            currentOffset += scrollSpeed;
            const singleTrackWidth = track.scrollWidth / 2;

            if (currentOffset >= singleTrackWidth) {
                currentOffset = 0;
            }

            track.style.transform = 'translateX(-' + currentOffset + 'px)';
        }
        requestAnimationFrame(animate);
    }

    // Interactive controls
    wrapper.addEventListener('mouseenter', () => isPaused = true);
    wrapper.addEventListener('mouseleave', () => isPaused = false);

    // Performance optimization
    track.style.willChange = 'transform';

    animate();
});



