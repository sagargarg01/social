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

// Contact form -> Google Sheet + email alert (Google Apps Script web app)
// Paste your Web app URL here (see apps-script/README.md):
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzj4KBQbDS5Lo_S1EPUdy63BAajGnOGhapcxbwVkSj8gdxOPBFMrjugE82wOp6MApxB/exec';

const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
const defaultStatus = statusEl.textContent;

function setStatus(text, tone) {
  statusEl.textContent = text;
  statusEl.style.color = tone === 'error' ? '#B8341C' : tone === 'success' ? '#1F7A4D' : '';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  if (!FORM_ENDPOINT.startsWith('https://script.google.com/')) {
    setStatus('Form not connected yet: add your Google Apps Script URL in script.js.', 'error');
    return;
  }

  syncServices();
  submitBtn.disabled = true;
  setStatus('Sending…');

  try {
    // URL-encoded body keeps this a "simple" request, so the browser
    // doesn't need extra permission (CORS preflight) from Google.
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: new URLSearchParams(new FormData(form))
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Request failed');

    form.reset();
    chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
    syncServices();
    setStatus('Message sent. We\u2019ll reply within 24 hours.', 'success');
  } catch (err) {
    setStatus(
      err.message && err.message !== 'Request failed' && !err.message.startsWith('Failed')
        ? err.message
        : 'Message not sent. Try again, or email udit.thapa@socialarrow.media.',
      'error'
    );
  } finally {
    submitBtn.disabled = false;
  }
});

form.addEventListener('input', () => {
  if (statusEl.style.color === 'rgb(184, 52, 28)') setStatus(defaultStatus);
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
