// Tailwind theme for the Social Arrow site.
// The workflow compiles this into assets/css/tailwind.css on every deploy.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './script.js'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F2EC',
        ink: '#15140F',
        muted: '#5B584F',
        line: '#DDD8CC',
        field: '#CFC8B8',
        sand: '#EAE5DA',
        stone: '#D8D1C2',
        accent: '#E4472A',
        'accent-dark': '#B8341C',
        night: '#2A2822',
        'night-line': '#4A473E',
        dim: '#A8A395'
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Noto Sans Devanagari"', '"Noto Sans Bengali"', '"Noto Sans Gujarati"', '"DM Sans"', 'sans-serif'],
        sans: ['"DM Sans"', '"Noto Sans Devanagari"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  }
};
