export function log(message: string) {
  console.error(message);
}

export function hasProperty(prop: string | number | symbol, obj: object): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function isInteger(obj: any): boolean {
  return Number.isInteger(obj) || obj << 0 === obj;
}
