import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/site';
import { Download, Menu, X } from 'lucide-react';
import { GithubIcon } from './Icons';
import { MinecraftButton } from './MinecraftButton';

interface NavbarProps {
  onOpenInstall: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInstall }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-teal flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <img
                src="/assets/brand/icon.png"
                alt="CodeTown"
                className="w-6 h-6 object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-foreground font-display">
                CodeTown
              </span>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-teal/15 text-teal-600 border border-teal/20">
                v{siteConfig.version}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#hero"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Overview
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#preview"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              VS Code Preview
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={siteConfig.urls.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <MinecraftButton
              variant="teal"
              size="md"
              onClick={onOpenInstall}
              icon={<Download className="w-4 h-4 text-white" />}
            >
              Install Extension
            </MinecraftButton>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <MinecraftButton
              variant="teal"
              size="sm"
              onClick={onOpenInstall}
              icon={<Download className="w-3.5 h-3.5 text-white" />}
            >
              Install
            </MinecraftButton>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground rounded-md hover:bg-muted"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card/98 backdrop-blur-xl border-b border-border px-6 py-6 space-y-4 shadow-xl">
          <a
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-foreground hover:text-teal"
          >
            Overview
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-foreground hover:text-teal"
          >
            Features
          </a>
          <a
            href="#preview"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-foreground hover:text-teal"
          >
            VS Code Preview
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-foreground hover:text-teal"
          >
            How It Works
          </a>

          <div className="pt-4 border-t border-border flex items-center justify-between">
            <a
              href={siteConfig.urls.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
            <span className="text-xs font-mono text-muted-foreground">Made by AKP</span>
          </div>
        </div>
      )}
    </header>
  );
};
