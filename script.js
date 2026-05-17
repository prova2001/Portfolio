/* ══════════════════════════════════════════
   NAVIGATION — mobile menu + scroll effects
══════════════════════════════════════════ */
const menuIcon = document.querySelector('#menu_icon');
const navbar   = document.querySelector('.navbar');
const header   = document.querySelector('#header');
const backTop  = document.querySelector('#backTop');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// Close on link click
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  // Sticky header
  header.classList.toggle('scrolled', window.scrollY > 60);

  // Back-to-top button
  backTop.classList.toggle('show', window.scrollY > 400);

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.pageYOffset + 120;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.navbar a[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
  });

  // Trigger reveal & skill bars
  revealElements();
  animateStats();
  animateSkillBars();
});

/* ══════════════════════════════════════════
   TYPED.JS
══════════════════════════════════════════ */
new Typed('.multiple-text', {
  strings: [ 'Junior Web Developer','Online & Visual Representative', 'Web Designer', 'CSE Student','YouTuber'],
  typeSpeed: 75,
  backSpeed: 60,
  backDelay: 1400,
  loop: true,
});

/* ══════════════════════════════════════════
   REVEAL ON SCROLL
══════════════════════════════════════════ */
function revealElements() {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      setTimeout(() => el.classList.add('visible'), i * 80);
    }
  });
}
revealElements(); // run once on load

/* ══════════════════════════════════════════
   STATS COUNTER
══════════════════════════════════════════ */
let statsDone = false;
function animateStats() {
  if (statsDone) return;
  const bar = document.querySelector('.stats-bar');
  if (!bar) return;
  const rect = bar.getBoundingClientRect();
  if (rect.top > window.innerHeight) return;

  statsDone = true;
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    let current  = 0;
    const step   = Math.ceil(target / 40);
    const timer  = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target; clearInterval(timer); }
      else el.textContent = current;
    }, 40);
  });
}

/* ══════════════════════════════════════════
   SKILL BAR ANIMATION
══════════════════════════════════════════ */
let skillsDone = false;
function animateSkillBars() {
  if (skillsDone) return;
  const section = document.querySelector('.skills');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top > window.innerHeight - 100) return;

  skillsDone = true;
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const w = bar.dataset.width;
    setTimeout(() => { bar.style.width = w + '%'; }, 300);
  });
}

/* ══════════════════════════════════════════
   CONTACT FORM — simple submit feedback
══════════════════════════════════════════ */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#00c9a7';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = 'Send Message <i class="bx bx-send"></i>';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}
