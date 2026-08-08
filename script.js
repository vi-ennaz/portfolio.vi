const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
root.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  });
}

const navBurger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

if (navBurger && navLinks) {
  navBurger.addEventListener('click', () => {
    navBurger.classList.toggle('is-open');
    navLinks.classList.toggle('is-open');

    const isOpen = navBurger.classList.contains('is-open');
    navBurger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navBurger.classList.remove('is-open');
      navLinks.classList.remove('is-open');
      navBurger.setAttribute('aria-label', 'Open menu');
    });
  });
}

const phrases = [
  'Cybersecurity Student',
  'Software Developer',
  'Technology Enthusiast',
  'Future Cybersecurity Professional'
];

const typingEl = document.getElementById('typingText');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typingEl) return;

  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingEl.textContent = currentPhrase.substring(0, charIndex);

  let speed = isDeleting ? 45 : 90;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 1600;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeLoop, speed);
}

typeLoop();


const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(element => revealObserver.observe(element));


const skillBars = document.querySelectorAll('.bar__fill');
const barObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-filled');
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

skillBars.forEach(bar => barObserver.observe(bar));

// Stat Counter Animation
const statNumbers = document.querySelectorAll('.hero__stat-num');

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'), 10);
  if (isNaN(target)) return;

  let current = 0;
  const duration = 1200;
  const stepTime = Math.max(Math.floor(duration / target), 20);

  const interval = setInterval(() => {
    current++;
    element.textContent = current;

    if (current >= target) {
      clearInterval(interval);
    }
  }, stepTime);
}

const statObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach(number => statObserver.observe(number));

// Navbar Shadow on Scroll
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
}

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (formStatus) formStatus.textContent = 'Sending...';

    setTimeout(() => {
      if (formStatus) {
        formStatus.textContent = 'Thanks for reaching out! This form is currently a demo.';
      }
      contactForm.reset();
    }, 900);
  });
}
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Particle Canvas Effect
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function getAccentColor() {
    const theme = root.getAttribute('data-theme');
    return theme === 'light' ? '124, 92, 240' : '167, 139, 250';
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 1.6 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.speedY = (Math.random() - 0.5) * 0.25;
      this.opacity = Math.random() * 0.4 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (
        this.x < 0 ||
        this.x > canvas.width ||
        this.y < 0 ||
        this.y > canvas.height
      ) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${getAccentColor()}, ${this.opacity})`;
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    if (window.innerWidth <= 768) return;

    for (let i = 0; i < 60; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  createParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');

    if (targetId === '#') {
      event.preventDefault();
      return;
    }

    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});