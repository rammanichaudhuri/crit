
export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#EDE9E6] min-w-screen overflow-y-auto">
      <main className="pt-[90px] flex flex-col items-center justify-center min-h-screen">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 rounded-full bg-[#D4CEC9] mx-auto mb-6" />
          <h1 className="text-2xl font-semibold text-[#2C2825] tracking-tight">Challenges</h1>
          <p className="mt-3 text-sm text-[#9C9690] leading-relaxed">
            Daily critique prompts and skill challenges are coming soon.
          </p>
          <button className="mt-8 px-5 py-2 text-sm border border-[#D4CEC9] text-[#5C5650] rounded-full hover:border-[#9C9690] transition-colors">
            Notify me
          </button>
        </div>
      </main>
    </div>
  );
}