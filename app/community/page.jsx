'use client';

import { useState } from 'react';
import Link from 'next/link';

// ── Data ──────────────────────────────────────────────────────────────────

const COLLABS = [
  { id: 1, title: 'Light & Shadow Study',      category: 'Painting',     participants: 4, activity: 12, open: true  },
  { id: 2, title: 'Urban Photography Series',  category: 'Photography',  participants: 3, activity: 7,  open: true  },
  { id: 3, title: 'Form Deconstruction',       category: 'Digital',      participants: 2, activity: 3,  open: false },
];
const COLLAB_ROT = [-0.7, 0.5, -0.4];
const COLLAB_PAPER = [
  { bg: '#FFF0EB', pat: 'repeating-linear-gradient(transparent 0px,transparent 15px,rgba(200,100,80,.42) 15px,rgba(200,100,80,.42) 16px)' },
  { bg: '#FFCBA4', pat: 'repeating-linear-gradient(rgba(180,100,60,.22) 0,rgba(180,100,60,.22) 1px,transparent 1px,transparent 10px),repeating-linear-gradient(90deg,rgba(180,100,60,.22) 0,rgba(180,100,60,.22) 1px,transparent 1px,transparent 10px)', patSize: '10px 10px' },
  { bg: '#F5EDE0', pat: null },
];

const COMMENTS = [
  { id: 1, user: 'M', color: '#C84B3A', text: 'The way you handled the midtones here reminds me of late Rembrandt — deliberate restraint.', work: 'Untitled I',   time: '2h ago' },
  { id: 2, user: 'A', color: '#5C3A1E', text: 'Strong composition but the colour temperature shift in the background feels unresolved.',       work: 'Motion Study', time: '5h ago' },
  { id: 3, user: 'L', color: '#FFCBA4', textCol: '#5C3A1E', text: 'I love how the negative space breathes here. The eye has room to rest.',                           work: 'Flow',         time: '1d ago' },
  { id: 4, user: 'R', color: '#F4A5A5', textCol: '#5C1E1E', text: 'The texture work on the left third is doing a lot of heavy lifting — is that intentional?',       work: 'Still Life',   time: '2d ago' },
];
const COMMENT_ROT = [-0.5, 0.4, -0.3, 0.6];

const SHARED = [
  { id: 1, src: '/images/bg1.jpg', title: 'Ref Pack #1',   by: 'M', type: 'collection', vi: 0 },
  { id: 2, src: '/images/bg5.jpg', title: 'Light Study',   by: 'A', type: 'single',     vi: 1 },
  { id: 3, src: '/images/bg2.gif', title: 'Motion Refs',   by: 'L', type: 'collection', vi: 2 },
  { id: 4, src: '/images/bg3.gif', title: 'Texture Board', by: 'R', type: 'collection', vi: 3 },
];
const SHARED_PAPER = [
  { bg: '#FFF8F2', pat: null, text: '#5C3A1E', sub: '#9C7060' },
  { bg: '#F4A5A5', pat: null, text: '#5C1E1E', sub: '#7A3030' },
  { bg: '#FFCBA4', pat: 'repeating-linear-gradient(rgba(180,100,60,.22) 0,rgba(180,100,60,.22) 1px,transparent 1px,transparent 10px),repeating-linear-gradient(90deg,rgba(180,100,60,.22) 0,rgba(180,100,60,.22) 1px,transparent 1px,transparent 10px)', patSize: '10px 10px', text: '#5C3A1E', sub: '#9C7A60' },
  { bg: '#FFF8F0', pat: 'repeating-linear-gradient(rgba(200,100,80,.28) 0,rgba(200,100,80,.28) 1px,transparent 1px,transparent 14px),repeating-linear-gradient(90deg,rgba(200,100,80,.28) 0,rgba(200,100,80,.28) 1px,transparent 1px,transparent 14px)', patSize: '14px 14px', text: '#2C2825', sub: '#9C7060' },
];
const SHARED_ROT = [-1.2, 0.8, -0.6, 1.1];

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

function Highlighted({ children, color = 'rgba(255,215,70,.45)' }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span aria-hidden style={{ position: 'absolute', left: -3, right: -3, top: '15%', bottom: '5%', background: color, transform: 'rotate(-.6deg) skewX(-2deg)', borderRadius: 1, zIndex: 0 }} />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </span>
  );
}

function WashiLabel({ children, bg = '#C84B3A', color = '#FFF8F0', rot = 0 }) {
  return (
    <div style={{ display: 'inline-block', background: bg, color, padding: '3px 16px', fontSize: 9, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', transform: `rotate(${rot}deg)`, boxShadow: '1px 2px 4px rgba(0,0,0,.22)' }}>
      {children}
    </div>
  );
}

// Section label with marker highlight
function SectionLabel({ children }) {
  return (
    <p style={{ fontSize: 9, letterSpacing: '.05em', textTransform: 'uppercase', color: '#7A6050', marginBottom: 14 }}>
      <Highlighted>{children}</Highlighted>
    </p>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function CommunityPage() {
  const [commentInput, setCommentInput] = useState('');

  return (
    <>
      <OceanBackdrop />
      <div style={{ minHeight: '100vh', color: '#2C2825' }}>
        <main className="pt-[100px] pb-20 px-8 max-w-5xl mx-auto">
          <div style={{ background: 'rgba(255,248,242,.96)', borderRadius: '3px 5px 4px 2px / 5px 3px 4px 3px', padding: '40px 48px 52px', boxShadow: '0 10px 40px rgba(0,0,0,.2), 0 2px 8px rgba(0,0,0,.1), inset 0 1px 0 rgba(255,255,255,.9)' }}>

            {/* ── Header ── */}
            <div className="mb-8">
              <h1 style={{ fontFamily: 'Mansalva', fontSize: 52, color: '#C84B3A', lineHeight: 1 }}>community.</h1>
              <p className="mt-1 text-sm" style={{ color: '#9C7060' }}>Look together. Learn together.</p>
            </div>

            {/* ── Collaborated space ── */}
            <div className="mb-10">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <SectionLabel>Collaborated Space</SectionLabel>
                <button style={{ fontSize: 11, color: '#C84B3A', background: 'none', border: '1.5px solid #C84B3A', borderRadius: '2px 6px 3px 2px / 5px 2px 6px 3px', padding: '4px 12px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                  + new collab
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                {COLLABS.map((c, idx) => {
                  const p = COLLAB_PAPER[idx];
                  return (
                    <div key={c.id} style={{ position: 'relative' }}>
                      {c.open && (
                        <div style={{ position: 'absolute', top: -10, right: 14, zIndex: 1 }}>
                          <WashiLabel bg="#5C3A1E" color="#FFF8F0">open</WashiLabel>
                        </div>
                      )}
                      <div style={{ backgroundColor: p.bg, backgroundImage: p.pat ?? undefined, backgroundSize: p.patSize, border: '2px solid #2C2825', borderRadius: '3px 8px 4px 2px / 7px 2px 8px 4px', padding: '16px', transform: `rotate(${COLLAB_ROT[idx]}deg)`, boxShadow: '2px 4px 12px rgba(0,0,0,.11)' }}>
                        <span style={{ fontSize: 10, color: '#9C7060', letterSpacing: '.03em' }}>{c.category}</span>
                        <p style={{ fontFamily: 'Mansalva', fontSize: 16, color: '#2C2825', marginTop: 4, lineHeight: 1.25 }}>{c.title}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                          {/* Participant dots */}
                          <div style={{ display: 'flex', gap: -4 }}>
                            {Array.from({ length: c.participants }).map((_, i) => (
                              <div key={i} style={{ width: 20, height: 20, borderRadius: '50%', border: '1.5px solid #2C2825', background: ['#C84B3A','#FFCBA4','#F4A5A5','#5C3A1E'][i % 4], marginLeft: i > 0 ? -6 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#FFF8F0', fontWeight: 700 }}>
                                {['M','A','L','R'][i]}
                              </div>
                            ))}
                          </div>
                          <span style={{ fontSize: 10, color: '#9C7060' }}>{c.activity} notes</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Comments ── */}
            <div className="mb-10">
              <SectionLabel>Comments</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
                {COMMENTS.map((c, idx) => (
                  <div key={c.id} style={{ backgroundColor: '#FFF8F2', border: '2px solid #2C2825', borderRadius: '3px 7px 4px 2px / 6px 2px 7px 4px', padding: '14px 16px', transform: `rotate(${COMMENT_ROT[idx]}deg)`, boxShadow: '1px 3px 8px rgba(0,0,0,.09)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    {/* Avatar */}
                    <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #2C2825', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: c.textCol ?? '#FFF8F0', flexShrink: 0 }}>
                      {c.user}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 5 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#2C2825' }}>on <em style={{ fontStyle: 'normal', color: '#C84B3A' }}>{c.work}</em></span>
                        <span style={{ fontSize: 10, color: '#B4AEA8' }}>{c.time}</span>
                      </div>
                      <p style={{ fontSize: 12, color: '#5C3A1E', lineHeight: 1.55 }}>{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment input */}
              <div style={{ backgroundColor: '#FFF0EB', backgroundImage: 'repeating-linear-gradient(transparent 0px,transparent 23px,rgba(200,100,80,.35) 23px,rgba(200,100,80,.35) 24px)', border: '2px solid #2C2825', borderRadius: '2px 7px 4px 3px / 6px 2px 7px 3px', padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-end', transform: 'rotate(-0.3deg)', boxShadow: '1px 3px 8px rgba(0,0,0,.09)' }}>
                <textarea
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  placeholder="leave a note…"
                  rows={2}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontSize: 13, color: '#2C2825', fontFamily: 'inherit', lineHeight: 1.55 }}
                />
                <button style={{ background: '#C84B3A', color: '#FFF8F0', border: '1.5px solid #2C2825', borderRadius: '2px 6px 3px 2px / 5px 2px 6px 3px', padding: '6px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>
                  post
                </button>
              </div>
            </div>

            {/* ── Shared folder ── */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <SectionLabel>Shared Folder</SectionLabel>
                <button style={{ fontSize: 11, color: '#9C7060', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>see all →</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
                {SHARED.map((s, idx) => {
                  const v = SHARED_PAPER[s.vi];
                  return (
                    <div key={s.id} style={{ backgroundColor: v.bg, backgroundImage: v.pat ?? undefined, backgroundSize: v.patSize, border: '2px solid #2C2825', borderRadius: '2px 7px 4px 3px / 6px 2px 7px 3px', overflow: 'hidden', boxShadow: '2px 4px 10px rgba(0,0,0,.11)', transform: `rotate(${SHARED_ROT[idx]}deg)`, transition: 'transform .2s' }}>
                      <div style={{ padding: '5px 5px 0' }}>
                        <div style={{ aspectRatio: '1', overflow: 'hidden', background: '#D8CEC4' }}>
                          <img src={s.src} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                      </div>
                      <div style={{ padding: '6px 7px 8px' }}>
                        <p style={{ fontFamily: 'Mansalva', fontSize: 11, color: v.text, lineHeight: 1.2 }}>{s.title}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 }}>
                          <span style={{ fontSize: 9, color: v.sub }}>{s.type}</span>
                          <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid #2C2825', background: '#C84B3A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: '#FFF8F0' }}>{s.by}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
