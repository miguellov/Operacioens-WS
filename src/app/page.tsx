"use client";

import { FormEvent, useMemo, useRef, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { OperationPreview } from '@/components/OperationPreview';
import { buildWhatsappMessage } from '@/lib/whatsappTemplate';
import { FlightOperation } from '@/types/flightOperation';
import { toast, Toaster } from 'sonner';
import { toPng } from 'html-to-image';

const defaultOperation: FlightOperation = {
  id: 'local',
  flightNumber: '',
  departureFlightNumber: '',
  gate: '',
  counters: '',
  belt: '',
  pax: 0,
  bags: 0,
  wheelchair: 0,
  infants: 0,
  children: 0,
  avih: 0,
  petc: 0,
  departurePax: 0,
  departureBags: 0,
  departureWheelchair: 0,
  departureInfants: 0,
  departureChildren: 0,
  departureAvih: 0,
  departurePetc: 0,
  arrivalFlightNumber: '',
  arrivalGate: '',
  arrivalCounters: '',
  arrivalBelt: '',
  arrivalPetc: 0,
  eta: '',
  etd: '',
  ncob: 0,
  departureNcob: 0,
  arrivalAlgr: 0,
  arrivalBlnd: 0,
  departureAlgr: 0,
  departureBlnd: 0,
  crew: 0,
  nogo: false,
  nogoCount: 0,
  nogoNames: '',
  nogoPnrs: '',
  departureNogoCount: 0,
  departureNogoNames: '',
  departureNogoPnrs: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const phoneNumberPattern = /^\d{6,15}$/;

const normalizePhone = (value: string) => {
  const cleaned = value.replace(/[^\d+]/g, '');
  const digitsOnly = cleaned.replace(/\D/g, '');

  if (cleaned.startsWith('+')) {
    return digitsOnly;
  }
  if (digitsOnly.length === 10) {
    return `1${digitsOnly}`;
  }
  return digitsOnly;
};

export default function Page() {
  const [operation, setOperation] = useState<FlightOperation>(defaultOperation);
  const [previewOperation, setPreviewOperation] = useState<FlightOperation | null>(null);
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [exportingImage, setExportingImage] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const normalizedPhone = normalizePhone(phone.trim());

  const isValid = useMemo(() => {
    return (
      operation.flightNumber.trim().length > 0 &&
      operation.departureFlightNumber.trim().length > 0 &&
      phoneNumberPattern.test(normalizedPhone)
    );
  }, [operation.flightNumber, operation.departureFlightNumber, normalizedPhone]);

  const handleChange = (field: keyof FlightOperation, value: string | boolean) => {
    const textFields: Array<keyof FlightOperation> = [
      'flightNumber',
      'departureFlightNumber',
      'gate',
      'counters',
      'belt',
      'eta',
      'etd',
      'nogoNames',
      'nogoPnrs',
      'departureNogoNames',
      'departureNogoPnrs',
    ];

    setOperation((current) => ({
      ...current,
      [field]:
        typeof value === 'boolean'
          ? value
          : textFields.includes(field)
          ? value
          : Number(value),
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      toast.error('Complete vuelo y número de WhatsApp válido.');
      return;
    }

    setSending(true);
    const message = buildWhatsappMessage(operation);
    const phoneKey = normalizePhone(phone.trim());
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneKey}&text=${encodeURIComponent(message)}`;
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    if (!newWindow) {
      window.location.href = whatsappUrl;
    }

    toast.success('WhatsApp abierto. Verifica el mensaje en la app.');
    setPreviewOperation({ ...operation, id: `${Date.now()}` });
    setSending(false);
  };

  const downloadPreviewImage = async () => {
    if (!previewRef.current) {
      toast.error('No hay vista previa disponible para generar la imagen.');
      return;
    }

    try {
      setExportingImage(true);
      const dataUrl = await toPng(previewRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `reporte-vuelo-${previewOperation?.flightNumber || 'operacion'}.png`;
      link.click();
      toast.success('Imagen generada y descargada correctamente.');
    } catch (error) {
      console.error(error);
      toast.error('Error al generar la imagen. Intenta de nuevo.');
    } finally {
      setExportingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1640px]">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <Topbar />

          <section className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-5 md:p-8 shadow-xl shadow-cyan-500/10">
              <div className="mb-4 md:mb-6">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">Entrada rápida</p>
                <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-white">Captura operación</h2>
                <p className="mt-2 text-xs md:text-sm text-slate-400">Rellena el reporte y envíalo por WhatsApp.</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="space-y-1 text-xs md:text-sm text-slate-300">
                    <span>✈️ Vuelo (Solo Salida)</span>
                    <input
                      value={operation.departureFlightNumber}
                      onChange={(event) => handleChange('departureFlightNumber', event.target.value)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-500 text-sm"
                      placeholder="Ej. 2909 (Salida)"
                    />
                  </label>
                  <label className="space-y-1 text-xs md:text-sm text-slate-300">
                    <span>🛫 Gate (Solo Salida)</span>
                    <input
                      list="arrivalGateOptions"
                      value={operation.gate}
                      onChange={(event) => handleChange('gate', event.target.value)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-500 text-sm"
                      placeholder="Ej. A12 (Salida)"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-300">
                    <span>🎫 Counters (Solo Salida)</span>
                    <input
                      list="arrivalCountersOptions"
                      value={operation.counters}
                      onChange={(event) => handleChange('counters', event.target.value)}
                      className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                      placeholder="Ej. 10-12 (Salida)"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-300">
                    <span>🧾 Belt (Solo Salida)</span>
                    <input
                      list="arrivalBeltOptions"
                      value={operation.belt}
                      onChange={(event) => handleChange('belt', event.target.value)}
                      className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                      placeholder="Ej. 1,2,3 (Salida)"
                    />
                  </label>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Llegada</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { field: 'flightNumber', label: '✈️ Vuelo llegada', isText: true },
                      { field: 'pax', label: '👥 PAX' },
                      { field: 'bags', label: '🎒 BAGS' },
                      { field: 'wheelchair', label: '♿ WCHR' },
                      { field: 'infants', label: '👶 INF' },
                      { field: 'children', label: '🧒 CHD' },
                      { field: 'avih', label: '🐕 AVIH' },
                      { field: 'petc', label: '🐾 PETC' },
                      { field: 'arrivalAlgr', label: 'ALGR' },
                      { field: 'arrivalBlnd', label: 'BLND' },
                      { field: 'eta', label: '⏰ ETA', isText: true },
                    ].map((item) => (
                      <label key={item.field} className="space-y-0.5 text-xs md:text-sm text-slate-300">
                        <span className="text-xs">{item.label}</span>
                        <input
                          list={item.field === 'flightNumber' ? 'arrivalFlightOptions' : undefined}
                          value={operation[item.field as keyof FlightOperation] as string | number}
                          onChange={(event) => handleChange(item.field as keyof FlightOperation, event.target.value)}
                          className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-2 py-1.5 text-slate-100 outline-none transition focus:border-cyan-500 text-sm"
                          placeholder={item.field === 'flightNumber' ? 'Ej. WS 2908' : item.isText ? 'HH:MM' : '0'}
                          type={item.isText ? 'text' : 'number'}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <datalist id="arrivalFlightOptions">
                  <option value="WS 2908" />
                  <option value="WS 2506" />
                  <option value="WS 2740" />
                </datalist>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Salida</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { field: 'departureFlightNumber', label: '✈️ Vuelo salida', isText: true },
                      { field: 'departurePax', label: '👥 PAX' },
                      { field: 'departureBags', label: '🎒 BAGS' },
                      { field: 'departureWheelchair', label: '♿ WCHR' },
                      { field: 'departureInfants', label: '👶 INF' },
                      { field: 'departureChildren', label: '🧒 CHD' },
                      { field: 'departureAvih', label: '🐕 AVIH' },
                      { field: 'departurePetc', label: '🐾 PETC' },
                      { field: 'etd', label: '⏳ ETD', isText: true },
                      { field: 'departureNcob', label: '🧳❌ NCOB' },
                      { field: 'departureAlgr', label: 'ALGR' },
                      { field: 'departureBlnd', label: 'BLND' },
                      { field: 'crew', label: 'CREW' },
                      { field: 'nogoCount', label: 'NOGO' },
                    ].map((item) => (
                      <label key={item.field} className="space-y-2 text-sm text-slate-300">
                        <span>{item.label}</span>
                        <input
                          value={operation[item.field as keyof FlightOperation] as string | number}
                          onChange={(event) => handleChange(item.field as keyof FlightOperation, event.target.value)}
                          className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                          placeholder={item.isText ? (item.field === 'etd' ? 'HH:MM' : item.field === 'departureFlightNumber' ? 'Ej. 2909' : 'Texto') : '0'}
                          type={item.isText ? 'text' : 'number'}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs md:text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={operation.nogo}
                    onChange={(event) => handleChange('nogo', event.target.checked)}
                    className="h-3 w-3 rounded border-slate-700 bg-slate-800 text-cyan-500"
                  />
                  Marcar NOGO
                </label>

                {operation.nogo && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-300">
                      <span>📝 Nombres NOGO</span>
                      <input
                        value={operation.nogoNames}
                        onChange={(event) => handleChange('nogoNames', event.target.value)}
                        className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                        placeholder="Ej. Juan Pérez, María López"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-300">
                      <span>🆔 PNR NOGO</span>
                      <input
                        value={operation.nogoPnrs}
                        onChange={(event) => handleChange('nogoPnrs', event.target.value)}
                        className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
                        placeholder="Ej. ABC123, DEF456"
                      />
                    </label>
                  </div>
                )}

                <label className="space-y-1 text-xs md:text-sm text-slate-300">
                  <span>WhatsApp número</span>
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-500 text-sm"
                    placeholder="809 802 0006 o +18098020006"
                  />
                </label>
                <p className="text-xs text-slate-500">ETA = llegada, ETD = salida. ALGR/BLND separados por vuelo.</p>

                <button
                  type="submit"
                  disabled={!isValid || sending}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 text-xs md:text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sending ? 'Enviando...' : 'Enviar por WhatsApp'}
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-cyan-500/10">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Previsualización</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Estado local</h2>
                <p className="mt-3 text-slate-400">Tu reporte no se guarda en base de datos. Imprime o copia el mensaje después de enviar.</p>

                <div className="mt-6 rounded-3xl bg-slate-900 p-6 text-slate-300">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Vuelo</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{operation.flightNumber || 'Sin vuelo'}</p>
                  <p className="mt-4 text-sm text-slate-400">Gate {operation.gate || 'TBD'} · Counters {operation.counters || 'TBD'} · Belt {operation.belt || 'TBD'}</p>
                  {operation.nogo && (
                    <div className="mt-4 rounded-3xl bg-slate-800 p-4 text-slate-300">
                      <p className="text-xs uppercase tracking-[0.3em] text-rose-400">NOGO Detalles</p>
                      <p className="mt-2 text-sm text-slate-200">Nombres: {operation.nogoNames || 'Sin nombres'}</p>
                      <p className="mt-1 text-sm text-slate-200">PNR: {operation.nogoPnrs || 'Sin PNR'}</p>
                    </div>
                  )}
                </div>
              </div>

              {previewOperation ? (
                <div className="rounded-[2rem] border-2 border-cyan-500 bg-slate-900 p-6 text-slate-100 shadow-xl shadow-cyan-500/20">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Último envío</p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">{previewOperation.flightNumber}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-300">WhatsApp enviado</span>
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="rounded-3xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                      >
                        Imprimir formato
                      </button>
                      <button
                        type="button"
                        onClick={downloadPreviewImage}
                        disabled={exportingImage}
                        className="rounded-3xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {exportingImage ? 'Generando...' : 'Descargar imagen'}
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-slate-400">
                    Mensaje enviado a {phone || 'número desconocido'}.
                  </div>
                </div>
              ) : (
                <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-8 text-slate-400">Aún no se ha enviado ningún mensaje.</div>
              )}
            </div>
          </section>

          {previewOperation && (
            <section className="mt-8" ref={previewRef}>
              <OperationPreview
                operation={previewOperation}
                onPrint={() => window.print()}
                onDownloadImage={downloadPreviewImage}
                exportingImage={exportingImage}
              />
            </section>
          )}
          <Toaster position="bottom-right" richColors />
        </main>
      </div>
    </div>
  );
}
