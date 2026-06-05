# Peintner Family Sites performance repair notes

## What was causing the browser lag

1. The hero background was the main runtime hotspot. The planet/ring scene used six very large animated CSS rings, heavy glow shadows, drop-shadows, blur filters, masked pseudo-elements, and several duplicate keyframe override blocks. That creates constant paint/compositing work while the page is open.

2. The mobile menu animation used an animated `filter: blur(...)` transition. Browser blur filters are expensive because they force extra repaint/compositing work, especially over large panels.

3. The scene animation kept running even when the tab was hidden or when the hero was no longer on screen. That is not a memory leak in React, but it acts like one from the user's perspective because the browser keeps spending resources on visuals nobody can see.

4. The project package included heavy unused image files, a nested `pfs_work_package`, and a `.git` folder. The unused assets were not the direct browser lag source because the live app imports the WebP versions, but they made the project much heavier than needed.

## What I changed

- Added viewport/tab visibility control to `StudioWorld.jsx` so the ring/planet animations pause when the scene is off-screen or the browser tab is not visible.
- Kept the same centered planet/ring layout, but reduced the heaviest live paint effects: oversized drop-shadows, blur intensity, pseudo-element glow nodes, and outer-ring effects.
- Kept the desktop visual style intact while making the two outer rings much cheaper and hiding those two outer rings on tablet/mobile where they cost the most.
- Replaced the mobile menu blur animation with a scale/opacity animation so the layout still feels modern without the expensive filter animation.
- Confirmed the production build completes successfully with `npm run build`.

## Files changed

- `src/components/scene/StudioWorld.jsx`
- `src/components/navigation/NavBar.jsx`
- `src/index.css`

## Build check

Command run:

```bash
npm ci --no-audit --no-fund
npm run build
```

Result: production build completed successfully.
