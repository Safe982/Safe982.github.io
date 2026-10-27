# Ayan Safe · Personal portfolio

A warm, dark pixel-art portfolio for Ayan Safe, a UMass Amherst honors student studying computer science with a minor in economics.

Website address: https://safe982.github.io/

## Edit the website

- `index.html`: page text, experience entries, contact links, and section structure.
- `styles.css`: colors, pixel typography, layouts, responsive rules, and animations.
- `script.js`: page navigation, photo galleries, interactive markers, image viewer, and email-copy behavior.
- `assets/`: artwork, car photographs, Bulldog Pathways screenshot, locally served fonts, favicon, and font licenses.

The site uses plain HTML, CSS, and JavaScript. There are no dependencies, build steps, API keys, paid hosting services, or database requirements.

## GitHub Pages

Publishing source: **main branch, /(root)**, configured in **Settings → Pages**. Pushes to the main branch update the website through GitHub Pages. The `.nojekyll` file keeps the site static.

For a local preview, run `python3 -m http.server 8000` in this folder and open `http://localhost:8000`.

The hash routes work on static hosting without rewrite rules: `#home`, `#experience`, `#projects/car`, `#projects/bulldog`, and `#contact`.

## Assets and content

See `ASSET_NOTES.md` for the supplied asset mapping and content sources. Pixelify Sans and DM Sans are self-hosted under the included SIL Open Font Licenses. The résumé PDF and phone number are not part of this website.
