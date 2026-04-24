'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const FILTERS = ['All', 'Painting', 'Digital', 'Photography'];

const artworks = [
  { id: 1, src: '/images/bg1.jpg', title: 'Untitled I',    year: '2024', medium: 'Painting' },
  { id: 2, src: '/images/bg2.gif', title: 'Motion Study',  year: '2023', medium: 'Digital' },
  { id: 3, src: '/images/bg3.gif', title: 'Flow',          year: '2023', medium: 'Digital' },
  { id: 4, src: '/images/bg4.gif', title: 'Cycle',         year: '2024', medium: 'Digital' },
  { id: 5, src: '/images/bg5.jpg', title: 'Still Life',    year: '2022', medium: 'Photography' },
  { id: 6, src: '/images/bg1.jpg', title: 'Untitled II',   year: '2024', medium: 'Painting' },
];

export default function LibraryPage() {
  const [active, setActive] = useState('All');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const filtered = active === 'All'
    ? artworks
    : artworks.filter(w => w.medium === active);

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    // file handling goes here
  }

  return (
    <div className="min-h-screen" style={{ background: '#111118', color: '#EDE9E6' }}>
      <main className="pt-[90px] px-8 pb-20 max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between border-b py-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div>
            <h1 style={{ fontFamily: 'Mansalva', fontSize: 36, color: '#ddb772', lineHeight: 1 }}>library.</h1>
            <p className="mt-1 text-sm" style={{ color: 'rgba(237,233,230,0.45)' }}>{filtered.length} works</p>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className="px-4 py-1.5 rounded-full text-sm transition-colors"
                style={active === f
                  ? { background: '#ddb772', color: '#111118', fontWeight: 600 }
                  : { border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(237,233,230,0.6)' }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Upload drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="mt-8 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors"
          style={{
            border: `1.5px dashed ${dragging ? '#ddb772' : 'rgba(255,255,255,0.15)'}`,
            background: dragging ? 'rgba(221,183,114,0.06)' : 'rgba(255,255,255,0.02)',
            padding: '40px 24px',
          }}
        >
          <input ref={inputRef} type="file" accept="image/*" className="hidden" />
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(221,183,114,0.12)', color: '#ddb772' }}>+</div>
          <p className="text-sm" style={{ color: 'rgba(237,233,230,0.5)' }}>
            Drop an image here, or <span style={{ color: '#ddb772' }}>browse</span>
          </p>
          <p className="text-xs" style={{ color: 'rgba(237,233,230,0.25)' }}>JPG, PNG, GIF, WEBP</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-8">
          {filtered.map(work => (
            <Link key={work.id} href="/critique" className="group block">
              <div
                className="overflow-hidden rounded-xl"
                style={{ aspectRatio: '4/3', background: 'rgba(255,255,255,0.05)' }}
              >
                <img
                  src={work.src}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-sm font-medium" style={{ color: '#EDE9E6' }}>{work.title}</span>
                <span className="text-xs" style={{ color: 'rgba(237,233,230,0.35)' }}>{work.year}</span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(237,233,230,0.4)' }}>{work.medium}</p>

              {/* hover action */}
              <p
                className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: '#648de5' }}
              >
                Start critique →
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
