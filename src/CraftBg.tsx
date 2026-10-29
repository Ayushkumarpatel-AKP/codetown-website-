import React, { useEffect, useRef, useState } from 'react';

/** 10x10 pixel icons of builder's tools. X = filled. */
const ICONS: Record<string, string[]> = {
  hammer: ['..XXXXX...', '.XXXXXXX..', '.XXXXXXX..', '..XXXXX...', '....XX....', '....XX....', '....XX....', '....XX....', '....XX....', '....XX....'],
  pickaxe: ['.XXXXXXX..', 'XX..XX.XX.', 'X...XX..X.', '....XX....', '....XX....', '....XX....', '....XX....', '....XX....', '....XX....', '....XX....'],
  bricks: ['XXXX.XXXX.', 'XXXX.XXXX.', '..........', 'XX.XXXX.XX', 'XX.XXXX.XX', '..........', 'XXXX.XXXX.', 'XXXX.XXXX.', '..........', '..........'],
  gear: ['...XXXX...', '.X.XXXX.X.', '.XXXXXXXX.', 'XXXX..XXXX', 'XXX....XXX', 'XXX....XXX', 'XXXX..XXXX', '.XXXXXXXX.', '.X.XXXX.X.', '...XXXX...'],
  crane: ['XXXXXXXXXX', 'X.X.X.X.XX', 'XXXXXXXXXX', '.X......X.', '.X......X.', '.X......X.', '.X......X.', '.X......X.', 'XXX.....X.', 'XXX.....XX'],
  blueprint: ['XXXXXXXX..', 'X......X..', 'X.XXXX.X..', 'X......X..', 'X.XX.X.X..', 'X......X..', 'XXXXXXXX..', '..........', '..........', '..........'],
  hardhat: ['...XXXX...', '..XXXXXX..', '.XXXXXXXX.', '.XXXXXXXX.', 'XXXXXXXXXX', '..........', '..........', '..........', '..........', '..........'],
  square: ['X.........', 'XX........', 'X.X.......', 'X..X......', 'X...X.....', 'X....X....', 'XXXXXXXX..', '..........', '..........', '..........'],
  crate: ['XXXXXXXXXX', 'X........X', 'X.X....X.X', 'X..X..X..X', 'X...XX...X', 'X...XX...X', 'X..X..X..X', 'X.X....X.X', 'X........X', 'XXXXXXXXXX'],
};

const TILE = 760;
const SCALE = 4;

/** Small deterministic generator so the pattern never changes between visits. */
function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

/** One repeating tile: scattered tool icons and blueprint crosses, drawn in code. */
function makeTile(): string {
  const c = document.createElement('canvas');
  c.width = TILE; c.height = TILE;
  const g = c.getContext('2d');
  if (!g) return '';
  const r = rng(20261029);
  // blueprint crosses on a 95px grid
  g.fillStyle = '#c9a63a';
  for (let y = 0; y < TILE; y += 95) for (let x = 0; x < TILE; x += 95) { g.fillRect(x - 6, y - 1, 12, 2); g.fillRect(x - 1, y - 6, 2, 12); }
  const names = Object.keys(ICONS);
  const cols = 4, cell = TILE / cols;
  let n = 0;
  for (let cy = 0; cy < cols; cy++) {
    for (let cx = 0; cx < cols; cx++) {
      const name = names[(n + cy) % names.length];
      n++;
      const px = cx * cell + 20 + r() * (cell - 90);
      const py = cy * cell + 20 + r() * (cell - 90);
      g.fillStyle = r() < 0.7 ? '#c9a63a' : '#e9e3cf';
      ICONS[name].forEach((row, j) => { for (let i = 0; i < row.length; i++) if (row[i] === 'X') g.fillRect(Math.round(px) + i * SCALE, Math.round(py) + j * SCALE, SCALE, SCALE); });
    }
  }
  return c.toDataURL('image/png');
}

/**
 * Faint builder's backdrop: blueprint crosses, scattered pixel tools and isometric guide lines.
 * Sits behind everything at low opacity and drifts slowly with the scroll (not for reduced motion).
 */
export const CraftBg: React.FC = () => {
  const [tile, setTile] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setTile(makeTile()); }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = (): void => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { ref.current?.style.setProperty('--py', String(Math.round(window.scrollY * -0.12)) + 'px'); });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <div ref={ref} className="craft-bg" aria-hidden="true">
      <div className="craft-iso" />
      {tile && <div className="craft-tools" style={{ backgroundImage: 'url(' + tile + ')' }} />}
      <div className="craft-fade" />
    </div>
  );
};
