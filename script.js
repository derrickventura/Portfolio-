/* ============================================================
   DERRICK VENTURA PORTFOLIO — script.js
   ------------------------------------------------------------
   TABLE OF CONTENTS
   1. Custom cursor        — dot + lagging ring follow mouse
   2. Nav scroll effect    — adds backdrop on scroll
   3. Scroll reveal        — fades elements in on scroll
============================================================ */


/* ── 1. CUSTOM CURSOR ───────────────────────────────────── */
/* A small dot follows the mouse exactly.                    */
/* A larger ring lags behind using linear interpolation.     */
/* Both are hidden on mobile via CSS (cursor: auto).         */

const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0; // current mouse position
let ringX  = 0, ringY  = 0; // ring position (lerped)

document.addEventListener('mousemove', function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Dot snaps directly to mouse
  cursor.style.left = mouseX - 5 + 'px';
  cursor.style.top  = mouseY - 5 + 'px';

  // Ring lerps toward mouse at 12% per frame — creates lag effect
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX - 18 + 'px';
  cursorRing.style.top  = ringY - 18 + 'px';

  requestAnimationFrame(animateCursor);
}

animateCursor();

// Scale up cursor when hovering interactive elements
document.querySelectorAll('a, button').forEach(function (el) {
  el.addEventListener('mouseenter', function () {
    cursor.style.transform  = 'scale(2.5)';
    cursorRing.style.width  = '60px';
    cursorRing.style.height = '60px';
  });
  el.addEventListener('mouseleave', function () {
    cursor.style.transform  = 'scale(1)';
    cursorRing.style.width  = '36px';
    cursorRing.style.height = '36px';
  });
});


/* ── 2. NAV SCROLL EFFECT ───────────────────────────────── */
/* Adds "scrolled" class to nav when user scrolls past 40px */
/* CSS uses this class to apply a dark blurred background   */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ── 3. SCROLL REVEAL ───────────────────────────────────── */
/* Elements with class "reveal" start invisible (opacity 0) */
/* IntersectionObserver adds "visible" class when they enter*/
/* the viewport — CSS transition handles the animation.     */
/* threshold: 0.12 means 12% of the element must be visible */

const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // stop watching once revealed
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(function (el) {
  revealObserver.observe(el);
});

/* ── 4. CONTACT FORM — AJAX SUBMISSION ──────────────────── */
/* Intercepts the form submit, sends it to Formspree via     */
/* fetch() in the background, then shows a success message   */
/* without ever leaving or reloading the page.               */

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // stop normal form submit

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(function (response) {
      if (response.ok) {
        // Hide the form and show success message
        contactForm.innerHTML = `
          <div class="form-success">
            <p class="form-success-icon">✓</p>
            <p class="form-success-title">Message sent!</p>
            <p class="form-success-sub">I'll get back to you soon.</p>
          </div>
        `;
      } else {
        alert('Something went wrong. Please try again.');
      }
    })
    .catch(function () {
      alert('Something went wrong. Please check your connection and try again.');
    });
  });
}