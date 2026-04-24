import Link from 'next/link';
import Nav from '../../components/Nav.jsx';

const artworks = [
  { id: 1, src: '/images/bg1.jpg', title: 'Untitled I', year: '2024', medium: 'Oil on canvas' },
  { id: 2, src: '/images/bg2.gif', title: 'Motion Study', year: '2023', medium: 'Digital' },
  { id: 3, src: '/images/bg3.gif', title: 'Flow', year: '2023', medium: 'Digital' },
  { id: 4, src: '/images/bg4.gif', title: 'Cycle', year: '2024', medium: 'Digital' },
  { id: 5, src: '/images/bg5.jpg', title: 'Still Life', year: '2022', medium: 'Photography' },
  { id: 6, src: '/images/bg1.jpg', title: 'Untitled II', year: '2024', medium: 'Oil on canvas' },
];

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-[#EDE9E6]">
      <main className="pt-[90px] px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="py-10 flex items-end justify-between border-b border-[#D4CEC9]">
            <div>
              <h1 className="text-3xl font-semibold text-[#2C2825] tracking-tight">Library</h1>
              <p className="mt-1 text-sm text-[#9C9690]">{artworks.length} works</p>
            </div>
            <div className="flex gap-3 text-sm text-[#5C5650]">
              <button className="px-3 py-1 rounded-full bg-[#2C2825] text-[#EDE9E6]">All</button>
              <button className="px-3 py-1 rounded-full hover:bg-[#D4CEC9] transition-colors">Painting</button>
              <button className="px-3 py-1 rounded-full hover:bg-[#D4CEC9] transition-colors">Digital</button>
              <button className="px-3 py-1 rounded-full hover:bg-[#D4CEC9] transition-colors">Photo</button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {artworks.map((work) => (
              <Link key={work.id} href="/critique" className="group block">
                <div className="aspect-[4/3] bg-[#D4CEC9] overflow-hidden rounded-lg">
                  <img
                    src={work.src}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-[#2C2825]">{work.title}</span>
                    <span className="text-xs text-[#9C9690]">{work.year}</span>
                  </div>
                  <p className="text-xs text-[#9C9690] mt-0.5">{work.medium}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
