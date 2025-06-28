// Utility to convert UTC date/time string to IST string
export function toIST(utcString) {
  if (!utcString) return '';
  const date = new Date(utcString);
  // IST is UTC+5:30
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(date.getTime() + istOffset);
  // Format: DD-MM-YYYY HH:mm:ss (IST)
  return istDate.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }) + ' IST';
}
