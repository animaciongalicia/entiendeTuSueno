export default function BlogSlugLoading() {
  return (
    <div className="animate-pulse">
      {/* Reading progress bar placeholder */}
      <div className="fixed top-0 left-0 h-0.5 w-0 bg-[#7c6af7] z-50" />

      <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Category + reading time */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-6 w-28 rounded-full bg-[#2a2a4a]" />
              <div className="h-4 w-20 rounded bg-[#2a2a4a]" />
            </div>

            {/* Title */}
            <div className="space-y-3 mb-6">
              <div className="h-8 w-full rounded bg-[#2a2a4a]" />
              <div className="h-8 w-4/5 rounded bg-[#2a2a4a]" />
            </div>

            {/* Excerpt */}
            <div className="space-y-2 mb-8">
              <div className="h-4 w-full rounded bg-[#1e1e35]" />
              <div className="h-4 w-full rounded bg-[#1e1e35]" />
              <div className="h-4 w-2/3 rounded bg-[#1e1e35]" />
            </div>

            {/* Cover image */}
            <div className="h-64 md:h-80 w-full rounded-2xl bg-[#2a2a4a] mb-10" />

            {/* Content paragraphs */}
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 rounded bg-[#1e1e35]" style={{ width: i % 3 === 2 ? "70%" : "100%" }} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 xl:w-80 shrink-0">
            <div className="rounded-2xl border border-[#2a2a4a] bg-[#1a1a2e] p-5 space-y-3">
              <div className="h-5 w-40 rounded bg-[#2a2a4a]" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-14 w-14 shrink-0 rounded-lg bg-[#2a2a4a]" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 w-full rounded bg-[#2a2a4a]" />
                    <div className="h-3 w-2/3 rounded bg-[#2a2a4a]" />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
