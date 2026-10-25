import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, FileCode, Check, FolderGit2 } from 'lucide-react';

interface PreviewTab {
  id: string;
  name: string;
  badge: string;
  description: string;
  image: string;
  highlights: string[];
}

const TABS: PreviewTab[] = [
  {
    id: 'full-city',
    name: 'codetown-city.ts',
    badge: 'Whole Island',
    description: 'The entire repository mapped as an isometric island. Pan, zoom, search, and minimap navigation.',
    image: '/assets/screenshots/codetown-city.png',
    highlights: ['Deterministic 2:1 projection', 'Perimeter avenues', 'Sibling district blocks'],
  },
  {
    id: 'night-relations',
    name: 'relations-overlay.ts',
    badge: 'Night Ambiance',
    description: 'Night ambiance mode with glowing blue dependency lines connecting caller and callee modules.',
    image: '/assets/screenshots/codetown-night-relations.png',
    highlights: ['Resolved TS/JS/Python imports', 'Cycle indicators', 'Cyber-noir night tint'],
  },
  {
    id: 'diagnostics',
    name: 'diagnostics-inspector.py',
    badge: 'Syntax Findings',
    description: 'Real syntax, bracket, and indentation diagnostics illuminate buildings in warning colors.',
    image: '/assets/screenshots/codetown-diagnostics-demo-diagnostics.png',
    highlights: ['Masked parser eliminates false positives', 'Exact recorded lines', 'Jump straight to file'],
  },
  {
    id: 'inspector',
    name: 'symbol-inspector.ts',
    badge: 'Inspector Card',
    description: 'Detailed inspection cards with symbols, line counts, fan-in, and incoming/outgoing import lists.',
    image: '/assets/screenshots/codetown-inspector.png',
    highlights: ['Extracted methods & classes', 'In/Out dependency counts', '1-click open at line'],
  },
  {
    id: 'zoom-detail',
    name: 'pixel-detail.ts',
    badge: 'Pixel Fidelity',
    description: 'High-magnification view showing pixel-verified road tiles, streetlights, and moving vehicles.',
    image: '/assets/screenshots/codetown-zoom.png',
    highlights: ['Pixel-verified road masks', 'Local sprite pack importer', 'Crisp pixel fidelity'],
  },
];

const DEMO_REPOSITORIES = [
  { name: 'sunny-cart', lang: 'TypeScript', desc: 'Storefront UI with components & checkout state' },
  { name: 'ledger-api', lang: 'TypeScript', desc: 'REST backend with controllers & database models' },
  { name: 'pixeltools', lang: 'Python', desc: 'Image CLI with numpy processing pipelines' },
  { name: 'bugtown', lang: 'Python/TS', desc: 'Real diagnostics testbed with syntax error beacons' },
];

export const ProductPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const currentTab = TABS[activeTab];

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 130));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 85));
  const handleResetZoom = () => setZoomLevel(100);

  return (
    <section id="preview" className="py-24 lg:py-32 bg-muted/40 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card text-foreground border border-border text-sm font-medium mb-4 font-mono shadow-sm">
            Product Preview
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance font-display tracking-tight">
            Inside the <span className="text-teal">VS Code Extension</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Authentic screenshots captured directly from CodeTown running inside Visual Studio Code.
          </p>
        </div>

        {/* Refined VS Code Editor Container */}
        <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden max-w-5xl mx-auto">
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0F172A] text-slate-300 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block"></span>
              <span className="text-xs text-slate-400 font-mono ml-2 hidden sm:inline">
                CodeTown Webview — Visual Studio Code
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded-lg px-2 py-1 text-xs font-mono">
              <button
                onClick={handleZoomOut}
                className="p-1 hover:text-teal transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="px-1.5 text-[11px] hover:text-teal transition-colors flex items-center gap-1"
                title="Reset Zoom"
              >
                <span>{zoomLevel}%</span>
                <RotateCcw className="w-2.5 h-2.5 opacity-60" />
              </button>
              <button
                onClick={handleZoomIn}
                className="p-1 hover:text-teal transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Editor Tabs Bar */}
          <div className="flex items-center gap-1 px-3 pt-2 bg-[#1E293B] border-b border-slate-800 overflow-x-auto no-scrollbar">
            {TABS.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono rounded-t-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-card text-foreground font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-teal' : 'text-slate-500'}`} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Webview Canvas Viewport */}
          <div className="relative bg-[#020617] p-4 sm:p-6 min-h-[380px] sm:min-h-[500px] flex items-center justify-center overflow-hidden">
            <div
              className="relative rounded-xl overflow-hidden shadow-inner transition-transform duration-300 ease-out"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              <img
                src={currentTab.image}
                alt={currentTab.name}
                className="w-full h-auto max-h-[540px] object-contain rounded-xl"
              />
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="px-6 py-4 bg-card border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">{currentTab.description}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {currentTab.highlights.map((h, hIdx) => (
                  <span
                    key={hIdx}
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-teal/10 text-teal-600 border border-teal/20"
                  >
                    <Check className="w-3 h-3 text-teal" />
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 text-right sm:text-right">
              <span className="text-[11px] font-mono text-muted-foreground block">
                Local Workspace Scan
              </span>
              <span className="text-xs font-mono font-bold text-teal flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
                100% Offline Active
              </span>
            </div>
          </div>
        </div>

        {/* Demo Repositories Grid */}
        <div className="mt-12 bg-card border border-border rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-amber-600 flex items-center justify-center">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-foreground font-display">
                  5 Pre-Built Demo Cities Included
                </h4>
                <p className="text-xs text-muted-foreground">
                  Shipped in <code className="font-mono text-teal">demos/</code> — open any folder in VS Code to test without configuring your own repo.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full self-start sm:self-center">
              Zero Config Required
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEMO_REPOSITORIES.map((repo, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-background border border-border hover:border-teal/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-xs text-foreground">{repo.name}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal/10 text-teal-600 border border-teal/20">
                    {repo.lang}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{repo.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
