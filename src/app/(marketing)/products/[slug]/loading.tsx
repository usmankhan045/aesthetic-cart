export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-24 bg-cream min-h-screen">
      <div className="h-4 w-64 bg-rose/30 rounded-full animate-pulse mb-10" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="aspect-square bg-rose/20 rounded-2xl animate-pulse" />
        <div className="space-y-4 py-4">
          <div className="h-4 w-32 bg-rose/30 rounded-full animate-pulse" />
          <div className="h-12 w-full bg-rose/30 rounded-lg animate-pulse" />
          <div className="h-12 w-3/4 bg-rose/30 rounded-lg animate-pulse" />
          <div className="h-4 w-40 bg-rose/30 rounded-full animate-pulse" />
          <div className="space-y-2 pt-4">
            <div className="h-3 w-full bg-rose/20 rounded animate-pulse" />
            <div className="h-3 w-full bg-rose/20 rounded animate-pulse" />
            <div className="h-3 w-2/3 bg-rose/20 rounded animate-pulse" />
          </div>
          <div className="h-14 w-full bg-rose-gold/40 rounded-full animate-pulse mt-8" />
        </div>
      </div>
    </div>
  );
}
