import React from 'react';
import { Layers, GitFork, AlertTriangle, FolderTree, Sparkles, ShieldCheck } from 'lucide-react';

interface FeatureCard {
  id: string;
  icon: React.ReactNode;
  theme: 'teal' | 'coral' | 'gold';
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}

const FEATURES: FeatureCard[] = [
  {
    id: 'layout',
    icon: <Layers className="w-6 h-6" />,
    theme: 'teal',
    title: 'Deterministic Island Layout',
    description:
      'Files become buildings, folders become districts. Identical repository scans always yield identical coordinates without random floating blocks.',
    stat: '< 22ms',
    statLabel: 'avg layout time',
  },
  {
    id: 'relations',
    icon: <GitFork className="w-6 h-6" />,
    theme: 'coral',
    title: 'Verified Dependency Highways',
    description:
      'Toggle the Relations overlay to trace true import paths in glowing blue. Street tiles carry physical traffic, while relations reveal architecture.',
    stat: 'TS + Python',
    statLabel: 'deep import graphs',
  },
  {
    id: 'diagnostics',
    icon: <AlertTriangle className="w-6 h-6" />,
    theme: 'gold',
    title: 'Skyline Diagnostics',
    description:
      'Real bracket, indentation, and syntax findings illuminate buildings in amber and red. Every finding carries strict line evidence.',
    stat: 'Zero Fake Bugs',
    statLabel: 'strict line evidence',
  },
  {
    id: 'districts',
    icon: <FolderTree className="w-6 h-6" />,
    theme: 'teal',
    title: 'Sibling District Splitting',
    description:
      'Large folders holding >256 files automatically divide into compact sibling blocks (src·01, src·02) to keep the town human-navigable.',
    stat: '≤ 256 files',
    statLabel: 'capacity per block',
  },
  {
    id: 'sprites',
    icon: <Sparkles className="w-6 h-6" />,
    theme: 'coral',
    title: 'Custom Sprite Importer',
    description:
      'Import local folder or .zip packs. Road tiles are mapped using pixel-verified curb luminance and alpha masks for true road junctions.',
    stat: 'Folder / .ZIP',
    statLabel: 'pixel-verified masks',
  },
  {
    id: 'privacy',
    icon: <ShieldCheck className="w-6 h-6" />,
    theme: 'gold',
    title: '100% Offline & Private',
    description:
      'No cloud uploads, no telemetry, no API keys, and zero LLM overhead. Analysis and Canvas2D rendering run completely locally.',
    stat: 'Zero Cloud',
    statLabel: 'locked webview CSP',
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-4 font-mono">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance font-display tracking-tight">
            Everything you need to <span className="text-teal">understand your code</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From deterministic layout to pixel-verified road connectivity, CodeTown turns abstract project trees into a tangible developer world.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => {
            const isTeal = f.theme === 'teal';
            const isCoral = f.theme === 'coral';

            return (
              <div
                key={f.id}
                className={`group relative p-6 rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-xl ${
                  isTeal
                    ? 'hover:border-teal/40 hover:shadow-teal/5'
                    : isCoral
                    ? 'hover:border-coral/40 hover:shadow-coral/5'
                    : 'hover:border-gold/40 hover:shadow-gold/5'
                }`}
              >
                {/* Icon Container */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                    isTeal
                      ? 'bg-teal/10 text-teal-600'
                      : isCoral
                      ? 'bg-coral/15 text-coral-600'
                      : 'bg-gold/15 text-amber-600'
                  }`}
                >
                  {f.icon}
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2 font-display">
                  {f.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                  {f.description}
                </p>

                {/* Bottom Stat Pill */}
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                    isTeal
                      ? 'bg-teal/10 border-teal/20'
                      : isCoral
                      ? 'bg-coral/10 border-coral/20'
                      : 'bg-gold/10 border-gold/20'
                  }`}
                >
                  <span
                    className={`text-sm font-bold font-mono ${
                      isTeal
                        ? 'text-teal-600'
                        : isCoral
                        ? 'text-coral-600'
                        : 'text-amber-600'
                    }`}
                  >
                    {f.stat}
                  </span>
                  <span className="text-xs text-muted-foreground font-sans">
                    {f.statLabel}
                  </span>
                </div>

                {/* Subtle Hover Blur Glow */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10 blur-xl ${
                    isTeal ? 'bg-teal/15' : isCoral ? 'bg-coral/15' : 'bg-gold/15'
                  }`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
