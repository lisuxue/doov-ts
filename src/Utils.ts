export function hasProperty(prop: string | number | symbol, obj: object): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function isInteger(obj: any): obj is number {
  return Number.isInteger(obj) || obj << 0 === obj;
}

export function nullOrUndefined(obj: any): obj is null | undefined {
  return obj === null || obj === undefined;
}

export function flatMap<T>(arr: T[], map: (t: T) => T[] = t => (Array.isArray(t) ? [...t] : [t])): T[] {
  return arr.reduce((acc, val) => acc.concat(map(val)), [] as T[]);
}
