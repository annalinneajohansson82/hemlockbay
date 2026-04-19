# Hemlock Bay

An archival static site built with [Eleventy (11ty)](https://www.11ty.dev/).

*Occultum Investigamus.*

---

## Setup

Requires Node.js 18 or newer.

```bash
npm install
npm start
```

Opens at http://localhost:8080. Saving any file rebuilds and reloads automatically.

To build for deployment:

```bash
npm run build
```

Output goes to `_site/`.

---

## Folder map

```
hemlock-bay/
├── .eleventy.js              Eleventy config + Roman numeral filter
├── package.json
└── src/
    ├── _data/
    │   └── site.js           Site-wide values (title, motto, etc.)
    ├── _includes/
    │   ├── layouts/
    │   │   ├── base.njk          HTML shell
    │   │   ├── entry.njk         Taxonomic entry layout
    │   │   └── institution.njk   Institution page layout
    │   └── partials/
    │       ├── header.njk        Masthead
    │       └── footer.njk        Colophon
    ├── assets/
    │   ├── css/
    │   │   └── archival.css  Stylesheet (graphical profile)
    │   └── images/           Place plate scans, crests, etc. here
    │       └── plates/
    ├── entries/              Taxonomic entries (one .md per species)
    │   ├── entries.11tydata.js
    │   └── homo-lycanthropus.md
    ├── institutions/         Institution pages
    │   ├── institutions.11tydata.js
    │   └── hbics.md
    ├── index.njk             Homepage
    ├── entries.njk           Catalogue index
    └── institutions.njk      Institutions index
```

---

## How to add content

### A new taxonomic entry

Create a new Markdown file in `src/entries/`, e.g. `cervus-venator.md`:

```markdown
---
title: "Cervus venator"
binomial: "Cervus venator"
common: "Hunter stag"
tab: 102
plate: 2
institute: "HBICS"
---

## Taxonomic Note

Cervus venator is an aberrant cervine marked by...
```

Frontmatter fields:

- `binomial` — Latin binomial (rendered in italic)
- `common` — common name (rendered below binomial)
- `tab` — table number (rendered as Roman numeral, e.g. `102` → `CII`)
- `plate` — plate number within the tab (Roman numeral)
- `institute` — which institute issued the entry (HBICS, etc.)

The entry layout, tag, and URL (`/entries/cervus-venator/`) are all applied automatically by `entries.11tydata.js`.

### A new institution

Same pattern, but in `src/institutions/`.

### A new kind of collection (e.g. ephemera, apothecary labels)

1. Create a new folder under `src/`, e.g. `src/ephemera/`.
2. Add an `ephemera.11tydata.js` file inside it that applies a layout and tag (copy from `entries.11tydata.js` as a template).
3. Add a layout in `src/_includes/layouts/` if you want it to look different.
4. Add an index page `ephemera.njk` in `src/` if you want a catalogue of them.

---

## Style rules (from the graphical profile)

- Warm black background, parchment text, muted brass accents.
- Fonts: Libre Baskerville (body), Cormorant Garamond (display), Cinzel (small caps).
- Narrow measure, thin rules, Roman numerals for plate numbering.
- Flat decorations only. No shadows, glows, gradients, or depth effects.
- If it feels friendly or enthusiastic, it is wrong.

---

## Deployment (Cloudflare Pages)

1. Push this repo to GitHub.
2. In Cloudflare Pages, "Create a project" → connect your GitHub repo.
3. Set build settings:
   - **Build command:** `npm run build`
   - **Output directory:** `_site`
   - **Node version:** 18 or higher (set in env vars: `NODE_VERSION = 20`)
4. Connect your domain (`hemlockbay.se`) under Custom Domains.

Every `git push` to the main branch will trigger a fresh build and deploy.
