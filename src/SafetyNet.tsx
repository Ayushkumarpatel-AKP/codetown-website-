import React, { useEffect, useState } from 'react';

interface Spot { n: string; title: string; text: string; x: number; y: number }

/** Where each feature sits on the real mission-report screenshot (percent of the image). */
const SPOTS: Spot[] = [
  { n: '1', title: 'See what the AI touched', text: 'Every finished order becomes a mission report: the files it changed, files read, time and spend. Click a file chip and the map flies to that house.', x: 87, y: 31.5 },
  { n: '2', title: 'Undo in one click', text: 'A restore point is taken before an editing crew starts. Press Undo twice and every changed file goes back, new files are removed, and your own uncommitted work stays.', x: 83, y: 37 },
  { n: '3', title: 'Run the tests, right there', text: 'Run your project tests from the report and read PASS or FAIL with the output. Turn on auto-run to check every order.', x: 87, y: 40 },
];

const ZOOM = 2.3;
const STEP_MS = 4200;

/** The mission report, zoomed in on each feature in turn. Click a step to jump to it. */
export const SafetyNet: React.FC = () => {
  const [i, setI] = useState(-1);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!auto || paused) return;
    const t = window.setTimeout(() => setI((k) => (k >= SPOTS.length - 1 ? -1 : k + 1)), STEP_MS);
    return () => window.clearTimeout(t);
  }, [i, auto, paused]);

  const s = i >= 0 ? SPOTS[i] : null;
  const scale = s ? ZOOM : 1;
  const clamp = (v: number): number => Math.min(0, Math.max(100 - 100 * scale, v));
  const tx = s ? clamp(50 - scale * s.x) : 0;
  const ty = s ? clamp(50 - scale * s.y) : 0;

  return (
    <section id="safety" className="sec">
      <header className="sec-head">
        <span className="tag">SAFETY NET</span>
        <h2>Let the AI try. Undo if it breaks.</h2>
        <p>Real screenshot of a mission report. Pick a step, or watch it zoom in on its own.</p>
      </header>
      <div className="safety">
        <div className="safe-screen" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
          <i className="c tl" /><i className="c tr" /><i className="c bl" /><i className="c br" />
          <div className="safe-clip">
            <img src="/assets/screenshots/hud-report.png" alt="CodeTown mission report with changed files, an Undo button and test results" width={1600} height={900} loading="lazy"
              style={{ transform: `translate(${tx}%, ${ty}%) scale(${scale})` }} />
          </div>
          <span className="zoomtag">{s ? 'ZOOM ' + ZOOM + 'x · STEP ' + s.n : 'OVERVIEW'}</span>
        </div>
        <ol className="safe-steps">
          {SPOTS.map((p, k) => (
            <li key={p.n}>
              <button type="button" className={k === i ? 'on' : ''} onClick={() => { setAuto(false); setI(k); }}>
                <b>{p.n}</b>
                <span><strong>{p.title}</strong><em>{p.text}</em></span>
                {k === i && auto && !paused && <i className="prog" key={'sp' + i} style={{ animationDuration: STEP_MS + 'ms' }} />}
              </button>
            </li>
          ))}
          <li><button type="button" className="overview" onClick={() => { setAuto(false); setI(-1); }}>SHOW THE WHOLE REPORT</button></li>
        </ol>
      </div>
    </section>
  );
};
