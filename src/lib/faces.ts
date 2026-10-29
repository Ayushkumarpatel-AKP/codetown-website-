// Copied from ../src/webview/faces.ts (the extension draws the same portraits). Keep both in sync.
/**
 * Pixel-art crew portraits, drawn in code on a 24x24 grid (no image files). Each of the eight
 * characters has its own silhouette (hats, glasses, hair, outfit) and five expressions that
 * follow the agent's real status: idle, working, waiting for a permit, done, failed. The
 * thinking level adds sparkles (a frame at MAX). Portraits are scaled by whole pixels and
 * must be shown with `image-rendering: pixelated`.
 *
 * Compiled with the other webview scripts; also compiled alone for the contact sheet
 * (tsconfig.art.json), so it must not touch client globals.
 */

export type FaceMood = 'idle' | 'working' | 'waiting' | 'done' | 'failed';

interface FaceStyle { skin: string; skinDark: string; hair: string; body: string; bodyDark: string; hat?: string; trim?: string }

const INK = '#1b1f2a';
const MOUTH = '#7a2f2f';
const GLINT = '#ffffff';

const FACE_STYLE: Record<string, FaceStyle> = {
  scout: { skin: '#f1c9a5', skinDark: '#d9a47a', hair: '#7a5230', body: '#2aa89a', bodyDark: '#1e7f74', hat: '#8a6a3a', trim: '#d6473c' },
  architect: { skin: '#e8be98', skinDark: '#cf9f78', hair: '#b9bec6', body: '#3f7fc4', bodyDark: '#2d5f96', hat: '#f4f4f0', trim: '#d7d7d0' },
  builder: { skin: '#d9a47a', skinDark: '#bd8860', hair: '#4a3626', body: '#f08a2e', bodyDark: '#c26a1a', hat: '#ffd24a', trim: '#f6f0c0' },
  fixer: { skin: '#a8754f', skinDark: '#8a5c3a', hair: '#1f1a17', body: '#6a7480', bodyDark: '#4d5560', hat: '#d6473c', trim: '#7fd6f0' },
  tester: { skin: '#f4d6bd', skinDark: '#dcb596', hair: '#8a5ad0', body: '#f4f4f0', bodyDark: '#cfd3d8', trim: '#46d37a' },
  reviewer: { skin: '#d9a47a', skinDark: '#bd8860', hair: '#9aa0a8', body: '#2b3a5a', bodyDark: '#1f2b44', hat: '#8a2f45', trim: '#e3b341' },
  scribe: { skin: '#f1c9a5', skinDark: '#d9a47a', hair: '#6b4226', body: '#4a9a6a', bodyDark: '#357350', trim: '#f2c83a' },
  runner: { skin: '#7a4f33', skinDark: '#5f3c25', hair: '#14110f', body: '#e8e03a', bodyDark: '#bdb52a', hat: '#46c26b', trim: '#9aa0a8' },
};

const GLYPH_Q = ['XX.', '..X', '.X.', '...', '.X.'];
const GLYPH_BANG = ['X', 'X', 'X', '.', 'X'];
const GLYPH_GEAR = ['.X.X.', 'XXXXX', 'XX.XX', 'XXXXX', '.X.X.'];
const GLYPH_CHECK = ['....X', '...XX', 'X.XX.', '.XX..', '..X..'];

function glyph(g: CanvasRenderingContext2D, rows: string[], x: number, y: number, color: string): void {
  g.fillStyle = color;
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) if (row[i] === 'X') g.fillRect(x + i, y + j, 1, 1); });
}

const rect = (g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: string): void => { g.fillStyle = c; g.fillRect(x, y, w, h); };

/** A 1px frame around a box (glasses, monocle). */
function faceBox(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: string): void {
  rect(g, x, y, w, 1, c); rect(g, x, y + h - 1, w, 1, c); rect(g, x, y, 1, h, c); rect(g, x + w - 1, y, 1, h, c);
}

function eyes(g: CanvasRenderingContext2D, mood: FaceMood): void {
  switch (mood) {
    case 'working':
      rect(g, 8, 11, 2, 1, INK); rect(g, 14, 11, 2, 1, INK); rect(g, 8, 9, 3, 1, INK); rect(g, 14, 9, 3, 1, INK); break; // focused, brows down
    case 'waiting':
      rect(g, 8, 10, 2, 2, INK); rect(g, 14, 10, 2, 2, INK); rect(g, 8, 10, 1, 1, GLINT); rect(g, 14, 10, 1, 1, GLINT);
      rect(g, 7, 8, 4, 1, INK); rect(g, 14, 7, 4, 1, INK); break; // one brow raised
    case 'done':
      for (const x of [8, 14]) { rect(g, x, 11, 1, 1, INK); rect(g, x + 1, 10, 1, 1, INK); rect(g, x + 2, 11, 1, 1, INK); } break; // happy arcs
    case 'failed':
      for (const x of [8, 14]) { rect(g, x, 10, 1, 1, INK); rect(g, x + 2, 10, 1, 1, INK); rect(g, x + 1, 11, 1, 1, INK); rect(g, x, 12, 1, 1, INK); rect(g, x + 2, 12, 1, 1, INK); } break;
    default:
      rect(g, 8, 10, 2, 2, INK); rect(g, 14, 10, 2, 2, INK); rect(g, 8, 10, 1, 1, GLINT); rect(g, 14, 10, 1, 1, GLINT);
  }
}

function mouth(g: CanvasRenderingContext2D, mood: FaceMood): void {
  switch (mood) {
    case 'working': rect(g, 11, 14, 2, 2, MOUTH); break;
    case 'waiting': rect(g, 10, 15, 4, 1, MOUTH); rect(g, 9, 14, 1, 1, MOUTH); rect(g, 14, 14, 1, 1, MOUTH); break;
    case 'done': rect(g, 10, 15, 4, 1, MOUTH); rect(g, 9, 14, 1, 1, MOUTH); rect(g, 14, 14, 1, 1, MOUTH); rect(g, 11, 14, 2, 1, '#fff'); break;
    case 'failed': rect(g, 10, 15, 4, 1, MOUTH); rect(g, 9, 16, 1, 1, MOUTH); rect(g, 14, 16, 1, 1, MOUTH); break;
    default: rect(g, 10, 14, 4, 1, MOUTH);
  }
}

/** Per-character hair, headgear, glasses, outfit details. `stage` 0 = behind the face, 1 = on top of it. */
function outfit(g: CanvasRenderingContext2D, id: string, st: FaceStyle, stage: 0 | 1): void {
  const t = st.trim ?? st.hair;
  switch (id) {
    case 'scout':
      if (stage === 0) { rect(g, 6, 6, 12, 2, st.hair); rect(g, 6, 8, 1, 3, st.hair); rect(g, 17, 8, 1, 3, st.hair); rect(g, 8, 18, 8, 2, t); rect(g, 7, 20, 4, 2, INK); rect(g, 13, 20, 4, 2, INK); rect(g, 11, 20, 2, 1, INK); }
      else { rect(g, 3, 6, 18, 2, st.hat!); rect(g, 6, 2, 12, 5, st.hat!); rect(g, 6, 5, 12, 1, '#5a4220'); rect(g, 6, 2, 12, 1, '#a58552'); }
      break;
    case 'architect':
      if (stage === 0) { rect(g, 8, 15, 8, 3, st.hair); rect(g, 6, 8, 1, 4, st.hair); rect(g, 17, 8, 1, 4, st.hair); }
      else {
        rect(g, 6, 3, 12, 4, st.hat!); rect(g, 5, 6, 14, 1, t); rect(g, 11, 2, 2, 2, st.hat!); rect(g, 6, 3, 12, 1, '#fff');
        faceBox(g, 7, 9, 4, 4, INK); faceBox(g, 13, 9, 4, 4, INK); rect(g, 11, 10, 2, 1, INK);
      }
      break;
    case 'builder':
      if (stage === 0) { rect(g, 7, 19, 2, 5, st.hat!.replace('d24a', 'f6f0c0')); rect(g, 15, 19, 2, 5, '#f6f0c0'); rect(g, 8, 15, 8, 1, '#a9876a'); }
      else { rect(g, 6, 3, 12, 4, st.hat!); rect(g, 4, 6, 16, 1, '#e8b830'); rect(g, 11, 4, 2, 2, '#fff6b0'); rect(g, 6, 3, 12, 1, '#fff0a0'); }
      break;
    case 'fixer':
      if (stage === 0) { rect(g, 6, 6, 12, 2, st.hair); rect(g, 7, 20, 10, 4, st.bodyDark); rect(g, 18, 19, 2, 5, '#c9ced2'); }
      else { rect(g, 6, 5, 12, 4, st.hat!); rect(g, 18, 7, 3, 3, st.hat!); rect(g, 8, 6, 3, 2, t); rect(g, 13, 6, 3, 2, t); rect(g, 7, 6, 1, 2, INK); rect(g, 11, 6, 2, 1, INK); rect(g, 16, 6, 1, 2, INK); }
      break;
    case 'tester':
      if (stage === 0) { rect(g, 7, 4, 2, 3, st.hair); rect(g, 11, 3, 2, 4, st.hair); rect(g, 15, 4, 2, 3, st.hair); rect(g, 6, 6, 12, 2, st.hair); rect(g, 9, 19, 6, 2, st.skinDark); rect(g, 15, 20, 2, 2, t); }
      else { rect(g, 7, 10, 10, 3, 'rgba(120,230,230,0.35)'); faceBox(g, 7, 9, 10, 4, '#34b8b8'); }
      break;
    case 'reviewer':
      if (stage === 0) { rect(g, 6, 7, 1, 5, st.hair); rect(g, 17, 7, 1, 5, st.hair); rect(g, 10, 19, 4, 1, '#e8e8e8'); }
      else { rect(g, 7, 4, 12, 3, st.hat!); rect(g, 5, 6, 14, 1, st.hat!); rect(g, 11, 3, 2, 1, st.hat!); faceBox(g, 13, 9, 4, 4, t); rect(g, 17, 13, 1, 6, t); }
      break;
    case 'scribe':
      if (stage === 0) { rect(g, 5, 6, 2, 12, st.hair); rect(g, 17, 6, 2, 12, st.hair); rect(g, 6, 5, 12, 3, st.hair); rect(g, 11, 20, 2, 1, t); }
      else { faceBox(g, 7, 9, 4, 4, '#b8892a'); faceBox(g, 13, 9, 4, 4, '#b8892a'); rect(g, 11, 10, 2, 1, '#b8892a'); rect(g, 18, 7, 1, 4, t); rect(g, 18, 11, 1, 1, '#e8a0a0'); }
      break;
    case 'runner':
      if (stage === 0) { rect(g, 6, 6, 12, 2, st.hair); rect(g, 6, 19, 2, 5, st.trim ?? '#9aa0a8'); rect(g, 16, 19, 2, 5, st.trim ?? '#9aa0a8'); }
      else { rect(g, 6, 3, 12, 4, st.hat!); rect(g, 17, 6, 4, 1, st.hat!); rect(g, 6, 3, 12, 1, '#7fe49a'); rect(g, 5, 8, 1, 6, INK); rect(g, 18, 8, 1, 6, INK); rect(g, 6, 14, 3, 1, INK); rect(g, 5, 7, 2, 1, INK); }
      break;
    default: break;
  }
}

const EFFORT_STARS: Record<string, number> = { low: 0, medium: 1, high: 2, xhigh: 3, max: 4 };

function drawFace(g: CanvasRenderingContext2D, id: string, mood: FaceMood, effort: string): void {
  const st = FACE_STYLE[id] ?? FACE_STYLE.runner;
  g.clearRect(0, 0, 24, 24);
  // body + neck
  rect(g, 3, 19, 18, 5, st.body); rect(g, 3, 19, 2, 5, st.bodyDark); rect(g, 19, 19, 2, 5, st.bodyDark); rect(g, 10, 17, 4, 3, st.skinDark);
  outfit(g, id, st, 0);
  // head: outline, skin, ears
  rect(g, 5, 5, 14, 13, INK); rect(g, 6, 6, 12, 11, st.skin); rect(g, 4, 10, 2, 4, INK); rect(g, 18, 10, 2, 4, INK); rect(g, 4, 11, 1, 2, st.skin); rect(g, 19, 11, 1, 2, st.skin);
  rect(g, 6, 16, 12, 1, st.skinDark);
  outfit(g, id, st, 0); // hair/outfit pieces that sit on the head are drawn before the face parts
  eyes(g, mood);
  mouth(g, mood);
  outfit(g, id, st, 1);
  // status glyph, top right
  if (mood === 'working') glyph(g, GLYPH_GEAR, 18, 0, '#ffb000');
  else if (mood === 'waiting') glyph(g, GLYPH_Q, 19, 0, '#ffb000');
  else if (mood === 'failed') glyph(g, GLYPH_BANG, 21, 0, '#ff5252');
  else if (mood === 'done') glyph(g, GLYPH_CHECK, 18, 0, '#46d37a');
  // thinking level: sparkles, and a frame at MAX
  const n = EFFORT_STARS[effort] ?? 1;
  const spots: [number, number][] = [[1, 2], [2, 8], [1, 13], [22, 8]];
  for (let i = 0; i < Math.min(n, 3); i++) { const [x, y] = spots[i]; rect(g, x, y, 1, 3, '#ffe27a'); rect(g, x - 1, y + 1, 3, 1, '#ffe27a'); }
  if (n >= 4) {
    for (const [x, y] of spots) { rect(g, x, y, 1, 3, '#ffe27a'); rect(g, x - 1, y + 1, 3, 1, '#ffe27a'); }
    rect(g, 0, 0, 24, 1, '#34d3bd'); rect(g, 0, 23, 24, 1, '#34d3bd'); rect(g, 0, 0, 1, 24, '#34d3bd'); rect(g, 23, 0, 1, 24, '#34d3bd');
  }
}

const faceCache = new Map<string, HTMLCanvasElement>();

/** A portrait scaled by `px` whole pixels per grid cell (cached, never mutate it). */
export function faceCanvas(id: string, mood: FaceMood, effort: string, px: number): HTMLCanvasElement {
  const key = [id, mood, effort, px].join('|');
  const hit = faceCache.get(key);
  if (hit) return hit;
  const small = document.createElement('canvas');
  small.width = 24; small.height = 24;
  drawFace(small.getContext('2d')!, id, mood, effort);
  const out = document.createElement('canvas');
  out.width = 24 * px; out.height = 24 * px;
  const g = out.getContext('2d')!;
  g.imageSmoothingEnabled = false;
  g.drawImage(small, 0, 0, 24 * px, 24 * px);
  faceCache.set(key, out);
  return out;
}

/** A fresh canvas element showing a portrait, for the DOM. */
export function faceElement(id: string, mood: FaceMood, effort: string, px: number): HTMLCanvasElement {
  const src = faceCanvas(id, mood, effort, px);
  const el = document.createElement('canvas');
  el.width = src.width; el.height = src.height;
  el.className = 'face';
  el.getContext('2d')!.drawImage(src, 0, 0);
  return el;
}

/** The expression that matches a session status. */
export function moodOf(status: string): FaceMood {
  if (status === 'working' || status === 'starting') return 'working';
  if (status === 'waiting') return 'waiting';
  if (status === 'done' || status === 'idle') return 'done';
  if (status === 'failed' || status === 'halted') return 'failed';
  return 'idle';
}
