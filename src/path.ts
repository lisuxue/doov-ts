import { hasProperty, isInteger } from './util';
import { Getter, Setter } from 'doov';
import { Context } from 'Context';

// get Path

export const getPath = <T>(obj: any, ...path: (string | number)[]): T =>
  path.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), obj);

export const getPathPromise = <T>(obj: any, ...path: (string | number)[]): Promise<T> =>
  path.reduce((previousPromise, nextID) => {
    return previousPromise.then(xs => {
      return new Promise((resolve, reject) => {
        xs && xs[nextID] ? resolve(xs[nextID]) : reject(undefined);
      });
    });
  }, Promise.resolve(obj)) as Promise<T>;

// set Path

export const setProp = <T>(prop: string | number, val: any, obj: T): Promise<T> => {
  return Promise.resolve({ ...obj }).then(result => {
    (result as any)[prop] = val;
    return result;
  });
};

const setPropPromise = <T>(prop: string | number, val: Promise<any>, obj: T): Promise<T> => {
  return val.then(value => {
    const result = { ...obj };
    (result as any)[prop] = value;
    return result;
  });
};

const setPathPromise = <T extends object>(obj: T, val: Promise<any>, ...path: (string | number)[]): Promise<T> => {
  const idx = path[0];
  if (path.length > 1) {
    let nextObj = obj != null && hasProperty(idx, obj) ? (obj as any)[idx] : isInteger(path[1]) ? [] : {};
    val = setPathPromise(nextObj, val, ...Array.prototype.slice.call(path, 1));
  }
  return setPropPromise(idx, val, obj);
};

export const setPath = <T extends object>(obj: T, val: any, ...path: (string | number)[]): Promise<T> => {
  if (path.length === 0) {
    return val;
  }
  return setPathPromise(obj, Promise.resolve(val), ...path);
};

export const getter = <T extends object, C extends Context, V>(...path: (string | number)[]): Getter<T, C, V> => {
  return obj => getPathPromise(obj, ...path);
};

export const setter = <T extends object, C extends Context, V>(...path: (string | number)[]): Setter<T, C, V> => {
  return (obj, val) => setPath(obj, val, ...path);
};
