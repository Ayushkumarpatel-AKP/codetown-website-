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
    <section id="hero" className="relative min-h-[calc(100vh-4.5rem)] flex items-center overflow-hidden bg-background pt-16 pb-8 lg:py-10">
      {/* Background Dot Grid Pattern */}
      <div className="absolute inset-0 dot-grid-pattern pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Split 2-Column Responsive Hero: Left = Title & CTAs, Right = 3D Isometric City */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column (5/12): Title, Subtitle, Minecraft Action Buttons in ONE VIEW */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-3.5 sm:space-y-4 lg:space-y-4 text-left">
            {/* Release Version Pill */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 text-teal-700 border border-teal/20 text-xs font-medium shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
                </span>
                Now Available for VS Code · v{siteConfig.version}
              </span>
            </div>

            {/* Main Punchy Heading - Formatted for 3 Clean Lines */}
            <h1 className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[44px] font-bold text-foreground leading-[1.12] font-display tracking-tight text-balance">
              Your Codebase, Reimagined as an{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-teal-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                  Interactive City
                </span>
                <span className="absolute bottom-1 left-0 h-2.5 w-full bg-gradient-to-r from-teal/20 to-cyan-400/20 -z-0 rounded-sm"></span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
              Turn your complex repository into a living isometric island.
              Files become buildings, imports connect districts, and diagnostics light up the skyline —{' '}
              <span className="text-foreground font-semibold">100% offline</span> with zero cloud or telemetry.
            </p>

            {/* Action Buttons - Always Visible in One View Above the Fold! */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
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

            {/* Creator Attribution */}
            <div className="flex items-center gap-2.5 pt-2 text-xs text-muted-foreground border-t border-slate-200/80">
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

          {/* Right Column (7/12): Proportionate & Clean 3D Isometric Scene Card */}
          <div className="lg:col-span-7 xl:col-span-7 flex justify-center items-center">
            <HeroIsometricScene />
          </div>

        </div>
      </div>
    </section>
  );
};
