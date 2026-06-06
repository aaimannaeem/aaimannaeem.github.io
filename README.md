# Aaiman Naeem — Portfolio

Personal portfolio site for **Aaiman Naeem**, Product Application Manager (SAP).
Live at **[aaimannaeem.com](https://aaimannaeem.com)**.

A single-page, fully static site — no build step, no dependencies.

## Features

- 🎨 Modern UI: gradient accents, glassmorphism nav, animated background, scroll reveals
- 🌗 Light & dark modes — follows the OS by default, with a manual toggle (remembered via `localStorage`)
- 📱 Fully responsive / mobile-friendly with a slide-down menu
- ♿ Accessible: semantic HTML, skip link, keyboard focus styles, `prefers-reduced-motion` support
- 🔎 SEO-ready: meta + Open Graph tags, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | All page content |
| `styles.css` | Styling + light/dark theme tokens |
| `script.js` | Theme toggle, mobile menu, scroll reveals, stat counters |
| `favicon.svg` | Site icon (AN monogram) |
| `me.png` | Profile photo |
| `Resume_Naeem.pdf` | Downloadable résumé |
| `CNAME` | Custom domain for GitHub Pages |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Run locally

It's plain HTML — just open `index.html` in a browser, or serve it:

```bash
python -m http.server 8080
# then visit http://localhost:8080
```

## Deploy

**GitHub Pages** (already configured): push to the default branch of `aaimannaeem.github.io`.
Settings → Pages → Source: *Deploy from branch* → `main` / root. The `CNAME` keeps the
custom domain.

**Netlify**: drag-and-drop the folder, or connect the repo with **no build command** and
publish directory `/` (the repository root).

## Editing content

All text lives in `index.html`. To change colors, edit the `--accent` / `--accent-2`
variables at the top of `styles.css` (they cascade to both themes).
