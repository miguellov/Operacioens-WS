import { FlightOperation } from '@/types/flightOperation';
import { Clock, Accessibility, Users, Package, Baby, User, PawPrint, Briefcase } from 'lucide-react';

interface OperationPreviewProps {
  operation: FlightOperation;
  onPrint?: () => void;
  onDownloadImage?: () => void;
  exportingImage?: boolean;
}

export const OperationPreview = ({ operation, onPrint, onDownloadImage, exportingImage }: OperationPreviewProps) => (
  <section className="print-card rounded-[2rem] border border-slate-800 bg-slate-950 p-6 text-slate-100 shadow-2xl shadow-cyan-500/10 print:bg-white print:text-slate-950 print:border-slate-300 print:p-8">
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Resumen de envío</p>
          <h1 className="mt-2 text-5xl font-bold text-white">Llegada / Salida</h1>
          <p className="mt-2 text-sm text-slate-400">Información separada para vuelo llegando y vuelo saliendo.</p>
        </div>
        <div className="grid gap-3 sm:text-right">
          <div className="rounded-3xl bg-slate-900 px-4 py-3 text-slate-300">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">ETA</div>
            <div className="mt-1 text-xl font-semibold text-white">{operation.eta || '--:--'}</div>
          </div>
          <div className="rounded-3xl bg-slate-900 px-4 py-3 text-slate-300">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">ETD</div>
            <div className="mt-1 text-xl font-semibold text-white">{operation.etd || '--:--'}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-3xl bg-slate-900 px-4 py-3 text-slate-300">
          <div className="text-sm uppercase tracking-[0.3em] text-slate-500">Status</div>
          <div className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${operation.nogo ? 'bg-rose-500/15 text-rose-300' : 'bg-cyan-500/15 text-cyan-300'}`}>
            {operation.nogo ? 'NOGO' : 'OPERACIONAL'}
          </div>
          <div className="mt-1 text-sm text-slate-400">NOGO: {operation.nogoCount}</div>
        </div>
        {onPrint && (
          <button
            type="button"
            onClick={onPrint}
            className="rounded-3xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            Imprimir formato
          </button>
        )}
        {onDownloadImage && (
          <button
            type="button"
            onClick={onDownloadImage}
            disabled={exportingImage}
            className="rounded-3xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {exportingImage ? 'Generando...' : 'Descargar imagen'}
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-slate-900 p-4 text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">ALGR</p>
          <p className="mt-2 text-lg font-semibold text-white">{operation.algr}</p>
        </div>
        <div className="rounded-3xl bg-slate-900 p-4 text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">BLND</p>
          <p className="mt-2 text-lg font-semibold text-white">{operation.blnd}</p>
        </div>
        <div className="rounded-3xl bg-slate-900 p-4 text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">CREW</p>
          <p className="mt-2 text-lg font-semibold text-white">{operation.crew}</p>
        </div>
      </div>
    </div>

    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { label: '🛫 Gate', value: operation.gate, icon: Users },
        { label: '🎫 Counters', value: operation.counters, icon: Package },
        { label: '🧾 Belt', value: operation.belt, icon: Package },
        { label: '♿ WCHR', value: operation.wheelchair.toString(), icon: Accessibility },
        { label: '👶 INF', value: operation.infants.toString(), icon: Baby },
        { label: '🧒 CHD', value: operation.children.toString(), icon: User },
        { label: '🐕 AVIH', value: operation.avih.toString(), icon: PawPrint },
        { label: '🐾 PETC', value: operation.petc.toString(), icon: Briefcase },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="rounded-3xl bg-slate-900 p-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Icon className="h-4 w-4 text-cyan-300" />
              <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
          </div>
        );
      })}
    </div>

    <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-400">
      <p className="font-semibold text-white">Mensaje WhatsApp</p>
      <p className="mt-2 whitespace-pre-line text-slate-300">{`✈️ Vuelo ${operation.flightNumber}

👥 Pax: ${operation.pax}
🎒 Bags: ${operation.bags}
♿ WCHR: ${operation.wheelchair}
👶 INF: ${operation.infants}
🧒 CHD: ${operation.children}
🐕 AVIH: ${operation.avih}
🐾 PETC: ${operation.petc}
⏰ ETA: ${operation.eta}


✈️ Vuelo ${operation.departureFlightNumber || operation.flightNumber}

👥 Pax: ${operation.departurePax}
🎒 Bags: ${operation.departureBags}
♿ WCHR: ${operation.departureWheelchair}
👶 INF: ${operation.departureInfants}
🧒 CHD: ${operation.departureChildren}
🐕 AVIH: ${operation.departureAvih}
🐾 PETC: ${operation.departurePetc}
🧳❌NCOB: ${operation.departureNcob}

⏳ ETD: ${operation.etd}

NOGO: ${operation.departureNogoCount}`}</p>
    </div>

    <div className="mt-6 text-right text-xs uppercase tracking-[0.3em] text-slate-500">Imprima esta hoja tipo carta para el reporte operativo.</div>
  </section>
);
