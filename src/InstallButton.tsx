import React, { useEffect, useRef, useState } from 'react';
import { site } from './config/site';

/**
 * Opens VS Code straight on the CodeTown extension page (vscode:extension/<id>), where one click installs it.
 * If VS Code does not take focus within a moment, offers the Marketplace page and the VSIX instead.
 */
export const InstallButton: React.FC<{ label?: string; className?: string }> = ({ label = 'Install in VS Code', className = '' }) => {
  const [hint, setHint] = useState(false);
  const timer = useRef(0);
  const cancel = useRef<(() => void) | null>(null);

  useEffect(() => () => { window.clearTimeout(timer.current); if (cancel.current) window.removeEventListener('blur', cancel.current); }, []);

  const onClick = (): void => {
    setHint(false);
    window.clearTimeout(timer.current);
    // the browser asks "Open Visual Studio Code?" (the page loses focus) or VS Code comes forward: both mean it worked
    const stop = (): void => window.clearTimeout(timer.current);
    cancel.current = stop;
    window.addEventListener('blur', stop, { once: true });
    timer.current = window.setTimeout(() => { window.removeEventListener('blur', stop); setHint(true); }, 2200);
  };

  return (
    <span className={'installwrap ' + className}>
      <a className="btn primary install-vs" href={site.urls.vscode} onClick={onClick}>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1v8.2L5.4 6.6 4 8l4 4 4-4-1.4-1.4L9 9.2V1zM2 13h12v2H2z" /></svg>
        {label}
      </a>
      {hint && (
        <span className="install-hint" role="status">
          VS Code did not open? <a href={site.urls.marketplace} target="_blank" rel="noreferrer">Open the Marketplace page</a> or <a href={site.urls.vsix} download>download the VSIX</a>.
        </span>
      )}
    </span>
  );
};
