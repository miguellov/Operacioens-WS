import { FlightOperation } from '@/types/flightOperation';
import { formatDateTime } from '@/utils/format';
import { Clock, AlertTriangle, Briefcase, Users, Package, Accessibility, Baby, User, PawPrint } from 'lucide-react';

export const FlightCard = ({ operation }: { operation: FlightOperation }) => {
  return (
    <article className="rounded-[2rem] border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-cyan-500/10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-cyan-400">Flight</div>
          <h3 className="mt-2 text-2xl font-semibold text-white">{operation.flightNumber}</h3>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="rounded-full bg-slate-900 px-3 py-1">Gate {operation.gate}</span>
            <span className="rounded-full bg-slate-900 px-3 py-1">Belt {operation.belt}</span>
            <span className="rounded-full bg-slate-900 px-3 py-1">Counters {operation.counters}</span>
          </div>
        </div>
        <div className="rounded-3xl bg-slate-900 px-4 py-3 text-sm text-slate-300">
          <div className="flex items-center gap-2 text-cyan-300">
            <Clock className="h-4 w-4" /> ETA {operation.eta}
          </div>
          <div className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${operation.nogo ? 'bg-rose-500/15 text-rose-300' : 'bg-cyan-500/15 text-cyan-300'}`}>
            {operation.nogo ? 'NOGO' : 'OPERATIONAL'}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: 'PAX', value: operation.pax, icon: Users },
          { label: 'BAGS', value: operation.bags, icon: Package },
          { label: 'WCHR', value: operation.wheelchair, icon: Accessibility },
          { label: 'INF', value: operation.infants, icon: Baby },
          { label: 'CHD', value: operation.children, icon: User },
          { label: 'AVIH', value: operation.avih, icon: PawPrint },
          { label: 'PETC', value: operation.petc, icon: Briefcase },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-3xl bg-slate-900 p-4">
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-cyan-300" />
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
              </div>
              <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-3xl bg-slate-900 px-5 py-4 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-300" />
          <span>{operation.nogo ? 'Requires manual review' : 'No critical alerts'}</span>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">Updated {formatDateTime(operation.updatedAt)}</span>
      </div>
    </article>
  );
};
