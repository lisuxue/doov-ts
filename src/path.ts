import { hasProperty, isInteger } from './util';
import { Getter, Setter } from './doov';

export const getPath = <T>(obj: any, ...path: (string | number)[]): T =>
  path.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), obj);

export const setProp = <T>(prop: string | number, val: any, obj: T): T => {
  let result = { ...obj };
  (result as any)[prop] = val;
  return result;
};

export const setPath = <T>(obj: T, val: any, ...path: (string | number)[]): T => {
  if (path.length === 0) {
    return val;
  }
  const idx = path[0];
  if (path.length > 1) {
    let nextObj = obj != null && hasProperty(idx, obj) ? (obj as any)[idx] : isInteger(path[1]) ? [] : {};
    val = setPath(nextObj, val, ...Array.prototype.slice.call(path, 1));
  }
  return setProp(idx, val, obj);
};

export const getter = <T, C, V>(...path: (string | number)[]): Getter<T, C, V> => {
  return obj => getPath(obj, ...path);
};

export const setter = <T, C, V>(...path: (string | number)[]): Setter<T, C, V> => {
  return (obj, val) => setPath(obj, val, ...path);
};
