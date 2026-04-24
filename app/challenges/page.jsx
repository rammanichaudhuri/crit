import Link from 'next/link';

const CHALLENGES = [
  {
    id: 1,
    badge: 'Today',
    badgeColor: '#ddb772',
    title: 'Critique the negative space',
    description: 'Pick any work from the library and write specifically about what the empty areas communicate. Do they breathe or suffocate?',
    duration: '15 – 20 min',
    tags: ['Composition', 'Space'],
    href: '/critique',
    active: true,
  },
  {
    id: 2,
    badge: 'Yesterday',
    badgeColor: 'rgba(237,233,230,0.3)',
    title: 'Colour temperature walk',
    description: 'Analyse how warm and cool tones are distributed across the image and what emotional weight each region carries.',
    duration: '10 – 15 min',
    tags: ['Colour', 'Emotion'],
    href: '/critique',
    active: false,
  },
  {
    id: 3,
    badge: 'Coming soon',
    badgeColor: 'rgba(100,141,229,0.6)',
    title: 'The rule of thirds — broken',
    description: 'Find a piece that deliberately breaks conventional composition rules. Argue whether it works or falls flat.',
    duration: '20 min',
    tags: ['Composition', 'Technique'],
    href: null,
    active: false,
  },
  {
    id: 4,
    badge: 'Coming soon',
    badgeColor: 'rgba(100,141,229,0.6)',
    title: 'Light source audit',
    description: 'Map every light source in the work. Is the lighting consistent? Where does it create drama and where does it confuse?',
    duration: '15 min',
    tags: ['Light', 'Technique'],
    href: null,
    active: false,
  },
];

export default function ChallengesPage() {
  return (
    <div className="min-h-screen" style={{ background: '#111118', color: '#EDE9E6' }}>
      <main className="pt-[90px] px-8 pb-20 max-w-3xl mx-auto">

        {/* Header */}
        <div className="py-10 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <h1 style={{ fontFamily: 'Mansalva', fontSize: 36, color: '#ddb772', lineHeight: 1 }}>challenges.</h1>
          <p className="mt-2 text-sm" style={{ color: 'rgba(237,233,230,0.45)' }}>
            A new critique prompt every day. Build the habit of looking harder.
          </p>
        </div>

        {/* Challenge cards */}
        <div className="flex flex-col gap-4 mt-8">
          {CHALLENGES.map(c => {
            const Card = (
              <div
                key={c.id}
                className="rounded-2xl p-6 flex flex-col gap-4 transition-colors"
                style={{
                  background: c.active ? 'rgba(221,183,114,0.05)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${c.active ? 'rgba(221,183,114,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  opacity: c.href ? 1 : 0.55,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    {/* badge */}
                    <span className="text-xs font-medium" style={{ color: c.badgeColor }}>{c.badge}</span>
                    <h2 className="text-base font-semibold leading-snug" style={{ color: '#EDE9E6' }}>{c.title}</h2>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(237,233,230,0.5)' }}>{c.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {c.tags.map(t => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(237,233,230,0.4)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: 'rgba(237,233,230,0.3)' }}>{c.duration}</span>
                </div>
              </div>
            );

            return c.href
              ? <Link key={c.id} href={c.href} className="block group">{Card}</Link>
              : <div key={c.id}>{Card}</div>;
          })}
        </div>

        {/* Streak */}
        <div
          className="mt-10 rounded-2xl p-6 flex items-center justify-between"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div>
            <p className="text-sm font-medium" style={{ color: '#EDE9E6' }}>Current streak</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(237,233,230,0.4)' }}>Complete today's challenge to keep it going</p>
          </div>
          <div className="flex gap-1.5">
            {[true, true, true, false, false, false, false].map((done, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full"
                style={{ background: done ? '#ddb772' : 'rgba(255,255,255,0.07)' }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
