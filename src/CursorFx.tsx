import React, { useEffect, useRef } from 'react';

interface Bit { x: number; y: number; vx: number; vy: number; life: number; max: number; s: number; c: string }

const COLORS = ['#c9a63a', '#e9e3cf', '#8f7a2a', '#d98e2b'];

const ARROW = [
  'X...........', 'XX..........', 'XFX.........', 'XFFX........', 'XFFFX.......', 'XFFFFX......', 'XFFFFFX.....', 'XFFFFFFX....',
  'XFFFFFFFX...', 'XFFFFFXXXX..', 'XFFXFFX.....', 'XFX.XFFX....', 'XX..XFFX....', 'X....XFFX...', '.....XFFX...', '......XX....',
];
const HAMMER = [
  '..XXXXXXXX......', '.XCCCCCCCCX.....', '.XCCBBBBCCCX....', '.XCCCCCCCCCX....', '..XCCCCCCCX.....', '...XXXXXXX......', '.....XHHX.......',
  '.....XHHX.......', '.....XHHX.......', '.....XHHX.......', '.....XHHX.......', '.....XHHX.......', '.....XHHX.......', '.....XXXX.......',
];
const PALETTE: Record<string, string> = { X: '#14110b', F: '#e9e3cf', C: '#c9a63a', B: '#8f7a2a', H: '#b08a4a' };

/** A crisp pixel-art cursor as a CSS value: 2 screen pixels per art pixel. */
function pixelCursor(rows: string[], hotX: number, hotY: number, fallback: string): string {
  const px = 2;
  const w = rows[0].length, h = rows.length;
  let rects = '';
  rows.forEach((row, y) => { for (let x = 0; x < row.length; x++) { const c = PALETTE[row[x]]; if (c) rects += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + c + '"/>'; } });
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '" shape-rendering="crispEdges">' + rects + '</svg>';
  return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '") ' + hotX * px + ' ' + hotY * px + ', ' + fallback;
}

/**
 * Retro cursor fun: pixel arrow and builder's-hammer cursors in the site colors, a trail of falling
 * pixels and a burst on click. Skipped for touch screens and for prefers-reduced-motion.
 */
export const CursorFx: React.FC = () => {
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cv.current;
    if (!canvas) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return;
    const g = canvas.getContext('2d')!;
    const bits: Bit[] = [];
    let w = 0, h = 0, mx = -100, my = -100, last = 0, raf = 0;
    const size = (): void => {
      const dpr = 1;
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
    };
    size();
    const spawn = (x: number, y: number, n: number, speed: number): void => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        bits.push({ x, y, vx: Math.cos(a) * speed * Math.random(), vy: Math.sin(a) * speed * Math.random() - 0.4, life: 0, max: 26 + Math.random() * 22, s: Math.random() < 0.3 ? 6 : 4, c: COLORS[(Math.random() * COLORS.length) | 0] });
      }
    };
    const move = (e: PointerEvent): void => {
      mx = e.clientX; my = e.clientY;
      const now = performance.now();
      if (now - last > 28) { last = now; spawn(mx, my, 1, 0.8); }
    };
    const click = (e: PointerEvent): void => spawn(e.clientX, e.clientY, 16, 3.2);
    const frame = (): void => {
      g.clearRect(0, 0, w, h);
      for (let i = bits.length - 1; i >= 0; i--) {
        const b = bits[i];
        b.life++; b.x += b.vx; b.y += b.vy; b.vy += 0.07;
        if (b.life > b.max) { bits.splice(i, 1); continue; }
        g.globalAlpha = 1 - b.life / b.max;
        g.fillStyle = b.c;
        g.fillRect(Math.round(b.x / 2) * 2, Math.round(b.y / 2) * 2, b.s, b.s);
      }
      g.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', click, { passive: true });
    window.addEventListener('resize', size);
    raf = requestAnimationFrame(frame);

    // the hero screenshot tilts toward the cursor in coarse steps, like a low frame-rate sprite
    const tilt = document.querySelector<HTMLElement>('[data-tilt]');
    const onTilt = (e: PointerEvent): void => {
      if (!tilt) return;
      const r = tilt.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      const ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      const sx = Math.round(nx * 3) / 3, sy = Math.round(ny * 3) / 3;
      tilt.style.transform = `perspective(900px) rotateY(${sx * 4}deg) rotateX(${-sy * 3}deg)`;
    };
    window.addEventListener('pointermove', onTilt, { passive: true });
    const root = document.documentElement;
    root.style.setProperty('--cur', pixelCursor(ARROW, 0, 0, 'default'));
    root.style.setProperty('--cur-link', pixelCursor(HAMMER, 3, 1, 'pointer'));
    root.classList.add('fx');
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', click);
      window.removeEventListener('pointermove', onTilt);
      window.removeEventListener('resize', size);
      document.documentElement.classList.remove('fx');
      document.documentElement.style.removeProperty('--cur');
      document.documentElement.style.removeProperty('--cur-link');
    };
  }, []);

  return <canvas ref={cv} className="cursor-fx" aria-hidden="true" />;
};
