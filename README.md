# Peintner Family Sites

A polished React/Vite website for **Peintner Family Sites**, built with a high-tech visual style, responsive navigation, animated page transitions, optimized brand imagery, a centered Three.js planet/ring homepage scene, SEO metadata, and reusable content-driven sections.

This README is a practical reference for understanding how the project works, where important files live, and how to safely make changes later.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Available Scripts](#available-scripts)
5. [Project Structure](#project-structure)
6. [Routing and Pages](#routing-and-pages)
7. [Main Data Files](#main-data-files)
8. [Layout Sections](#layout-sections)
9. [Reusable Components](#reusable-components)
10. [Navigation System](#navigation-system)
11. [Homepage Hero and 3D Scene](#homepage-hero-and-3d-scene)
12. [Styling System](#styling-system)
13. [Responsive Design Notes](#responsive-design-notes)
14. [Assets](#assets)
15. [SEO and Production Visibility](#seo-and-production-visibility)
16. [Contact Form / EmailJS](#contact-form--emailjs)
17. [Deployment Notes](#deployment-notes)
18. [Common Edits](#common-edits)
19. [Maintenance Checklist](#maintenance-checklist)
20. [Current Status](#current-status)

---

## Project Overview

This project is a routed React application designed as a premium portfolio/business website for a web development company.

The current site includes:

- Desktop navigation with a main logo, PFS brand mark, page links, call CTA, and project CTA.
- Mobile/tablet full-screen animated menu.
- Homepage hero card with a centered Three.js planet/ring animation behind it.
- Three optimized brand visual cards below the homepage hero.
- Services, work, process, tech stack, contact, terms, and error pages.
- Terms of Use page with a fixed no-wrap contact CTA.
- SEO metadata, sitemap, robots file, web manifest, and social preview image.
- Responsive styling from small phones through tablets and desktop.
- Optimized assets and reduced source weight.

The app is powered by Vite, React, React Router, Framer Motion, Tailwind CSS tooling, React Three Fiber, Three.js, and EmailJS.

---

## Tech Stack

### Core

- **React**: UI framework.
- **Vite**: Development server and production build tool.
- **React Router DOM**: Client-side routing.
- **Framer Motion**: Page, section, navbar, and mobile menu animations.
- **Three.js**: 3D rendering engine.
- **@react-three/fiber**: React renderer for Three.js.
- **Tailwind CSS / Tailwind Vite Plugin**: CSS pipeline and utility support.
- **EmailJS**: Contact form email sending.

### Fonts

The site uses a high-tech font combination loaded in `index.html`:

- Orbitron
- Oxanium
- Rajdhani

These are applied through the font stack and CSS variables in `src/index.css`.

---

## Getting Started

From the project root, install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

---

## Available Scripts

These scripts are defined in `package.json`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Creates a production build in the `dist/` folder. |
| `npm run preview` | Serves the production build locally for testing. |
| `npm run lint` | Runs ESLint on the project. |

---

## Project Structure

```text
.
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── public
│   ├── 404.html
│   ├── og-image.webp
│   ├── robots.txt
│   ├── site.webmanifest
│   └── sitemap.xml
├── src
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── assets
│   ├── components
│   │   ├── navigation
│   │   ├── routing
│   │   ├── scene
│   │   ├── seo
│   │   └── ui
│   ├── data
│   ├── hooks
│   ├── pages
│   └── sections
└── README.md
```

---

## Routing and Pages

Routing is handled in:

```text
src/App.jsx
```

`App.jsx` imports all page components and maps them to URL paths.

### Page files

```text
src/pages/HomePage.jsx
src/pages/ServicesPage.jsx
src/pages/WorkPage.jsx
src/pages/ProcessPage.jsx
src/pages/ContactPage.jsx
src/pages/TermsOfUsePage.jsx
src/pages/NotFoundPage.jsx
```

### Current route purpose

| Route | Page component | Purpose |
| --- | --- | --- |
| `/` | `HomePage` | Main landing page and hero experience. |
| `/services` | `ServicesPage` | Services and offer details. |
| `/work` | `WorkPage` | Portfolio/project direction. |
| `/process` | `ProcessPage` | Build process and stack. |
| `/contact` | `ContactPage` | Contact form and CTA details. |
| `/terms` | `TermsOfUsePage` | Customer-facing Terms of Use. |
| `*` | `NotFoundPage` | Custom 404 page. |

---

## Main Data Files

Most content lists are stored in:

```text
src/data/siteContent.js
```

This file controls:

- `navLinks`
- `stats`
- `services`
- `featuredProjects`
- `processSteps`
- `stackItems`

Contact-related values are stored in:

```text
src/data/contactInfo.js
```

SEO data and schema helpers are stored in:

```text
src/data/seo.js
```

---

## Layout Sections

Main page sections live in:

```text
src/sections
```

Important sections include:

| File | Purpose |
| --- | --- |
| `Hero.jsx` | Homepage hero card, planet/ring scene wrapper, hero CTAs, and brand visual cards. |
| `Services.jsx` | Service cards. |
| `FeaturedWork.jsx` | Portfolio/project cards. |
| `Process.jsx` | Process steps and workflow. |
| `TechStack.jsx` | Technology stack display. |
| `ContactCTA.jsx` | Contact call-to-action section. |
| `Footer.jsx` | Footer brand, links, and phone CTA. |

---

## Reusable Components

Reusable components live in:

```text
src/components
```

Important components include:

| File | Purpose |
| --- | --- |
| `components/navigation/NavBar.jsx` | Desktop navbar and mobile/tablet menu. |
| `components/scene/StudioWorld.jsx` | Three.js planet/ring scene and CSS fallback. |
| `components/seo/Seo.jsx` | Per-page metadata and structured data. |
| `components/ui/CallButton.jsx` | Reusable phone CTA button. |
| `components/ui/ContactForm.jsx` | Contact form powered by EmailJS. |
| `components/routing/ScrollToTop.jsx` | Scroll reset on route changes. |
| `components/routing/AppErrorBoundary.jsx` | Error boundary wrapper. |

---

## Navigation System

The navbar lives in:

```text
src/components/navigation/NavBar.jsx
```

The navbar has two main experiences:

1. **Desktop navbar**
   - Large horizontal navbar.
   - Left main logo and PFS wordmark stack.
   - Center page links.
   - Right call/start buttons.
   - The PFS brand stack has a small desktop-only vertical alignment adjustment in `src/index.css`.

2. **Mobile/tablet menu**
   - Uses `mobile-nav.webp` as the full-screen artwork.
   - Opens as a Framer Motion overlay.
   - Includes logo, wordmark, page links, call button, and project CTA.
   - Tablet-specific rules keep the overlay centered and prevent overflow.

The navigation links come from:

```text
src/data/siteContent.js
```

Look for the `navLinks` array.

---

## Homepage Hero and 3D Scene

The homepage hero lives in:

```text
src/sections/Hero.jsx
```

The Three.js scene lives in:

```text
src/components/scene/StudioWorld.jsx
```

### Current hero structure

The homepage hero uses:

- A main glass-style hero card.
- A dedicated `hero__panel-stage` wrapper.
- The `StudioWorld` scene placed behind the card inside that stage.
- Three optimized brand visual cards below the hero card.

The `hero__panel-stage` structure is important because it keeps the planet/rings visually centered behind the main card across desktop, tablet, and mobile.

### Important scene parts

- `canUseWebGL()`
  - Checks browser WebGL support.
  - Falls back to CSS visuals if WebGL is unavailable.

- `createEarthTexture()`
  - Generates the planet texture using canvas.
  - Uses reduced canvas dimensions for better runtime performance.

- `createCloudTexture()`
  - Generates a procedural cloud texture.

- `EarthPlanet()`
  - Renders the planet, atmosphere, glow, and cloud layer.

- `AnimatedRings()`
  - Renders the animated rings around the planet.
  - Uses continuous elapsed-time animation for smoother rotation.

- `BackgroundEffects()`
  - Provides CSS fallback elements.

- `StudioWorld()`
  - Main exported scene wrapper.
  - Handles WebGL and fallback rendering.

### Performance notes

The scene is lazy-loaded from `Hero.jsx` using React `lazy()` and `Suspense`. This helps the main page render before the 3D background is fully ready.

The latest animation pass made the rings smoother by using continuous elapsed-time rotation instead of frame-to-frame easing for the main ring rigs. The CSS fallback ring animation was also changed to a smoother linear motion.

---

## Styling System

Almost all styling lives in:

```text
src/index.css
```

The CSS file includes:

- Root variables.
- Global resets.
- Typography.
- Navbar styling.
- Hero styling.
- Planet/ring positioning rules.
- Brand visual card styling.
- Cards and sections.
- Mobile menu styling.
- Terms page styling.
- Footer styling.
- Responsive breakpoints.
- Performance and rendering optimizations.
- Final responsive polish rules.

### Important CSS variables

At the top and throughout `index.css`, the site uses variables like:

```css
--bg
--bg-2
--ink
--muted
--cyan
--violet
--ease
--shadow-panel
```

### Styling approach

The site uses a handcrafted CSS system. Most visual design is controlled by semantic class names such as:

```css
.hero__panel
.hero__panel-stage
.hero__mark-visual
.desktop-art-nav
.mobile-menu__content
.service-card
.work-card
.process-step
.terms-note
.footer
```

This makes the design easier to understand and adjust component by component.

---

## Responsive Design Notes

The site has responsive rules for:

- Small phones.
- Standard mobile screens.
- Mobile landscape.
- Tablets.
- Smaller tablet screens using the mobile nav view.
- Medium desktop screens.
- Large desktop screens.

Important breakpoint ranges include:

| Range | Purpose |
| --- | --- |
| `max-width: 380px` | Very small phone safeguards. |
| `max-width: 420px` | Small phone layout protection. |
| `max-width: 520px` | Full-width buttons and tighter cards. |
| `max-width: 760px` | Main mobile layout. |
| `761px - 980px` | Tablet/mobile-nav layout. |
| `981px+` | Desktop navbar and desktop layout. |
| `981px - 1180px` | Smaller desktop navbar protection. |

### Important responsive areas

Look in `src/index.css` for:

```css
.hero__panel-stage
.studio-world
.hero__mark-visual
.desktop-art-nav
.mobile-menu
.terms-note
```

The homepage planet/ring layer has desktop, tablet, and mobile rules that keep the animation centered behind the hero card. The Terms page also has a no-wrap button fix so the long contact CTA stays inside the sidebar button without wrapping.

---

## Assets

Optimized assets live in:

```text
src/assets
```

Current asset files include:

```text
brand-slot-architecture.webp
brand-slot-growth.webp
brand-slot-interface.webp
main-logo.webp
mobile-nav.webp
nav-pfs-logo.webp
```

### Asset usage

| Asset | Used for |
| --- | --- |
| `main-logo.webp` | Main logo in navbar, hero, footer, and mobile menu. |
| `nav-pfs-logo.webp` | Desktop navbar PFS brand mark. |
| `mobile-nav.webp` | Mobile/tablet menu background art. |
| `brand-slot-interface.webp` | First homepage brand visual card under the hero. |
| `brand-slot-architecture.webp` | Second homepage brand visual card under the hero. |
| `brand-slot-growth.webp` | Third homepage brand visual card under the hero. |

The old standalone `p-logo`, `f-logo`, and `s-logo` source assets were removed after the homepage slots were changed to brand-style visuals.

### Public assets

Public/static assets live in:

```text
public
```

Current public files include:

```text
404.html
og-image.webp
robots.txt
site.webmanifest
sitemap.xml
```

`public/og-image.webp` is the high-tech social preview image used for Open Graph/Twitter cards.

---

## SEO and Production Visibility

This project includes a production SEO foundation for the GitHub Pages URL:

- Static homepage metadata in `index.html`.
- Per-page React metadata through `src/components/seo/Seo.jsx`.
- Canonical URLs for the main pages.
- Open Graph and Twitter preview tags.
- JSON-LD structured data for the business, website, and current page.
- `public/robots.txt`.
- `public/sitemap.xml`.
- `public/site.webmanifest`.
- `public/og-image.webp`.
- GitHub Pages SPA route fallback through `public/404.html`.

After deployment, submit the sitemap in Google Search Console:

```text
https://peintnerfamilysites.github.io/PeintnerFamilySites/sitemap.xml
```

For stronger long-term search visibility, connect a real custom domain when ready, submit the sitemap in Google Search Console, and add real portfolio/project proof as the business grows.

---

## Contact Form / EmailJS

The contact form lives in:

```text
src/components/ui/ContactForm.jsx
```

It uses:

```text
@emailjs/browser
```

To fully connect EmailJS, you need valid EmailJS values for:

- Service ID
- Template ID
- Public key

These values are usually stored in environment variables or configured in the component.

### Recommended environment variable pattern

Create a `.env` file in the project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Then reference them in React using:

```js
import.meta.env.VITE_EMAILJS_SERVICE_ID
```

Do not commit private or sensitive keys to a public repository.

---

## Deployment Notes

The Vite config currently uses a GitHub Pages-style base path:

```js
base: "/PeintnerFamilySites/"
```

This matters when deploying to:

```text
https://peintnerfamilysites.github.io/PeintnerFamilySites/
```

If you deploy somewhere else, update the `base` value in:

```text
vite.config.js
```

### Common base path examples

| Hosting location | Vite base |
| --- | --- |
| GitHub Pages project site | `"/RepositoryName/"` |
| Root domain | `"/"` |
| Netlify/Vercel root app | `"/"` |

After changing `base`, rebuild the project:

```bash
npm run build
```

---

## Common Edits

### Change navigation links

Edit:

```text
src/data/siteContent.js
```

Look for:

```js
navLinks
```

### Change phone number

Edit:

```text
src/data/contactInfo.js
```

### Change homepage hero text

Edit:

```text
src/sections/Hero.jsx
```

### Change homepage brand visual cards

Edit imports and the `hero__mark-row` data in:

```text
src/sections/Hero.jsx
```

Replace the matching WebP files in:

```text
src/assets
```

Current brand visual files:

```text
brand-slot-interface.webp
brand-slot-architecture.webp
brand-slot-growth.webp
```

### Change service cards

Edit:

```text
src/data/siteContent.js
```

Look for the `services` array.

### Change featured work cards

Edit:

```text
src/data/siteContent.js
```

Look for the `featuredProjects` array.

### Change process steps

Edit:

```text
src/data/siteContent.js
```

Look for the `processSteps` array.

### Change tech stack items

Edit:

```text
src/data/siteContent.js
```

Look for the `stackItems` array.

### Change footer text

Edit:

```text
src/sections/Footer.jsx
```

### Change desktop navbar sizing/alignment

Edit:

```text
src/index.css
```

Search for:

```css
.desktop-art-nav
.desktop-art-nav__wordmark
```

### Change mobile/tablet menu layout

Edit:

```text
src/index.css
```

Search for:

```css
.mobile-menu
```

### Change 3D planet/ring animation

Edit:

```text
src/components/scene/StudioWorld.jsx
```

Useful search terms:

```text
EarthPlanet
AnimatedRings
createEarthTexture
createCloudTexture
```

### Change Terms page text or sidebar CTA

Edit the Terms page content in:

```text
src/pages/TermsOfUsePage.jsx
```

Edit the Terms page sidebar/button styling in:

```text
src/index.css
```

Search for:

```css
.terms-note
```

---

## Maintenance Checklist

Before uploading or deploying a new version, run:

```bash
npm install
npm run lint
npm run build
```

Check the site at these screen sizes:

- 360px wide phone.
- 390px wide phone.
- 430px wide phone.
- 768px tablet portrait.
- 820px tablet portrait.
- 912px tablet portrait.
- Tablet landscape.
- 1024px small desktop/tablet landscape.
- 1366px desktop.
- 1440px+ large desktop.

Also test:

- Desktop navbar alignment.
- Mobile/tablet menu open and close.
- Homepage planet/ring positioning behind the hero card.
- Homepage brand visual cards.
- Contact form.
- Terms page sidebar buttons.
- Route navigation.
- Footer layout.
- Reduced-motion settings if possible.
- Production build on the GitHub Pages base path.

---

## Notes for Future Development

This project has a polished visual system, but `src/index.css` has grown through multiple design passes. Future improvements could include splitting it into smaller files such as:

```text
styles/base.css
styles/navigation.css
styles/hero.css
styles/cards.css
styles/forms.css
styles/responsive.css
```

That would make long-term maintenance easier without changing the design.

For now, keeping everything in `src/index.css` is simple and works correctly.

---

## Current Status

The current version includes:

- Optimized WebP assets.
- Removed unused old P/F/S source assets.
- High-tech font system.
- Responsive desktop navbar and mobile/tablet menu.
- Desktop navbar brand stack alignment polish.
- Homepage hero card with centered planet/ring animation behind it.
- Smoother Three.js and CSS fallback ring animation.
- Homepage brand visual cards replacing the old P/F/S logo slots.
- Terms of Use page with no-wrap contact button overflow fix.
- SEO files and metadata for production visibility.
- GitHub Pages base path set to `/PeintnerFamilySites/`.
- Successful lint and production build.
