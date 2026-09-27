# Social Arrow

Website and brand assets for Social Arrow Media.

```
index.html            the website (root level)
styles.css            custom component styles
script.js
tailwind.config.js    colours and fonts for Tailwind
tailwind.input.css    Tailwind source (compiled into assets/css/tailwind.css)
assets/
  css/tailwind.css    compiled Tailwind styles (rebuilt automatically on deploy)
  icons/              favicon and home-screen icon
  images/             your campaign and team photos go here
  og-image.png        preview image when the link is shared
apps-script/          Google Sheet + email handler for the contact form (not published)
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
- **Contact form:** enquiries go to a Google Sheet and email alert. One-time setup is in `apps-script/README.md`; then paste the Web app URL into `FORM_ENDPOINT` at the top of `script.js`.
- **Placeholders left:** search `index.html` for `>[` or `“[`: brands served and cities activated counts, campaign visuals, testimonials, team names, roles and photos.

## Brand kit

See `brand-kit/README.md` for which logo to use where, plus colours and fonts.

## Styles (Tailwind)

The page uses a compiled Tailwind stylesheet, `assets/css/tailwind.css`. The deploy workflow rebuilds it on every push, so you can edit classes in `index.html` directly on GitHub and the live site stays correct.

The committed copy is for previewing locally. To refresh it after editing classes on your computer, run:

```
npx tailwindcss@3.4.19 -c ./tailwind.config.js -i ./tailwind.input.css -o ./assets/css/tailwind.css --minify
```
