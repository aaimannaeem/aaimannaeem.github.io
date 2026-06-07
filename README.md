# Aaiman Naeem — Portfolio

This is my personal portfolio site. I'm **Aaiman Naeem**, a Product Application Manager (SAP)
based in Munich, and this repo is the source for my site, live at
**[aaimannaeem.com](https://aaimannaeem.com)**.

I built it as a single-page, fully static site — **everything lives in one self-contained
`index.html`** (HTML, CSS and JavaScript all inlined). No build step, no dependencies, nothing
to install.

The page walks through: hero · about (focus cards) · experience (timeline) · skills ·
projects · certifications · education & languages · contact.

## What I packed in

- 🎨 Modern UI: gradient accents, glassmorphism nav, hero glow + grid, floating photo, scroll reveals, animated counters & language bars
- 🌗 Light & dark modes — follows the OS by default, with a manual toggle I remember via `localStorage`
- 📱 Fully responsive / mobile-friendly with a slide-down menu
- ♿ Accessible: semantic HTML, skip link, keyboard focus styles, `prefers-reduced-motion` support
- 🔎 SEO-ready: meta + Open Graph tags, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`
- 📜 Certifications link out to their verifiable credentials (Credly / LinkedIn Learning / SCRUMstudy) or to PDFs I keep in `certificates/`

## How it's organized

| File / folder | Purpose |
| --- | --- |
| `index.html` | The entire site — page content, inlined `<style>` (light/dark theme tokens) and inlined `<script>` (theme toggle, mobile menu, scroll reveals, counters, language bars, scroll spy) |
| `certificates/` | PDF copies of credentials I link to from the certifications section |
| `favicon.svg` | Site icon (AN monogram) |
| `me.png` | My profile photo |
| `Resume_Naeem.pdf` | My downloadable résumé |
| `CNAME` | Custom domain for GitHub Pages |
| `netlify.toml` | Netlify config (no build step) + security headers |
| `sitemap.xml` / `robots.txt` | SEO / crawler hints |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Running it locally

It's plain HTML, so I just open `index.html` in a browser — or serve it:

```bash
python -m http.server 8080
# then visit http://localhost:8080
```

## How I deploy

**GitHub Pages** (already configured): I push to the default branch of `aaimannaeem.github.io`.
Settings → Pages → Source: *Deploy from branch* → `main` / root. The `CNAME` keeps my custom
domain.

**Netlify**: drag-and-drop the folder, or connect the repo with **no build command** and a
publish directory of `/` (the repository root).

## Editing content

Everything lives in `index.html`. To change the colors I edit the `--accent` / `--accent-2`
variables in the `:root` block inside the inlined `<style>` — they cascade to both themes.

## Contact

- 🌐 [aaimannaeem.com](https://aaimannaeem.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/aaimannaeem)
- 🐙 [GitHub](https://github.com/aaimannaeem)
- ✉️ aaiman.naeem@gmail.com
