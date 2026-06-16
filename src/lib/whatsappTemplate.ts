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
  gate: '\uD83D\uDEEB',
  counters: '\uD83D\uDCCB',
  belt: '\uD83D\uDCE6',
  ncob: '\uD83E\uDDF3\u274C',
  algr: '🤧',
  blnd: '🧑‍🦯',
  crew: '\uD83D\uDC68\u200D\u2708\uFE0F',
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
${emojis.algr} ALGR: ${operation.arrivalAlgr}
${emojis.blnd} BLND: ${operation.arrivalBlnd}
${emojis.eta} ETA: ${operation.eta || 'TBD'}${operation.nogoCount > 0 ? `

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
${emojis.ncob} NCOB: ${operation.departureNcob}

${emojis.algr} ALGR: ${operation.departureAlgr}
${emojis.blnd} BLND: ${operation.departureBlnd}
${emojis.crew} CREW: ${operation.crew}

${emojis.etd} ETD: ${operation.etd || 'TBD'}

NOGO: ${operation.departureNogoCount}${operation.departureNogoNames || operation.departureNogoPnrs ? `

NOGO Nombres: ${operation.departureNogoNames || 'Sin nombres'}
PNR: ${operation.departureNogoPnrs || 'Sin PNR'}` : ''}`;

  return `${arrivalBlock}\n\n---\n\n${departureBlock}`;
};
