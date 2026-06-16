export const formatDateTime = (isoDate: string): string => {
  try {
    return new Date(isoDate).toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
    });
  } catch {
    return isoDate;
  }
};
