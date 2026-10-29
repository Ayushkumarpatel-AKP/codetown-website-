import React, { useCallback, useEffect, useRef, useState } from 'react';
import { site } from './config/site';

interface Chapter {
  src: string;
  title: string;
  text: string;
  /** where the camera settles, in percent of the screenshot, and how far it zooms */
  fx: number; fy: number; zoom: number;
  /** a pixel cursor glides here and clicks, in percent of the screenshot */
  click?: { x: number; y: number };
  ms: number;
}

/** A guided tour of the real extension, one real screenshot per chapter. */
const REEL: Chapter[] = [
  { src: '/assets/screenshots/hud-city.png', title: 'Your repo becomes a city', text: 'Every file is a building, every folder a district. Click a house and the real file opens.', fx: 57, fy: 56, zoom: 1.35, click: { x: 55, y: 57 }, ms: 5200 },
  { src: '/assets/screenshots/hud-hall.png', title: 'Meet the crew', text: 'Eight characters with their own face, job and rules. Archie plans, Builder builds, Reviewer reviews.', fx: 82, fy: 42, zoom: 1.7, click: { x: 82, y: 51 }, ms: 5600 },
  { src: '/assets/screenshots/hud-hall.png', title: 'Give an order', text: 'Pick a starter prompt, then press DISPATCH. Any model: free, local or your own key.', fx: 60, fy: 86, zoom: 1.7, click: { x: 77, y: 93 }, ms: 5000 },
  { src: '/assets/screenshots/hud-crews.png', title: 'Watch it build', text: 'Cranes rise over the files a crew is editing. Busy files glow with heat.', fx: 30, fy: 45, zoom: 1.35, ms: 5200 },
  { src: '/assets/screenshots/hud-crews.png', title: 'Approve risky moves', text: 'A permit shows exactly what it wants to run. You STAMP or DENY.', fx: 83, fy: 38, zoom: 1.9, click: { x: 82, y: 39 }, ms: 5400 },
  { src: '/assets/screenshots/hud-report.png', title: 'Read the mission report', text: 'Files changed, files read, time and spend. Click a file chip to fly to its house.', fx: 86, fy: 31, zoom: 1.9, ms: 5400 },
  { src: '/assets/screenshots/hud-report.png', title: 'Undo or run the tests', text: 'One click puts every changed file back. Or run your tests and read PASS or FAIL.', fx: 85, fy: 38, zoom: 2.1, click: { x: 83, y: 37 }, ms: 5600 },
  { src: '/assets/screenshots/hud-hifi.png', title: 'Hi-fi style', text: 'Neon towers and helipads for big repositories.', fx: 50, fy: 50, zoom: 1.0, ms: 3600 },
  { src: '/assets/screenshots/hud-village.png', title: 'Village style', text: 'Cottages and cobbles for small projects. Same data, different art.', fx: 50, fy: 50, zoom: 1.0, ms: 3600 },
  { src: '/assets/screenshots/hud-night.png', title: 'Night with relations', text: 'See every import as a line between buildings.', fx: 55, fy: 55, zoom: 1.25, ms: 4200 },
  { src: '/assets/screenshots/hud-inspector.png', title: 'Inspect any file', text: 'Symbols, imports and findings, with a jump to the exact line.', fx: 82, fy: 42, zoom: 1.6, ms: 4600 },
];

const ARROW = [
  'X...........', 'XX..........', 'XFX.........', 'XFFX........', 'XFFFX.......', 'XFFFFX......', 'XFFFFFX.....', 'XFFFFFFX....',
  'XFFFFFFFX...', 'XFFFFFXXXX..', 'XFFXFFX.....', 'XFX.XFFX....', 'XX..XFFX....', 'X....XFFX...', '.....XFFX...', '......XX....',
];

const PixelArrow: React.FC = () => (
  <svg className="reel-arrow" width="24" height="32" viewBox="0 0 12 16" shapeRendering="crispEdges" aria-hidden="true">
    {ARROW.flatMap((row, y) => Array.from(row).map((c, x) => c === '.' ? null : <rect key={x + '-' + y} x={x} y={y} width="1" height="1" fill={c === 'X' ? '#14110b' : '#e9e3cf'} />))}
  </svg>
);

const ICON = {
  prev: <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 2h2v12H3zM13 2v12L6 8z" /></svg>,
  play: <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2v12l10-6z" /></svg>,
  pause: <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 2h4v12H3zM9 2h4v12H9z" /></svg>,
  next: <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M11 2h2v12h-2zM3 2l7 6-7 6z" /></svg>,
};

/** Chapters play 1.5x longer than their base time: slow, readable, no rush. */
const PACE = 1.5;
const dur = (c: Chapter): number => Math.round(c.ms * PACE);

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

/** The monitor: a screen that plays the tour, with play / pause / previous / next on its chin. */
export const MonitorPlayer: React.FC = () => {
  const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(!calm);
  const [osd, setOsd] = useState('');
  const [go, setGo] = useState(false); // the camera glides in from the wide shot once, on first paint
  const [layers, setLayers] = useState<{ cur: string; prev: string }>({ cur: REEL[0].src, prev: '' });
  const elapsed = useRef(0);
  const startedAt = useRef(0);
  const timer = useRef(0);
  const osdTimer = useRef(0);
  const ch = REEL[idx];

  const flash = useCallback((t: string): void => {
    setOsd(t);
    window.clearTimeout(osdTimer.current);
    osdTimer.current = window.setTimeout(() => setOsd(''), 1100);
  }, []);

  const goTo = useCallback((i: number, label?: string): void => {
    elapsed.current = 0;
    setIdx((i + REEL.length) % REEL.length);
    if (label) flash(label);
  }, [flash]);
  /** relative move that is safe to repeat before React re-renders */
  const step = useCallback((delta: number, label?: string): void => {
    elapsed.current = 0;
    setIdx((i) => (i + delta + REEL.length) % REEL.length);
    if (label) flash(label);
  }, [flash]);

  useEffect(() => {
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setGo(true)));
    return () => cancelAnimationFrame(r);
  }, []);

  // when the screenshot changes, the old one stays underneath while the new one fades in
  useEffect(() => {
    const pre = new Image();
    pre.src = REEL[(idx + 1) % REEL.length].src;
    if (REEL[idx].src === layers.cur) return;
    setLayers({ cur: REEL[idx].src, prev: layers.cur });
    const t = window.setTimeout(() => setLayers((l) => ({ ...l, prev: '' })), 1200);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // chapter timer: runs while playing, remembers how much of the chapter has played when paused
  useEffect(() => {
    window.clearTimeout(timer.current);
    if (!playing) return;
    startedAt.current = performance.now();
    timer.current = window.setTimeout(() => step(1), Math.max(200, dur(ch) - elapsed.current));
    return () => {
      window.clearTimeout(timer.current);
      elapsed.current += performance.now() - startedAt.current;
    };
  }, [idx, playing, ch.ms, step]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => window.clearTimeout(osdTimer.current), []);

  const toggle = (): void => { setPlaying((p) => { flash(p ? 'PAUSE' : 'PLAY'); return !p; }); };

  const onKey = (e: React.KeyboardEvent): void => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1, 'NEXT'); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1, 'PREV'); }
    else if (e.key === ' ') { e.preventDefault(); toggle(); }
  };

  const z = go ? ch.zoom : 1;
  const tx = go ? clamp(50 - z * ch.fx, 100 - 100 * z, 0) : 0;
  const ty = go ? clamp(50 - z * ch.fy, 100 - 100 * z, 0) : 0;
  const move = calm ? 'none' : 'transform 2.4s cubic-bezier(.45,.05,.25,1)';

  return (
    <div className="monitor" onKeyDown={onKey}>
      <div className="bezel">
        <div className="screen reel" role="group" aria-roledescription="video player" aria-label="CodeTown guided tour">
          <div className="reel-stage" style={{ transform: `translate(${tx}%, ${ty}%) scale(${z})`, transition: move }}>
            {layers.prev && <img className="reel-under" src={layers.prev} alt="" width={1600} height={900} />}
            <img key={layers.cur} className={calm || layers.prev === '' ? '' : 'reel-in'} src={layers.cur} alt={ch.title + ': ' + ch.text} width={1600} height={900} fetchPriority={idx === 0 ? 'high' : undefined} />
            {ch.click && go && !calm && (
              <span className="reel-pointer" key={'p' + idx} style={{ left: ch.click.x + '%', top: ch.click.y + '%', animationPlayState: playing ? 'running' : 'paused' }}>
                <PixelArrow /><i />
              </span>
            )}
          </div>
          {osd && <span className="reel-osd">{osd === 'PLAY' ? '▶ ' : osd === 'PAUSE' ? '❚❚ ' : osd === 'NEXT' ? '▶▶ ' : '◀◀ '}{osd}</span>}
          {!playing && !osd && <span className="reel-paused">{'❚❚'} PAUSED</span>}
        </div>
        <div className="chin vcr">
          <div className="vcr-cap" aria-live="polite">
            <b>CH {idx + 1}/{REEL.length}</b>
            <span key={'cap' + idx} className="capfade"><strong>{ch.title}.</strong> {ch.text}</span>
          </div>
          <div className="vcr-bar">
            <i className="led" />
            <div className="vcr-btns">
              <button type="button" onClick={() => step(-1, 'PREV')} aria-label="Previous chapter" title="Previous (←)">{ICON.prev}</button>
              <button type="button" className="main" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'} aria-pressed={playing} title={playing ? 'Pause (space)' : 'Play (space)'}>{playing ? ICON.pause : ICON.play}</button>
              <button type="button" onClick={() => step(1, 'NEXT')} aria-label="Next chapter" title="Next (→)">{ICON.next}</button>
            </div>
            <div className="vcr-track" role="group" aria-label="Chapters">
              {REEL.map((c, k) => (
                <button key={c.title + k} type="button" className={'seg' + (k < idx ? ' done' : '') + (k === idx ? ' on' : '')} onClick={() => goTo(k)} aria-label={'Chapter ' + (k + 1) + ': ' + c.title} aria-current={k === idx}>
                  {k === idx && <i key={'f' + idx} className="fill" style={{ animationDuration: dur(c) + 'ms', animationPlayState: playing ? 'running' : 'paused', animationName: calm ? 'none' : undefined }} />}
                </button>
              ))}
            </div>
            <em>CT-{site.version.replace(/\./g, '')}</em>
          </div>
        </div>
      </div>
      <div className="stand" />
    </div>
  );
};
