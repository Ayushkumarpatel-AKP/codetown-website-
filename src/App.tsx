import React, { useEffect, useState } from 'react';
import { CrewStage } from './CrewStage';
import { CursorFx } from './CursorFx';
import { CraftBg } from './CraftBg';
import { MonitorPlayer } from './MonitorPlayer';
import { SafetyNet } from './SafetyNet';
import { InstallButton } from './InstallButton';
import { Maker } from './Maker';
import { engines, features, maker, shots, site } from './config/site';

const SectionHead: React.FC<{ tag: string; title: string; sub?: string }> = ({ tag, title, sub }) => (
  <header className="sec-head">
    <span className="tag">{tag}</span>
    <h2>{title}</h2>
    {sub && <p>{sub}</p>}
  </header>
);

const Nav: React.FC = () => (
  <nav className="nav">
    <a href="#top" className="brand"><img src="/assets/brand/logo-c-256.png" alt="CodeTown" width={34} height={34} /><span>CODETOWN</span><em>v{site.version}</em></a>
    <div className="links">
      <a href="#crew">Crew</a><a href="#city">City</a><a href="#features">Features</a><a href="#engines">Engines</a><a href="#install">Install</a><a href="#maker">Maker</a>
    </div>
    <a className="btn ghost" href={site.urls.github} target="_blank" rel="noreferrer">GitHub</a>
    <a className="btn primary ghost" href={site.urls.vscode}>Install</a>
  </nav>
);

const Hero: React.FC = () => (
  <section id="top" className="hero">
    <div className="hero-copy">
      <span className="tag">VS CODE EXTENSION · OFFLINE FIRST</span>
      <h1>CODE<span>TOWN</span></h1>
      <p className="lede">{site.tagline}</p>
      <div className="cta">
        <InstallButton />
      </div>
      <ul className="chips">
        <li>8 characters</li><li>12 engines</li><li>3 city styles</li><li>0 external art assets</li>
      </ul>
    </div>
    <MonitorPlayer />
  </section>
);

const CrewHall: React.FC = () => (
  <section id="crew" className="sec">
    <SectionHead tag="CREW HALL" title="Pick your fighter" sub="Eight characters, each with its own face, job and rules. Choose one, dispatch an order and watch the face react. Try STAMP and DENY." />
    <CrewStage />
  </section>
);

const AUTO_MS = 5200;

/** Compact viewer: cartridge list on the side, auto-advancing, with a magnifier lens on hover. */
const Gallery: React.FC = () => {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [lens, setLens] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const s = shots[i];

  useEffect(() => {
    if (!auto || paused) return;
    const t = window.setTimeout(() => setI((k) => (k + 1) % shots.length), AUTO_MS);
    return () => window.clearTimeout(t);
  }, [i, auto, paused]);

  const choose = (k: number): void => { setAuto(false); setI(k); };

  const onMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    setLens({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height });
  };

  const LENS = 190, ZOOM = 2.4;
  return (
    <section id="city" className="sec compact">
      <SectionHead tag="THE CITY" title="One repo, eight views" sub="Real screenshots of CodeTown running on its own source code. Hover the screen to magnify. Pick a cartridge to switch." />
      <div className="gallery">
        <div className="viewer-wrap">
          <div className="viewer" onPointerMove={onMove} onPointerLeave={() => { setLens(null); setPaused(false); }} onPointerEnter={() => setPaused(true)}>
            <i className="c tl" /><i className="c tr" /><i className="c bl" /><i className="c br" />
            <img key={s.id} className="wipe" src={s.src} alt={s.label + ' view of CodeTown'} width={1600} height={900} />
            <span className="badge">&#9654; {s.label.toUpperCase()}</span>
            <span className="count">{String(i + 1).padStart(2, '0')}/{String(shots.length).padStart(2, '0')}</span>
            {lens && (
              <span
                className="lens"
                style={{
                  left: lens.x - LENS / 2, top: lens.y - LENS / 2, width: LENS, height: LENS,
                  backgroundImage: 'url(' + s.src + ')',
                  backgroundSize: lens.w * ZOOM + 'px ' + lens.h * ZOOM + 'px',
                  backgroundPosition: (-(lens.x * ZOOM - LENS / 2)) + 'px ' + (-(lens.y * ZOOM - LENS / 2)) + 'px',
                }}
              />
            )}
          </div>
          <p className="note">{s.note}</p>
        </div>

        <div className="carts" role="tablist" aria-label="Views">
          {shots.map((x, k) => (
            <button key={x.id} type="button" role="tab" aria-selected={k === i} className={'cart' + (k === i ? ' on' : '')} onClick={() => choose(k)}>
              <img src={x.src} alt="" loading="lazy" width={96} height={54} />
              <span>{x.label}</span>
              {k === i && auto && !paused && <i className="prog" style={{ animationDuration: AUTO_MS + 'ms' }} key={'p' + i} />}
            </button>
          ))}
          <button type="button" className="autobtn" onClick={() => setAuto((v) => !v)} aria-pressed={auto}>{auto ? '\u275A\u275A AUTO PLAY' : '\u25B6 AUTO PLAY'}</button>
        </div>
      </div>
    </section>
  );
};

const Features: React.FC = () => (
  <section id="features" className="sec">
    <SectionHead tag="FEATURES" title="Built like a game, safe like a tool" />
    <div className="grid feats">
      {features.map((f) => (
        <article key={f.title} className="card feat"><span className="tag">{f.tag}</span><h3>{f.title}</h3><p>{f.text}</p></article>
      ))}
    </div>
  </section>
);

const Engines: React.FC = () => (
  <section id="engines" className="sec">
    <SectionHead tag="ENGINES" title="Run it with whatever model you have" sub="Free options work out of the box. If a model's provider fails, OpenCode crews fall back to another free model automatically." />
    <ul className="engines">
      {engines.map((e) => <li key={e.name} className={e.free ? 'free' : ''}>{e.name}{e.free && <b>free tier</b>}</li>)}
    </ul>
    <p className="note">Your API keys stay in VS Code secret storage. File contents are sent only to the provider you choose, and secret files such as .env are never read.</p>
  </section>
);

const Install: React.FC = () => {
  const [done, setDone] = useState(false);
  const copy = (): void => {
    void navigator.clipboard?.writeText(site.install).then(() => { setDone(true); setTimeout(() => setDone(false), 1600); }).catch(() => undefined);
  };
  return (
    <section id="install" className="sec">
      <SectionHead tag="INSTALL" title="Three steps to your city" />
      <div className="install-row">
        <InstallButton label="Install in VS Code" />
        <a className="btn" href={site.urls.marketplace} target="_blank" rel="noreferrer">Open Marketplace page</a>
      </div>
      <p className="note">The first button opens VS Code on the CodeTown page. Press <b>Install</b> there and you are done.</p>
      <ol className="steps">
        <li><b>01</b><div><h3>Install the extension</h3><p>Press <b>Install in VS Code</b> above, or run this in a terminal:</p>
          <div className="cmd"><code>{site.install}</code><button type="button" onClick={copy}>{done ? 'Copied' : 'Copy'}</button></div></div></li>
        <li><b>02</b><div><h3>Open the town</h3><p>Press <code>Ctrl+Shift+P</code> and run <code>CodeTown: Open Town</code>, or click the CodeTown icon in the activity bar.</p></div></li>
        <li><b>03</b><div><h3>Pick a character and give an order</h3><p>Open <b>Crew</b>, choose a character, press a starter prompt. Add an API key, or choose OpenCode for free models.</p></div></li>
      </ol>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="foot">
    <div><img src="/assets/brand/logo-c-256.png" alt="" width={22} height={22} /> <b>CODETOWN</b> v{site.version} · Made by AKP · <a href={maker.brand} target="_blank" rel="noreferrer">EnigmaDev</a></div>
    <div className="links">
      <a href={site.urls.github} target="_blank" rel="noreferrer">GitHub</a>
      <a href={site.urls.releases} target="_blank" rel="noreferrer">Releases</a>
      <a href={site.urls.issues} target="_blank" rel="noreferrer">Issues</a>
      <a href={maker.brand} target="_blank" rel="noreferrer">EnigmaDev</a>
      <a href={maker.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      <a href={'mailto:' + maker.email}>Email</a>
    </div>
  </footer>
);

export const App: React.FC = () => (
  <>
    <CraftBg />
    <CursorFx />
    <Nav />
    <main>
      <Hero />
      <CrewHall />
      <SafetyNet />
      <Gallery />
      <Features />
      <Engines />
      <Install />
      <Maker />
    </main>
    <Footer />
  </>
);

export default App;
