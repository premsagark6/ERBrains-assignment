// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = document.querySelector('.header').offsetHeight;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Header Scroll Effect =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Add scrolled class
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Mobile Navigation Toggle =====
const mobileNavToggle = document.getElementById('mobileNavToggle');
const navMenu = document.getElementById('navMenu');

if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        document.body.classList.toggle('mobile-nav-active');
    });
}

// Close mobile nav when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('mobile-nav-active');
    });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (navLink) {
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isDecimal = target % 1 !== 0;

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = isDecimal ? start.toFixed(1) : Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = isDecimal ? target.toFixed(1) : target;
        }
    }

    updateCounter();
}

// Start counter animation when stats section is visible
const statsSection = document.querySelector('.hero-stats');
let statsAnimated = false;

function checkStatsVisibility() {
    if (!statsSection || statsAnimated) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        statsAnimated = true;
        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            animateCounter(stat, target);
        });
    }
}

window.addEventListener('scroll', checkStatsVisibility);
window.addEventListener('load', checkStatsVisibility);

// ===== Customer Grid Animation =====
const customerLogos = document.querySelectorAll('.customer-logo');

if (customerLogos.length > 0) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const customerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                customerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    customerLogos.forEach((logo, index) => {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';
        logo.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        customerObserver.observe(logo);
    });
}

// ===== Back to Top Button =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());

        // Show success message (in production, send to server)
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// ===== Newsletter Form Handling =====
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');

        if (emailInput && emailInput.value) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
});

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.querySelectorAll('.service-card, .choose-item, .timeline-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// ===== Staggered animation for service cards =====
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});



// ===== Smooth Page Load =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Parallax Effect for Hero Section =====
const heroSection = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    if (!heroSection || !heroContent) return;

    const scrolled = window.scrollY;
    const heroHeight = heroSection.offsetHeight;

    if (scrolled < heroHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.8;
    }
});

// ===== Dropdown Menu for Mobile =====
document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;
            if (dropdownMenu) {
                dropdownMenu.style.display =
                    dropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        }
    });
});

console.log('ERBrains Website - Loaded Successfully');

// ===== Hero Carousel =====
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.transform = 'translateY(30px)';
    });

    heroSlides[index].classList.add('active');
    setTimeout(() => {
        heroSlides[index].style.opacity = '1';
        heroSlides[index].style.transform = 'translateY(0)';
    }, 50);
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
}

// Initialize carousel
if (heroSlides.length > 0) {
    showSlide(0);
    startAutoSlide();
}

// ===== Floating Chat Popups =====
document.addEventListener('DOMContentLoaded', function () {
    console.log('Floating buttons script loaded');

    const chatBtn = document.getElementById('chatBtn');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const chatPopup = document.getElementById('chatPopup');
    const whatsappPopup = document.getElementById('whatsappPopup');
    const closeChat = document.getElementById('closeChat');
    const closeWhatsapp = document.getElementById('closeWhatsapp');

    console.log('Elements found:', { chatBtn, whatsappBtn, chatPopup, whatsappPopup });

    // Chat button - directly show popup
    if (chatBtn && chatPopup) {
        chatBtn.addEventListener('click', function (e) {
            console.log('Chat button clicked');
            e.preventDefault();
            e.stopPropagation();
            chatPopup.classList.toggle('active');
            console.log('Chat popup active:', chatPopup.classList.contains('active'));
            if (whatsappPopup) {
                whatsappPopup.classList.remove('active');
            }
        });
    }

    // WhatsApp button - directly show popup
    if (whatsappBtn && whatsappPopup) {
        whatsappBtn.addEventListener('click', function (e) {
            console.log('WhatsApp button clicked');
            e.preventDefault();
            e.stopPropagation();
            whatsappPopup.classList.toggle('active');
            console.log('WhatsApp popup active:', whatsappPopup.classList.contains('active'));
            if (chatPopup) {
                chatPopup.classList.remove('active');
            }
        });
    }

    // Close buttons
    if (closeChat && chatPopup) {
        closeChat.addEventListener('click', function () {
            chatPopup.classList.remove('active');
        });
    }

    if (closeWhatsapp && whatsappPopup) {
        closeWhatsapp.addEventListener('click', function () {
            whatsappPopup.classList.remove('active');
        });
    }

    // Close popup when clicking outside
    document.addEventListener('click', function (e) {
        if (chatPopup && whatsappPopup) {
            const chatFloat = document.querySelector('.chat-float');
            const whatsappFloat = document.querySelector('.whatsapp-float');

            if (chatFloat && !chatFloat.contains(e.target)) {
                chatPopup.classList.remove('active');
            }
            if (whatsappFloat && !whatsappFloat.contains(e.target)) {
                whatsappPopup.classList.remove('active');
            }
        }
    });
});

// ===== Chat Form Submission =====
const chatForm = document.getElementById('chatForm');
if (chatForm) {
    chatForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = chatForm.querySelector('input[type="text"]').value;
        const email = chatForm.querySelector('input[type="email"]').value;
        const phone = chatForm.querySelector('input[type="tel"]').value;
        const message = chatForm.querySelector('textarea').value;

        // Create mailto link
        const subject = encodeURIComponent('New Chat Message from ' + name);
        const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\n\nMessage:\n' + message);

        // Open email client
        window.location.href = 'mailto:info@erbrains.com?subject=' + subject + '&body=' + body;

        // Show success message
        alert('Thank you! Your message has been prepared. Please send it from your email client.');

        // Reset form
        chatForm.reset();

        // Close popup
        const chatPopup = document.getElementById('chatPopup');
        if (chatPopup) {
            chatPopup.classList.remove('active');
        }
    });
}
