# Social Arrow

Website and brand assets for Social Arrow Media.

```
index.html            the website (root level)
styles.css
script.js
assets/
  icons/              favicon and home-screen icon
  images/             your campaign and team photos go here
  og-image.png        preview image when the link is shared
brand-kit/            logos, colours and fonts (kept in the repo, not published)
  README.md
  logo/
    horizontal/  wordmark/  stacked/  mark/
.github/workflows/
  static.yml          deploys the website files on every push to main
```

## Publishing

GitHub Pages must be set to **Settings › Pages › Source: GitHub Actions**. Every push to `main` then redeploys the site automatically. If you add a new top-level file or folder the website needs, also add it to the "Collect website files" step in the workflow.

## Editing the website

- **Photos:** put them in `assets/images/` (compress first, under ~150 KB each, e.g. with squoosh.app), then point the matching `src` in `index.html` at them, e.g. `src="assets/images/jaipur.jpg"`. Comments in the HTML mark each spot.
- **Contact form:** create a free form at https://formspree.io and replace `YOUR_FORM_ID` in the form's `action` in `index.html`.
- **Placeholders left:** search `index.html` for `>[` or `“[`: brands served and cities activated counts, campaign visuals, testimonials, team names, roles and photos.

## Brand kit

See `brand-kit/README.md` for which logo to use where, plus colours and fonts.
