import React, { useEffect, useRef } from 'react';

interface Bit { x: number; y: number; vx: number; vy: number; life: number; max: number; s: number; c: string }

const COLORS = ['#c9a63a', '#e9e3cf', '#8f7a2a', '#d98e2b'];

/**
 * Retro cursor fun: a trail of falling pixels, a burst on click, and a pixel crosshair that
 * snaps to a 4px grid. Skipped for touch screens and for prefers-reduced-motion.
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
      // pixel crosshair on a 4px grid
      const cx = Math.round(mx / 4) * 4, cy = Math.round(my / 4) * 4;
      g.fillStyle = '#e9e3cf';
      g.fillRect(cx - 10, cy - 1, 6, 2); g.fillRect(cx + 4, cy - 1, 6, 2);
      g.fillRect(cx - 1, cy - 10, 2, 6); g.fillRect(cx - 1, cy + 4, 2, 6);
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
    document.documentElement.classList.add('fx');
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', click);
      window.removeEventListener('pointermove', onTilt);
      window.removeEventListener('resize', size);
      document.documentElement.classList.remove('fx');
    };
  }, []);

  return <canvas ref={cv} className="cursor-fx" aria-hidden="true" />;
};
