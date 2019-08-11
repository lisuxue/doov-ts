export function hasProperty(prop: string | number | symbol, obj: object): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function isInteger(obj: any): obj is number {
  return Number.isInteger(obj) || obj << 0 === obj;
}
