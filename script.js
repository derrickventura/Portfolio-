/* ============================================================
   DERRICK VENTURA PORTFOLIO — script.js
   ------------------------------------------------------------
   TABLE OF CONTENTS
   1. Custom cursor
   2. Nav scroll effect
   3. Scroll reveal
============================================================ */


/* ── 1. CUSTOM CURSOR ───────────────────────────────────── */

const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Dot follows mouse exactly
  cursor.style.left = mouseX - 5 + 'px';
  cursor.style.top  = mouseY - 5 + 'px';

  // Ring lags behind with lerp
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX - 18 + 'px';
  cursorRing.style.top  = ringY - 18 + 'px';

  requestAnimationFrame(animateCursor);
}

animateCursor();

// Scale up cursor on interactive elements
document.querySelectorAll('a, button').forEach(function (el) {
  el.addEventListener('mouseenter', function () {
    cursor.style.transform     = 'scale(2.5)';
    cursorRing.style.width     = '60px';
    cursorRing.style.height    = '60px';
  });
  el.addEventListener('mouseleave', function () {
    cursor.style.transform     = 'scale(1)';
    cursorRing.style.width     = '36px';
    cursorRing.style.height    = '36px';
  });
});


/* ── 2. NAV SCROLL EFFECT ───────────────────────────────── */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ── 3. SCROLL REVEAL ───────────────────────────────────── */

const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(function (el) {
  revealObserver.observe(el);
});
