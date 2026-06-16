export const OperationSkeleton = () => (
  <div className="animate-pulse rounded-[2rem] border border-slate-800 bg-slate-950 p-6">
    <div className="h-8 w-1/4 rounded-full bg-slate-800" />
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-3 rounded-3xl bg-slate-900 p-5">
          <div className="h-3 w-3/4 rounded-full bg-slate-800" />
          <div className="h-10 w-1/2 rounded-full bg-slate-800" />
        </div>
      ))}
    </div>
  </div>
);
