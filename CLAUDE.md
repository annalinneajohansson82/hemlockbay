# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # dev server at http://localhost:8080 with auto-reload
npm run build    # production build to _site/
npm run clean    # remove _site/
```

No linting or test scripts exist. Deployed to Cloudflare Pages (build: `npm run build`, output: `_site/`, domain: hemlockbay.se).

## Architecture

Eleventy 3.x static site. Input: `src/`, output: `_site/`. Templates use Nunjucks (`.njk`); Markdown files also render through Nunjucks.

**Config** (`.eleventy.js`): Registers two Nunjucks filters — `romanNumeral` (integer → Roman numeral string, used for tab/plate archival numbering) and `archivalDate` (Date → locale string, e.g. "April 19, 2026"). Passes `src/assets/` through unchanged.

**Global data** (`src/_data/site.js`): Site title, motto, location, and description — available in all templates as `site.*`.

**Collections** follow a pattern: each content type lives in its own folder with a `.11tydata.js` file that sets `layout`, `tags`, and the URL permalink pattern. Current collections:

- `src/entries/` → `/entries/{slug}/` — cryptobiological taxonomy entries. Frontmatter: `title`, `binomial`, `common`, `tab` (integer, displayed as Roman numeral), `plate`, `institute`.
- `src/institutions/` → `/institutions/{slug}/` — organizations. Frontmatter: `title`, `name`, `motto`.

To add a new collection: create a folder, add a `.11tydata.js` following the existing pattern, optionally add a layout under `src/_includes/layouts/`, and optionally add a listing page (`.njk`) at the root.

**Layouts** (`src/_includes/layouts/`): `base.njk` is the HTML shell; `entry.njk` and `institution.njk` extend it with collection-specific markup.

## Aesthetic Constraints

The site simulates a Victorian-era archival museum cataloguing cryptobiological specimens. CSS (`src/assets/css/archival.css`) is hand-rolled with no frameworks:
- Palette: warm black `#0e0b08` bg, parchment `#e8dfc9` text, brass `#a68853` accent
- Fonts: Libre Baskerville (body), Cormorant Garamond (display/italic), Cinzel (small caps)
- Layout: narrow measure (~38rem), centered, generous whitespace, thin rules
- Tone: austere, formal, never friendly or enthusiastic
