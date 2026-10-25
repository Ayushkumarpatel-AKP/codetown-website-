import React from 'react';
import { siteConfig } from '../config/site';
import { GithubIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10 border-t border-background/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center">
                <img
                  src="/assets/brand/icon.png"
                  alt="CodeTown"
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-background font-display">
                CodeTown
              </span>
            </div>
            <p className="text-sm text-background/70 max-w-sm leading-relaxed">
              Explore your codebase as a living isometric city inside VS Code.
              100% local static analysis, zero cloud, zero telemetry.
            </p>
            <div className="text-xs text-background/50 font-mono">
              {siteConfig.creator.credit} · by{' '}
              <a
                href={siteConfig.brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:underline"
              >
                {siteConfig.brand.name}
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-background font-mono uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#features" className="hover:text-teal transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#preview" className="hover:text-teal transition-colors">
                  VS Code Preview
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-teal transition-colors">
                  Architecture
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-teal transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Resources & Open Source */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-background font-mono uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a
                  href={siteConfig.urls.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.urls.releases}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal transition-colors"
                >
                  Releases (VSIX Package)
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.urls.issues}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal transition-colors"
                >
                  Bug Reports & Issues
                </a>
              </li>
              <li>
                <a
                  href={`${siteConfig.urls.github}/blob/main/LICENSE`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal transition-colors"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-background/50">
          <p>© {new Date().getFullYear()} CodeTown. All rights reserved.</p>
          <p className="font-mono">
            Canonical:{' '}
            <a href={siteConfig.urls.production} className="text-teal hover:underline">
              codetown.enigmadev.tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
