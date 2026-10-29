# CodeTown website

The landing page for **CodeTown**, the VS Code extension that turns your codebase into a living isometric city and gives you a crew of eight AI characters to command from a game HUD.

Live: [codetown.enigmadev.tech](https://codetown.enigmadev.tech/) · Extension: [Ayushkumarpatel-AKP/CodeTown](https://github.com/Ayushkumarpatel-AKP/CodeTown) · Made by AKP ([EnigmaDev](https://enigmadev.tech)) · MIT

## What is on the page

- **Hero**: the real extension screenshot in a retro monitor, with the official CodeTown logo.
- **Pick your fighter**: a playable character-select demo. Choose one of the eight characters, dispatch a starter prompt, watch the pixel face react, STAMP or DENY a permit, then use **Undo changes** and **Run tests** on the mission report. The output is simulated and labelled as such.
- **Safety net**: the real mission-report screenshot zooming in on files changed, Undo and test results.
- **One repo, eight views**: an auto-playing gallery with a magnifier lens (Crew Hall, Mission report, Modern, Hi-fi, Village, Night + relations, Crews at work, Inspector).
- **Features, Engines, Install**: what it does, which models it runs on (free and local included), and three steps to install.

## Look and feel

An ancient-computer theme: dark phosphor-brown background, off-white text, tarnished brass accents, VT323 and JetBrains Mono, faint scanlines, a builder's-tools backdrop, pixel arrow and hammer cursors. Cursor effects, tilt and drifting backdrop are switched off for touch screens and `prefers-reduced-motion`.

## Stack

React 18, TypeScript, Vite, Tailwind CSS (utilities only; the theme is plain CSS in `src/index.css`). The pixel faces are drawn in code by `src/lib/faces.ts`, a copy of the extension's `src/webview/faces.ts`; keep the two in sync.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check and build to dist/
npm run preview
```

Screenshots in `public/assets/screenshots/` are captured from the extension with `node scripts/shoot.js` in the extension repository.
