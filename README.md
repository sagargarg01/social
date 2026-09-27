# Social Arrow website

A single-page site built with plain HTML, Tailwind CSS (Play CDN) and vanilla JavaScript. Icons are inline SVGs, so there is nothing to install or build.

## Files

- `index.html` – the page
- `styles.css` – component styles (FAQ, form, cards)
- `script.js` – mobile menu, FAQ, service chips, contact form
- `assets/` – favicon; put your images here

## Run locally

Open `index.html` in a browser, or run `npx serve .` in this folder.

## Connect the contact form

GitHub Pages can't process forms, so the form posts to Formspree (free tier available):

1. Sign up at https://formspree.io and create a form.
2. Copy its ID (looks like `xyzabcd`).
3. In `index.html`, replace `YOUR_FORM_ID` in the form's `action` URL.

## Things to replace

Search `index.html` for `[` to find every placeholder: stats, city, team names and photos, campaign visuals, Instagram handle, cancellation terms. Also update the phone number, WhatsApp link (`wa.me/<number>`) and social profile URLs.
