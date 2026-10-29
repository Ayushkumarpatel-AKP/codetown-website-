export const site = {
  name: 'CodeTown',
  version: '0.10.3',
  tagline: 'Your codebase as a living city. Command a crew of AI characters from a game HUD, and undo anything they break.',
  urls: {
    marketplace: 'https://marketplace.visualstudio.com/items?itemName=AyushKumarPatel.codetown',
    // opens VS Code on the extension page, where one click installs it
    vscode: 'vscode:extension/AyushKumarPatel.codetown',
    github: 'https://github.com/Ayushkumarpatel-AKP/CodeTown',
    releases: 'https://github.com/Ayushkumarpatel-AKP/CodeTown/releases',
    vsix: '/downloads/codetown.vsix',
    issues: 'https://github.com/Ayushkumarpatel-AKP/CodeTown/issues',
  },
  install: 'code --install-extension AyushKumarPatel.codetown',
};

/** The person behind CodeTown. */
export const maker = {
  name: 'Ayush Kumar Patel',
  role: 'Founder & CEO',
  company: 'EnigmaDev',
  brand: 'https://www.enigmadev.tech/',
  github: 'https://github.com/Ayushkumarpatel-AKP',
  linkedin: 'https://www.linkedin.com/in/ayush-kumar-patel-50276a281/',
  email: 'ayushkumarpatel969@gmail.com',
};

export interface Character {
  id: string;
  name: string;
  title: string;
  blurb: string;
  effort: string;
  tier: string;
  readOnly: boolean;
  prompts: string[];
}

/** Mirrors src/crew/characters.ts in the extension (trimmed to what the site shows). */
export const crew: Character[] = [
  { id: 'scout', name: 'Scout', title: 'Explorer', effort: 'low', tier: 'fast model', readOnly: true,
    blurb: 'Explores the codebase and explains how it works. Never edits anything.',
    prompts: ['Give me a tour', 'Where is it?', 'How do I run it?', 'Riskiest files'] },
  { id: 'architect', name: 'Archie', title: 'Architect', effort: 'high', tier: 'big model', readOnly: true,
    blurb: 'Designs big changes before anyone builds them: plans, trade-offs, step lists.',
    prompts: ['Plan a refactor', 'Design a feature', 'Untangle imports', 'Speed it up'] },
  { id: 'builder', name: 'Builder', title: 'Feature builder', effort: 'medium', tier: 'mid model', readOnly: false,
    blurb: 'Implements features in small, checked steps and asks before it edits.',
    prompts: ['Add a feature', 'Add an endpoint', 'Change behavior', 'Migrate'] },
  { id: 'fixer', name: 'Fixer', title: 'Bug hunter', effort: 'high', tier: 'mid model', readOnly: false,
    blurb: 'Finds the root cause of a bug and fixes it, with a test that proves it.',
    prompts: ['Fix failing tests', 'Explain this error', 'Hunt a bug here', 'Clean type errors'] },
  { id: 'tester', name: 'Tester', title: 'Test writer', effort: 'medium', tier: 'mid model', readOnly: false,
    blurb: 'Writes and runs tests, and reproduces bugs as failing tests.',
    prompts: ['Test this file', 'Cover the risky part', 'Reproduce a bug', 'Run and summarise'] },
  { id: 'reviewer', name: 'Reviewer', title: 'Code reviewer', effort: 'high', tier: 'mid model', readOnly: true,
    blurb: 'Reviews code like a careful teammate: bugs, security, missing cases.',
    prompts: ['Review my changes', 'Review this file', 'Security check', 'Review this PR'] },
  { id: 'scribe', name: 'Scribe', title: 'Docs writer', effort: 'low', tier: 'fast model', readOnly: false,
    blurb: 'Writes docs, comments and changelogs from the real code.',
    prompts: ['Explain a module', 'Add docstrings', 'Write release notes', 'Quick start'] },
  { id: 'runner', name: 'Runner', title: 'Errand runner', effort: 'low', tier: 'fast model', readOnly: false,
    blurb: 'Fast and cheap for small jobs: renames, formatting, tidy-ups.',
    prompts: ['Rename', 'Remove dead code', 'Tidy imports', 'Fix typos'] },
];

export const shots = [
  { id: 'hall', label: 'Crew Hall', src: '/assets/screenshots/hud-hall.png', note: 'Archie on his stage: level, stats and starter prompts. The whole crew is one click away.' },
  { id: 'report', label: 'Mission report', src: '/assets/screenshots/hud-report.png', note: 'Files changed, Undo, test results, and a reverted order. All in the crew list.' },
  { id: 'city', label: 'Modern', src: '/assets/screenshots/hud-city.png', note: 'Landmarks, roads and rivers built from your folders. Every building is a real file.' },
  { id: 'hifi', label: 'Hi-fi', src: '/assets/screenshots/hud-hifi.png', note: 'Neon towers, helipads and glowing windows for big repositories.' },
  { id: 'village', label: 'Village', src: '/assets/screenshots/hud-village.png', note: 'Cottages and cobbles for small projects. Same data, different art.' },
  { id: 'night', label: 'Night + relations', src: '/assets/screenshots/hud-night.png', note: 'Night lighting with import lines drawn between buildings.' },
  { id: 'crews', label: 'Crews at work', src: '/assets/screenshots/hud-crews.png', note: 'Cranes on live construction sites, heat on busy files, a permit waiting for your stamp.' },
  { id: 'inspector', label: 'Inspector', src: '/assets/screenshots/hud-inspector.png', note: 'Symbols, imports and findings for any building, with a jump to the exact line.' },
];

export const features = [
  { tag: 'MAP', title: 'Files are buildings', text: 'Folders become districts, big folders become landmarks. The layout is deterministic: the same repo always builds the same city.' },
  { tag: 'CREW', title: 'Eight characters, ready to work', text: 'Each has a pixel face, a job, a thinking level and four starter prompts. Scout, Archie and Reviewer are read-only by design.' },
  { tag: 'LIVE', title: 'Watch construction', text: 'Cranes rise over the files a crew edits. Busy files glow with heat from git history. Errors bring rain.' },
  { tag: 'SAFE', title: 'You stamp every risky move', text: 'Permits show exactly what a crew wants to run. STAMP or DENY. A spend cap and a HALT button stop runaway work.' },
  { tag: 'UNDO', title: 'One-click Undo', text: 'A restore point is taken before an editing crew starts. Undo puts every changed file back and removes new ones, and keeps your own uncommitted work.' },
  { tag: 'TESTS', title: 'Tests in the report', text: 'Run your tests from the mission report, or automatically after each order. PASS or FAIL with the output, right under the files that changed.' },
  { tag: 'LEVEL', title: 'Characters level up', text: 'Every finished order earns its character experience. See speed, depth, safety and cost bars on each stage.' },
  { tag: 'PR', title: 'Pull-request cities', text: 'Every open PR becomes its own read-only city with added, changed and removed buildings marked.' },
  { tag: 'ENGINE', title: 'Bring any model', text: 'Claude Agent SDK, OpenCode with free models, Groq, OpenRouter, Gemini, Ollama, LM Studio or any OpenAI-compatible server. Pick the model from a live list.' },
];

export const engines: { name: string; free: boolean }[] = [
  { name: 'Claude Agent SDK', free: false }, { name: 'OpenCode', free: true }, { name: 'Groq', free: true },
  { name: 'OpenRouter', free: true }, { name: 'Gemini', free: true }, { name: 'Cerebras', free: true },
  { name: 'Mistral', free: false }, { name: 'Together', free: false }, { name: 'OpenAI', free: false },
  { name: 'Ollama (local)', free: true }, { name: 'LM Studio (local)', free: true }, { name: 'Custom endpoint', free: false },
];
