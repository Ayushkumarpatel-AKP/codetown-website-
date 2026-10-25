import React from 'react';

export const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const VSCodeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.583 2.125a1.25 1.25 0 0 0-1.229.213L8.85 8.358 4.604 5.146a1.25 1.25 0 0 0-1.542.062l-1.875 1.5a1.25 1.25 0 0 0 0 1.958L4.35 11.5l-3.163 2.834a1.25 1.25 0 0 0 0 1.958l1.875 1.5a1.25 1.25 0 0 0 1.542.062l4.246-3.212 7.504 6.02a1.25 1.25 0 0 0 1.23.213l6-2.25A1.25 1.25 0 0 0 24 19.708V4.292a1.25 1.25 0 0 0-.416-.917l-6-2.25z" />
  </svg>
);
