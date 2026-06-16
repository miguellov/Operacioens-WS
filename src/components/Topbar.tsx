import { Bell, Search, CircleDollarSign } from 'lucide-react';

export const Topbar = () => (
  <header className="flex flex-col gap-6 rounded-[2rem] border border-slate-800 bg-slate-950 px-6 py-6 shadow-xl shadow-cyan-500/10 sm:flex-row sm:items-center sm:justify-between">
    <div className="space-y-2">
      <div className="text-sm uppercase tracking-[0.4em] text-cyan-400">Dashboard</div>
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-semibold text-white">OPS AIR Dashboard</h1>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">Live view</span>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-3">
      <button className="flex items-center gap-2 rounded-3xl bg-slate-900 px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800">
        <Search className="h-4 w-4 text-cyan-300" />
        Search reports
      </button>
      <button className="flex items-center gap-2 rounded-3xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
        <Bell className="h-4 w-4" />
        Alerts
      </button>
      <button className="flex items-center gap-2 rounded-3xl bg-slate-900 px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800">
        <CircleDollarSign className="h-4 w-4 text-emerald-300" />
        Live sync
      </button>
    </div>
  </header>
);
