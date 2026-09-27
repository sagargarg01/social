// Mobile menu
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const openIcon = document.getElementById('menu-open-icon');
const closeIcon = document.getElementById('menu-close-icon');

function setMenu(open) {
  mobileMenu.classList.toggle('hidden', !open);
  openIcon.classList.toggle('hidden', open);
  closeIcon.classList.toggle('hidden', !open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
menuBtn.addEventListener('click', () => setMenu(mobileMenu.classList.contains('hidden')));
mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

// FAQ: keep only one answer open at a time
const faqs = document.querySelectorAll('#faq-list details');
faqs.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) faqs.forEach((other) => { if (other !== item) other.open = false; });
  });
});

// Service chips -> hidden input
const chips = document.querySelectorAll('#chips .chip');
const servicesInput = document.getElementById('services-input');
function syncServices() {
  servicesInput.value = [...chips]
    .filter((c) => c.getAttribute('aria-pressed') === 'true')
    .map((c) => c.textContent.trim())
    .join(', ');
}
chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const on = chip.getAttribute('aria-pressed') === 'true';
    chip.setAttribute('aria-pressed', String(!on));
    syncServices();
  });
});

// Contact form (Formspree, submitted without leaving the page)
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (form.action.includes('YOUR_FORM_ID')) {
    statusEl.textContent = 'Form not connected yet: add your Formspree ID in index.html.';
    statusEl.style.color = '#B8341C';
    return;
  }

  submitBtn.disabled = true;
  statusEl.textContent = 'Sending…';
  statusEl.style.color = '';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (!res.ok) throw new Error('Request failed');
    form.reset();
    chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
    syncServices();
    statusEl.textContent = 'Message sent. We\u2019ll reply within 24 hours.';
    statusEl.style.color = '#1F7A4D';
  } catch (err) {
    statusEl.textContent = 'Message not sent. Check your connection and try again, or email hello@socialarrow.com.';
    statusEl.style.color = '#B8341C';
  } finally {
    submitBtn.disabled = false;
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
