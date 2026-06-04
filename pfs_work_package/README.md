# Peintner Family Sites

A polished React/Vite website for **Peintner Family Sites**, built with a modern high-tech visual style, responsive navigation, animated page transitions, a Three.js homepage scene, and reusable content-driven sections.

This README is meant to be a practical reference for understanding how the project works, where important files live, and how to safely make changes later.

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
11. [Homepage 3D Background](#homepage-3d-background)
12. [Styling System](#styling-system)
13. [Responsive Design Notes](#responsive-design-notes)
14. [Assets](#assets)
15. [Contact Form / EmailJS](#contact-form--emailjs)
16. [Deployment Notes](#deployment-notes)
17. [Common Edits](#common-edits)
18. [Maintenance Checklist](#maintenance-checklist)

---

## Project Overview

This project is a single-page React application with multiple routed pages. It is designed as a premium portfolio/business website for a web development company.

The site includes:

- Desktop and mobile/tablet navigation.
- Animated mobile menu.
- Homepage hero with a Three.js planet/ring background.
- Services, work, process, tech stack, contact, terms, and error pages.
- Reusable content cards and reveal animations.
- Responsive styling from small phones through tablets and desktop.
- Optimized assets and project structure.

The app is powered by Vite, React, React Router, Framer Motion, Tailwind CSS tooling, React Three Fiber, and Three.js.

---

## Tech Stack

### Core

- **React**: UI framework.
- **Vite**: Development server and production build tool.
- **React Router DOM**: Client-side routing.
- **Framer Motion**: Page, section, and menu animations.
- **Three.js**: 3D rendering engine.
- **@react-three/fiber**: React renderer for Three.js.
- **Tailwind CSS / Tailwind Vite Plugin**: Styling utility support and CSS pipeline.
- **EmailJS**: Contact form email sending.

### Fonts

The site uses a high-tech font combination loaded in `index.html`:

- Orbitron
- Oxanium
- Rajdhani

These are assigned through CSS variables in `src/index.css`.

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
├── src
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── assets
│   ├── components
│   │   ├── navigation
│   │   ├── routing
│   │   ├── scene
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
| `/` | `HomePage` | Main landing page. |
| `/services` | `ServicesPage` | Services overview. |
| `/work` | `WorkPage` | Featured projects / examples. |
| `/process` | `ProcessPage` | How the build process works. |
| `/contact` | `ContactPage` | Contact information and contact form. |
| `/terms` | `TermsOfUsePage` | Terms of use content. |
| `*` | `NotFoundPage` | 404 fallback page. |

---

## Main Data Files

Most page content is stored separately from the component layout. This makes the site easier to update.

### `src/data/siteContent.js`

This file controls most repeated site content, including:

- Navigation links.
- Homepage stats.
- Services.
- Featured projects.
- Process steps.
- Tech stack items.

When changing text on cards or updating service/project content, start here.

### `src/data/contactInfo.js`

This file stores contact information used across the site, including the phone number.

The `CallButton` and footer phone link pull from this file.

---

## Layout Sections

Sections are larger page blocks used inside pages.

```text
src/sections/Hero.jsx
src/sections/Services.jsx
src/sections/FeaturedWork.jsx
src/sections/Process.jsx
src/sections/TechStack.jsx
src/sections/Contact.jsx
src/sections/Footer.jsx
```

### Section responsibilities

| File | Purpose |
| --- | --- |
| `Hero.jsx` | Homepage hero, main call-to-action, stats, logo row, and 3D scene loading. |
| `Services.jsx` | Service cards pulled from `siteContent.js`. |
| `FeaturedWork.jsx` | Project/work cards pulled from `siteContent.js`. |
| `Process.jsx` | Step-by-step build process. |
| `TechStack.jsx` | Tools and technologies used. |
| `Contact.jsx` | Contact call-to-action section. |
| `Footer.jsx` | Footer brand, footer links, copyright text, and phone link. |

---

## Reusable Components

Reusable components live inside:

```text
src/components
```

### UI components

```text
src/components/ui/PageHeader.jsx
src/components/ui/CallButton.jsx
src/components/ui/Reveal.jsx
src/components/ui/ContactForm.jsx
src/components/ui/SectionIntro.jsx
```

| Component | Purpose |
| --- | --- |
| `PageHeader` | Shared header for internal pages. |
| `CallButton` | Reusable phone/call-to-action button. |
| `Reveal` | Scroll/entrance animation wrapper using Framer Motion. |
| `ContactForm` | EmailJS contact form. |
| `SectionIntro` | Reusable section label/title/description block. |

### Routing components

```text
src/components/routing/AppErrorBoundary.jsx
src/components/routing/ScrollToTop.jsx
```

| Component | Purpose |
| --- | --- |
| `AppErrorBoundary` | Prevents the full app from crashing if a render error occurs. |
| `ScrollToTop` | Automatically scrolls to the top when navigating to a new route. |

### Custom hooks

```text
src/hooks/useScrollLock.js
```

`useScrollLock` locks background scrolling when the mobile menu is open.

---

## Navigation System

The navbar lives in:

```text
src/components/navigation/NavBar.jsx
```

The navbar has two main experiences:

1. **Desktop navbar**
   - Large horizontal navbar.
   - Left logo/wordmark area.
   - Center page buttons.
   - Right call/start buttons.

2. **Mobile/tablet menu**
   - Uses the mobile nav artwork.
   - Opens as a full-screen overlay.
   - Uses Framer Motion for entrance and exit animations.
   - Includes logo, wordmark, page links, call button, and project CTA.

The navigation links come from:

```text
src/data/siteContent.js
```

Look for the `navLinks` array.

### Tablet nav behavior

Tablet-specific responsive rules are in `src/index.css`. The mobile menu has extra rules for the `761px` to `980px` range so it fits tablet screens without overflowing.

---

## Homepage 3D Background

The Three.js scene lives in:

```text
src/components/scene/StudioWorld.jsx
```

This component handles the animated planet/ring background on the homepage.

### Important parts

- `canUseWebGL()`
  - Checks if the browser supports WebGL.
  - Falls back to CSS-only visuals if WebGL is unavailable.

- `createEarthTexture()`
  - Generates the planet texture using a canvas.
  - Avoids needing a large external texture file.

- `createCloudTexture()`
  - Generates a procedural cloud texture.

- `EarthPlanet()`
  - Renders the planet, atmosphere, glow, and cloud layer.

- `AnimatedRings()`
  - Renders the animated rings around the planet.

- `BackgroundEffects()`
  - Provides CSS fallback elements.

- `StudioWorld()`
  - Main exported scene wrapper.
  - Handles WebGL and reduced-motion fallbacks.

### Performance notes

The scene is lazy-loaded from `Hero.jsx` using React `lazy()` and `Suspense`. This helps the main page load faster before the 3D background is fully ready.

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
- Cards and sections.
- Mobile menu styling.
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
--purple
--ease
--shadow-panel
```

Later in the file, the high-tech fonts are assigned through:

```css
--font-tech-display
--font-tech-body
--font-tech-condensed
```

### Styling approach

The site uses a handcrafted CSS system. Instead of relying only on Tailwind utility classes, most visual design is controlled by semantic class names such as:

```css
.hero__panel
.desktop-art-nav
.mobile-menu__content
.service-card
.work-card
.process-step
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

### Important tablet menu rules

The tablet mobile menu rules are near the end of `src/index.css`. These rules keep the menu centered while preventing content from overflowing off the screen.

Look for comments like:

```css
/* Tablet mobile-menu overflow fix */
```

and

```css
/* Tablet mobile-menu centering fix */
```

---

## Assets

Optimized assets live in:

```text
src/assets
```

Current asset files include:

```text
main-logo.webp
mobile-nav.webp
p-logo.webp
f-logo.webp
s-logo.webp
p-logo-cropped.webp
f-logo-cropped.webp
s-logo-cropped.webp
```

### Asset usage

| Asset | Used for |
| --- | --- |
| `main-logo.webp` | Main logo in navbar, hero, footer, and mobile menu. |
| `mobile-nav.webp` | Mobile menu background art. |
| `p-logo.webp`, `f-logo.webp`, `s-logo.webp` | Hero PFS logo row. |
| `p-logo-cropped.webp`, `f-logo-cropped.webp`, `s-logo-cropped.webp` | Desktop navbar letter logo row. |

Unused PNG files were removed during optimization to keep the project smaller.

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

### Change desktop navbar sizing

Edit:

```text
src/index.css
```

Search for:

```css
.desktop-art-nav
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

- Desktop navbar.
- Mobile/tablet menu open and close.
- Contact form.
- Route navigation.
- Footer layout.
- Homepage 3D scene.
- Reduced-motion settings if possible.

---

## Notes for Future Development

This project has a polished visual system, but the CSS file has grown through multiple design passes. Future improvements could include splitting `src/index.css` into smaller files such as:

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

- Optimized assets.
- Removed unused dependencies.
- High-tech font system.
- Responsive navbar and mobile/tablet menu fixes.
- Footer rectangle fix.
- Homepage 3D planet/ring animation.
- Successful lint and production build.
