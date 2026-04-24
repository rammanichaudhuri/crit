import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#EDE9E6] flex items-center justify-center px-4 min-w-screen">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-center text-lg font-semibold text-[#2C2825] mb-10 hover:opacity-70 transition-opacity">
          crit
        </Link>

        <h1 className="text-2xl font-semibold text-[#2C2825] tracking-tight text-center">Welcome back</h1>
        <p className="mt-2 text-sm text-[#9C9690] text-center">Log in to continue your practice</p>

        <form className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium text-[#5C5650]">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-[#D4CEC9] bg-transparent text-sm text-[#2C2825] placeholder-[#B4AEA8] focus:outline-none focus:border-[#9C9690] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-medium text-[#5C5650]">Password</label>
              <Link href="#" className="text-xs text-[#9C9690] hover:text-[#5C5650] transition-colors">Forgot?</Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg border border-[#D4CEC9] bg-transparent text-sm text-[#2C2825] placeholder-[#B4AEA8] focus:outline-none focus:border-[#9C9690] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-2.5 bg-[#2C2825] text-[#EDE9E6] text-sm font-medium rounded-lg hover:bg-[#4A4540] transition-colors"
          >
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#9C9690]">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#5C5650] hover:text-[#2C2825] transition-colors underline underline-offset-2">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
