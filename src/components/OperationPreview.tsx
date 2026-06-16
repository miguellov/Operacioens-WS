import { buildWhatsappMessage } from '@/lib/whatsappTemplate';
import { FlightOperation } from '@/types/flightOperation';

const previewEmojis = {
  algr: '🤧',
  blnd: '🧑‍🦯',
  eta: '⏰',
  etd: '⏳',
  ncob: '🧳❌',
  crew: '🧑‍✈️',
};

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

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-3xl bg-slate-900 p-4 text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Llegada ALGR</p>
          <p className="mt-2 text-lg font-semibold text-white">{operation.arrivalAlgr}</p>
        </div>
        <div className="rounded-3xl bg-slate-900 p-4 text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Llegada BLND</p>
          <p className="mt-2 text-lg font-semibold text-white">{operation.arrivalBlnd}</p>
        </div>
        <div className="rounded-3xl bg-slate-900 p-4 text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Salida ALGR</p>
          <p className="mt-2 text-lg font-semibold text-white">{operation.departureAlgr}</p>
        </div>
        <div className="rounded-3xl bg-slate-900 p-4 text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Salida BLND</p>
          <p className="mt-2 text-lg font-semibold text-white">{operation.departureBlnd}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-900 p-4 text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">CREW</p>
          <p className="mt-2 text-lg font-semibold text-white">{operation.crew}</p>
        </div>
      </div>
    </div>

    <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-5 text-slate-300">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl bg-slate-950 p-4">
          <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">Llegada</div>
          <div className="mt-4 space-y-2 text-sm text-white">
            <div className="flex justify-between"><span>✈️ Vuelo</span><span>{operation.flightNumber || 'TBD'}</span></div>
            <div className="flex justify-between"><span>Gate</span><span>{operation.arrivalGate || 'TBD'}</span></div>
            <div className="flex justify-between"><span>Counters</span><span>{operation.arrivalCounters || 'TBD'}</span></div>
            <div className="flex justify-between"><span>Belt</span><span>{operation.arrivalBelt || 'TBD'}</span></div>
            <div className="flex justify-between"><span>PX</span><span>{operation.pax}</span></div>
            <div className="flex justify-between"><span>BAG</span><span>{operation.bags}</span></div>
            <div className="flex justify-between"><span>WCHR</span><span>{operation.wheelchair}</span></div>
            <div className="flex justify-between"><span>INF</span><span>{operation.infants}</span></div>
            <div className="flex justify-between"><span>CHD</span><span>{operation.children}</span></div>
            <div className="flex justify-between"><span>AVIH</span><span>{operation.avih}</span></div>
            <div className="flex justify-between"><span>PETC</span><span>{operation.petc}</span></div>
            <div className="flex justify-between"><span>{previewEmojis.algr} ALGR</span><span>{operation.arrivalAlgr}</span></div>
            <div className="flex justify-between"><span>{previewEmojis.blnd} BLND</span><span>{operation.arrivalBlnd}</span></div>
            <div className="flex justify-between text-cyan-300"><span>{previewEmojis.eta} ETA</span><span>{operation.eta || '--:--'}</span></div>
          </div>
        </div>
        <div className="rounded-3xl bg-slate-950 p-4">
          <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">Salida</div>
          <div className="mt-4 space-y-2 text-sm text-white">
            <div className="flex justify-between"><span>✈️ Vuelo</span><span>{operation.departureFlightNumber || 'TBD'}</span></div>
            <div className="flex justify-between"><span>Gate</span><span>{operation.gate || 'TBD'}</span></div>
            <div className="flex justify-between"><span>Counters</span><span>{operation.counters || 'TBD'}</span></div>
            <div className="flex justify-between"><span>Belt</span><span>{operation.belt || 'TBD'}</span></div>
            <div className="flex justify-between"><span>PAX</span><span>{operation.departurePax}</span></div>
            <div className="flex justify-between"><span>BAGS</span><span>{operation.departureBags}</span></div>
            <div className="flex justify-between"><span>WCHR</span><span>{operation.departureWheelchair}</span></div>
            <div className="flex justify-between"><span>INF</span><span>{operation.departureInfants}</span></div>
            <div className="flex justify-between"><span>CHD</span><span>{operation.departureChildren}</span></div>
            <div className="flex justify-between"><span>AVIH</span><span>{operation.departureAvih}</span></div>
            <div className="flex justify-between"><span>PETC</span><span>{operation.departurePetc}</span></div>
            <div className="flex justify-between"><span>{previewEmojis.ncob} NCOB</span><span>{operation.departureNcob}</span></div>
            <div className="flex justify-between"><span>{previewEmojis.algr} ALGR</span><span>{operation.departureAlgr}</span></div>
            <div className="flex justify-between"><span>{previewEmojis.blnd} BLND</span><span>{operation.departureBlnd}</span></div>
            <div className="flex justify-between"><span>{previewEmojis.crew} CREW</span><span>{operation.crew}</span></div>
            <div className="flex justify-between text-cyan-300"><span>{previewEmojis.etd} ETD</span><span>{operation.etd || '--:--'}</span></div>
            <div className="flex justify-between text-white"><span>NOGO</span><span>{operation.departureNogoCount}</span></div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-400">
      <p className="font-semibold text-white">Mensaje WhatsApp</p>
      <p className="mt-2 whitespace-pre-line text-slate-300">{buildWhatsappMessage(operation)}</p>
    </div>

    <div className="mt-6 text-right text-xs uppercase tracking-[0.3em] text-slate-500">Imprima esta hoja tipo carta para el reporte operativo.</div>
  </section>
);
