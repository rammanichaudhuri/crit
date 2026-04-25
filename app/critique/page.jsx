'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '../../components/navbar/Navbar';

const SECTIONS = [
  {
    key: 'works',
    label: 'What works',
    symbol: '✓',
    symbolColor: '#4ade80',
    placeholder: 'Composition, light, colour — what lands and why?',
  },
  {
    key: 'doesnt',
    label: "What doesn't",
    symbol: '✗',
    symbolColor: '#f87171',
    placeholder: 'What feels off? Proportion, tension, clarity, balance...',
  },
  {
    key: 'improve',
    label: 'How to improve',
    symbol: '→',
    symbolColor: '#648de5',
    placeholder: 'Concrete changes — what would you push, cut, or rethink?',
  },
];

const MOCK_AI = `The composition leans on symmetry — stable, but risks feeling inert. Warm tones in the lower third anchor the piece well, though the shift to cooler values mid-frame is abrupt; a softer gradient would unify the palette. The focal point reads clearly. Introducing a secondary element off-axis would add visual tension without breaking the harmony.`;

const CritiquePage = () => {
  const [notes, setNotes] = useState({ works: '', doesnt: '', improve: '' });
  const [showAI, setShowAI] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const totalWords = Object.values(notes).join(' ').trim().split(/\s+/).filter(Boolean).length;

  function handleAI() {
    if (showAI) { setShowAI(false); return; }
    setAiLoading(true);
    setTimeout(() => { setAiLoading(false); setShowAI(true); }, 1200);
  }

  return (
    <>
      <div style={{
        minHeight: '100vh', color: '#2C2825', fontFamily: 'Sora', position: 'absolute', inset: 0,
        backgroundSize: '30px 30px',
        // backgroundColor: "#ede9e6",
        backgroundColor: "oklch(100% 0.00011 271.152)",
        backgroundImage:
          'conic-gradient(from 90deg at 1px 1px, #74747400 90deg, rgb(181, 181, 181) 0), conic-gradient(from 90deg at 0.5px 0.5px, #61616100 90deg, rgb(170, 170, 170) 0)',
        inset: 0,
        backdropFilter: 'saturate(1.4)'
      }}>
        <Nav backgroundColor="#ffc4e5" />
        <main className="flex h-full pt-[84px]">

          <div
            className="relative flex-shrink-0 flex items-center justify-center overflow-hidden"
            style={{ width: '44%', background: '#D4CEC9' }}
          >
            <img
              src="/images/bg1.jpg"
              alt="Artwork under critique"
              className="w-full h-full object-contain"
            />

            <div
              className="absolute bottom-5 left-5 text-xs px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(237,233,230,0.85)', backdropFilter: 'blur(8px)', color: '#5C5650', border: '1px solid #D4CEC9' }}
            >
              Untitled I — 2024 · Oil on canvas
            </div>

            <Link
              href="/library"
              className="absolute top-5 left-5 text-xs px-3 py-1.5 rounded-full transition-colors"
              style={{ background: 'rgba(237,233,230,0.85)', backdropFilter: 'blur(8px)', color: '#5C5650', border: '1px solid #D4CEC9' }}
            >
              ← Library
            </Link>
          </div>

          {/* ── Right: all sections visible at once ── */}
          <div className="flex-1 flex flex-col overflow-hidden" style={{ borderLeft: '1px solid #D4CEC9' }}>

            {/* top bar */}
            <div
              className="flex items-center justify-between px-8 py-4 flex-shrink-0"
              style={{ borderBottom: '1px solid #D4CEC9' }}
            >
              <span style={{ fontFamily: 'Mansalva', fontSize: 20, color: '#ddb772' }}>your critique.</span>
              <span className="text-xs" style={{ color: '#9C9690' }}>
                {totalWords} {totalWords === 1 ? 'word' : 'words'}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto">
              {SECTIONS.map((s, i) => (
                <div
                  key={s.key}
                  style={{ borderBottom: i < SECTIONS.length - 1 ? '1px solid #D4CEC9' : 'none' }}
                >
                  {/* section label */}
                  <div className="flex items-center gap-2 px-8 pt-5 pb-2">
                    <span className="text-sm font-semibold" style={{ color: s.symbolColor }}>{s.symbol}</span>
                    <span className="text-xs font-medium uppercase tracking-widest" style={{ color: '#9C9690' }}>{s.label}</span>
                  </div>

                  <textarea
                    value={notes[s.key]}
                    onChange={e => setNotes(n => ({ ...n, [s.key]: e.target.value }))}
                    placeholder={s.placeholder}
                    rows={4}
                    className="w-full px-8 pb-5 bg-transparent resize-none text-sm leading-relaxed focus:outline-none"
                    style={{ color: '#2C2825', caretColor: s.symbolColor }}
                  />
                </div>
              ))}

              {/* AI panel */}
              {showAI && (
                <div className="mx-8 my-4 rounded-xl p-5" style={{ background: 'rgba(100,141,229,0.06)', border: '1px solid rgba(100,141,229,0.2)' }}>
                  <p className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: '#648de5' }}>AI insight</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C5650' }}>{MOCK_AI}</p>
                </div>
              )}
            </div>

            {/* bottom bar */}
            <div
              className="flex items-center justify-between px-8 py-4 flex-shrink-0"
              style={{ borderTop: '1px solid #D4CEC9' }}
            >
              <button
                onClick={handleAI}
                className="text-xs px-4 py-2 rounded-full transition-colors flex items-center gap-2"
                style={showAI
                  ? { background: 'rgba(100,141,229,0.1)', color: '#648de5', border: '1px solid rgba(100,141,229,0.25)' }
                  : { border: '1px solid #D4CEC9', color: '#9C9690' }}
              >
                <span>{aiLoading ? '…' : '✦'}</span>
                {aiLoading ? 'Thinking…' : showAI ? 'Hide insight' : 'AI insight'}
              </button>

              <button
                disabled={totalWords < 5}
                className="px-6 py-2 rounded-full text-sm font-medium transition-all"
                style={totalWords >= 5
                  ? { background: '#2C2825', color: '#EDE9E6' }
                  : { background: '#D4CEC9', color: '#B4AEA8', cursor: 'not-allowed' }}
              >
                Save critique
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default CritiquePage;
