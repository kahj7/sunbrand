# sunbrand

Portfolio website of Karen Janssen – sunlightbrand.de.
Plain HTML, CSS and a small script. No CMS, no build step.

## Structure
- `index.html` – home: profile, six case studies, archive (with image galleries)
- `slide/<case-study>/index.html` – case-study pages (same addresses as the old WordPress site)
- `assets/img` – images · `assets/video` – videos · `assets/fonts` – Fira Sans (self-hosted) · `assets/js/site.js` – menu, gallery, slide dots

## Preview locally
Run `python3 -m http.server` in this folder and open http://localhost:8000.

## Publish
GitHub Pages serves the `main` branch. Every change merged into `main` goes live.
