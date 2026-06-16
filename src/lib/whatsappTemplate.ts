import { FlightOperation } from '@/types/flightOperation';

const emojis = {
  plane: '\u2708\uFE0F',
  pax: '\uD83D\uDC65',
  bags: '\uD83E\uDDF3',
  wchr: '\u267F',
  inf: '\uD83D\uDC76',
  chd: '\uD83E\uDDD2',
  avih: '\uD83D\uDC15',
  petc: '\uD83D\uDC3E',
  eta: '\u23F0',
  etd: '\u23F3',
};

export const buildWhatsappMessage = (operation: FlightOperation) => {
  const arrivalBlock = `${emojis.plane} Vuelo ${operation.flightNumber}

${emojis.pax} Pax: ${operation.pax}
${emojis.bags} Bags: ${operation.bags}
${emojis.wchr} WCHR: ${operation.wheelchair}
${emojis.inf} INF: ${operation.infants}
${emojis.chd} CHD: ${operation.children}
${emojis.avih} AVIH: ${operation.avih}
${emojis.petc} PETC: ${operation.petc}
Gate: ${operation.arrivalGate || 'TBD'}
Counters: ${operation.arrivalCounters || 'TBD'}
Belt: ${operation.arrivalBelt || 'TBD'}
ALGR: ${operation.arrivalAlgr}
BLND: ${operation.arrivalBlnd}
${emojis.eta} ETA: ${operation.eta}${operation.nogoCount > 0 ? `

NOGO: ${operation.nogoCount}` : ''}${operation.nogoNames || operation.nogoPnrs ? `

NOGO Nombres: ${operation.nogoNames || 'Sin nombres'}
PNR: ${operation.nogoPnrs || 'Sin PNR'}` : ''}`;

  const departureBlock = `${emojis.plane} Vuelo ${operation.departureFlightNumber || operation.flightNumber}

${emojis.pax} Pax: ${operation.departurePax}
${emojis.bags} Bags: ${operation.departureBags}
${emojis.wchr} WCHR: ${operation.departureWheelchair}
${emojis.inf} INF: ${operation.departureInfants}
${emojis.chd} CHD: ${operation.departureChildren}
${emojis.avih} AVIH: ${operation.departureAvih}
${emojis.petc} PETC: ${operation.departurePetc}
Gate: ${operation.gate || 'TBD'}
Counters: ${operation.counters || 'TBD'}
Belt: ${operation.belt || 'TBD'}
🧳❌ NCOB: ${operation.departureNcob}

ALGR: ${operation.departureAlgr}
BLND: ${operation.departureBlnd}
CREW: ${operation.crew}

${emojis.etd} ETD: ${operation.etd}

NOGO: ${operation.departureNogoCount}${operation.departureNogoNames || operation.departureNogoPnrs ? `

NOGO Nombres: ${operation.departureNogoNames || 'Sin nombres'}
PNR: ${operation.departureNogoPnrs || 'Sin PNR'}` : ''}`;

  return `${arrivalBlock}\n\n---\n\n${departureBlock}`;
};
