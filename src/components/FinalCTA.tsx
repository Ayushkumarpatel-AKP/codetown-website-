import React from 'react';
import { siteConfig } from '../config/site';
import { Sparkles, Download } from 'lucide-react';
import { GithubIcon } from './Icons';
import { MinecraftButton } from './MinecraftButton';

interface FinalCTAProps {
  onOpenInstall: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenInstall }) => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="relative rounded-3xl bg-foreground p-12 lg:p-20 overflow-hidden text-center text-background shadow-2xl">
          {/* Glowing teal & coral background blur orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-coral/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/20 text-teal text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-teal" />
              <span>VS Code Extension Ready</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6 text-balance font-display tracking-tight">
              Ready to give your codebase a{' '}
              <span className="text-teal">place to live</span>?
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-background/70 mb-10 leading-relaxed max-w-2xl mx-auto">
              Transform abstract directory trees into an intuitive, vibrant city your entire team can understand at a glance.
              Install once, open any workspace, and explore offline.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MinecraftButton
                variant="teal"
                size="lg"
                onClick={onOpenInstall}
                icon={<Download className="w-5 h-5 text-white" />}
              >
                Get Started Free
              </MinecraftButton>

              <MinecraftButton
                variant="dark"
                size="lg"
                onClick={() => window.open(siteConfig.urls.github, '_blank')}
                icon={<GithubIcon className="w-5 h-5 text-slate-300" />}
              >
                Explore on GitHub
              </MinecraftButton>
            </div>

            {/* Bullet Trust Details */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-background/60 text-sm font-mono">
              <span>100% Offline</span>
              <span className="hidden sm:inline">•</span>
              <span>Zero Telemetry</span>
              <span className="hidden sm:inline">•</span>
              <span>MIT Licensed</span>
              <span className="hidden sm:inline">•</span>
              <span>Made by {siteConfig.creator.name}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
