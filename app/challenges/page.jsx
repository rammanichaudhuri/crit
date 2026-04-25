import Link from 'next/link';
import Nav from '../../components/navbar/Navbar';

const TODAY = {
  title: 'Critique the negative space',
  description: 'Pick any work from the library and write specifically about what the empty areas communicate. Do they breathe, or do they suffocate? Consider how the artist uses absence as a compositional tool.',
  tags: ['Composition', 'Space', 'Intention'],
  duration: '15 – 20 min',
  href: '/critique',
};

const UPCOMING = [
  {
    id: 2,
    day: 'Yesterday',
    title: 'Colour temperature walk',
    description: 'How do warm and cool tones distribute across the image, and what emotional weight does each region carry?',
    tags: ['Colour', 'Emotion'],
    duration: '10 – 15 min',
    href: '/critique',
    past: true,
  },
  {
    id: 3,
    day: 'Tomorrow',
    title: 'The rule of thirds — broken',
    description: 'Find a piece that deliberately breaks conventional composition rules and argue whether it works.',
    tags: ['Composition', 'Technique'],
    duration: '20 min',
    href: null,
  },
  {
    id: 4,
    day: 'Day 4',
    title: 'Light source audit',
    description: 'Map every light source in the work. Is the lighting consistent? Where does it create drama?',
    tags: ['Light', 'Technique'],
    duration: '15 min',
    href: null,
  },
];

const STREAK = [
  { label: 'M', done: true },
  { label: 'T', done: true },
  { label: 'W', done: true },
  { label: 'T', done: false },
  { label: 'F', done: false },
  { label: 'S', done: false },
  { label: 'S', done: false },
];

export default function ChallengesPage() {
  return (
    <>
    <div style={{
        minHeight: 'max-content', color: '#2C2825', fontFamily: 'Sora', position: 'absolute', inset: 0, 
        backgroundSize: '30px 30px',
        // backgroundColor: "#ede9e6",
        backgroundColor: "oklch(100% 0.00011 271.152)",
        backgroundImage:
          'conic-gradient(from 90deg at 1px 1px, #74747400 90deg, rgb(181, 181, 181) 0), conic-gradient(from 90deg at 0.5px 0.5px, #61616100 90deg, rgb(170, 170, 170) 0)',
          inset: 0,
          backdropFilter: 'saturate(1.4)'
      }}>
      <Nav backgroundColor="#ffc4e5" />
      <main className="pt-[100px] pb-20 px-10 max-w-4xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-10">
          <h1 style={{ fontFamily: 'Mansalva', fontSize: 52, color: '#ddb772', lineHeight: 1 }}>challenges.</h1>
          <p className="mt-2 text-sm" style={{ color: '#9C9690' }}>
            A new prompt every day. Build the habit of looking harder.
          </p>
        </div>

        {/* ── Today's challenge — hero ── */}
        <div
          className="rounded-3xl p-8 mb-6"
          style={{ background: '#2C2825', color: '#EDE9E6' }}
        >
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
                style={{ background: '#ddb772', color: '#2C2825' }}
              >
                Today
              </span>
              <h2 style={{ fontFamily: 'Mansalva', fontSize: 28, lineHeight: 1.2, color: '#EDE9E6' }}>
                {TODAY.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(237,233,230,0.65)' }}>
                {TODAY.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {TODAY.tags.map(t => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ border: '1px solid rgba(237,233,230,0.2)', color: 'rgba(237,233,230,0.5)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={TODAY.href}
              className="flex-shrink-0 flex flex-col items-center justify-center rounded-2xl transition-colors"
              style={{ background: '#ddb772', color: '#2C2825', padding: '20px 28px', textDecoration: 'none' }}
            >
              <span style={{ fontFamily: 'Mansalva', fontSize: 22 }}>start</span>
              <span className="text-xs mt-1" style={{ opacity: 0.7 }}>{TODAY.duration}</span>
            </Link>
          </div>
        </div>

        {/* ── Upcoming / past ── */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {UPCOMING.map(c => {
            const inner = (
              <div
                className="rounded-2xl p-5 h-full flex flex-col justify-between"
                style={{
                  border: '1px solid #D4CEC9',
                  background: c.past ? 'rgba(44,40,37,0.03)' : 'transparent',
                  opacity: c.href ? 1 : 0.5,
                  minHeight: 180,
                }}
              >
                <div>
                  <span className="text-xs font-medium" style={{ color: c.past ? '#9C9690' : '#648de5' }}>{c.day}</span>
                  <p className="mt-2 text-sm font-medium leading-snug" style={{ color: '#2C2825' }}>{c.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed" style={{ color: '#9C9690' }}>{c.description}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-1.5 flex-wrap">
                    {c.tags.map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ border: '1px solid #D4CEC9', color: '#B4AEA8' }}>{t}</span>
                    ))}
                  </div>
                  <span className="text-xs ml-2 flex-shrink-0" style={{ color: '#B4AEA8' }}>{c.duration}</span>
                </div>
              </div>
            );

            return c.href
              ? <Link key={c.id} href={c.href} className="block h-full">{inner}</Link>
              : <div key={c.id}>{inner}</div>;
          })}
        </div>

        {/* ── Streak ── */}
        <div
          className="rounded-2xl px-8 py-6 flex items-center justify-between"
          style={{ border: '1px solid #D4CEC9' }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: '#2C2825' }}>3-day streak</p>
            <p className="text-xs mt-0.5" style={{ color: '#9C9690' }}>Complete today to keep it going</p>
          </div>

          <div className="flex gap-3">
            {STREAK.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: d.done ? '#ddb772' : '#D4CEC9' }}
                />
                <span className="text-xs" style={{ color: '#B4AEA8' }}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
    </>
  );
}
