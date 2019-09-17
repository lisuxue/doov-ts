function pad(val: string | number, len: number): string {
  val = String(val);
  len = len || 2;
  while (val.length < len) {
    val = '0' + val;
  }
  return val;
}

export function now(): Date {
  return new Date(Date.now());
}

export function clone(date: Date): Date {
  return new Date(date.valueOf());
}

export function newUTCDate(
  year: number,
  month: number,
  date?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  ms?: number
): Date {
  return new Date(
    Date.UTC(year, month, date ? date : 0, hours ? hours : 0, minutes ? minutes : 0, seconds ? seconds : 0, ms ? ms : 0)
  );
}

export function formatYYYYMMdd(date: Date): string {
  const utcDate = clone(date);
  return utcDate.getUTCFullYear().toString() + pad(utcDate.getUTCMonth() + 1, 2) + pad(utcDate.getUTCDate(), 2);
}

export function formatddMMYYYY(date: Date): string {
  const utcDate = clone(date);
  return pad(utcDate.getUTCDate(), 2) + pad(utcDate.getUTCMonth() + 1, 2) + utcDate.getUTCFullYear();
}

export function formatReadable(date: Date): string {
  const utcDate = clone(date);
  return pad(utcDate.getUTCDate(), 2) + '/' + pad(utcDate.getUTCMonth() + 1, 2) + '/' + utcDate.getUTCFullYear();
}

export function formatMMMMYYYY(date: Date, locale?: string): string {
  const utcDate = clone(date);
  const monthFormat = new Intl.DateTimeFormat(locale, { month: 'long' });
  return monthFormat.format(date) + ' ' + utcDate.getUTCFullYear();
}

export function formatEEEEddMMMM(date: Date, locale?: string): string {
  const utcDate = clone(date);
  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: 'long' });
  const weekday = weekdayFormat.format(utcDate);
  const monthFormat = new Intl.DateTimeFormat(locale, { month: 'long' });
  const month = monthFormat.format(utcDate);
  return weekday + ' ' + pad(utcDate.getUTCDate(), 2) + ' ' + month;
}

export function formatTime(date: Date): string {
  const utcDate = clone(date);
  return pad(date.getHours(), 2) + pad(utcDate.getMinutes(), 2) + pad(date.getSeconds(), 2);
}

export function parse(yyyyMMdd: string): Date {
  const year = Number.parseInt(yyyyMMdd.slice(0, 4));
  const month = Number.parseInt(yyyyMMdd.slice(4, 6)) - 1;
  const day = Number.parseInt(yyyyMMdd.slice(6, 8));
  return newUTCDate(year, month, day);
}

export function numberOfFullMonthsBetween(left: Date, right?: Date): number {
  const today = right ? right : now();
  const y = today.getUTCFullYear() - left.getUTCFullYear();
  const m = today.getUTCMonth() - left.getUTCMonth();
  const d = today.getUTCDay() - left.getUTCDate();
  const res = y * 12 + m;
  if (d >= 0) {
    return res;
  }
  return res - 1;
}
