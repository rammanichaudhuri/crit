'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const FILTERS = ['All', 'Painting', 'Digital', 'Photography'];

// ── Paper stationery variants — each folder card gets a distinct paper type ──
const PAPER = [
  // Sources row
  { bg: '#FFF8F2', pat: null, border: '#2C2825', text: '#2C2825', sub: '#9C7060' },                            // 0 blank cream
  { bg: '#FFFFFF', pat: null, border: '#2C2825', text: '#2C2825', sub: '#9C7060', polaroid: true },            // 1 polaroid white
  {                                                                                                              // 2 lined salmon
    bg: '#FFF0EB',
    pat: 'repeating-linear-gradient(transparent 0px,transparent 13px,rgba(200,100,80,.55) 13px,rgba(200,100,80,.55) 14px)',
    border: '#2C2825', text: '#2C2825', sub: '#9C7060',
  },
  {                                                                                                              // 3 spiral notepad
    bg: '#FFFFFF',
    pat: 'radial-gradient(circle,#8B6A4A 45%,transparent 45%)',
    patSize: '12px 10px', patPos: 'center top', patRepeat: 'repeat-x',
    border: '#2C2825', text: '#2C2825', sub: '#9C7060', topPad: 16,
  },
  { bg: '#F4A5A5', pat: null, border: '#2C2825', text: '#5C1E1E', sub: '#7A3030' },                            // 4 pink sticky

  // Status row
  {                                                                                                              // 5 grid/check
    bg: '#FFF8F0',
    pat: 'repeating-linear-gradient(rgba(200,100,80,.28) 0,rgba(200,100,80,.28) 1px,transparent 1px,transparent 14px),repeating-linear-gradient(90deg,rgba(200,100,80,.28) 0,rgba(200,100,80,.28) 1px,transparent 1px,transparent 14px)',
    patSize: '14px 14px',
    border: '#2C2825', text: '#2C2825', sub: '#9C7060',
  },
  {                                                                                                              // 6 dark dotted brown
    bg: '#5C3A1E',
    pat: 'radial-gradient(circle,rgba(255,255,255,.28) 1.5px,transparent 1.5px)',
    patSize: '8px 8px',
    border: '#2C2825', text: '#FFF8F0', sub: 'rgba(255,240,220,.6)',
  },
  {                                                                                                              // 7 peach plaid
    bg: '#FFCBA4',
    pat: 'repeating-linear-gradient(rgba(180,100,60,.22) 0,rgba(180,100,60,.22) 1px,transparent 1px,transparent 10px),repeating-linear-gradient(90deg,rgba(180,100,60,.22) 0,rgba(180,100,60,.22) 1px,transparent 1px,transparent 10px)',
    patSize: '10px 10px',
    border: '#2C2825', text: '#5C3A1E', sub: '#9C7A60',
  },

  // Discover row
  { bg: '#C84B3A', pat: null, border: '#2C2825', text: '#FFF8F0', sub: 'rgba(255,240,220,.7)' },               // 8 terracotta bold
  {                                                                                                              // 9 tape / diagonal
    bg: '#E8D5C4',
    pat: 'repeating-linear-gradient(45deg,rgba(200,170,130,.42) 0,rgba(200,170,130,.42) 4px,transparent 4px,transparent 10px)',
    border: '#2C2825', text: '#2C2825', sub: '#9C7060',
  },
  { bg: '#F5EDE0', pat: null, border: '#2C2825', text: '#2C2825', sub: '#9C7060' },                            // 10 parchment
];

const ROWS = [
  {
    key: 'sources', label: 'Sources',
    folders: [
      { id: 'unsplash',   label: 'Unsplash',      symbol: '◈', vi: 0 },
      { id: 'pexels',     label: 'Pexels',         symbol: '⬡', vi: 1 },
      { id: 'device',     label: 'My Device',      symbol: '▣', vi: 2 },
      { id: 'upload',     label: 'Upload',         symbol: '↑', vi: 3, isUpload: true },
      { id: 'favourites', label: 'Favourites',     symbol: '♥', count: 12, vi: 4 },
    ],
  },
  {
    key: 'status', label: 'Status',
    folders: [
      { id: 'done',       label: 'Done',           symbol: '✓', count: 6, vi: 5 },
      { id: 'todo',       label: 'To Do',          symbol: '◯', count: 3, vi: 6 },
      { id: 'inprogress', label: 'In Progress',    symbol: '◑', count: 2, vi: 7 },
    ],
  },
  {
    key: 'discover', label: 'Discover',
    folders: [
      { id: 'hot',        label: 'Hot Now',        symbol: '▲', vi: 8 },
      { id: 'outside',    label: 'Search Outside', symbol: '⊕', vi: 9 },
      { id: 'shared',     label: 'Shared',         symbol: '↗', count: 8, vi: 10 },
    ],
  },
];

const FOLDER_ROT = [-1.2, 0.8, -0.5, 1.0, -0.7, 0.6, -1.4, 0.9, -0.3, 1.1, -0.8];
const CARD_ROT   = [-1.5, 0.8, -0.6, 1.2, -1.8, 0.4];

const artworks = [
  { id: 1, src: '/images/bg1.jpg', title: 'Untitled I',   year: '2024', medium: 'Painting' },
  { id: 2, src: '/images/bg2.gif', title: 'Motion Study', year: '2023', medium: 'Digital' },
  { id: 3, src: '/images/bg3.gif', title: 'Flow',         year: '2023', medium: 'Digital' },
  { id: 4, src: '/images/bg4.gif', title: 'Cycle',        year: '2024', medium: 'Digital' },
  { id: 5, src: '/images/bg5.jpg', title: 'Still Life',   year: '2022', medium: 'Photography' },
  { id: 6, src: '/images/bg1.jpg', title: 'Untitled II',  year: '2024', medium: 'Painting' },
];

// Wobbly hand-drawn SVG circle around text
function CircledText({ children, color = '#C84B3A' }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', padding: '1px 4px' }}>
      <svg
        aria-hidden
        style={{ position: 'absolute', left: '-12%', top: '-30%', width: '124%', height: '160%', overflow: 'visible', pointerEvents: 'none' }}
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
      >
        <path
          d="M9,15 C8,4 26,-2 50,0 C74,2 95,6 97,15 C99,24 80,31 50,30 C20,29 4,23 8,16"
          fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
      {children}
    </span>
  );
}

// Marker highlight streak
function Highlighted({ children, color = 'rgba(255,215,70,.45)' }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span aria-hidden style={{ position: 'absolute', left: -3, right: -3, top: '15%', bottom: '5%', background: color, transform: 'rotate(-.6deg) skewX(-2deg)', borderRadius: 1, zIndex: 0 }} />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </span>
  );
}

// Paper stationery folder card
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
        width: 108,
        height: 74,
        backgroundColor: active ? '#C84B3A' : v.bg,
        backgroundImage: active ? 'none' : v.pat ?? undefined,
        backgroundSize: v.patSize,
        backgroundPosition: v.patPos,
        backgroundRepeat: v.patRepeat,
        border: `2px solid ${v.border}`,
        borderRadius: '2px 6px 4px 2px / 4px 2px 6px 3px',
        padding: v.polaroid ? '6px 6px 22px' : `${v.topPad ?? 8}px 8px 8px`,
        boxShadow: active
          ? '3px 5px 14px rgba(200,75,58,.4)'
          : hovered
          ? '4px 6px 18px rgba(0,0,0,.18), 2px 2px 4px rgba(0,0,0,.08)'
          : '2px 3px 8px rgba(0,0,0,.12), 1px 1px 3px rgba(0,0,0,.06)',
        transform: `rotate(${rotation}deg) translateY(${hovered ? '-2px' : '0'})`,
        transition: 'box-shadow .2s, transform .2s',
      }}
    >
      <span style={{ fontSize: 14, lineHeight: 1, fontWeight: 700, color: active ? '#FFF8F0' : v.text }}>
        {symbol}
      </span>
      <div className="flex items-end justify-between w-full">
        <span style={{ fontSize: 11, lineHeight: 1.2, fontWeight: 600, color: active ? '#FFF8F0' : v.text }}>
          {label}
        </span>
        {count != null && (
          <span style={{ fontSize: 10, color: active ? 'rgba(255,240,220,.7)' : v.sub }}>{count}</span>
        )}
      </div>
    </button>
  );
}

// Polaroid gallery card
function PolaroidCard({ src, title, year, medium, rotation, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        background: '#FFF8F2',
        padding: '8px 8px 38px',
        border: '1px solid rgba(44,40,37,.07)',
        boxShadow: hovered ? '4px 8px 26px rgba(0,0,0,.22)' : '2px 4px 14px rgba(0,0,0,.14)',
        transform: `rotate(${rotation}deg) translateY(${hovered ? '-4px' : '0'})`,
        transition: 'all .3s ease',
        borderRadius: '1px',
      }}
    >
      <div style={{ aspectRatio: '1', overflow: 'hidden', background: '#EDE9E6' }}>
        <img
          src={src} alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform .5s ease' }}
        />
      </div>
      <p style={{ fontFamily: 'Mansalva', fontSize: 12, color: '#5C3A1E', textAlign: 'center', marginTop: 8 }}>{title}</p>
      <p style={{ fontSize: 10, color: '#9C7A60', textAlign: 'center', marginTop: 2 }}>{medium} · {year}</p>
    </Link>
  );
}

// Soft ocean backdrop — watercolour wash behind the paper
function OceanBackdrop() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#C4E6F4 0%,#A0CEE6 22%,#7AB4D6 44%,#58A0C8 58%,#4590B8 72%,#3880A8 85%,#2A6D98 100%)' }} />
      {/* sun */}
      <div style={{ position: 'absolute', top: '10%', right: '20%', width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,234,160,.65)', boxShadow: '0 0 70px 35px rgba(255,230,150,.2)', filter: 'blur(5px)' }} />
      {/* water shimmer */}
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

export default function LibraryPage() {
  const [filter, setFilter]             = useState('All');
  const [activeFolder, setActiveFolder] = useState(null);
  const [search, setSearch]             = useState('');
  const [dragging, setDragging]         = useState(false);
  const inputRef                        = useRef(null);

  const filtered = artworks.filter(w => {
    const byMedium = filter === 'All' || w.medium === filter;
    const bySearch = !search || w.title.toLowerCase().includes(search.toLowerCase()) || w.medium.toLowerCase().includes(search.toLowerCase());
    return byMedium && bySearch;
  });
  const [featured, ...rest] = filtered;

  function handleFolderClick(f) {
    if (f.isUpload) inputRef.current?.click();
    else setActiveFolder(prev => (prev === f.id ? null : f.id));
  }

  return (
    <>
      <OceanBackdrop />
      <div style={{ minHeight: '100vh', color: '#2C2825' }}>
        <main className="pt-[100px] pb-20 px-8 max-w-7xl mx-auto">

          {/* ── Sketchbook page ── */}
          <div style={{
            background: 'rgba(255,248,242,.96)',
            borderRadius: '3px 5px 4px 2px / 5px 3px 4px 3px',
            padding: '40px 48px 52px',
            boxShadow: '0 10px 40px rgba(0,0,0,.2), 0 2px 8px rgba(0,0,0,.1), inset 0 1px 0 rgba(255,255,255,.9)',
          }}>

            {/* Header */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <h1 style={{ fontFamily: 'Mansalva', fontSize: 52, color: '#C84B3A', lineHeight: 1 }}>library.</h1>
                <p className="mt-1 text-sm" style={{ color: '#9C7060' }}>{filtered.length} works</p>
              </div>

              <div className="flex items-center gap-5">
                {/* Pencil-line search */}
                <input
                  type="text"
                  placeholder="search…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="text-sm outline-none"
                  style={{ background: 'transparent', border: 'none', borderBottom: '1.5px solid #C4A882', padding: '4px 0', color: '#2C2825', width: 175, fontFamily: 'inherit' }}
                />
                {/* Category filters with hand-drawn active state */}
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

            {/* ── Stationery folder rows ── */}
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
                      <FolderCard
                        key={f.id}
                        {...f}
                        active={activeFolder === f.id}
                        rotation={FOLDER_ROT[(ri * 5 + fi) % FOLDER_ROT.length]}
                        onClick={() => handleFolderClick(f)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={() => {}} />

            {/* ── Gallery ── */}
            {filtered.length === 0 ? (
              <p style={{ color: '#9C7060' }} className="text-sm">No works found.</p>
            ) : (
              <div className="flex gap-8 items-start">

                {/* Featured large polaroid */}
                {featured && (
                  <Link href="/critique" className="group flex-shrink-0" style={{ width: '44%', display: 'block' }}>
                    <div style={{ background: '#FFF8F2', padding: '10px 10px 54px', boxShadow: '4px 6px 22px rgba(0,0,0,.18)', transform: 'rotate(-1.2deg)', borderRadius: '1px', border: '1px solid rgba(44,40,37,.06)' }}>
                      <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#EDE9E6' }}>
                        <img src={featured.src} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" style={{ display: 'block' }} />
                      </div>
                      <div className="mt-3 flex items-center justify-between px-1">
                        <div>
                          <p style={{ fontFamily: 'Mansalva', fontSize: 18, color: '#5C3A1E' }}>{featured.title}</p>
                          <p style={{ fontSize: 11, color: '#9C7A60', marginTop: 2 }}>{featured.medium} · {featured.year}</p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: '#C84B3A', color: '#fff' }}>critique →</span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Grid — small polaroids */}
                <div className="flex-1 grid grid-cols-2 gap-6">
                  {/* Upload slot */}
                  <div
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={e => { e.preventDefault(); setDragging(false); }}
                    onClick={() => inputRef.current?.click()}
                    style={{ background: '#FFF8F2', padding: '8px 8px 38px', boxShadow: '1px 3px 10px rgba(0,0,0,.1)', transform: `rotate(${CARD_ROT[0]}deg)`, borderRadius: '1px', cursor: 'pointer', border: '1px solid rgba(44,40,37,.06)' }}
                  >
                    <div className="flex flex-col items-center justify-center gap-2"
                      style={{ aspectRatio: '1', border: `1.5px dashed ${dragging ? '#C84B3A' : '#C4A882'}`, background: dragging ? 'rgba(200,75,58,.06)' : 'transparent', transition: 'border-color .2s' }}
                    >
                      <span style={{ fontSize: 26, color: dragging ? '#C84B3A' : '#C4A882' }}>+</span>
                      <p style={{ fontSize: 11, color: '#9C7060' }}>drop or browse</p>
                    </div>
                    <p style={{ fontFamily: 'Mansalva', fontSize: 12, color: '#C4A882', textAlign: 'center', marginTop: 8 }}>new work</p>
                  </div>

                  {rest.map((work, idx) => (
                    <PolaroidCard key={work.id} src={work.src} title={work.title} year={work.year} medium={work.medium} rotation={CARD_ROT[(idx + 1) % CARD_ROT.length]} href="/critique" />
                  ))}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </>
  );
}
