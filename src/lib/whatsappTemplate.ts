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
  const arrivalBlock = `${emojis.plane} Vuelo ${operation.flightNumber}\n\n${emojis.pax} Pax: ${operation.pax}\n${emojis.bags} Bags: ${operation.bags}\n${emojis.wchr} WCHR: ${operation.wheelchair}\n${emojis.inf} INF: ${operation.infants}\n${emojis.chd} CHD: ${operation.children}\n${emojis.avih} AVIH: ${operation.avih}\n${emojis.petc} PETC: ${operation.petc}\nALGR: ${operation.algr}\nBLND: ${operation.blnd}\n${emojis.eta} ETA: ${operation.eta}${operation.nogoCount > 0 ? `\n\nNOGO: ${operation.nogoCount}` : ''}`;

  const departureBlock = `${emojis.plane} Vuelo ${operation.departureFlightNumber || operation.flightNumber}\n\n${emojis.pax} Pax: ${operation.departurePax}\n${emojis.wchr} WCHR: ${operation.departureWheelchair}\n${emojis.inf} INF: ${operation.departureInfants}\n${emojis.chd} CHD: ${operation.departureChildren}\n${emojis.avih} AVIH: ${operation.departureAvih}\n${emojis.petc} PETC: ${operation.departurePetc}\n🧳❌ NCOB: ${operation.departureNcob}\n\nALGR: ${operation.algr}\nBLND: ${operation.blnd}\nCREW: ${operation.crew}\n\n${emojis.etd} ETD: ${operation.etd}\n\nNOGO: ${operation.departureNogoCount}${operation.departureNogoNames || operation.departureNogoPnrs ? `\n\nNOGO Nombres: ${operation.departureNogoNames || 'Sin nombres'}\nPNR: ${operation.departureNogoPnrs || 'Sin PNR'}` : ''}`;

  return `${arrivalBlock}\n\n---\n\n${departureBlock}`;
};
