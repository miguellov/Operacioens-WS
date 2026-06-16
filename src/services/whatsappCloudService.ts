import { parseWhatsappMessage } from '@/services/whatsappParserService';

export const processWhatsappReport = async (message: string) => {
  const operation = parseWhatsappMessage(message);
  return operation;
};
