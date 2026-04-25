'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Nav from '../../components/navbar/Navbar';

const FILTERS = ['All', 'Painting', 'Digital', 'Photography'];

const PAPER = [
  { bg: '#FFF8F2', pat: null, border: '#2C2825', text: '#2C2825', sub: '#9C7060' },
  { bg: '#FFFFFF', pat: null, border: '#2C2825', text: '#2C2825', sub: '#9C7060', polaroid: true },
  { bg: '#FFF0EB', pat: 'repeating-linear-gradient(transparent 0px,transparent 13px,rgba(200,100,80,.55) 13px,rgba(200,100,80,.55) 14px)', border: '#2C2825', text: '#2C2825', sub: '#9C7060' },
  { bg: '#FFFFFF', pat: 'radial-gradient(circle,#8B6A4A 45%,transparent 45%)', patSize: '12px 10px', patPos: 'center top', patRepeat: 'repeat-x', border: '#2C2825', text: '#2C2825', sub: '#9C7060', topPad: 16 },
  { bg: '#F4A5A5', pat: null, border: '#2C2825', text: '#5C1E1E', sub: '#7A3030' },
  { bg: '#FFF8F0', pat: 'repeating-linear-gradient(rgba(200,100,80,.28) 0,rgba(200,100,80,.28) 1px,transparent 1px,transparent 14px),repeating-linear-gradient(90deg,rgba(200,100,80,.28) 0,rgba(200,100,80,.28) 1px,transparent 1px,transparent 14px)', patSize: '14px 14px', border: '#2C2825', text: '#2C2825', sub: '#9C7060' },
  { bg: '#5C3A1E', pat: 'radial-gradient(circle,rgba(255,255,255,.28) 1.5px,transparent 1.5px)', patSize: '8px 8px', border: '#2C2825', text: '#FFF8F0', sub: 'rgba(255,240,220,.6)' },
  { bg: '#FFCBA4', pat: 'repeating-linear-gradient(rgba(180,100,60,.22) 0,rgba(180,100,60,.22) 1px,transparent 1px,transparent 10px),repeating-linear-gradient(90deg,rgba(180,100,60,.22) 0,rgba(180,100,60,.22) 1px,transparent 1px,transparent 10px)', patSize: '10px 10px', border: '#2C2825', text: '#5C3A1E', sub: '#9C7A60' },
  { bg: '#C84B3A', pat: null, border: '#2C2825', text: '#FFF8F0', sub: 'rgba(255,240,220,.7)' },
  { bg: '#E8D5C4', pat: 'repeating-linear-gradient(45deg,rgba(200,170,130,.42) 0,rgba(200,170,130,.42) 4px,transparent 4px,transparent 10px)', border: '#2C2825', text: '#2C2825', sub: '#9C7060' },
  { bg: '#F5EDE0', pat: null, border: '#2C2825', text: '#2C2825', sub: '#9C7060' },
];

const ROWS = [
  { key: 'sources', label: 'Sources', folders: [
    { id: 'unsplash', label: 'Unsplash', symbol: '◈', vi: 0 },
    { id: 'pexels', label: 'Pexels', symbol: '⬡', vi: 1 },
    { id: 'device', label: 'My Device', symbol: '▣', vi: 2 },
    { id: 'upload', label: 'Upload', symbol: '↑', vi: 3, isUpload: true },
    { id: 'favourites', label: 'Favourites', symbol: '♥', count: 12, vi: 4 },
  ]},
  { key: 'status', label: 'Status', folders: [
    { id: 'done', label: 'Done', symbol: '✓', count: 6, vi: 5 },
    { id: 'todo', label: 'To Do', symbol: '◯', count: 3, vi: 6 },
    { id: 'inprogress', label: 'In Progress', symbol: '◑', count: 2, vi: 7 },
  ]},
  { key: 'discover', label: 'Discover', folders: [
    { id: 'hot', label: 'Hot Now', symbol: '▲', vi: 8 },
    { id: 'outside', label: 'Search Outside', symbol: '⊕', vi: 9 },
    { id: 'shared', label: 'Shared', symbol: '↗', count: 8, vi: 10 },
  ]},
];

const FOLDER_ROT = [-1.2, 0.8, -0.5, 1.0, -0.7, 0.6, -1.4, 0.9, -0.3, 1.1, -0.8];
const CARD_ROT   = [-0.4, 0.3, -0.5, 0.4, -0.3, 0.5, -0.4, 0.3, -0.4, 0.5, -0.3, 0.4, -0.5];

// Paper variants referencing landing colours (#ddb772 gold, #648de5 blue, #ffc4e5 pink)
const ART_PAPER = [
  { bg: '#FFF8F2', pat: 'radial-gradient(circle,rgba(44,40,37,.07) 1.5px,transparent 1.5px)', patSize: '6px 6px', text: '#2C2825', sub: '#9C7060' },
  { bg: '#F5E8C4', pat: null, text: '#5C3A00', sub: '#9C7A30' },
  { bg: '#FFCBA4', pat: 'repeating-linear-gradient(rgba(180,100,60,.22) 0,rgba(180,100,60,.22) 1px,transparent 1px,transparent 10px),repeating-linear-gradient(90deg,rgba(180,100,60,.22) 0,rgba(180,100,60,.22) 1px,transparent 1px,transparent 10px)', patSize: '10px 10px', text: '#5C3A1E', sub: '#9C7A60' },
  { bg: '#5C3A1E', pat: 'radial-gradient(circle,rgba(255,255,255,.3) 1.5px,transparent 1.5px)', patSize: '6px 6px', text: '#FFF8F0', sub: 'rgba(255,240,220,.6)' },
  { bg: '#C8D4F5', pat: 'linear-gradient(rgba(48,76,137,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(48,76,137,.15) 1px,transparent 1px)', patSize: '8px 8px', text: '#1E2C5C', sub: '#4A5898' },
  { bg: '#FFE0F0', pat: 'radial-gradient(circle,rgba(200,80,120,.1) 1.5px,transparent 1.5px)', patSize: '6px 6px', text: '#5C1E3A', sub: '#9C3060' },
];

// All images from public/images
const artworks = [
  { id: 1,  src: '/images/bg1.jpg',  title: 'Untitled I',    year: '2024', medium: 'Painting',   description: 'An exploration of muted earth tones and undefined form, letting the canvas breathe on its own terms.' },
  { id: 2,  src: '/images/bg2.gif',  title: 'Motion Study',  year: '2023', medium: 'Digital',    description: 'Looping frames that capture the tension between stillness and perpetual movement.' },
  { id: 3,  src: '/images/bg3.gif',  title: 'Flow',          year: '2023', medium: 'Digital',    description: 'Fluid paths that resist resolution — always arriving, never quite settling into place.' },
  { id: 4,  src: '/images/bg4.gif',  title: 'Cycle',         year: '2024', medium: 'Digital',    description: 'Repetition as structure: each loop quietly reframes everything that came before it.' },
  { id: 5,  src: '/images/bg5.jpg',  title: 'Still Life',    year: '2022', medium: 'Photography', description: 'Ordinary objects under deliberate light, asking to be looked at twice.' },
  { id: 6,  src: '/images/pic1.jpg', title: 'Aperture I',    year: '2024', medium: 'Photography', description: 'Framing as statement — what the lens includes is less interesting than what it refuses.' },
  { id: 7,  src: '/images/pic2.jpg', title: 'Aperture II',   year: '2023', medium: 'Photography', description: 'Light caught at the moment it forgets to perform for the camera.' },
  { id: 8,  src: '/images/pic3.jpg', title: 'Surface Study', year: '2023', medium: 'Painting',   description: 'The brush resists the smooth and finds its character in the drag.' },
  { id: 9,  src: '/images/pic4.jpg', title: 'Ground Work',   year: '2024', medium: 'Photography', description: 'Weight, earth, the slow pull toward the horizontal.' },
  { id: 10, src: '/images/pic5.jpg', title: 'Residue',       year: '2022', medium: 'Painting',   description: 'What remains after the dominant gesture — the underpainting that refuses to hide.' },
  { id: 11, src: '/images/pic6.jpg', title: 'Transit',       year: '2023', medium: 'Digital',    description: 'Between one state and another — caught mid-sentence, not yet arrived.' },
  { id: 12, src: '/images/pic7.jpg', title: 'Threshold',     year: '2024', medium: 'Photography', description: 'The border between interior and exterior light: a negotiation without a winner.' },
];

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

// Aurora-to-ocean backdrop, referencing landing page palette
function OceanBackdrop() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
      {/* Aurora blues (#304c89, #648de5) blending into ocean */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#304c89 0%,#648de5 14%,#4A8ED4 28%,#2E8EC8 44%,#1A70A8 62%,#0A5088 80%,#071838 100%)' }} />
      {/* Comic halftone dot overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)', backgroundSize: '6px 6px', pointerEvents: 'none' }} />
      {/* Sun in landing #ddb772 golden yellow */}
      <div style={{ position: 'absolute', top: '8%', right: '18%', width: 66, height: 66, borderRadius: '50%', background: '#ddb772', border: '3px solid rgba(44,40,37,.45)', boxShadow: '4px 4px 0 rgba(44,40,37,.28)' }} />
      {/* Water shimmer — pink from landing #ffc4e5 */}
      <div style={{ position: 'absolute', top: '52%', left: '28%', width: '44%', height: 4, background: 'linear-gradient(to right,transparent,rgba(255,196,229,.55),transparent)', transform: 'skewX(-6deg)' }} />
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '44%' }} viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,160 C180,120 360,200 540,160 C720,120 900,200 1080,160 C1260,120 1380,200 1440,160 L1440,320 L0,320 Z" fill="rgba(30,96,152,.62)" />
        <path d="M0,196 C240,150 480,238 720,196 C960,154 1200,238 1440,196 L1440,320 L0,320 Z" fill="rgba(16,80,132,.78)" />
        <path d="M0,238 C180,208 360,264 540,238 C720,212 900,264 1080,238 C1260,212 1380,254 1440,238 L1440,320 L0,320 Z" fill="rgba(8,58,108,.92)" />
        {/* Pink wave outline — references landing #ffc4e5 */}
        <path d="M0,238 C180,208 360,264 540,238 C720,212 900,264 1080,238 C1260,212 1380,254 1440,238" fill="none" stroke="rgba(255,196,229,.52)" strokeWidth="3" />
        <path d="M0,196 C240,150 480,238 720,196 C960,152 1200,236 1440,196" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="2" />
      </svg>
    </div>
  );
}

function FolderCard({ label, symbol, count, isUpload, active, onClick, rotation, vi }) {
  const [hovered, setHovered] = useState(false);
  const v = PAPER[vi] ?? PAPER[0];
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col justify-between flex-shrink-0"
      style={{
        width: 108, height: 74,
        backgroundColor: active ? '#C84B3A' : v.bg,
        backgroundImage: active ? 'none' : v.pat ?? undefined,
        backgroundSize: v.patSize,
        backgroundPosition: v.patPos,
        backgroundRepeat: v.patRepeat,
        border: `3px solid ${v.border}`,
        borderRadius: '10px 16px 12px 8px / 14px 8px 16px 10px',
        padding: v.polaroid ? '6px 6px 22px' : `${v.topPad ?? 8}px 8px 8px`,
        boxShadow: active
          ? '4px 4px 0 rgba(200,75,58,.72)'
          : hovered
            ? '5px 5px 0 rgba(44,40,37,.68)'
            : '3px 3px 0 rgba(44,40,37,.5)',
        transform: `rotate(${rotation}deg) translateY(${hovered ? '-3px' : '0'})`,
        transition: 'box-shadow .18s, transform .18s',
      }}
    >
      <span style={{ fontSize: 14, lineHeight: 1, fontWeight: 700, color: active ? '#FFF8F0' : v.text }}>{symbol}</span>
      <div className="flex items-end justify-between w-full">
        <span style={{ fontSize: 11, lineHeight: 1.2, fontWeight: 600, color: active ? '#FFF8F0' : v.text }}>{label}</span>
        {count != null && <span style={{ fontSize: 10, color: active ? 'rgba(255,240,220,.7)' : v.sub }}>{count}</span>}
      </div>
    </button>
  );
}

function ArtCard({ src, title, year, medium, description, rotation, href, vi }) {
  const [hovered, setHovered] = useState(false);
  const v = ART_PAPER[vi % ART_PAPER.length];
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', textDecoration: 'none',
        backgroundColor: v.bg,
        backgroundImage: v.pat ?? undefined,
        backgroundSize: v.patSize,
        border: '3px solid #2C2825',
        borderRadius: '14px 20px 16px 12px / 18px 12px 20px 16px',
        overflow: 'hidden',
        boxShadow: hovered ? '6px 6px 0 rgba(44,40,37,.82)' : '4px 4px 0 rgba(44,40,37,.62)',
        transform: `rotate(${rotation}deg) translateY(${hovered ? '-5px' : '0'})`,
        transition: 'transform .25s ease, box-shadow .22s ease',
      }}
    >
      <div style={{ padding: '8px 8px 0' }}>
        <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#D8CEC4', borderRadius: '10px 14px 12px 8px / 12px 8px 14px 10px' }}>
          <img src={src} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform .5s ease' }} />
        </div>
      </div>
      <div style={{ padding: '8px 10px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
          <span style={{ fontSize: 8, color: v.sub, letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 700 }}>{medium}</span>
          <span style={{ fontSize: 9, color: v.sub }}>{year}</span>
        </div>
        <p style={{ fontFamily: 'Mansalva', fontSize: 13, color: v.text, lineHeight: 1.2, marginBottom: 4 }}>{title}</p>
        <p style={{ fontSize: 9.5, color: v.sub, lineHeight: 1.5 }}>{description}</p>
      </div>
    </Link>
  );
}

export default function LibraryPage() {
  const [filter, setFilter] = useState('All');
  const [activeFolder, setActiveFolder] = useState(null);
  const [search, setSearch] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const filtered = artworks.filter(w => {
    const byMedium = filter === 'All' || w.medium === filter;
    const bySearch = !search || w.title.toLowerCase().includes(search.toLowerCase()) || w.medium.toLowerCase().includes(search.toLowerCase());
    return byMedium && bySearch;
  });

  function handleFolderClick(f) {
    if (f.isUpload) inputRef.current?.click();
    else setActiveFolder(prev => (prev === f.id ? null : f.id));
  }

  return (
    <>
      <OceanBackdrop />
      <div style={{ minHeight: '100vh', color: '#2C2825', fontFamily: 'Sora' }}>
        <Nav backgroundColor="#ffc4e5" />
        <main className="pt-[100px] pb-20 px-8 max-w-5xl mx-auto">
          {/* Paper sheet — #EDE9E6 from landing container */}
          <div style={{ background: 'rgba(237,233,230,.97)', borderRadius: '16px 24px 18px 14px / 22px 14px 24px 18px', padding: '40px 48px 52px', boxShadow: '6px 6px 0 rgba(44,40,37,.2)' }}>

            {/* Header */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <h1 style={{ fontFamily: 'Mansalva', fontSize: 52, color: '#C84B3A', lineHeight: 1 }}>library.</h1>
                <p className="mt-1 text-sm" style={{ color: '#9C7060' }}>{filtered.length} works</p>
              </div>
              <div className="flex items-center gap-5">
                <input
                  type="text"
                  placeholder="search…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="text-sm outline-none"
                  style={{ background: 'transparent', border: 'none', borderBottom: '2px solid #C4A882', padding: '4px 0', color: '#2C2825', width: 175, fontFamily: 'inherit' }}
                />
                <div className="flex gap-1.5">
                  {FILTERS.map(f => (
                    <button key={f} onClick={() => setFilter(f)} className="text-sm"
                      style={{ background: 'transparent', border: 'none', padding: '4px 6px', color: filter === f ? '#C84B3A' : '#9C7060', fontWeight: filter === f ? 700 : 400, fontFamily: 'inherit', cursor: 'pointer' }}
                    >
                      {filter === f ? <CircledText color="#C84B3A">{f}</CircledText> : f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Folder rows */}
            <div className="flex flex-col gap-3 mb-10">
              {ROWS.map((row, ri) => (
                <div key={row.key} className="flex items-center gap-4">
                  <div style={{ width: 56, flexShrink: 0, display: 'flex', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: 9, letterSpacing: '.05em', textTransform: 'uppercase', color: '#7A6050' }}>
                      <Highlighted>{row.label}</Highlighted>
                    </span>
                  </div>
                  <div style={{ width: 1, height: 60, background: 'rgba(196,168,130,.4)', flexShrink: 0 }} />
                  <div className="flex gap-2.5">
                    {row.folders.map((f, fi) => (
                      <FolderCard key={f.id} {...f} active={activeFolder === f.id} rotation={FOLDER_ROT[(ri * 5 + fi) % FOLDER_ROT.length]} onClick={() => handleFolderClick(f)} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={() => {}} />

            {/* Gallery — 4-column portrait grid */}
            {filtered.length === 0 ? (
              <p style={{ color: '#9C7060' }} className="text-sm">No works found.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>

                {/* Upload slot */}
                <div
                  onDragOver={e => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={e => { e.preventDefault(); setDragging(false); }}
                  onClick={() => inputRef.current?.click()}
                  style={{
                    backgroundColor: '#FFF8F2',
                    backgroundImage: 'radial-gradient(circle,rgba(44,40,37,.07) 1.5px,transparent 1.5px)',
                    backgroundSize: '6px 6px',
                    border: '3px solid #2C2825',
                    borderRadius: '14px 20px 16px 12px / 18px 12px 20px 16px',
                    overflow: 'hidden',
                    boxShadow: '4px 4px 0 rgba(44,40,37,.52)',
                    transform: `rotate(${CARD_ROT[0]}deg)`,
                    cursor: 'pointer',
                    transition: 'transform .25s ease, box-shadow .22s ease',
                  }}
                >
                  <div style={{ padding: '8px 8px 0' }}>
                    <div className="flex flex-col items-center justify-center gap-2"
                      style={{ aspectRatio: '3/4', border: `2px dashed ${dragging ? '#C84B3A' : '#C4A882'}`, borderRadius: '10px 14px 12px 8px / 12px 8px 14px 10px', background: dragging ? 'rgba(200,75,58,.06)' : 'transparent', transition: 'all .2s' }}
                    >
                      <span style={{ fontSize: 28, color: dragging ? '#C84B3A' : '#C4A882' }}>+</span>
                      <p style={{ fontSize: 10, color: '#9C7060' }}>drop or browse</p>
                    </div>
                  </div>
                  <div style={{ padding: '8px 10px 12px' }}>
                    <span style={{ fontSize: 8, color: '#C4A882', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 700 }}>Upload</span>
                    <p style={{ fontFamily: 'Mansalva', fontSize: 13, color: '#C4A882', marginTop: 4, marginBottom: 4 }}>new work</p>
                    <p style={{ fontSize: 9.5, color: '#C4A882', lineHeight: 1.5 }}>Add a piece to your library.</p>
                  </div>
                </div>

                {filtered.map((work, idx) => (
                  <ArtCard key={work.id} src={work.src} title={work.title} year={work.year} medium={work.medium} description={work.description} rotation={CARD_ROT[(idx + 1) % CARD_ROT.length]} href="/critique" vi={idx} />
                ))}
              </div>
            )}

          </div>
        </main>
      </div>
    </>
  );
}
