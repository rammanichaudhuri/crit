'use client';
import { useState } from 'react';

export default function CritiquePage() {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);

  function handleChange(e) {
    const val = e.target.value;
    setText(val);
    setWordCount(val.trim() === '' ? 0 : val.trim().split(/\s+/).length);
  }

  return (
    <div className="min-h-screen bg-[#EDE9E6] min-w-screen">
      <main className="flex h-screen pt-[90px]">
        {/* Image panel */}
        <div className="w-1/2 relative bg-[#D4CEC9] flex items-center justify-center overflow-hidden">
          <img
            src="/images/bg1.jpg"
            alt="Artwork for critique"
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-4 left-4 text-xs text-[#5C5650] bg-[#EDE9E6]/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
            Untitled — 2024
          </div>
        </div>

        {/* Writing panel */}
        <div className="w-1/2 flex flex-col bg-[#EDE9E6]">
          <div className="flex items-center justify-between px-8 py-4 border-b border-[#D4CEC9]">
            <span className="text-sm font-medium text-[#2C2825]">Your Critique</span>
            <span className="text-xs text-[#9C9690]">{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
          </div>

          <textarea
            value={text}
            onChange={handleChange}
            placeholder="What do you see? Start with your first impression — composition, light, mood..."
            className="flex-1 w-full px-8 py-6 bg-transparent resize-none text-[#2C2825] placeholder-[#B4AEA8] text-base leading-relaxed focus:outline-none font-[var(--font-geist-sans)]"
          />

          <div className="flex items-center justify-between px-8 py-4 border-t border-[#D4CEC9]">
            <div className="flex gap-2">
              <button className="text-xs text-[#5C5650] px-3 py-1.5 rounded-full border border-[#D4CEC9] hover:border-[#9C9690] transition-colors">
                Composition
              </button>
              <button className="text-xs text-[#5C5650] px-3 py-1.5 rounded-full border border-[#D4CEC9] hover:border-[#9C9690] transition-colors">
                Colour
              </button>
              <button className="text-xs text-[#5C5650] px-3 py-1.5 rounded-full border border-[#D4CEC9] hover:border-[#9C9690] transition-colors">
                Emotion
              </button>
            </div>
            <button
              disabled={wordCount < 5}
              className="px-5 py-1.5 bg-[#2C2825] text-[#EDE9E6] text-sm rounded-full disabled:opacity-30 hover:bg-[#4A4540] transition-colors disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
