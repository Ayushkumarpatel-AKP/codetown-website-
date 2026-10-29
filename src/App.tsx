import React, { useEffect, useRef, useState } from 'react';
import { faceCanvas, FaceMood } from './lib/faces';
import { CursorFx } from './CursorFx';
import { Character, crew, engines, features, shots, site } from './config/site';

/** A pixel portrait drawn in code by the same routine the extension uses. */
const Face: React.FC<{ id: string; mood: FaceMood; effort: string; px?: number; className?: string }> = ({ id, mood, effort, px = 3, className }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const src = faceCanvas(id, mood, effort, px);
    c.width = src.width; c.height = src.height;
    const g = c.getContext('2d')!;
    g.clearRect(0, 0, c.width, c.height);
    g.drawImage(src, 0, 0);
  }, [id, mood, effort, px]);
  return <canvas ref={ref} className={'face ' + (className ?? '')} aria-hidden="true" />;
};

const Bracket: React.FC<{ children: React.ReactNode; className?: string; tilt?: boolean }> = ({ children, className, tilt }) => (
  <div className={'frame ' + (className ?? '')} data-tilt={tilt ? '' : undefined}>
    <i className="c tl" /><i className="c tr" /><i className="c bl" /><i className="c br" />
    {children}
  </div>
);

const SectionHead: React.FC<{ tag: string; title: string; sub?: string }> = ({ tag, title, sub }) => (
  <header className="sec-head">
    <span className="tag">{tag}</span>
    <h2>{title}</h2>
    {sub && <p>{sub}</p>}
  </header>
);

const Nav: React.FC = () => (
  <nav className="nav">
    <a href="#top" className="brand"><img src="/assets/brand/icon.png" alt="" width={28} height={28} /><span>CODETOWN</span><em>v{site.version}</em></a>
    <div className="links">
      <a href="#crew">Crew</a><a href="#city">City</a><a href="#features">Features</a><a href="#engines">Engines</a><a href="#install">Install</a>
    </div>
    <a className="btn ghost" href={site.urls.github} target="_blank" rel="noreferrer">GitHub</a>
  </nav>
);

const Hero: React.FC = () => (
  <section id="top" className="hero">
    <div className="hero-copy">
      <span className="tag">VS CODE EXTENSION · OFFLINE FIRST</span>
      <h1>CODE<span>TOWN</span></h1>
      <p className="lede">{site.tagline}</p>
      <div className="cta">
        <a className="btn primary" href="#install">Install</a>
        <a className="btn" href={site.urls.releases} target="_blank" rel="noreferrer">Download VSIX</a>
      </div>
      <ul className="chips">
        <li>8 characters</li><li>12 engines</li><li>3 city styles</li><li>0 external art assets</li>
      </ul>
    </div>
    <Bracket className="hero-shot" tilt>
      <img src="/assets/screenshots/hud-hall.png" alt="CodeTown in VS Code: the isometric city with the Crew Hall open" width={1600} height={900} />
    </Bracket>
  </section>
);

const CrewCard: React.FC<{ c: Character }> = ({ c }) => {
  const [hover, setHover] = useState(false);
  return (
    <article className="card char" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)} tabIndex={0}>
      <div className="char-top">
        <Face id={c.id} mood={hover ? 'working' : 'idle'} effort={c.effort} px={4} />
        <div>
          <h3>{c.name}</h3>
          <span className="role">{c.title}</span>
        </div>
      </div>
      <p>{c.blurb}</p>
      <div className="tags">
        <span>thinks {c.effort === 'low' ? 'quick' : c.effort === 'high' ? 'careful' : 'balanced'}</span>
        <span>{c.tier}</span>
        <span className={c.readOnly ? 'ro' : ''}>{c.readOnly ? 'read-only' : 'asks before editing'}</span>
      </div>
      <div className="prompts">{c.prompts.map((p) => <button key={p} type="button" tabIndex={-1}>{p}</button>)}</div>
    </article>
  );
};

const CrewHall: React.FC = () => (
  <section id="crew" className="sec">
    <SectionHead tag="CREW HALL" title="Meet the crew" sub="Pick a character, press a starter prompt, press DISPATCH. Each one has its own face, job and rules. Hover a card to see it get to work." />
    <div className="grid chars">{crew.map((c) => <CrewCard key={c.id} c={c} />)}</div>
    <div className="moods">
      <span className="tag">FACES FOLLOW THE REAL STATE</span>
      {(['idle', 'working', 'waiting', 'done', 'failed'] as FaceMood[]).map((m) => (
        <figure key={m}><Face id="builder" mood={m} effort="medium" px={3} /><figcaption>{m === 'waiting' ? 'permit' : m}</figcaption></figure>
      ))}
    </div>
  </section>
);

const Gallery: React.FC = () => {
  const [i, setI] = useState(0);
  const s = shots[i];
  return (
    <section id="city" className="sec">
      <SectionHead tag="THE CITY" title="One repo, three looks" sub="Real screenshots of CodeTown running on its own source code. All art is drawn in code; nothing is imported." />
      <div className="tabs" role="tablist">
        {shots.map((x, k) => (
          <button key={x.id} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)}>{x.label}</button>
        ))}
      </div>
      <Bracket><img key={s.id} className="shot" src={s.src} alt={s.label + ' view of CodeTown'} loading="lazy" width={1600} height={900} /></Bracket>
      <p className="note">{s.note}</p>
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
      <ol className="steps">
        <li><b>01</b><div><h3>Install the extension</h3><p>Download <code>codetown.vsix</code> from the latest release, then run:</p>
          <div className="cmd"><code>{site.install}</code><button type="button" onClick={copy}>{done ? 'Copied' : 'Copy'}</button></div></div></li>
        <li><b>02</b><div><h3>Open the town</h3><p>Press <code>Ctrl+Shift+P</code> and run <code>CodeTown: Open Town</code>, or click the CodeTown icon in the activity bar.</p></div></li>
        <li><b>03</b><div><h3>Pick a character and give an order</h3><p>Open <b>Crew</b>, choose a character, press a starter prompt. Add an API key, or choose OpenCode for free models.</p></div></li>
      </ol>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="foot">
    <div><img src="/assets/brand/icon.png" alt="" width={22} height={22} /> <b>CODETOWN</b> v{site.version} · Made by AKP</div>
    <div className="links">
      <a href={site.urls.github} target="_blank" rel="noreferrer">GitHub</a>
      <a href={site.urls.releases} target="_blank" rel="noreferrer">Releases</a>
      <a href={site.urls.issues} target="_blank" rel="noreferrer">Issues</a>
    </div>
  </footer>
);

export const App: React.FC = () => (
  <>
    <CursorFx />
    <Nav />
    <main>
      <Hero />
      <CrewHall />
      <Gallery />
      <Features />
      <Engines />
      <Install />
    </main>
    <Footer />
  </>
);

export default App;
