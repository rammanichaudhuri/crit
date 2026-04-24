'use client';

import { useState } from 'react';

const SECTIONS = [
  { key: 'works',   label: 'What works',       accent: '#4ade80', placeholder: 'Composition, lighting, colour palette, mood — what lands?' },
  { key: 'doesnt',  label: "What doesn't",      accent: '#f87171', placeholder: 'What feels off? Proportion, balance, tension, clarity...' },
  { key: 'improve', label: 'How to improve',    accent: '#648de5', placeholder: 'Concrete suggestions — what would you change or push further?' },
];

const TAGS = ['Composition', 'Colour', 'Light', 'Perspective', 'Emotion', 'Technique'];

const MOCK_AI = `The composition leans heavily on symmetry, which creates stability but risks feeling static. The warm tones in the lower third anchor the piece well, though the transition to cooler values mid-frame feels abrupt — a softer gradient might unify the palette. The focal point is clear, but introducing a secondary element off-axis could add visual tension without breaking the harmony.`;

export default function CritiquePage() {
  const [notes, setNotes] = useState({ works: '', doesnt: '', improve: '' });
  const [showAI, setShowAI] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('works');

  const totalWords = Object.values(notes)
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  function handleTag(tag) {
    setNotes(n => ({
      ...n,
      [activeSection]: n[activeSection] + (n[activeSection] ? ', ' : '') + tag.toLowerCase(),
    }));
  }

  function handleAI() {
    if (showAI) { setShowAI(false); return; }
    setAiLoading(true);
    setTimeout(() => { setAiLoading(false); setShowAI(true); }, 1200);
  }

  return (
    <div className="min-h-screen" style={{ background: '#111118', color: '#EDE9E6' }}>
      <main className="flex h-screen pt-[84px]">

        {/* ── Left: image ── */}
        <div
          className="w-1/2 relative flex items-center justify-center overflow-hidden flex-shrink-0"
          style={{ background: '#0c0c14' }}
        >
          <img
            src="/images/bg1.jpg"
            alt="Artwork under critique"
            className="w-full h-full object-contain"
          />
          {/* artwork label */}
          <div
            className="absolute bottom-5 left-5 text-xs px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(17,17,24,0.8)', backdropFilter: 'blur(8px)', color: 'rgba(237,233,230,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            Untitled I — 2024 · Oil on canvas
          </div>

          {/* change image */}
          <button
            className="absolute top-5 right-5 text-xs px-3 py-1.5 rounded-full transition-colors"
            style={{ background: 'rgba(17,17,24,0.8)', backdropFilter: 'blur(8px)', color: 'rgba(237,233,230,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            Change image
          </button>
        </div>

        {/* ── Right: critique form ── */}
        <div className="w-1/2 flex flex-col overflow-hidden" style={{ borderLeft: '1px solid rgba(255,255,255,0.07)' }}>

          {/* top bar */}
          <div
            className="flex items-center justify-between px-7 py-4 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            <span style={{ fontFamily: 'Mansalva', fontSize: 18, color: '#ddb772' }}>your critique.</span>
            <span className="text-xs" style={{ color: 'rgba(237,233,230,0.35)' }}>
              {totalWords} {totalWords === 1 ? 'word' : 'words'}
            </span>
          </div>

          {/* section tabs */}
          <div
            className="flex flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            {SECTIONS.map(s => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className="flex-1 py-3 text-xs font-medium transition-colors relative"
                style={{ color: activeSection === s.key ? s.accent : 'rgba(237,233,230,0.35)' }}
              >
                {s.label}
                {activeSection === s.key && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ background: s.accent }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* active textarea */}
          <div className="flex-1 relative overflow-hidden">
            {SECTIONS.map(s => (
              <textarea
                key={s.key}
                value={notes[s.key]}
                onChange={e => setNotes(n => ({ ...n, [s.key]: e.target.value }))}
                placeholder={s.placeholder}
                className="absolute inset-0 w-full h-full px-7 py-5 bg-transparent resize-none text-sm leading-relaxed focus:outline-none transition-opacity"
                style={{
                  color: '#EDE9E6',
                  opacity: activeSection === s.key ? 1 : 0,
                  pointerEvents: activeSection === s.key ? 'auto' : 'none',
                }}
              />
            ))}
          </div>

          {/* AI insight panel */}
          {showAI && (
            <div
              className="mx-6 mb-4 rounded-xl p-4 text-sm leading-relaxed flex-shrink-0"
              style={{ background: 'rgba(100,141,229,0.08)', border: '1px solid rgba(100,141,229,0.2)', color: 'rgba(237,233,230,0.8)' }}
            >
              <p className="text-xs font-medium mb-2" style={{ color: '#648de5' }}>AI insight</p>
              {MOCK_AI}
            </div>
          )}

          {/* bottom bar */}
          <div
            className="px-7 py-4 flex-shrink-0 flex flex-col gap-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {/* prompt tags */}
            <div className="flex flex-wrap gap-2">
              {TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTag(tag)}
                  className="text-xs px-3 py-1 rounded-full transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(237,233,230,0.5)' }}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              {/* AI button */}
              <button
                onClick={handleAI}
                className="text-xs px-4 py-2 rounded-full transition-colors flex items-center gap-2"
                style={showAI
                  ? { background: 'rgba(100,141,229,0.15)', color: '#648de5', border: '1px solid rgba(100,141,229,0.3)' }
                  : { border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(237,233,230,0.5)' }}
              >
                {aiLoading ? (
                  <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                ) : '✦'}
                {aiLoading ? 'Thinking…' : showAI ? 'Hide insight' : 'AI insight'}
              </button>

              {/* submit */}
              <button
                disabled={totalWords < 5}
                className="px-5 py-2 rounded-full text-sm font-medium transition-colors"
                style={totalWords >= 5
                  ? { background: '#ddb772', color: '#111118' }
                  : { background: 'rgba(255,255,255,0.06)', color: 'rgba(237,233,230,0.2)', cursor: 'not-allowed' }}
              >
                Save critique
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
