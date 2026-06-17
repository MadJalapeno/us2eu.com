# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (runs Eleventy + Tailwind concurrently)
npm start

# Production build
npm run build

# Individual dev servers
npm run dev:11ty   # Eleventy on port 8080 with live reload
npm run dev:tw     # Tailwind CSS watcher

# Deploy (Cloudflare Pages via Wrangler)
npx wrangler pages deploy _site
```

## Architecture

This is an [Eleventy (11ty) v3](https://www.11ty.dev/) static site with Tailwind CSS v4 + DaisyUI v5, deployed to Cloudflare Pages.

### Directory Layout

- `src/` — all source content; Eleventy input directory
  - `_data/` — global data: `site.js` (metadata, themes) and `navigation.js`
  - `_includes/` — reusable Nunjucks partials (navbar, hero, footer, cards, etc.)
  - `_layouts/` — page layouts: `base.njk` (bare shell) and `pages.njk` (content + sidebar)
  - `assets/css/` — `tailwind.css` (Tailwind v4 CSS-first config with `@theme`) and `styles.css` (custom animations/effects)
  - `research/` — Markdown articles; `research.11tydata.js` applies the `pages.njk` layout and auto-generates slugified permalinks
- `_config/` — modular Eleventy config loaded from `.eleventy.js`
  - `filters.js` — custom filters: `excerpt`, `dateFilter`/`date`, `slug`, `readingTime`, `unique`, `sort`
  - `tagcloud.js` — `tagCloud` collection + frequency-based tag styling filters (`tagSize`, `tagOpacity`, `tagColor`, `tagWeight`)
- `_site/` — build output (git-ignored)
- `.eleventy.js` — main config; sets `src/` as input, `_includes/` and `_layouts/` as subdirs, registers plugins and loads `_config/`

### Template Engine

Both HTML and Markdown files are processed with **Nunjucks** (`htmlTemplateEngine: "njk"`, `markdownTemplateEngine: "njk"`).

### Styling

Tailwind CSS v4 uses a **CSS-first** approach — there is no `tailwind.config.js`. All theme customization (custom OKLCH color palettes `--color-bleu-*` and `--color-rouge-*`, DaisyUI themes) is defined in `src/assets/css/tailwind.css`. The Tailwind CLI compiles this file separately from Eleventy.

### Image Handling

The `eleventyImageTransformPlugin` automatically converts images to `avif`, `webp`, and `jpeg` formats at build time. Images in `src/assets/images/` are passed through as-is; referenced images in templates get transformed.

### Content Workflow

Research articles in `src/research/` are plain Markdown files. The directory data file (`research.11tydata.js`) sets layout and tags automatically. New research pages just need a Markdown file — no manual routing required.

### Deployment

Cloudflare Pages is configured via `wrangler.jsonc`. The `_site/` directory is the deploy target with 404 handling via `not_found_handling: "404-page"`.

### Environment

The `.env` file sets `ELEVENTY_ENV`. The build script sets `ELEVENTY_PRODUCTION=true` and `NODE_ENV=production` for production CSS purging.
