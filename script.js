// ============ Typing effect ============
const roles = [
    'Frontend Developer',
    'Backend Developer',
    'Web Developer',
    'Clean Code Advocate'
];

const typedText = document.getElementById('typed-text');

function typeRoles() {
    if (!typedText) return;

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        typedText.textContent = currentRole.substring(0, charIndex);

        if (!deleting) {
            charIndex++;
            if (charIndex > currentRole.length) {
                deleting = true;
                setTimeout(type, 1600);
                return;
            }
            setTimeout(type, 70);
        } else {
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
            setTimeout(type, 40);
        }
    }

    type();
}

typeRoles();

// ============ Navbar scroll effect ============
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (backToTop) {
        if (scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
}

window.addEventListener('scroll', handleScroll);

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============ Active nav link on scroll (scrollspy) ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === '#' + section.id
                );
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ============ Smooth scrolling for nav links ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length <= 1) return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============ Hamburger menu ============
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============ Reveal on scroll ============
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ============ Animate skill bars ============
const skillBars = document.querySelectorAll('.skill-bar-fill');

const barObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.width = bar.dataset.fill;

            const percentLabel = bar.closest('.skill-bar-item').querySelector('.skill-percent');
            if (percentLabel) {
                const targetValue = percentLabel.dataset.value;
                let current = 0;
                const step = () => {
                    current++;
                    percentLabel.textContent = current + '%';
                    if (current < targetValue) {
                        setTimeout(step, 15);
                    }
                };
                step();
            }

            observer.unobserve(bar);
        }
    });
}, { threshold: 0.4 });

skillBars.forEach(bar => {
    barObserver.observe(bar);
});

// ============ Contact form ============
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (name && email && message) {
            alert('Thank you for your message, ' + name + '! I will get back to you soon.');
            contactForm.reset();
        }
    });
}

// ============ Footer year ============
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// ============ Reveal hero elements on load ============
window.addEventListener('load', () => {
    revealElements.forEach((el, index) => {
        if (el.closest('.hero')) {
            setTimeout(() => {
                el.classList.add('visible');
            }, 200 * (index + 1));
        }
    });
});
