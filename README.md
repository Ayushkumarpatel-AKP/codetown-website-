<div align="center">
  <img src="https://raw.githubusercontent.com/Ayushkumarpatel-AKP/CodeTown/main/assets/brand/codetown-logo.png" width="180" alt="CodeTown logo">
  <h1>CodeTown</h1>
  <p><b>Your codebase as a living isometric city, and a crew of eight AI characters you command from a game HUD.</b><br>
  Files become buildings · folders become districts · imports become roads · crews build, review and fix while you watch.<br>
  <i>Made by Ayush Kumar Patel (AKP), Founder &amp; CEO of <a href="https://www.enigmadev.tech/">EnigmaDev</a></i></p>

  <p>
    <a href="https://marketplace.visualstudio.com/items?itemName=AyushKumarPatel.codetown"><img src="https://img.shields.io/badge/VS%20Marketplace-AyushKumarPatel.codetown-007acc?logo=visual-studio-code" alt="Visual Studio Marketplace"></a>
    <a href="https://github.com/Ayushkumarpatel-AKP/CodeTown/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License"></a>
    <a href="https://codetown.enigmadev.tech/"><img src="https://img.shields.io/badge/Website-codetown.enigmadev.tech-34d3bd.svg" alt="Website"></a>
  </p>

  <p>
    <a href="https://marketplace.visualstudio.com/items?itemName=AyushKumarPatel.codetown"><b>Install from the Marketplace</b></a> ·
    <a href="https://codetown.enigmadev.tech/">Website</a> ·
    <a href="https://github.com/Ayushkumarpatel-AKP/CodeTown/releases">Download the VSIX</a>
  </p>

  <br>
  <img src="https://raw.githubusercontent.com/Ayushkumarpatel-AKP/CodeTown/main/docs/screenshots/codetown-hall.png" width="900" alt="CodeTown: the city with the Crew Hall open, showing Archie on his stage">
</div>

---

CodeTown scans your workspace locally and renders it as a bounded isometric island inside VS Code. Click a building and the **real file opens at the recorded line**. Then pick a character, give an order, and watch cranes rise over the files it edits. Everything on screen, including every character's face, is drawn in code.

## Meet the crew

Eight ready-made characters, each with a pixel face that follows the real state of its work (idle, working, waiting for your permit, done, failed), a job, a thinking level and four starter prompts. Open **Crew → Hall**, pick one, press a prompt, press **DISPATCH**.

| Character | Role | Good for |
|---|---|---|
| **Scout** | Explorer, **read-only** | onboarding, "where is X", how to run it |
| **Archie** | Architect, **read-only** | plans, refactors, trade-offs |
| **Builder** | Feature builder | everyday features, asks before editing |
| **Fixer** | Bug hunter | failing tests, error messages, root causes |
| **Tester** | Test writer | tests, reproducing bugs |
| **Reviewer** | Code reviewer, **read-only** | reviewing your diff, security checks |
| **Scribe** | Docs writer | README, docstrings, release notes |
| **Runner** | Errand runner | renames, tidy-ups, fast and cheap |

Characters earn **experience** (one point per finished order, a level every three) and show speed / depth / safety / cost bars on their stage. Read-only characters can never edit: the extension enforces plan mode and removes the write tools, whatever you choose in the order bar.

![The Crew Hall](https://raw.githubusercontent.com/Ayushkumarpatel-AKP/CodeTown/main/docs/screenshots/codetown-hall.png)

## Stay in control: mission reports, Undo and tests

When a crew finishes an order, its card becomes a **mission report**: files changed (click one to fly to that house on the map), files read, time and spend, and the experience earned.

- **Undo changes.** Before an editing crew starts, CodeTown takes a restore point (`git stash create`, which touches nothing). One button (press twice to confirm) restores every file the crew changed or deleted, removes files it created, and keeps your own earlier uncommitted work. Needs a git repository with a commit.
- **Run tests.** Run your project's tests from the report and see PASS or FAIL with the output. Uses `codetown.crew.testCommand`, or `npm test` / `pytest -q` when the project clearly has them. Turn on `codetown.crew.runTestsAfterOrder` to run them automatically. Only your user settings choose the command, never a workspace file, and nothing runs in an untrusted workspace.
- **Plan, then execute.** Ask Archie for a plan, then press **Execute this plan** to hand it to Builder.
- **Permits.** Risky actions raise a permit you **STAMP** or **DENY**. A spend cap and a **HALT** button stop runaway work.

![Mission reports with Undo and test results](https://raw.githubusercontent.com/Ayushkumarpatel-AKP/CodeTown/main/docs/screenshots/codetown-report.png)

## The city

![Modern city](https://raw.githubusercontent.com/Ayushkumarpatel-AKP/CodeTown/main/docs/screenshots/codetown-city.png)

| Village | Hi-fi city |
|---|---|
| ![Village](https://raw.githubusercontent.com/Ayushkumarpatel-AKP/CodeTown/main/docs/screenshots/codetown-village-city.png) | ![Hi-fi city](https://raw.githubusercontent.com/Ayushkumarpatel-AKP/CodeTown/main/docs/screenshots/codetown-hifi-city.png) |

- **Three styles** (the **Style** button or `codetown.theme`): Village, Modern, Hi-fi. Each has its own catalog of about 80 building types, rivers with bridges, mountains, clouds, boats. A file becomes the kind of building it is: tests become schools, logging a hospital, auth a police station, docs a library.
- **Landmarks.** Big repositories collapse into about `codetown.landmarkBudget` buildings; click a landmark to open the folder.
- **Live construction.** Cranes and hard-hat workers over the files a crew is editing; **Heat** shows recent activity and git churn; errors bring rain.
- **PR cities.** Every open pull request becomes a read-only city with added, changed and removed buildings marked (needs `gh auth login`).
- **Relations.** Draw every resolved import, switch to night.

![Night with relations](https://raw.githubusercontent.com/Ayushkumarpatel-AKP/CodeTown/main/docs/screenshots/codetown-night-relations.png)

![Crews at work: cranes on live construction sites, a permit waiting](https://raw.githubusercontent.com/Ayushkumarpatel-AKP/CodeTown/main/docs/screenshots/codetown-crews.png)

## Pick your engine (free options included)

Choose the engine in **Options** and pick the model from a live list, or type any model name.

| Provider | Cost | Permits | Needs |
|---|---|---|---|
| **OpenCode** | free hosted models | no (own rules) | `npm i -g opencode-ai` |
| **Groq** | free tier | yes | free key from console.groq.com |
| **OpenRouter** | free `:free` models | yes | free key from openrouter.ai |
| **Google Gemini** | free tier | yes | free key from aistudio.google.com |
| **Cerebras** | free tier | yes | key from cloud.cerebras.ai |
| **Ollama / LM Studio** | free, local | yes | a local server with a tool-capable model |
| Mistral, Together, OpenAI | paid / check terms | yes | your key |
| **Claude** (Agent SDK) | paid | yes + spend cap | Anthropic key + the [Claude Code CLI](https://code.claude.com) |
| Custom | any | yes | an OpenAI-compatible URL |

If a model's provider fails before answering, OpenCode crews automatically try other free models. Free tiers and model names change. Keys live in VS Code secret storage. File contents are sent to the provider you pick, and secret files (`.env`, keys) are never read. Without any key CodeTown still works as a code map.

## Inspect and diagnose

Search with `Ctrl+K`, filter by errors or language, open the inspector for symbols, imports in and out, and findings, and jump to the exact line. Findings are listed from real evidence, never invented.

![Inspector](https://raw.githubusercontent.com/Ayushkumarpatel-AKP/CodeTown/main/docs/screenshots/codetown-inspector.png)

![Diagnostics](https://raw.githubusercontent.com/Ayushkumarpatel-AKP/CodeTown/main/docs/screenshots/codetown-diagnostics.png)

## Features

- **Responsive Game HUD**: drawers open on demand, one slim order line, works from a narrow panel to an ultrawide screen.
- **Isometric visualization**: deterministic layout (the same repo always builds the same city), verified road connectivity, street furniture.
- **Navigation**: Districts and Files panels, breadcrumbs, minimap click-to-go, fly-to search.
- **Edit mode**: drag buildings to rearrange; saved per workspace, `Ctrl+Z` / `Y`.
- **Activity-bar home view** with the CodeTown logo, quick actions and the crew list.
- **Accessibility**: keyboard navigation, `prefers-reduced-motion`, ARIA announcements.
- **Local analysis**: scanning, layout and rendering never leave your machine.

<details>
<summary><b>Try the demo cities</b>: five sample repos in <code>demos/</code> that each render a different town</summary>

Open any folder below in VS Code and run **CodeTown: Open Town**:

- `sunny-cart` TypeScript storefront · `ledger-api` TS REST backend ·
  `pixeltools` Python library + CLI · `iso-kit` TS library (hub building) ·
  `bugtown` diagnostics showcase with real defects

</details>

## Install

### Method 1 · Direct Visual Studio Code Marketplace
- **One-click:** press **Install** on the [Marketplace page](https://marketplace.visualstudio.com/items?itemName=AyushKumarPatel.codetown), or use the **Install in VS Code** button on [codetown.enigmadev.tech](https://codetown.enigmadev.tech/). It opens VS Code on the CodeTown page (`vscode:extension/AyushKumarPatel.codetown`).
- **CLI Install:**
  ```sh
  code --install-extension AyushKumarPatel.codetown
  ```
- **VS Code UI:** Press `Ctrl+Shift+X` and search `CodeTown` (by `AyushKumarPatel`).

### Method 2 · Manual VSIX Package
1. Download `codetown.vsix` from [Releases](https://github.com/Ayushkumarpatel-AKP/CodeTown/releases) (or build locally: `npm run package`).
2. VS Code → *Extensions* (`Ctrl+Shift+X`) → *⋯* (top right menu) → **Install from VSIX...**
3. Open any workspace and run **CodeTown: Open Town** (`Ctrl+Shift+P`).

## Usage

`Ctrl+Shift+P` → **CodeTown: Open Town** (`codetown.openTown`) · **CodeTown: Full Rescan** (`codetown.fullRescan`) · **CodeTown: Show Asset Library** (`codetown.showAssetLibrary`). All art is drawn in code — nothing to import.
Settings: `codetown.theme`, `codetown.landmarkBudget`, `codetown.autoOpen`, `codetown.maxFiles`, `codetown.additionalExcludes`, `codetown.respectGitignore` (full `.gitignore` syntax incl. nested files), `codetown.includeAllFiles`.

## Development

TypeScript and a plain Canvas2D webview. The Claude crew engine bundles the Claude Agent SDK.

```sh
npm install
npm run compile   # extension + webview
npm test          # 130 tests
npm run package   # codetown.vsix
```

```
src/analysis    scanner · TS/JS + Python adapters · import graph · sprite-PNG masks
src/assets      procedural sprite tables · legacy pack importer (dev-only)
src/layout      landmark aggregation · district engine · themes · environment (rivers, bridges) · isometric projection
src/crew        crew sessions · engines (Claude SDK, OpenAI-compatible, OpenCode) · providers · permits · PR cities · git churn
src/webview     HUD shell · panel CSP bootstrap · Canvas2D renderer (client · scenery · sidebar · inspector · minimap · procart*.ts procedural art)
demos/          synthetic demo repos (excluded from default scans)
```

## Roadmap & limitations

**Next:** Go/Rust/Java adapters, per-symbol buildings, richer procedural props.
**Limits:** TS/JS + Python import graphs (other languages render, imports stay blank); only source/config files become buildings (`codetown.includeAllFiles` shows everything); 5000-file cap (`codetown.maxFiles`) with a visible heads-up; night mode is a scene tint.

## Credits & license

Code under **MIT** — © 2026 AKP ([LICENSE](LICENSE)). All art is procedural and ships as code — no third-party assets ([LICENSE-ASSETS.md](LICENSE-ASSETS.md)). Demo repos in `demos/` are written from scratch.

<div align="center">
  <b>Made by Ayush Kumar Patel (AKP)</b> · Founder &amp; CEO of <a href="https://www.enigmadev.tech/">EnigmaDev</a><br>
  <a href="https://github.com/Ayushkumarpatel-AKP">GitHub</a> · <a href="https://www.linkedin.com/in/ayush-kumar-patel-50276a281/">LinkedIn</a> · <a href="mailto:ayushkumarpatel969@gmail.com">ayushkumarpatel969@gmail.com</a> · <a href="https://github.com/Ayushkumarpatel-AKP/CodeTown/issues">Issues</a>
</div>


---

<details>
<summary><b>About this repository</b></summary>

This repository is the CodeTown website (React, TypeScript, Vite). The extension itself lives in [Ayushkumarpatel-AKP/CodeTown](https://github.com/Ayushkumarpatel-AKP/CodeTown). Run the site with `npm install` and `npm run dev`; `npm run build` makes `dist/`. `src/lib/faces.ts` is a copy of the extension's `src/webview/faces.ts`.

</details>
