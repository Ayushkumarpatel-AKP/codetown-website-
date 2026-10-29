import React, { useCallback, useEffect, useRef, useState } from 'react';
import { crew, Character } from './config/site';
import { Face } from './Face';
import { FaceMood } from './lib/faces';

/** Simulated demo output. Lines starting with "!" are permit requests the visitor stamps or denies. */
const SCRIPTS: Record<string, string[]> = {
  scout: ['$ scout --task "{p}"', 'reading the project layout...', 'found 3 entry points and 12 modules', 'tracing imports (read-only)...', 'report ready: 4 key files, 1 risk flagged'],
  architect: ['planning: "{p}"', 'mapping the affected files...', 'option A: small steps, low risk', 'option B: full rewrite, high risk', 'plan written: 6 steps, tests first'],
  builder: ['order: "{p}"', 'reading the surrounding code...', '!Edit src/feature.ts', 'applying the change in small steps', 'running tests... 24 passed', 'done: 2 files changed'],
  fixer: ['investigating: "{p}"', 'reproducing the failure...', 'root cause found: off-by-one in a loop', '!Edit src/parser.ts', 'fix applied, regression test added', 'tests green'],
  tester: ['task: "{p}"', 'reading the code under test...', '!Write tests/feature.test.ts', 'writing 6 cases (edge and error paths)', 'running... 6 passed'],
  reviewer: ['review: "{p}"', 'reading the diff...', 'bug: missing null check (line 42)', 'risk: input is not validated', 'review posted. read-only: no file was touched'],
  scribe: ['docs task: "{p}"', 'reading the real code...', '!Edit README.md', 'writing the section from actual behaviour', 'done: 1 file updated'],
  runner: ['errand: "{p}"', 'scanning files...', '!Edit 8 files', 'applying the mechanical change', 'done: 8 files, 0 conflicts'],
};

const STEP_MS = 650;

/** Files each editing character "changed" in the demo. Read-only characters change nothing. */
const CHANGED: Record<string, string[]> = {
  builder: ['src/feature.ts', 'src/feature.test.ts'], fixer: ['src/parser.ts', 'tests/parser.test.ts'], tester: ['tests/feature.test.ts'],
  scribe: ['README.md'], runner: ['src/a.ts', 'src/b.ts', 'src/c.ts'],
};

const effortLevel = (e: string): number => (e === 'low' ? 1 : e === 'medium' ? 3 : 5);
const tierLevel = (t: string): number => (t.startsWith('fast') ? 1 : t.startsWith('mid') ? 3 : 5);

const Bar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="stat"><span>{label}</span><i>{Array.from({ length: 5 }, (_, k) => <b key={k} className={k < value ? 'on' : ''} />)}</i></div>
);

type Phase = 'idle' | 'working' | 'waiting' | 'done' | 'failed';
const MOOD: Record<Phase, FaceMood> = { idle: 'idle', working: 'working', waiting: 'waiting', done: 'done', failed: 'failed' };

export const CrewStage: React.FC = () => {
  const [sel, setSel] = useState(2);
  const [phase, setPhase] = useState<Phase>('idle');
  const [lines, setLines] = useState<string[]>([]);
  const [permit, setPermit] = useState<string | null>(null);
  const [xp, setXp] = useState<Record<string, number>>({});
  const [armed, setArmed] = useState(false);
  const [reverted, setReverted] = useState(false);
  const [tests, setTests] = useState<'none' | 'running' | 'pass'>('none');
  const timer = useRef<number>(0);
  const queue = useRef<string[]>([]);
  const c: Character = crew[sel];

  const stop = useCallback((): void => { window.clearTimeout(timer.current); }, []);
  useEffect(() => stop, [stop]);

  const resetReport = (): void => { setArmed(false); setReverted(false); setTests('none'); };
  const pick = (i: number): void => { stop(); setSel(i); setPhase('idle'); setLines([]); setPermit(null); resetReport(); };

  /** Show the next scripted line, pausing at permit requests. */
  const step = useCallback((id: string): void => {
    const next = queue.current.shift();
    if (next === undefined) {
      setPhase('done');
      setXp((x) => ({ ...x, [id]: (x[id] ?? 0) + 1 }));
      return;
    }
    if (next.startsWith('!')) { setPermit(next.slice(1)); setPhase('waiting'); return; }
    setLines((l) => [...l, next]);
    timer.current = window.setTimeout(() => step(id), STEP_MS);
  }, []);

  const run = (prompt: string): void => {
    stop();
    const script = SCRIPTS[c.id] ?? [];
    queue.current = script.map((l) => l.replace('{p}', prompt));
    setLines([]); setPermit(null); setPhase('working'); resetReport();
    timer.current = window.setTimeout(() => step(c.id), 300);
  };

  const stamp = (allow: boolean): void => {
    const what = permit;
    setPermit(null);
    if (!allow) { stop(); queue.current = []; setLines((l) => [...l, '> permit DENIED: ' + what, 'crew stopped. nothing was changed.']); setPhase('failed'); return; }
    setLines((l) => [...l, '> permit STAMPED: ' + what]);
    setPhase('working');
    timer.current = window.setTimeout(() => step(c.id), STEP_MS);
  };

  const undo = (): void => {
    if (!armed) { setArmed(true); window.setTimeout(() => setArmed(false), 4000); return; }
    setArmed(false); setReverted(true);
    setLines((l) => [...l, '> UNDO: restored the files from the restore point']);
  };
  const runTests = (): void => {
    setTests('running');
    window.setTimeout(() => setTests('pass'), 1500);
  };
  const changed = c.readOnly ? [] : (CHANGED[c.id] ?? []);

  const onKey = (e: React.KeyboardEvent): void => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); pick((sel + 1) % crew.length); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); pick((sel + crew.length - 1) % crew.length); }
  };

  const level = 1 + Math.floor((xp[c.id] ?? 0) / 2);
  const busy = phase === 'working' || phase === 'waiting';

  return (
    <div className="stage-wrap">
      <div className="roster" role="radiogroup" aria-label="Choose a character" onKeyDown={onKey}>
        {crew.map((m, i) => (
          <button key={m.id} type="button" role="radio" aria-checked={i === sel} tabIndex={i === sel ? 0 : -1} className={'slot' + (i === sel ? ' on' : '')} onClick={() => pick(i)}>
            <Face id={m.id} mood={i === sel ? MOOD[phase] : 'idle'} effort={m.effort} px={3} />
            <span>{m.name}</span>
            {(xp[m.id] ?? 0) > 0 && <em>LV{1 + Math.floor((xp[m.id] ?? 0) / 2)}</em>}
          </button>
        ))}
      </div>

      <div className="stage">
        <div className="hero-char">
          <div className={'pedestal ' + phase}>
            <Face id={c.id} mood={MOOD[phase]} effort={c.effort} px={9} />
            <span className="floor" />
          </div>
          <div className="lv">LV {level}{(xp[c.id] ?? 0) > 0 ? ` · ${xp[c.id]} orders done` : ''}</div>
        </div>

        <div className="sheet">
          <h3>{c.name}</h3>
          <span className="role">{c.title}</span>
          <p>{c.blurb}</p>
          <div className="stats">
            <Bar label="SPEED" value={6 - effortLevel(c.effort)} />
            <Bar label="DEPTH" value={effortLevel(c.effort)} />
            <Bar label="SAFETY" value={c.readOnly ? 5 : 3} />
            <Bar label="COST" value={tierLevel(c.tier)} />
          </div>
          <div className="tags">
            <span>{c.tier}</span>
            <span className={c.readOnly ? 'ro' : ''}>{c.readOnly ? 'read-only: never edits' : 'asks permission before editing'}</span>
          </div>
        </div>

        <div className="term" aria-live="polite">
          <div className="term-bar"><span>ORDER TERMINAL</span><em>simulated demo</em></div>
          <div className="term-body">
            {lines.length === 0 && phase === 'idle' && <p className="hint">Press an order below to dispatch {c.name}. Watch the face.</p>}
            {lines.map((l, k) => <p key={k} className={l.startsWith('>') ? 'sys' : ''}>{l}</p>)}
            {phase === 'working' && <p className="working">working<span className="dots" /></p>}
            {phase === 'waiting' && permit && (
              <div className="permit">
                <b>PERMIT REQUIRED</b>
                <code>{permit}</code>
                <div><button type="button" className="stamp" onClick={() => stamp(true)}>STAMP</button><button type="button" className="deny" onClick={() => stamp(false)}>DENY</button></div>
              </div>
            )}
            {phase === 'done' && (
              <div className="mreport">
                <b>MISSION COMPLETE <em>+1 XP</em></b>
                <span>{changed.length ? changed.length + ' file' + (changed.length === 1 ? '' : 's') + ' changed' : 'no files changed (read-only)'} · {c.readOnly ? 3 : 6} read · 4s · $0.00 (demo)</span>
                {changed.length > 0 && <div className="files">{changed.map((f) => <code key={f}>{f}</code>)}</div>}
                {changed.length > 0 && (
                  <div className="macts">
                    {reverted
                      ? <strong>Reverted: {changed.length} restored</strong>
                      : <button type="button" className={'undo' + (armed ? ' armed' : '')} onClick={undo}>{armed ? 'Click again to revert ' + changed.length + ' file' + (changed.length === 1 ? '' : 's') : 'Undo changes'}</button>}
                    <button type="button" onClick={runTests} disabled={tests === 'running'}>{tests === 'none' ? 'Run tests' : 'Run tests again'}</button>
                  </div>
                )}
                {tests === 'running' && <span className="tr">Running tests...</span>}
                {tests === 'pass' && <span className="tr pass">TESTS PASS · 24 passed · 2s</span>}
              </div>
            )}
            {phase === 'failed' && <p className="bad">STOPPED.</p>}
          </div>
          <div className="orders">
            {c.prompts.map((p) => (
              <button key={p} type="button" disabled={busy} onClick={() => run(p)}>{p}</button>
            ))}
          </div>
        </div>
      </div>
      <p className="note">Use the arrow keys to switch characters. This is a simulation of how a real crew behaves: faces and permits work like the extension.</p>
    </div>
  );
};
