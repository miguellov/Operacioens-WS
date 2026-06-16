import { FlightOperation } from '@/types/flightOperation';

const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

export const backupToGoogleSheets = async (operation: FlightOperation) => {
  if (!spreadsheetId || !apiKey) {
    throw new Error('Google Sheets environment variables are not configured.');
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1:append?valueInputOption=USER_ENTERED&key=${apiKey}`;

  const body = {
    values: [
      [
        operation.flightNumber,
        operation.gate,
        operation.counters,
        operation.belt,
        operation.pax,
        operation.bags,
        operation.wheelchair,
        operation.infants,
        operation.children,
        operation.avih,
        operation.petc,
        operation.eta,
        operation.nogo ? 'YES' : 'NO',
        operation.createdAt,
      ],
    ],
  };

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
