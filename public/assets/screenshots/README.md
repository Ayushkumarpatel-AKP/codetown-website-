# Screenshot gallery

All images below are real output: every screenshot was captured from the
running CodeTown rendering pipeline (scanner → import graph → layout →
environment → webview renderer) against the actual repository or demo
referenced in the caption. Reproduce them any time with
`node scripts/shoot.js` (requires the "Isometric City - Starter" sprite
pack in its documented location).

## The CodeTown repository, rendered

| Screenshot | Scene |
|---|---|
| `codetown-city.png` | Full city, day lighting — districts for `src`, scripts, assets and the shared root |
| `codetown-night-relations.png` | Night lighting with the Relations overlay drawing resolved import edges |
| `codetown-inspector.png` | Inspector card with symbols/imports for a selected file |
| `codetown-tree.png` | Repository file-tree sidebar navigation |
| `codetown-zoom.png` | Zoomed into a district block |

## Demo cities (each renders a visibly different town)

| Demo | Screenshots |
|---|---|
| `sunny-cart` — TypeScript storefront (frontend) | `codetown-frontend-demo-city.png`, `-tree.png`, `-inspector.png`, `-night-relations.png`, `-zoom.png` |
| `ledger-api` — TypeScript REST backend | `codetown-backend-demo-*.png` (city / night-relations / inspector / tree / zoom) |
| `pixeltools` — Python library + CLI | `codetown-python-demo-*.png` |
| `iso-kit` — reusable TS library with a hub building | `codetown-library-demo-*.png` |
| `bugtown` — diagnostics showcase with real defects | `codetown-diagnostics-demo-*.png` plus `codetown-diagnostics-demo-diagnostics.png` (errors filter showing the genuine syntax finding) |
