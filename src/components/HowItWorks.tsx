import React, { useState } from 'react';
import { Terminal, Copy, Check, ArrowRight, Download, Play, Compass } from 'lucide-react';

interface HowItWorksProps {
  onOpenInstall: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenInstall }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      number: '01',
      title: 'Install in VS Code',
      description:
        'Install CodeTown directly from the Visual Studio Marketplace or grab the verified VSIX release.',
      command: 'code --install-extension codetown.vsix',
      icon: <Download className="w-5 h-5 text-teal" />,
    },
    {
      number: '02',
      title: 'Launch CodeTown: Open Town',
      description:
        'Open any local project in VS Code and run the command. Analysis runs locally in under 1.5 seconds.',
      command: 'Ctrl+Shift+P → CodeTown: Open Town',
      icon: <Play className="w-5 h-5 text-coral" />,
    },
    {
      number: '03',
      title: 'Explore, Search & Jump to Source',
      description:
        'Pan, zoom, search symbols with Ctrl+K, toggle night/relations modes, and click any building to edit code.',
      icon: <Compass className="w-5 h-5 text-amber-500" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-4 font-mono">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance font-display tracking-tight">
            Up and running in <span className="text-teal">three steps</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Zero cloud configuration, zero telemetry, and zero complicated server setups.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between hover:border-teal/40 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 rounded-xl bg-teal/10 text-teal-600 font-mono font-bold text-lg flex items-center justify-center">
                    {step.number}
                  </span>
                  <div className="p-2 rounded-lg bg-muted">{step.icon}</div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 font-display">
                  {step.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {step.command ? (
                <div className="p-3 rounded-lg bg-muted border border-border flex items-center justify-between font-mono text-xs text-foreground">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <Terminal className="w-3.5 h-3.5 text-teal flex-shrink-0" />
                    <span className="truncate">{step.command}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(step.command!, idx)}
                    className="p-1 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 cursor-pointer"
                    title="Copy command"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-teal" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ) : (
                <div className="pt-2">
                  <button
                    onClick={onOpenInstall}
                    className="text-xs font-mono font-bold text-teal hover:text-teal/80 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View extension quick-start</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
