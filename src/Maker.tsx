import React, { useEffect, useRef, useState } from 'react';
import { MakerPortrait, PortraitEmote, PortraitMood } from './MakerPortrait';
import { maker } from './config/site';

interface Quest { id: string; label: string; hint: string; href: string; mood: PortraitMood; emote: PortraitEmote; icon: React.ReactNode; copy?: string }

const icon = (d: string): React.ReactNode => <svg viewBox="0 0 16 16" aria-hidden="true"><path d={d} /></svg>;

const QUESTS: Quest[] = [
  { id: 'github', label: 'GitHub', hint: 'Fork me, star me, break me.', href: maker.github, mood: 'wink', emote: 'code',
    icon: icon('M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z') },
  { id: 'linkedin', label: 'LinkedIn', hint: "Let's connect. I accept friend requests.", href: maker.linkedin, mood: 'smile', emote: 'plus',
    icon: icon('M2 6h3v9H2zM3.500 1.500a1.700 1.700 0 1 1 0 3.400 1.700 1.700 0 0 1 0-3.400zM7 6h2.900v1.300c.4-.8 1.400-1.500 2.900-1.500 3 0 3.200 2 3.200 4.200V15h-3v-4.400c0-1-.1-2-1.300-2s-1.700.9-1.700 2V15H7z') },
  { id: 'email', label: 'Email', hint: 'Say hi. I read everything.', href: 'mailto:' + maker.email, mood: 'smile', emote: 'heart', copy: maker.email,
    icon: icon('M1 3h14v10H1zM2 4l6 5 6-5v-1H2z') },
  { id: 'studio', label: 'EnigmaDev', hint: 'Visit the studio behind CodeTown.', href: maker.brand, mood: 'wow', emote: 'star',
    icon: icon('M8 1l6 3v5c0 3-2.500 5-6 6-3.500-1-6-3-6-6V4zM8 4v7M5 7h6') },
];

interface Spark { id: number; x: number; y: number }

/** "Player 1" profile card: the maker, with quest buttons that make the pixel face react and spark. */
export const Maker: React.FC = () => {
  const [mood, setMood] = useState<PortraitMood>('idle');
  const [emote, setEmote] = useState<PortraitEmote>('');
  const [say, setSay] = useState("Hi! I'm Ayush. I build tools that make code feel like play.");
  const [friends, setFriends] = useState(0);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [toast, setToast] = useState('');
  const sparkId = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const later = (fn: () => void, ms: number): void => { timers.current.push(window.setTimeout(fn, ms)); };

  const burst = (e: React.MouseEvent<HTMLElement>): void => {
    const r = e.currentTarget.getBoundingClientRect();
    const host = e.currentTarget.closest('.maker-card')?.getBoundingClientRect();
    if (!host) return;
    const base = sparkId.current;
    sparkId.current += 8;
    const next = Array.from({ length: 8 }, (_, i) => ({ id: base + i, x: r.left - host.left + r.width / 2 + (i - 4) * 10, y: r.top - host.top + r.height / 2 }));
    setSparks((s) => [...s, ...next]);
    later(() => setSparks((s) => s.filter((x) => x.id < base || x.id >= base + 8)), 1100);
  };

  const onQuest = (q: Quest, e: React.MouseEvent<HTMLElement>): void => {
    burst(e);
    setFriends((n) => n + 1);
    if (q.copy) {
      void navigator.clipboard?.writeText(q.copy).then(() => { setToast('Email copied to your clipboard'); later(() => setToast(''), 2200); }).catch(() => undefined);
    }
  };

  return (
    <section id="maker" className="sec">
      <header className="sec-head">
        <span className="tag">PLAYER 1</span>
        <h2>Meet the maker</h2>
        <p>CodeTown is built by one person. Press a button and say hello.</p>
      </header>
      <div className="maker-card">
        <div className="maker-face">
          <div className={'maker-stage ' + mood}>
            <MakerPortrait mood={mood} emote={emote} />
            <span className="floor" />
          </div>
          <div className="maker-lv">LV 99 · FOUNDER</div>
        </div>

        <div className="maker-info">
          <h3>{maker.name}</h3>
          <span className="role">{maker.role} · <a href={maker.brand} target="_blank" rel="noreferrer">{maker.company}</a></span>
          <p className="speech" aria-live="polite">{say}</p>
          <div className="stats">
            {[['CODE', 5], ['DESIGN', 4], ['COFFEE', 5], ['SLEEP', 1]].map(([k, v]) => (
              <div className="stat" key={k as string}><span>{k}</span><i>{Array.from({ length: 5 }, (_, i) => <b key={i} className={i < (v as number) ? 'on' : ''} />)}</i></div>
            ))}
          </div>
          <div className="quests">
            {QUESTS.map((q) => (
              <a key={q.id} className="quest" href={q.href} target={q.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer"
                onMouseEnter={() => { setMood(q.mood); setEmote(q.emote); setSay(q.hint); }} onFocus={() => { setMood(q.mood); setEmote(q.emote); setSay(q.hint); }}
                onMouseLeave={() => { setMood('idle'); setEmote(''); }} onBlur={() => { setMood('idle'); setEmote(''); }} onClick={(e) => onQuest(q, e)}>
                {q.icon}<span>{q.label}</span>
              </a>
            ))}
          </div>
          <div className="maker-foot">
            <span>FRIENDSHIP <b>{friends}</b></span>
            <a href={'mailto:' + maker.email}>{maker.email}</a>
          </div>
        </div>
        {sparks.map((s) => <i key={s.id} className="spark" style={{ left: s.x, top: s.y, animationDelay: (s.id % 8) * 30 + 'ms', ['--dx' as string]: ((s.id % 8) - 3.5) * 16 + 'px' }} />)}
        {toast && <div className="maker-toast" role="status">{toast}</div>}
      </div>
    </section>
  );
};
