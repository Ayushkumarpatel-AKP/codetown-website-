import React from 'react';
import { siteConfig } from '../config/site';
import { HeroIsometricScene } from './HeroIsometricScene';
import { MinecraftButton } from './MinecraftButton';
import { Download } from 'lucide-react';
import { GithubIcon } from './Icons';

interface HeroProps {
  onOpenInstall: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInstall }) => {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-background pt-20 pb-12 lg:py-20">
      {/* Background Dot Grid Pattern */}
      <div className="absolute inset-0 dot-grid-pattern pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Split 2-Column Hero Layout: Left = Title & CTAs, Right = 3D Isometric City */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column (5/12 on large screens): Headline, Subtitle, Minecraft Buttons */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Release Version Pill */}
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal/10 text-teal-700 border border-teal/20 text-xs font-medium shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
                </span>
                Now Available for VS Code · v{siteConfig.version}
              </span>
            </div>

            {/* Main Punchy Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.08] font-display tracking-tighter">
              Your Codebase, Reimagined as an{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-teal-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                  Interactive City
                </span>
                <span className="absolute bottom-1 left-0 h-3 w-full bg-gradient-to-r from-teal/20 to-cyan-400/20 -z-0 rounded-sm"></span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Turn your complex repository into a living isometric island.
              Files become buildings, imports connect districts, and diagnostics light up the skyline —{' '}
              <span className="text-foreground font-semibold">100% offline</span> with zero cloud or telemetry.
            </p>

            {/* Minecraft-style Tactile 3D Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <MinecraftButton
                variant="teal"
                size="md"
                onClick={onOpenInstall}
                icon={<Download className="w-4 h-4 text-white" />}
              >
                Install for VS Code
              </MinecraftButton>

              <MinecraftButton
                variant="dark"
                size="md"
                onClick={() => window.open(siteConfig.urls.github, '_blank')}
                icon={<GithubIcon className="w-4 h-4 text-slate-300" />}
              >
                Explore on GitHub
              </MinecraftButton>
            </div>

            {/* Creator Attribution & Badges */}
            <div className="flex items-center gap-3 pt-3 text-xs text-muted-foreground border-t border-slate-200/80">
              <span className="font-semibold text-foreground">{siteConfig.creator.credit}</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-600">{siteConfig.brand.name}</span>
              <span className="text-slate-300">•</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-semibold border border-slate-200">
                MIT License
              </span>
              <span className="text-slate-300">•</span>
              <span className="font-mono text-[10px] text-teal-600 font-bold">
                0 Telemetry
              </span>
            </div>
          </div>

          {/* Right Column (7/12 on large screens): Compact 3D Isometric City Scene */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <HeroIsometricScene />
          </div>

        </div>
      </div>
    </section>
  );
};
