'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const FILTERS = ['All', 'Painting', 'Digital', 'Photography'];

const artworks = [
  { id: 1, src: '/images/bg1.jpg', title: 'Untitled I',   year: '2024', medium: 'Painting' },
  { id: 2, src: '/images/bg2.gif', title: 'Motion Study', year: '2023', medium: 'Digital' },
  { id: 3, src: '/images/bg3.gif', title: 'Flow',         year: '2023', medium: 'Digital' },
  { id: 4, src: '/images/bg4.gif', title: 'Cycle',        year: '2024', medium: 'Digital' },
  { id: 5, src: '/images/bg5.jpg', title: 'Still Life',   year: '2022', medium: 'Photography' },
  { id: 6, src: '/images/bg1.jpg', title: 'Untitled II',  year: '2024', medium: 'Painting' },
];

export default function LibraryPage() {
  const [active, setActive] = useState('All');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const filtered = active === 'All' ? artworks : artworks.filter(w => w.medium === active);
  const [featured, ...rest] = filtered;

  return (
    <div style={{ minHeight: '100vh', background: '#EDE9E6', color: '#2C2825' }}>
      <main className="pt-[100px] pb-20 px-10 max-w-7xl mx-auto">

        {/* ── Header row ── */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 style={{ fontFamily: 'Mansalva', fontSize: 52, color: '#ddb772', lineHeight: 1 }}>library.</h1>
            <p className="mt-1 text-sm" style={{ color: '#9C9690' }}>{filtered.length} works</p>
          </div>

          <div className="flex items-center gap-6">
            {/* filters */}
            <div className="flex gap-1.5">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className="px-4 py-1.5 rounded-full text-sm transition-all"
                  style={active === f
                    ? { background: '#2C2825', color: '#EDE9E6' }
                    : { border: '1px solid #D4CEC9', color: '#9C9690' }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* upload */}
            <button
              onClick={() => inputRef.current?.click()}
              className="px-4 py-1.5 rounded-full text-sm transition-all"
              style={{ background: '#ddb772', color: '#2C2825', fontWeight: 600 }}
            >
              + Upload
            </button>
            <input ref={inputRef} type="file" accept="image/*" className="hidden"
              onChange={() => {/* handle upload */}} />
          </div>
        </div>

        {/* ── Layout: featured left, grid right ── */}
        {filtered.length === 0 ? (
          <p style={{ color: '#9C9690' }} className="text-sm">No works in this category yet.</p>
        ) : (
          <div className="flex gap-6 items-start">

            {/* Featured */}
            {featured && (
              <Link href="/critique" className="group flex-shrink-0" style={{ width: '45%' }}>
                <div
                  className="overflow-hidden rounded-2xl"
                  style={{ aspectRatio: '3/4', background: '#D4CEC9' }}
                >
                  <img
                    src={featured.src}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <p style={{ fontFamily: 'Mansalva', fontSize: 20, color: '#2C2825' }}>{featured.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#9C9690' }}>{featured.medium} · {featured.year}</p>
                  </div>
                  <span
                    className="text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                    style={{ background: '#ddb772', color: '#2C2825' }}
                  >
                    critique →
                  </span>
                </div>
              </Link>
            )}

            {/* Rest: 2-column grid */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              {/* Upload card */}
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); }}
                onClick={() => inputRef.current?.click()}
                className="rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
                style={{
                  aspectRatio: '1',
                  border: `1.5px dashed ${dragging ? '#ddb772' : '#D4CEC9'}`,
                  background: dragging ? 'rgba(221,183,114,0.06)' : 'transparent',
                }}
              >
                <span style={{ fontSize: 28, color: '#D4CEC9' }}>+</span>
                <p className="text-xs" style={{ color: '#B4AEA8' }}>drop or browse</p>
              </div>

              {rest.map(work => (
                <Link key={work.id} href="/critique" className="group block">
                  <div
                    className="overflow-hidden rounded-2xl"
                    style={{ aspectRatio: '1', background: '#D4CEC9' }}
                  >
                    <img
                      src={work.src}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-sm" style={{ color: '#2C2825' }}>{work.title}</span>
                    <span className="text-xs" style={{ color: '#B4AEA8' }}>{work.year}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
