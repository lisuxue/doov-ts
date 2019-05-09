export function log(message: string) {
  console.error(message);
}

export function hasProperty(prop: string | number | symbol, obj: object) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function isInteger(obj: any) {
  return Number.isInteger(obj) || obj << 0 === obj;
}
