export default function CategoriaLoading() {
  return (
    <div className="animate-pulse mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8 space-y-3">
        <div className="h-9 w-64 rounded bg-[#2a2a4a]" />
        <div className="h-4 w-96 rounded bg-[#1e1e35]" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Article grid */}
        <div className="flex-1 grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] overflow-hidden">
              <div className="h-48 bg-[#2a2a4a]" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-24 rounded bg-[#2a2a4a]" />
                <div className="h-5 w-full rounded bg-[#2a2a4a]" />
                <div className="h-5 w-4/5 rounded bg-[#2a2a4a]" />
                <div className="h-3 w-full rounded bg-[#1e1e35]" />
                <div className="h-3 w-full rounded bg-[#1e1e35]" />
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0 space-y-4">
          <div className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-4 space-y-3">
            <div className="h-4 w-32 rounded bg-[#2a2a4a]" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-3 w-full rounded bg-[#1e1e35]" />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
