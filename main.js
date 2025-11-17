// Generate particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = (Math.random() * 3 + 1) + 'px';
    particle.style.height = particle.style.width;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (20 + Math.random() * 10) + 's';
    particlesContainer.appendChild(particle);
}

// Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Services
const servicesSection = document.querySelector('.services');
const serviceCards = document.querySelectorAll('.service-card');
let servicesRevealed = false;

const revealServices = () => {
    if (servicesRevealed) return;
    const servicesTop = servicesSection.getBoundingClientRect().top;
    if (servicesTop < window.innerHeight * 0.7) {
        servicesSection.classList.add('visible');
        serviceCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 300);
        });
        servicesRevealed = true;
    }
};

// About mask
const aboutContainer = document.getElementById('aboutContainer');
const aboutSection = document.querySelector('.about-section');
let aboutRevealed = false;

const revealAbout = () => {
    if (aboutRevealed) return;
    const sectionTop = aboutSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight * 0.6) {
        aboutContainer.classList.add('active');
        aboutRevealed = true;
    }
};

// Process
const processSteps = document.querySelectorAll('.process-step');
let processRevealed = false;

const revealProcess = () => {
    if (processRevealed) return;
    processSteps.forEach((step, index) => {
        const stepTop = step.getBoundingClientRect().top;
        if (stepTop < window.innerHeight * 0.8) {
            setTimeout(() => {
                step.classList.add('animate-in');
            }, index * 300);
            processRevealed = true;
        }
    });
};

// Contact
const contactSection = document.querySelector('.contact');
let contactRevealed = false;

const revealContact = () => {
    if (contactRevealed) return;
    const contactTop = contactSection.getBoundingClientRect().top;
    if (contactTop < window.innerHeight * 0.7) {
        contactSection.classList.add('visible');
        contactRevealed = true;
    }
};

// Scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            revealServices();
            revealAbout();
            revealProcess();
            revealContact();
            ticking = false;
        });
        ticking = true;
    }
});

// Initial check
window.addEventListener('load', () => {
    revealServices();
    revealAbout();
    revealProcess();
    revealContact();
});

// Hover effects
const interactiveElements = document.querySelectorAll('a, .service-card, button, .cta-button');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '14px';
        cursor.style.height = '14px';
        cursor.style.background = 'var(--accent-gold)';
        follower.style.width = '70px';
        follower.style.height = '70px';
        follower.style.borderColor = 'rgba(212, 175, 55, 0.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        cursor.style.background = 'var(--accent)';
        follower.style.width = '40px';
        follower.style.height = '40px';
        follower.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});