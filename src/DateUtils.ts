function pad(val: string | number, len: number): string {
  val = String(val);
  len = len || 2;
  while (val.length < len) {
    val = '0' + val;
  }
  return val;
}

export function formatISO(date: Date): string {
  return date.toISOString();
}

export function formatYYYYMMdd(date: Date): string {
  return date.getFullYear().toString() + pad(date.getMonth() + 1, 2) + pad(date.getDate(), 2);
}

export function formatddMMYYYY(date: Date): string {
  return pad(date.getDate(), 2) + pad(date.getMonth() + 1, 2) + date.getFullYear();
}

export function formatReadable(date: Date): string {
  return pad(date.getDate(), 2) + '/' + pad(date.getMonth() + 1, 2) + '/' + date.getFullYear();
}

export function formatMMMMYYYY(date: Date, locale?: string): string {
  const month = date.toLocaleDateString(locale, { month: 'long' });
  return month + ' ' + date.getFullYear();
}

export function formatEEEEddMMMM(date: Date, locale?: string): string {
  const weekday = date.toLocaleDateString(locale, { weekday: 'long' });
  const month = date.toLocaleDateString(locale, { month: 'long' });
  return weekday + ' ' + pad(date.getDate(), 2) + ' ' + month;
}

export function formatTime(date: Date): string {
  return pad(date.getHours(), 2) + pad(date.getMinutes(), 2) + pad(date.getSeconds(), 2);
}

export function parse(yyyyMMdd: string): Date {
  const year = Number.parseInt(yyyyMMdd.slice(0, 4));
  const month = Number.parseInt(yyyyMMdd.slice(4, 6)) - 1;
  const day = Number.parseInt(yyyyMMdd.slice(6, 8));
  return new Date(year, month, day);
}
