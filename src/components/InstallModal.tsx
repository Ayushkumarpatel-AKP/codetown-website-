import React, { useState } from 'react';
import { siteConfig } from '../config/site';
import { X, Download, Terminal, Copy, Check, ExternalLink, CheckCircle2 } from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal flex items-center justify-center p-1.5 shadow-sm">
              <img src="/assets/brand/icon.png" alt="CodeTown" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground font-display">
                Get CodeTown for VS Code
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                Version {siteConfig.version} · 100% Offline · MIT License
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Install Options */}
        <div className="py-5 space-y-4">
          {/* Method 1: VS Code URI Protocol */}
          <div className="p-4 rounded-xl bg-muted/50 border border-teal/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-teal">
                RECOMMENDED
              </span>
              <span className="text-[11px] text-muted-foreground">1-Click Launch</span>
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Open directly inside Visual Studio Code
            </h4>
            <a
              href="vscode:extension/AyushKumarPatel.codetown"
              className="w-full py-2.5 rounded-lg text-xs font-semibold bg-foreground text-background hover:bg-foreground/90 flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Download className="w-4 h-4 text-teal" />
              <span>Launch VS Code Installer</span>
            </a>
          </div>

          {/* Method 2: Command Line Install */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-foreground">
                CLI INSTALLATION
              </span>
              <button
                onClick={() => handleCopy('code --install-extension AyushKumarPatel.codetown', 'cli')}
                className="text-xs font-mono text-teal hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedCmd === 'cli' ? <Check className="w-3.5 h-3.5 text-teal" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd === 'cli' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-muted rounded-lg p-2.5 font-mono text-xs text-foreground flex items-center gap-2 border border-border overflow-x-auto">
              <Terminal className="w-3.5 h-3.5 text-teal flex-shrink-0" />
              <code>code --install-extension AyushKumarPatel.codetown</code>
            </div>
          </div>

          {/* Method 3: Direct VSIX Package */}
          <div className="p-4 rounded-xl bg-card border border-border flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-foreground">Manual VSIX Package</h4>
              <p className="text-[11px] text-muted-foreground">Download from GitHub Releases</p>
            </div>
            <a
              href={siteConfig.urls.releases}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg border border-border hover:bg-muted text-xs text-foreground font-medium flex items-center gap-1.5 transition-colors"
            >
              <span>Download</span>
              <ExternalLink className="w-3 h-3 text-muted-foreground" />
            </a>
          </div>
        </div>

        {/* Quick Launch Instructions */}
        <div className="pt-2 border-t border-border text-xs text-muted-foreground space-y-1.5 font-mono">
          <p className="text-foreground font-bold">Quick Start:</p>
          <p className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal flex-shrink-0" />
            <span>Open your workspace in VS Code</span>
          </p>
          <p className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal flex-shrink-0" />
            <span>Press <kbd className="px-1 py-0.5 bg-muted border border-border rounded text-[10px]">Ctrl+Shift+P</kbd> → run <b>CodeTown: Open Town</b></span>
          </p>
        </div>
      </div>
    </div>
  );
};
