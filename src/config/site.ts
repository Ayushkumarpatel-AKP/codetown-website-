export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  version: string;
  creator: {
    name: string;
    credit: string;
  };
  brand: {
    name: string;
    url: string;
  };
  urls: {
    marketplace: string;
    github: string;
    releases: string;
    issues: string;
    production: string;
  };
  quickInstallCommand: string;
  features: {
    id: string;
    title: string;
    badge: string;
    description: string;
    details: string[];
    image: string;
  }[];
  steps: {
    number: string;
    title: string;
    description: string;
    command?: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: 'CodeTown',
  tagline: 'Your Codebase, Reimagined as a City',
  description:
    'Explore your codebase as a living, interactive isometric world inside VS Code. Files become buildings, folders become districts, imports connect the skyline, and diagnostics pinpoint real issues — 100% offline with zero cloud, zero telemetry, and zero AI overhead.',
  version: '0.2.4',
  creator: {
    name: 'AKP',
    credit: 'Made by AKP',
  },
  brand: {
    name: 'EnigmaDev',
    url: 'https://enigmadev.tech',
  },
  urls: {
    // Configurable central links - matches CodeTown repository & marketplace
    marketplace: 'https://marketplace.visualstudio.com/items?itemName=AyushKumarPatel.codetown',
    github: 'https://github.com/Ayushkumarpatel-AKP/CodeTown',
    releases: 'https://github.com/Ayushkumarpatel-AKP/CodeTown/releases',
    issues: 'https://github.com/Ayushkumarpatel-AKP/CodeTown/issues',
    production: 'https://codetown.enigmadev.tech/',
  },
  quickInstallCommand: 'ext install AyushKumarPatel.codetown',
  features: [
    {
      id: 'isometric-city',
      title: 'Codebase as a Living Island',
      badge: 'Deterministic Layout',
      description:
        'Every source file is placed on a bounded isometric island. Hub files tower with greater height, while folders cluster naturally into coherent districts with perimeter roads and green fringe forests.',
      details: [
        'Deterministic collision-free layout — identical repository yields identical city',
        'Large districts safely split into sibling blocks (src·01, src·02) to prevent clutter',
        'Physical road grid carved with verified curb & asphalt connectivity masks',
        'Pan, zoom, fly-to search, and interactive minimap navigation',
      ],
      image: '/assets/screenshots/codetown-city.png',
    },
    {
      id: 'dependency-highways',
      title: 'Verified Dependency Highways',
      badge: 'Interactive Relations',
      description:
        'Toggle the Relations overlay to reveal glowing blue dependency lines connecting caller and callee. Imports are analyzed from real TypeScript, JavaScript, and Python codebases.',
      details: [
        'Distinguishes physical street infrastructure from logical dependency lines',
        'Deep static analysis: masked-source parser ignores comments and string brackets',
        'Detects import cycles and promotes central hubs by graph degree',
        'Day & Night lighting toggle with glowing neon night ambiance',
      ],
      image: '/assets/screenshots/codetown-night-relations.png',
    },
    {
      id: 'skyline-diagnostics',
      title: 'Skyline Diagnostics & Jump-to-Source',
      badge: 'Actionable Insights',
      description:
        'Real bracket, indentation, and syntax issues illuminate buildings in amber and red. Click any building to view its inspector card and jump straight to the source file at the exact recorded line.',
      details: [
        'Inspector displays file path, symbols, incoming/outgoing imports, and diagnostics',
        'Never fabricates errors — every finding carries strict line evidence',
        'One-click jump opens the exact file in VS Code at the recorded line',
        'Incremental fingerprint cache updates your town in 6–8 ms on file save',
      ],
      image: '/assets/screenshots/codetown-diagnostics-demo-diagnostics.png',
    },
    {
      id: 'zero-cloud',
      title: '100% Offline & Customizable Sprites',
      badge: 'Privacy & Control',
      description:
        'Analysis, layout, and rendering run entirely on your local machine. No cloud uploads, no API keys, no telemetry, and full support for custom sprite packs via folder or ZIP.',
      details: [
        'Runs completely offline — no network requests, no telemetry, locked webview CSP',
        'Import custom sprite packs (.zip or folder) with automatic semantic slot mapping',
        'Pixel-verified road tile masks ensure realistic road junctions and corners',
        'Edit mode: drag buildings to customize your town with Ctrl+Z / Ctrl+Y history',
      ],
      image: '/assets/screenshots/codetown-zoom.png',
    },
  ],
  steps: [
    {
      number: '01',
      title: 'Install CodeTown in VS Code',
      description:
        'Install directly from the Visual Studio Marketplace or grab the pre-packaged VSIX from GitHub Releases.',
      command: 'code --install-extension codetown.vsix',
    },
    {
      number: '02',
      title: 'Open Your Project & Launch Town',
      description:
        'Press Ctrl+Shift+P, type "CodeTown: Open Town", and watch local static analysis construct your town in milliseconds.',
      command: 'Ctrl+Shift+P → CodeTown: Open Town',
    },
    {
      number: '03',
      title: 'Navigate, Inspect & Jump to Source',
      description:
        'Explore your city architecture, toggle night & relations modes, search with Ctrl+K, and click any building to edit code.',
    },
  ],
};
