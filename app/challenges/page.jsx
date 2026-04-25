'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '../../components/navbar/Navbar';

// ── Data ──────────────────────────────────────────────────────────────────

const TODAY = {
  title: 'Critique the negative space',
  description: 'Pick any work from the library and write specifically about what the empty areas communicate. Do they breathe, or do they suffocate? Consider how the artist uses absence as a compositional tool.',
  tags: ['Composition', 'Space', 'Intention'],
  duration: '15 – 20 min',
  href: '/critique',
};

const WEEKLY_THEME = {
  title: 'The Language of Texture',
  subtitle: 'how surfaces speak',
  description: 'This week every prompt centres on texture — visual, tactile, psychological.',
  daysLeft: 4,
};

const CATEGORIES = [
  { id: 'all',         label: 'All',         symbol: '◈', bg: '#FFF8F2', pat: null,                                                                                                                                                                                   text: '#2C2825' },
  { id: 'composition', label: 'Composition', symbol: '□', bg: '#FFF0EB', pat: 'repeating-linear-gradient(transparent 0px,transparent 13px,rgba(200,100,80,.5) 13px,rgba(200,100,80,.5) 14px)',                                                                        text: '#2C2825' },
  { id: 'color',       label: 'Color',       symbol: '●', bg: '#F4A5A5', pat: null,                                                                                                                                                                                   text: '#5C1E1E' },
  { id: 'light',       label: 'Light',       symbol: '◑', bg: '#FFCBA4', pat: null,                                                                                                                                                                                   text: '#5C3A1E' },
  { id: 'form',        label: 'Form',        symbol: '▲', bg: '#5C3A1E', pat: 'radial-gradient(circle,rgba(255,255,255,.28) 1.5px,transparent 1.5px)', patSize: '8px 8px',                                                                                            text: '#FFF8F0' },
  { id: 'narrative',   label: 'Narrative',   symbol: '→', bg: '#C84B3A', pat: null,                                                                                                                                                                                   text: '#FFF8F0' },
  { id: 'mood',        label: 'Mood',        symbol: '◐', bg: '#E8D5C4', pat: 'repeating-linear-gradient(45deg,rgba(200,170,130,.4) 0,rgba(200,170,130,.4) 4px,transparent 4px,transparent 10px)',                                                                    text: '#2C2825' },
];
const CAT_ROT = [-0.8, 0.5, -0.3, 0.7, -0.5, 0.3, -0.6];

const UPCOMING = [
  { id: 2, day: 'Yesterday', isNew: false, done: true,  title: 'Colour temperature walk',      tags: ['Color'],       duration: '10 – 15 min', href: '/critique' },
  { id: 3, day: 'Tomorrow',  isNew: true,  done: false, title: 'The rule of thirds — broken',  tags: ['Composition'], duration: '20 min',       href: null },
  { id: 4, day: 'Day 4',     isNew: true,  done: false, title: 'Light source audit',           tags: ['Light'],       duration: '15 min',       href: null },
];
const UPCOMING_ROT = [-0.7, 0.5, -0.4];

const STREAK = [
  { label: 'M', done: true  },
  { label: 'T', done: true  },
  { label: 'W', done: true  },
  { label: 'T', done: false, today: true },
  { label: 'F', done: false },
  { label: 'S', done: false },
  { label: 'S', done: false },
];

const WEEKS = [
  [true,  true,  true,  false, false, false, false],
  [true,  true,  true,  true,  true,  false, false],
  [true,  false, true,  true,  false, true,  false],
  [false, true,  true,  false, true,  true,  true ],
];

const REWARDS = [
  { id: 'first',   label: 'First Look', symbol: '◈', earned: true,  xp: 10  },
  { id: 'streak3', label: '3-Day Run',  symbol: '▲', earned: true,  xp: 25  },
  { id: 'streak7', label: 'Week Run',   symbol: '◑', earned: false, xp: 50  },
  { id: 'month',   label: 'Month',      symbol: '◉', earned: false, xp: 100 },
  { id: 'maker',   label: 'Maker',      symbol: '✦', earned: false, xp: 30  },
];
const BADGE_ROT = [-1.2, 0.8, -0.5, 1.0, -0.7];

const WEEK_PROGRESS = { done: 3, total: 7 };

// ── Shared aesthetic helpers ───────────────────────────────────────────────

function OceanBackdrop() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#C4E6F4 0%,#A0CEE6 22%,#7AB4D6 44%,#58A0C8 58%,#4590B8 72%,#3880A8 85%,#2A6D98 100%)' }} />
      <div style={{ position: 'absolute', top: '10%', right: '20%', width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,234,160,.65)', boxShadow: '0 0 70px 35px rgba(255,230,150,.2)', filter: 'blur(5px)' }} />
      <div style={{ position: 'absolute', top: '50%', left: '28%', width: '44%', height: 5, background: 'linear-gradient(to right,transparent,rgba(255,230,150,.5),transparent)', filter: 'blur(3px)', transform: 'skewX(-6deg)' }} />
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '44%' }} viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,160 C180,120 360,200 540,160 C720,120 900,200 1080,160 C1260,120 1380,200 1440,160 L1440,320 L0,320 Z" fill="rgba(42,109,152,.5)" />
        <path d="M0,196 C240,150 480,238 720,196 C960,154 1200,238 1440,196 L1440,320 L0,320 Z" fill="rgba(30,95,138,.65)" />
        <path d="M0,238 C180,208 360,264 540,238 C720,212 900,264 1080,238 C1260,212 1380,254 1440,238 L1440,320 L0,320 Z" fill="rgba(20,82,125,.82)" />
        <path d="M0,236 C180,206 360,262 540,236 C720,210 900,262 1080,236 C1260,210 1380,252 1440,236" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="2" />
        <path d="M0,194 C240,148 480,236 720,194 C960,152 1200,236 1440,194" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function CircledText({ children, color = '#C84B3A' }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', padding: '1px 4px' }}>
      <svg aria-hidden style={{ position: 'absolute', left: '-12%', top: '-30%', width: '124%', height: '160%', overflow: 'visible', pointerEvents: 'none' }} viewBox="0 0 100 30" preserveAspectRatio="none">
        <path d="M9,15 C8,4 26,-2 50,0 C74,2 95,6 97,15 C99,24 80,31 50,30 C20,29 4,23 8,16" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </span>
  );
}

function Highlighted({ children, color = 'rgba(255,215,70,.45)' }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span aria-hidden style={{ position: 'absolute', left: -3, right: -3, top: '15%', bottom: '5%', background: color, transform: 'rotate(-.6deg) skewX(-2deg)', borderRadius: 1, zIndex: 0 }} />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </span>
  );
}

// Tape strip label pinned above a card
function WashiLabel({ children, bg = '#C84B3A', color = '#FFF8F0', rot = 0 }) {
  return (
    <div style={{ display: 'inline-block', background: bg, color, padding: '3px 16px', fontSize: 9, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', transform: `rotate(${rot}deg)`, boxShadow: '1px 2px 4px rgba(0,0,0,.22)' }}>
      {children}
    </div>
  );
}

// Hand-drawn progress bar
function ProgressBar({ done, total }) {
  const pct = Math.round((done / total) * 100);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 9, color: '#9C7060', letterSpacing: '.05em', textTransform: 'uppercase' }}>
          <Highlighted color="rgba(255,215,70,.4)">progress</Highlighted>
        </span>
        <span style={{ fontSize: 11, color: '#2C2825', fontWeight: 700 }}>{done} / {total} this week</span>
      </div>
      <div style={{ height: 11, background: 'rgba(196,168,130,.2)', border: '2px solid #2C2825', borderRadius: '3px 7px 4px 2px / 6px 2px 7px 3px', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: '#C84B3A', transition: 'width .6s ease' }} />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function ChallengesPage() {
  const [view, setView]                   = useState('daily');
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <>
      <OceanBackdrop />
      <div style={{ minHeight: '100vh', color: '#2C2825' }}>
        <main className="pt-[100px] pb-20 px-8 max-w-5xl mx-auto">
          <div style={{ background: 'rgba(255,248,242,.96)', borderRadius: '3px 5px 4px 2px / 5px 3px 4px 3px', padding: '40px 48px 52px', boxShadow: '0 10px 40px rgba(0,0,0,.2), 0 2px 8px rgba(0,0,0,.1), inset 0 1px 0 rgba(255,255,255,.9)' }}>

            {/* ── Header ── */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <h1 style={{ fontFamily: 'Mansalva', fontSize: 52, color: '#C84B3A', lineHeight: 1 }}>challenges.</h1>
                <p className="mt-1 text-sm" style={{ color: '#9C7060' }}>Build the habit of looking harder.</p>
              </div>
              {/* XP chip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '2px solid #2C2825', borderRadius: '2px 7px 4px 2px / 6px 2px 7px 3px', padding: '6px 14px', background: '#FFF8F2', boxShadow: '2px 3px 8px rgba(0,0,0,.1)', transform: 'rotate(0.6deg)' }}>
                <span style={{ fontSize: 18, color: '#C84B3A' }}>✦</span>
                <div>
                  <p style={{ fontFamily: 'Mansalva', fontSize: 16, color: '#2C2825', lineHeight: 1 }}>35 xp</p>
                  <p style={{ fontSize: 9, color: '#9C7060', letterSpacing: '.04em' }}>LEVEL 2</p>
                </div>
              </div>
            </div>

            {/* ── Today + Weekly theme ── */}
            <div className="flex gap-4 mb-8 items-stretch">

              {/* Today's challenge */}
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ position: 'absolute', top: -11, left: 18, zIndex: 1 }}>
                  <WashiLabel>today</WashiLabel>
                </div>
                <div style={{ backgroundColor: '#FFF0EB', backgroundImage: 'repeating-linear-gradient(transparent 0px,transparent 17px,rgba(200,100,80,.42) 17px,rgba(200,100,80,.42) 18px)', border: '2px solid #2C2825', borderRadius: '3px 9px 5px 2px / 8px 2px 9px 4px', padding: '28px 24px 20px', transform: 'rotate(-0.4deg)', boxShadow: '3px 5px 16px rgba(0,0,0,.13)', height: '100%', boxSizing: 'border-box' }}>
                  <h2 style={{ fontFamily: 'Mansalva', fontSize: 24, color: '#2C2825', lineHeight: 1.2 }}>{TODAY.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: '#7A6050' }}>{TODAY.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                    {TODAY.tags.map(t => (
                      <span key={t} style={{ fontSize: 11, padding: '2px 10px', border: '1.5px solid #C4A882', borderRadius: '8px', color: '#9C7060' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
                    <span style={{ fontSize: 11, color: '#B4AEA8' }}>{TODAY.duration}</span>
                    <Link href={TODAY.href} style={{ background: '#C84B3A', color: '#FFF8F0', padding: '8px 22px', fontFamily: 'Mansalva', fontSize: 16, textDecoration: 'none', border: '1.5px solid #2C2825', borderRadius: '2px 6px 4px 2px / 4px 2px 6px 3px', boxShadow: '2px 3px 8px rgba(200,75,58,.3)' }}>
                      start →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Weekly theme */}
              <div style={{ width: 210, position: 'relative', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: -11, right: 18, zIndex: 1 }}>
                  <WashiLabel bg="#5C3A1E" rot={0.5}>this week</WashiLabel>
                </div>
                <div style={{ backgroundColor: '#FFCBA4', backgroundImage: 'repeating-linear-gradient(rgba(180,100,60,.22) 0,rgba(180,100,60,.22) 1px,transparent 1px,transparent 10px),repeating-linear-gradient(90deg,rgba(180,100,60,.22) 0,rgba(180,100,60,.22) 1px,transparent 1px,transparent 10px)', backgroundSize: '10px 10px', border: '2px solid #2C2825', borderRadius: '7px 2px 8px 3px / 2px 8px 3px 7px', padding: '28px 18px 20px', transform: 'rotate(0.6deg)', boxShadow: '3px 5px 14px rgba(0,0,0,.12)', height: '100%', boxSizing: 'border-box' }}>
                  <span style={{ fontSize: 9, letterSpacing: '.05em', textTransform: 'uppercase', color: '#9C7060' }}>
                    <Highlighted color="rgba(255,215,70,.45)">{WEEKLY_THEME.subtitle}</Highlighted>
                  </span>
                  <h3 style={{ fontFamily: 'Mansalva', fontSize: 18, color: '#5C3A1E', lineHeight: 1.2, marginTop: 8 }}>{WEEKLY_THEME.title}</h3>
                  <p style={{ fontSize: 11, color: '#7A5040', marginTop: 8, lineHeight: 1.55 }}>{WEEKLY_THEME.description}</p>
                  <p style={{ fontSize: 10, color: '#9C7060', marginTop: 14 }}>Ends in <strong>{WEEKLY_THEME.daysLeft}</strong> days</p>
                </div>
              </div>
            </div>

            {/* ── Categories ── */}
            <div className="mb-8">
              <p style={{ fontSize: 9, letterSpacing: '.05em', textTransform: 'uppercase', color: '#7A6050', marginBottom: 10 }}>
                <Highlighted>Categories</Highlighted>
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {CATEGORIES.map((cat, idx) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      backgroundColor: activeCategory === cat.id ? '#C84B3A' : cat.bg,
                      backgroundImage: activeCategory === cat.id ? 'none' : cat.pat ?? undefined,
                      backgroundSize: cat.patSize,
                      color: activeCategory === cat.id ? '#FFF8F0' : cat.text,
                      border: '2px solid #2C2825',
                      borderRadius: '2px 7px 4px 2px / 5px 2px 7px 3px',
                      padding: '6px 14px',
                      fontSize: 12,
                      fontWeight: 600,
                      transform: `rotate(${CAT_ROT[idx]}deg)`,
                      boxShadow: activeCategory === cat.id ? '2px 3px 10px rgba(200,75,58,.4)' : '1px 2px 6px rgba(0,0,0,.1)',
                      transition: 'all .18s',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    {cat.symbol} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Upcoming challenges ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
              {UPCOMING.map((c, idx) => {
                const card = (
                  <div style={{ backgroundColor: c.done ? '#F5EDE0' : '#FFF8F2', backgroundImage: c.done ? 'repeating-linear-gradient(transparent 0px,transparent 15px,rgba(200,100,80,.3) 15px,rgba(200,100,80,.3) 16px)' : undefined, border: '2px solid #2C2825', borderRadius: '3px 8px 4px 2px / 7px 2px 8px 4px', padding: '16px', transform: `rotate(${UPCOMING_ROT[idx]}deg)`, boxShadow: '2px 3px 10px rgba(0,0,0,.1)', opacity: c.href || c.done ? 1 : 0.6, minHeight: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                    {c.isNew && !c.done && (
                      <div style={{ position: 'absolute', top: -10, right: 14, zIndex: 1 }}>
                        <WashiLabel bg="#5C3A1E" color="#FFF8F0">new</WashiLabel>
                      </div>
                    )}
                    <div>
                      <span style={{ fontSize: 10, color: c.done ? '#9C7060' : '#C84B3A', fontWeight: 700, letterSpacing: '.04em' }}>{c.day}</span>
                      <p style={{ fontFamily: 'Mansalva', fontSize: 15, color: '#2C2825', marginTop: 6, lineHeight: 1.3 }}>{c.title}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {c.tags.map(t => (
                          <span key={t} style={{ fontSize: 10, padding: '2px 8px', border: '1.5px solid #C4A882', borderRadius: '6px', color: '#9C7060' }}>{t}</span>
                        ))}
                      </div>
                      {c.done && <span style={{ fontSize: 16, color: '#C84B3A', fontWeight: 700 }}>✓</span>}
                    </div>
                  </div>
                );
                return c.href
                  ? <Link key={c.id} href={c.href} style={{ display: 'block', textDecoration: 'none' }}>{card}</Link>
                  : <div key={c.id}>{card}</div>;
              })}
            </div>

            {/* ── Continuity tracker ── */}
            <div style={{ backgroundColor: '#FFF8F2', backgroundImage: 'radial-gradient(circle,rgba(180,140,100,.25) 1.5px,transparent 1.5px)', backgroundSize: '14px 14px', border: '2px solid #2C2825', borderRadius: '3px 7px 5px 2px / 6px 2px 7px 4px', padding: '24px', marginBottom: 24, boxShadow: '2px 4px 12px rgba(0,0,0,.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <p style={{ fontFamily: 'Mansalva', fontSize: 20, color: '#2C2825' }}>3-day streak</p>
                  <p style={{ fontSize: 11, color: '#9C7060', marginTop: 2 }}>Complete today to keep it going</p>
                </div>
                {/* Daily / Weekly toggle */}
                <div style={{ display: 'flex', border: '2px solid #2C2825', borderRadius: '2px 7px 4px 2px / 5px 2px 7px 3px', overflow: 'hidden' }}>
                  {['daily', 'weekly'].map((v, i) => (
                    <button key={v} onClick={() => setView(v)}
                      style={{ padding: '5px 18px', fontSize: 11, fontWeight: 700, background: view === v ? '#2C2825' : 'transparent', color: view === v ? '#FFF8F0' : '#9C7060', border: 'none', borderRight: i === 0 ? '2px solid #2C2825' : 'none', cursor: 'pointer', textTransform: 'capitalize', fontFamily: 'inherit', transition: 'background .15s' }}
                    >{v}</button>
                  ))}
                </div>
              </div>

              {/* Daily view */}
              {view === 'daily' && (
                <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
                  {STREAK.map((d, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 40, height: 40, border: `2px solid ${d.today ? '#C84B3A' : '#2C2825'}`, borderRadius: '2px 7px 3px 2px / 6px 2px 7px 3px', background: d.done ? '#C84B3A' : d.today ? 'rgba(200,75,58,.08)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: d.done ? '#FFF8F0' : '#C4A882', fontSize: 16 }}>
                        {d.done ? '✓' : ''}
                      </div>
                      <span style={{ fontSize: 10, color: d.today ? '#C84B3A' : '#9C7060', fontWeight: d.today ? 700 : 400 }}>{d.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Weekly view */}
              {view === 'weekly' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {WEEKS.map((week, wi) => (
                    <div key={wi} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span style={{ fontSize: 9, color: '#B4AEA8', width: 68, textAlign: 'right', flexShrink: 0 }}>
                        {wi === 0 ? 'this week' : wi === 1 ? 'last week' : `${wi} wks ago`}
                      </span>
                      <div style={{ display: 'flex', gap: 4, flex: 1 }}>
                        {week.map((done, di) => (
                          <div key={di} style={{ flex: 1, height: 24, border: '1.5px solid #2C2825', borderRadius: '1px 5px 2px 1px / 4px 1px 5px 2px', background: done ? '#C84B3A' : 'transparent', opacity: wi === 0 && di > 2 ? 0.22 : 1 }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Progress bar */}
              <div style={{ marginTop: 20 }}>
                <ProgressBar done={WEEK_PROGRESS.done} total={WEEK_PROGRESS.total} />
              </div>
            </div>

            {/* ── Rewards ── */}
            <div style={{ border: '2px solid #2C2825', borderRadius: '3px 7px 5px 2px / 6px 2px 7px 4px', padding: '20px 24px', marginBottom: 24, background: '#FFF8F2', boxShadow: '2px 3px 10px rgba(0,0,0,.09)' }}>
              <p style={{ fontSize: 9, letterSpacing: '.05em', textTransform: 'uppercase', color: '#7A6050', marginBottom: 16 }}>
                <Highlighted>Rewards</Highlighted>
              </p>
              <div style={{ display: 'flex', gap: 28 }}>
                {REWARDS.map((r, i) => (
                  <div key={r.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: r.earned ? 1 : 0.42 }}>
                    <div style={{ width: 54, height: 54, border: `2px ${r.earned ? 'solid' : 'dashed'} #2C2825`, borderRadius: '50%', background: r.earned ? '#C84B3A' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: r.earned ? '#FFF8F0' : '#C4A882', boxShadow: r.earned ? '2px 3px 10px rgba(200,75,58,.3)' : 'none', transform: `rotate(${BADGE_ROT[i]}deg)` }}>
                      {r.symbol}
                    </div>
                    <span style={{ fontSize: 10, color: '#7A6050', textAlign: 'center', lineHeight: 1.2 }}>{r.label}</span>
                    <span style={{ fontSize: 9, color: '#B4AEA8' }}>+{r.xp} xp</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Custom + Browse ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Custom challenge — dark dotted */}
              <button style={{ backgroundColor: '#5C3A1E', backgroundImage: 'radial-gradient(circle,rgba(255,255,255,.28) 1.5px,transparent 1.5px)', backgroundSize: '8px 8px', border: '2px solid #2C2825', borderRadius: '4px 2px 7px 3px / 2px 6px 3px 7px', padding: '24px', transform: 'rotate(-0.4deg)', boxShadow: '3px 4px 14px rgba(0,0,0,.15)', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                <span style={{ fontSize: 28, color: '#FFF8F0', display: 'block' }}>+</span>
                <p style={{ fontFamily: 'Mansalva', fontSize: 20, color: '#FFF8F0', marginTop: 8 }}>Custom challenge</p>
                <p style={{ fontSize: 11, color: 'rgba(255,240,220,.6)', marginTop: 6, lineHeight: 1.55 }}>Set your own prompt, duration, and focus area.</p>
              </button>

              {/* Browse general — lined salmon */}
              <button style={{ backgroundColor: '#FFF0EB', backgroundImage: 'repeating-linear-gradient(transparent 0px,transparent 15px,rgba(200,100,80,.45) 15px,rgba(200,100,80,.45) 16px)', border: '2px solid #2C2825', borderRadius: '2px 7px 4px 3px / 6px 2px 7px 3px', padding: '24px', transform: 'rotate(0.5deg)', boxShadow: '3px 4px 12px rgba(0,0,0,.1)', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                <span style={{ fontSize: 28, color: '#C84B3A', display: 'block' }}>⊕</span>
                <p style={{ fontFamily: 'Mansalva', fontSize: 20, color: '#2C2825', marginTop: 8 }}>Browse challenges</p>
                <p style={{ fontSize: 11, color: '#7A6050', marginTop: 6, lineHeight: 1.55 }}>Explore the full archive of critique prompts by category.</p>
              </button>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
