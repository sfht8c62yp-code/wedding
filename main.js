// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

menuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('is-open');
  menuBtn.classList.toggle('is-active');
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    menuBtn.classList.remove('is-active');
  });
});

// Header scroll state
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 40);
  lastScroll = y;
}, { passive: true });

// Scroll fade-in
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset.delay) || 0;
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

fadeEls.forEach((el) => observer.observe(el));

// FAQ smooth accordion
document.querySelectorAll('.faq__item').forEach((item) => {
  const answer = item.querySelector('.faq__answer');
  if (!answer) return;

  item.addEventListener('toggle', () => {
    if (item.open) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = '0';
    }
  });
});

// Hero parallax on mouse move (desktop only)
const heroVisual = document.getElementById('heroVisual');
const heroPhone = document.getElementById('heroPhone');

if (heroVisual && window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches) {
  heroVisual.addEventListener('mousemove', (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (heroPhone) {
      heroPhone.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
    }

    heroVisual.querySelectorAll('[data-depth]').forEach((el) => {
      const depth = parseFloat(el.dataset.depth) || 0.04;
      el.style.transform = `translate(${x * depth * 200}px, ${y * depth * 200}px)`;
    });
  });

  heroVisual.addEventListener('mouseleave', () => {
    if (heroPhone) heroPhone.style.transform = '';
    heroVisual.querySelectorAll('[data-depth]').forEach((el) => {
      el.style.transform = '';
    });
  });
}

// Stories horizontal scroll drag hint
const storiesScroll = document.getElementById('storiesScroll');

if (storiesScroll) {
  let isDown = false;
  let startX;
  let scrollLeft;

  storiesScroll.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - storiesScroll.offsetLeft;
    scrollLeft = storiesScroll.scrollLeft;
    storiesScroll.style.cursor = 'grabbing';
  });

  storiesScroll.addEventListener('mouseleave', () => {
    isDown = false;
    storiesScroll.style.cursor = '';
  });

  storiesScroll.addEventListener('mouseup', () => {
    isDown = false;
    storiesScroll.style.cursor = '';
  });

  storiesScroll.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - storiesScroll.offsetLeft;
    const walk = (x - startX) * 1.2;
    storiesScroll.scrollLeft = scrollLeft - walk;
  });
}
