/* ============================================================
   CUSTOM CURSOR
============================================================ */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  dotX += (mouseX - dotX) * 0.5;
  dotY += (mouseY - dotY) * 0.5;
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
  ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

const hoverEls = document.querySelectorAll('a, button, .service-card, .product-card, .project-card, .blog-card, .filter-btn');
hoverEls.forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
});

/* ============================================================
   NAVBAR SCROLL
============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ============================================================
   HAMBURGER MENU
============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

/* ============================================================
   SCROLL REVEAL
============================================================ */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ============================================================
   PROJECT FILTER BUTTONS
============================================================ */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ============================================================
   CONTACT FORM
============================================================ */
const contactForm = document.getElementById('contactForm');
const notification = document.getElementById('notification');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  notification.classList.add('show');
  contactForm.reset();
  setTimeout(() => notification.classList.remove('show'), 4000);
});

/* ============================================================
   STATS COUNTER ANIMATION
============================================================ */
function animateCount(el, target, suffix, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.innerHTML = Math.floor(eased * target) + '<span>' + suffix + '</span>';
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      const data = [{ v: 200, s: '+' }, { v: 98, s: '%' }, { v: 47, s: '+' }];
      nums.forEach((el, i) => animateCount(el, data[i].v, data[i].s));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ============================================================
   ACTIVE NAV HIGHLIGHT ON SCROLL
============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const highlightNav = () => {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + section.id) {
          link.style.color = 'var(--blue-mid)';
        }
      });
    }
  });
};

window.addEventListener('scroll', highlightNav);
