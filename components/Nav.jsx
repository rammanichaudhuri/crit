import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#EDE9E6]/80 backdrop-blur-sm border-b border-[#D4CEC9]">
      <Link href="/" className="text-lg font-semibold tracking-tight text-[#2C2825] hover:opacity-70 transition-opacity">
        crit
      </Link>
      <div className="flex items-center gap-6 text-sm text-[#5C5650]">
        <Link href="/library" className="hover:text-[#2C2825] transition-colors">Library</Link>
        <Link href="/challenges" className="hover:text-[#2C2825] transition-colors">Challenges</Link>
        <Link href="/login" className="hover:text-[#2C2825] transition-colors">Log in</Link>
        <Link href="/signup" className="px-4 py-1.5 bg-[#2C2825] text-[#EDE9E6] rounded-full hover:bg-[#4A4540] transition-colors">
          Sign up
        </Link>
      </div>
    </nav>
  );
}
