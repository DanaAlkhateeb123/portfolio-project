const menuButton = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');
const navLinks = [...document.querySelectorAll('.nav-link')];

const staggerContainers = [
  '.hero-copy', '.section-heading', '.about-copy', '.about-card',
  '.journey-column', '.skill-chips', '.project-body', '.reference-card', '.contact-shell'
];

staggerContainers.forEach((selector) => {
  document.querySelectorAll(selector).forEach((container) => {
    [...container.children].forEach((item, index) => {
      item.classList.add('reveal');
      item.style.setProperty('--reveal-delay', `${index * 110}ms`);
    });
  });
});

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
}));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const activeId = entry.target.id === 'experience' ? 'qualifications' : entry.target.id;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });

document.querySelectorAll('main section[id], #experience').forEach((section) => sectionObserver.observe(section));
document.querySelector('#year').textContent = new Date().getFullYear();
