# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Vite)
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # Type-check (svelte-check)
npm run lint         # Check formatting and linting
npm run format       # Auto-format with Prettier
```

No test suite is configured.

## Architecture

**SvelteKit 2 + Svelte 5** blog deployed to Netlify. Uses Svelte 5 runes (`$state`, `$props`, `$derived`) throughout — not legacy Options API.

### Routing

File-based routing under `src/routes/`:

- `/` — home page with post list and rotating identity carousel
- `/posts/[...slug]` — dynamic post detail, loads component lazily
- `/profile` — author profile with tech stack grid

Each route pair: `+page.ts` (data loading) + `+page.svelte` (rendering).

### Blog Post System

Posts live as MDsvex (`.svx`) files in `src/lib/posts/`. Adding a post = drop a `.svx` file there.

**Frontmatter schema:**

```yaml
---
title: 'Post Title'
date: 'YYYY-MM-DD'
summary: 'Brief description'
tags: ['tag1', 'tag2']
---
```

`src/lib/posts/loader.ts` uses `import.meta.glob` to discover all `.svx` files at build time. `meta.ts` defines `PostMeta`, `ValidatedPost` types and `isValidPost()` guard. Posts missing `title`, `date`, or `slug` are filtered from the listing.

### Styling

Tailwind CSS v4 (Vite plugin, not PostCSS). Global theme variables and Tailwind imports are in `src/routes/layout.css` using OKLCH colors. Dark mode is class-based (`.dark` on `<html>`), managed by `src/lib/dark-mode.svelte.ts` which persists to `localStorage`.

UI components follow the shadcn-svelte pattern — source lives in `src/lib/components/ui/` and is meant to be edited directly. Use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) for conditional class merging.

### Path Aliases

`$lib` → `src/lib` (SvelteKit default). UI components at `$lib/components/ui/`.
