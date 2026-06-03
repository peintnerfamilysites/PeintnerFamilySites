# Peintner Family Sites — Senior Rebuild

A polished React + Three.js landing site for Peintner Family Sites.

## Commands

```bash
npm install
npm run dev
npm run build
```

## Folder layout

```txt
src/
  assets/                 # Existing image assets and nav artwork
  components/
    navigation/           # Desktop/mobile nav system
    scene/                # Three.js background world
    ui/                   # Reusable animation/section helpers
  data/                   # Site content arrays used by sections
  hooks/                  # Small reusable React hooks
  sections/               # Page sections
  App.jsx                 # Page composition only
  index.css               # Global design system + responsive styling
```

## Notes

- Desktop navigation uses `src/assets/dektop-nav.png`.
- Mobile full-screen navigation uses `src/assets/mobile-nav.png`.
- Content is centralized in `src/data/siteContent.js` so sections are easy to update.

## Legal / Terms reminder

The `src/pages/TermsOfUsePage.jsx` page has been drafted in a production-ready, customer-facing voice for Peintner Family Sites in Springfield, Missouri. It is not legal advice. Before publishing or relying on it, have a qualified Missouri attorney review it for your exact services, pricing model, contracts, privacy requirements, business structure, and risk tolerance.


## EmailJS contact form setup

The contact page includes an EmailJS-ready project request form. Add these variables to your local `.env` file and to your production host before going live:

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Suggested EmailJS template variables: `name`, `email`, `phone`, `company`, `service`, `budget`, `timeline`, and `message`.

If those variables are not set yet, the form falls back to opening a prefilled email to `peintnerfamilysites@gmail.com` so the page still has a working contact path during setup.


## Optimization notes

This build was optimized without changing the layout or visual design:
- Heavy Three.js scene code is lazy-loaded.
- Vendor code is split into cache-friendly chunks.
- Image assets are optimized in place.
- Unused duplicate logo assets are removed where safe.
- Reduced-motion users get lighter animation behavior automatically.


## Second optimization pass

Additional optimization work:
- Active navbar/logo PNG assets were converted to WebP and imports were updated.
- Unreferenced large PNG assets were removed from `src/assets`.
- Footer rendering was simplified to reduce desktop paint cost while preserving the same visual style.
- Below-the-fold sections use `content-visibility: auto` to reduce initial rendering work.
# PeintnerFamilySites
