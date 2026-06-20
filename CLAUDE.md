# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/landing site for the "TCG Awards". Single-page-app built with **Create React App** (`react-scripts` 5), **React 19**, **react-router-dom 7**, **TypeScript**. Content is static and hardcoded in the page components — there is no backend or data fetching in `src` (no `process.env` usage; the `.env.dev` / `.env.prod` described in `README.md` are not currently wired into the build). Deployed to GitHub Pages from the `build/` output.

## Commands

```bash
npm run dev      # react-scripts start — local dev server
npm run build    # production build into build/
npm test         # react-scripts test (Jest + Testing Library); no test files exist yet
```

Run a single test once tests exist: `npm test -- --watchAll=false src/path/to/file.test.tsx`.

For GitHub Pages on a subpath, uncomment `basename="/tcg-awards-site"` in `src/App.tsx` (`<BrowserRouter>`).

## Architecture

**Routing + layout (`src/App.tsx`).** All routes live here. Each route renders `Layout({ page, header, footer, background })` — note `Layout` is **called as a function**, not used as `<Layout/>`. `src/utils/layout.util.tsx` composes the page inside an optional `Background`, optional `HeaderComponent`/`FooterComponent`, and a `SkeletonTheme`. Pass `background: {}` to enable the decorative background; omit it to skip. To add a page: create `src/pages/x.page.tsx` (+ `.css`), import it in `App.tsx`, add a `<Route>`.

**Errors.** `src/utils/error.util.ts` `redirectToErrorPage(...)` builds an `/error?...` query string (title, message, status-code, etc.); `errorInfo.page.tsx` reads those params. `*` route also maps to the error page (404). `ValidationError` is a typed error class.

**Background (`src/components/background.component.tsx`).** Procedurally scatters SVG blobs/dots/lines down the full page height using a seeded PRNG (`mulberry32`). Tunable constants at the top of the file. Pass `background={{ seed }}` for a deterministic layout.

**Other utils (`src/utils/`):** `scroll.util.ts` — `ScrollToTopOnReload` (mounted once in `App`), `preventScroll(enable)` (ref-counted modal scroll lock with an iOS Safari fix), `scrollToTop`. `portal.util.ts` — `Portal` renders into a `#portal-root` appended to `body`, used to escape z-index/stacking from header/footer.

## Styling system

This is a **custom utility-class CSS system** (Tailwind-like, hand-rolled). No CSS-in-JS, no Tailwind. Dark mode only (`color-scheme: dark`).

- **CSS import order in `App.tsx` is load-bearing — do not reorder** (general → layout → text → colors, then `mobile` last as overrides). See the comment there.
- `src/styles/layout.style.css` — utility classes: `flex`/`column`/`center`/`between`/`wrap`, `gap-0..5`, `p`/`m`/`pt`/`mb`/… `-0..5`, `w-100`/`w-50`, `text-center`, `relative`/`absolute`, `circle`, `clickable`, `no-select`. Spacing uses tokens `--size-xs..xxl` (5/10/20/30/50/100px). `.default-page` is the standard page wrapper; add `.max` for full-bleed. `.test`/`.test-N` give debug outlines.
- `src/styles/colors.style.css` — all color tokens as CSS vars. Brand: `--c-gold`, `--c-dark-gold`, `--c-background`; grays `--gray-10..200`; gradients `--f-*`. **Add a color here only if reused more than once.**
- `src/styles/text.style.css` — global typography. `h1`–`h6` and `p` are styled globally (Figtree font, gold uppercase headings); pages mostly use bare `<h1>`/`<p>` rather than custom text classes.
- `src/styles/mobile.style.css` + per-file media queries — the breakpoint is **`max-width: 961px`** everywhere. Toggle visibility with `.mobile-hide` / `.mobile-show`.

## File & component conventions

- **Naming:** `name.page.tsx`, `name.component.tsx`, `name.util.ts(x)`, `name.type.ts`, `name.enum.ts`, `name.style.css`. Every page/component imports its own sibling `.css` on the first line.
- **Scaffold templates:** `src/components/example.component.tsx` and `src/pages/example.page.tsx` are copy-from starting points. The header comment in `example.component.tsx` documents the rules; follow them:
  - Component function name ends in `Component`; root element class is `name-component`.
  - Accept and spread overflow props: `props: Readonly<{ ..., className?: string, children?: ReactNode, [key: string]: any }>`, then `const { ..., className, children, ...overflowProps } = props;` and `className={\`name-component ${className ?? ""}\`} {...overflowProps}`.
  - **Namespace child class names with the component prefix** (e.g. in `car-component`, name its inner container `car-container`, not `container`) so global utility classes aren't accidentally inherited/overridden.
  - Add `no-select` where text/images shouldn't be selectable.
- **Title prop pattern:** many components take `title={{ top, bottom }}` and render two stacked headings; multi-line text uses literal `\n` in the string. Refs are forwarded so the home page can scroll to sections (`ref={sectionN}`).
- **Toggling content:** large blocks of JSX (alternate layouts, unused sections) are kept as comments inside pages like `home.page.tsx` rather than deleted. Expect heavy commented-out scaffolding; the active layout is the uncommented one.
