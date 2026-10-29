import React, { useEffect, useRef, useState } from 'react';
import { Face } from './Face';

export type PortraitMood = 'idle' | 'wink' | 'smile' | 'wow' | 'sparkle';
export type PortraitEmote = 'code' | 'plus' | 'heart' | 'star' | '';

const N = 48;            // the portrait is a 48 x 48 pixel grid
const S = 6;             // screen pixels per cell
const CROP = 6;          // the source art has a thin border

/** Cell boxes on the 48 x 48 grid (found on the real portrait). */
const LEFT_EYE = { x: 19, y: 22, w: 3, h: 2 };
const RIGHT_EYE = { x: 27, y: 22, w: 3, h: 2 };

const GLYPH: Record<string, string[]> = {
  code: ['..X.X..', '.X...X.', 'X.....X', '.X...X.', '..X.X..'].map((r) => r),
  plus: ['...X...', '...X...', 'XXXXXXX', '...X...', '...X...'],
  heart: ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'],
  star: ['...X...', '...X...', 'XXXXXXX', '.XXXXX.', '.XX.XX.', 'XX...XX'],
};
const EMOTE_COLOR: Record<string, string> = { code: '#7bd88f', plus: '#58a6ff', heart: '#ff6b81', star: '#ffd24a' };

interface Props { mood: PortraitMood; emote: PortraitEmote; className?: string }

/**
 * The maker's pixel portrait, brought to life: it blinks, breathes, follows the cursor by a pixel,
 * winks, smiles or gasps with the buttons, and floats a little emote. Everything is drawn on the
 * 48 x 48 grid of the real portrait. Calm (still, no blinking) for prefers-reduced-motion.
 */
export const MakerPortrait: React.FC<Props> = ({ mood, emote, className }) => {
  const cv = useRef<HTMLCanvasElement>(null);
  const state = useRef({ mood, emote, look: 0 });
  const [failed, setFailed] = useState(false);

  useEffect(() => { state.current.mood = mood; state.current.emote = emote; }, [mood, emote]);

  useEffect(() => {
    const canvas = cv.current;
    if (!canvas) return;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const img = new Image();
    let timer = 0, visible = true, dead = false;
    const io = typeof IntersectionObserver === 'function' ? new IntersectionObserver((e) => { visible = e[0]?.isIntersecting ?? true; }) : null;
    io?.observe(canvas);

    const onMove = (e: PointerEvent): void => {
      const r = canvas.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / Math.max(200, window.innerWidth / 2);
      state.current.look = Math.max(-1, Math.min(1, dx * 2));
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    img.onerror = () => { if (!dead) setFailed(true); };
    img.onload = () => {
      // exact pixel grid: one cell per art pixel
      const off = document.createElement('canvas');
      off.width = N; off.height = N;
      const og = off.getContext('2d', { willReadFrequently: true });
      if (!og) return;
      og.imageSmoothingEnabled = false;
      og.drawImage(img, CROP, CROP, img.width - CROP * 2, img.height - CROP * 2, 0, 0, N, N);
      const px = (x: number, y: number): string => { const d = og.getImageData(x, y, 1, 1).data; return `rgb(${d[0]},${d[1]},${d[2]})`; };
      const skin = px(24, 26), lash = px(19, 20), lip = px(24, 29), bg = px(2, 2);

      canvas.width = N * S; canvas.height = N * S;
      const g = canvas.getContext('2d');
      if (!g) return;
      g.imageSmoothingEnabled = false;

      const cell = (x: number, y: number, c: string, w = 1, h = 1): void => { g.fillStyle = c; g.fillRect(x * S, y * S, w * S, h * S); };
      const closeEye = (e: { x: number; y: number; w: number; h: number }): void => { cell(e.x, e.y, skin, e.w, e.h); cell(e.x, e.y + e.h - 1, lash, e.w, 1); };

      let t = 0, blinkUntil = 0, nextBlink = 1800;
      const frame = (): void => {
        if (dead) return;
        timer = window.setTimeout(frame, 80);
        if (!visible) return;
        t += 80;
        const s = state.current;
        // breathe (1 cell up and down) and lean a cell toward the cursor
        const breathe = calm ? 0 : (Math.floor(t / 900) % 2 === 0 ? 0 : -1);
        const lean = calm ? 0 : Math.round(s.look);
        g.fillStyle = bg; g.fillRect(0, 0, canvas.width, canvas.height);
        g.drawImage(off, lean * S, breathe * S, N * S, N * S);
        g.save(); g.translate(lean * S, breathe * S);

        // blinking
        if (!calm && t > nextBlink) { blinkUntil = t + 160; nextBlink = t + 2200 + Math.random() * 2800; }
        const blinking = t < blinkUntil;
        if (blinking || s.mood === 'sparkle') { closeEye(LEFT_EYE); closeEye(RIGHT_EYE); }
        if (s.mood === 'wink') closeEye(RIGHT_EYE);
        if (s.mood === 'smile' || s.mood === 'sparkle') {
          cell(22, 29, skin, 5, 1);
          cell(21, 28, lip); cell(27, 28, lip); cell(22, 29, lip); cell(26, 29, lip);
          cell(23, 30, lip, 3, 1); cell(23, 29, '#ffffff', 3, 1);
        }
        if (s.mood === 'wow') {
          cell(22, 29, skin, 5, 1);
          cell(22, 29, lip, 5, 1); cell(23, 30, '#3b1010', 3, 2); cell(23, 32, lip, 3, 1);
        }
        g.restore();

        // sparkles around the head when excited
        if (s.mood === 'sparkle' || s.mood === 'smile') {
          const spots: [number, number][] = [[8, 12], [40, 14], [6, 26], [42, 28]];
          spots.forEach(([x, y], i) => { if (Math.floor((t + i * 240) / 320) % 2 === 0) { cell(x, y - 1, '#ffe27a'); cell(x - 1, y, '#ffe27a', 3, 1); cell(x, y + 1, '#ffe27a'); } });
        }

        // a floating emote above the right shoulder
        if (s.emote && GLYPH[s.emote]) {
          const rows = GLYPH[s.emote];
          const bob = Math.round(Math.sin(t / 260) * 1.2);
          const ox = 38, oy = 5 + bob;
          g.fillStyle = '#14110b'; g.fillRect((ox - 1) * S, (oy - 1) * S, 9 * S, (rows.length + 2) * S);
          g.fillStyle = EMOTE_COLOR[s.emote] ?? '#ffd24a';
          rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) if (row[i] === 'X') g.fillRect((ox + i) * S, (oy + j) * S, S, S); });
        }
      };
      frame();
    };
    img.src = '/assets/maker/ayush-pixel.png';

    return () => { dead = true; window.clearTimeout(timer); window.removeEventListener('pointermove', onMove); io?.disconnect(); };
  }, []);

  if (failed) return <Face id="builder" mood={mood === 'smile' ? 'done' : 'idle'} effort="high" px={9} />;
  return <canvas ref={cv} className={'portrait ' + (className ?? '')} width={N * S} height={N * S} role="img" aria-label="Pixel portrait of Ayush Kumar Patel" />;
};
