import Link from 'next/link';
import { Home, AlertTriangle, Layers, ShieldCheck, LayoutDashboard } from 'lucide-react';

const items = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Operaciones', href: '/operations', icon: Layers },
  { label: 'Alertas', href: '/alerts', icon: AlertTriangle },
  { label: 'Roles', href: '/roles', icon: ShieldCheck },
];

export const Sidebar = () => (
  <aside className="h-full w-72 bg-slate-950 border-r border-slate-800 p-6 text-slate-100 hidden md:flex md:flex-col">
    <div className="mb-12">
      <div className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-400">OPS AIR</div>
      <div className="text-2xl font-semibold">Operational Dashboard</div>
      <p className="mt-3 text-sm text-slate-400">Real-time airport flight operations monitoring.</p>
    </div>

    <nav className="space-y-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
          >
            <Icon className="h-5 w-5 text-cyan-400 transition group-hover:text-white" />
            {item.label}
          </Link>
        );
      })}
    </nav>

    <div className="mt-auto rounded-3xl bg-slate-900 p-4 text-sm text-slate-300 shadow-xl shadow-cyan-500/10">
      <div className="mb-2 text-cyan-300 font-semibold">Quick Dispatch</div>
      <p className="text-slate-500">Fast WhatsApp sending and print-ready operation reports.</p>
    </div>
  </aside>
);
