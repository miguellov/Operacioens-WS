import { FlightOperation } from '@/types/flightOperation';

const parseNumber = (value: string | null) => {
  const parsed = Number(value?.trim() ?? '0');
  return Number.isNaN(parsed) ? 0 : parsed;
};

const extract = (text: string, pattern: RegExp) => {
  const match = text.match(pattern);
  return match?.[1]?.trim() ?? null;
};

export const parseWhatsappMessage = (message: string): FlightOperation => {
  const normalized = message.toLowerCase();

  return {
    id: `${Date.now()}`,
    flightNumber: extract(normalized, /vuelo\s*(\d+)/) ?? 'UNKNOWN',
    gate: extract(normalized, /gate\s*([a-z0-9]+)/) ?? 'TBD',
    counters: extract(normalized, /counters?:\s*([a-z0-9\-]+)/) ?? 'TBD',
    belt: extract(normalized, /correa:\s*([a-z0-9]+)/) ?? 'TBD',
    pax: parseNumber(extract(normalized, /pax:\s*(\d+)/)),
    bags: parseNumber(extract(normalized, /bags:\s*(\d+)/)),
    wheelchair: parseNumber(extract(normalized, /wchr:\s*(\d+)/)),
    infants: parseNumber(extract(normalized, /inf:\s*(\d+)/)),
    children: parseNumber(extract(normalized, /chd:\s*(\d+)/)),
    avih: parseNumber(extract(normalized, /avih:\s*(\d+)/)),
    petc: parseNumber(extract(normalized, /petc:\s*(\d+)/)),
    eta: extract(normalized, /eta:\s*([0-9]{1,2}:[0-9]{2})/) ?? '00:00',
    etd: extract(normalized, /etd:\s*([0-9]{1,2}:[0-9]{2})/) ?? '00:00',
    ncob: parseNumber(extract(normalized, /ncob:\s*(\d+)/)),
    departureNcob: parseNumber(extract(normalized, /departure\s*noco\s*:\s*(\d+)/)) || parseNumber(extract(normalized, /nogo:\s*(\d+)/)),
    arrivalAlgr: parseNumber(extract(normalized, /algr:\s*(\d+)/)),
    arrivalBlnd: parseNumber(extract(normalized, /blnd:\s*(\d+)/)),
    departureAlgr: parseNumber(extract(normalized, /algr:\s*(\d+)/)),
    departureBlnd: parseNumber(extract(normalized, /blnd:\s*(\d+)/)),
    crew: parseNumber(extract(normalized, /crew:\s*(\d+)/)),
    nogo: normalized.includes('nogo'),
    nogoCount: parseNumber(extract(normalized, /nogo:\s*(\d+)/)),
    departureNogoCount: parseNumber(extract(normalized, /departure\s*nogo:\s*(\d+)/)) || 0,
    nogoNames: extract(normalized, /nogo nombres:\s*([a-z0-9 ,]+)/) ?? '',
    nogoPnrs: extract(normalized, /pnr:\s*([a-z0-9 ,]+)/) ?? '',
    departureNogoNames: '',
    departureNogoPnrs: '',
    departureFlightNumber: extract(normalized, /vuelo\s*(\d+)/) ?? 'UNKNOWN',
    departurePax: 0,
    departureBags: 0,
    departureWheelchair: 0,
    departureInfants: 0,
    departureChildren: 0,
    departureAvih: 0,
    departurePetc: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
