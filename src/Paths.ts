import { hasProperty, isInteger } from 'Utils';
import { Context } from 'Context';
import { Getter } from 'Getter';
import { Setter } from 'Setter';

/**
 * Parse `some.value.4.path` to ["some", "value", 4, "path"]
 * @param pathString
 */
export function path(pathString: string): (string | number)[] {
  return pathString.split('.').map(value => {
    const n = parseInt(value);
    if (!isNaN(n)) {
      return n;
    } else {
      return value;
    }
  });
}

/**
 *
 * @param path
 */
export function pathString(...path: (string | number)[]): string {
  return path.join('.');
}

/**
 * Get Path
 */

/**
 * Get from Path without promise
 * @param obj target object
 * @param path
 */
export function getPath<T>(obj: any, ...path: (string | number)[]): T {
  return path.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), obj);
}

/**
 * Get from Path with promise
 * @param obj target object
 * @param path
 */
export function getPathPromise<T>(obj: any, ...path: (string | number)[]): Promise<T> {
  return path.reduce((previousPromise, nextID) => {
    return previousPromise.then(xs => {
      return new Promise((resolve, reject) => {
        xs && xs[nextID] ? resolve(xs[nextID]) : reject(undefined);
      });
    });
  }, Promise.resolve(obj)) as Promise<T>;
}

/**
 * Set Path
 */

/**
 * Set Property without promise
 * @param prop
 * @param val value
 * @param obj target object
 */
export function setProp<T>(prop: string | number, val: any, obj: T): T {
  const result = { ...obj };
  (result as any)[prop] = val;
  return result;
}

/**
 * Set Property with promise
 * @param prop
 * @param val promise
 * @param obj target object
 */
export function setPropPromise<T>(prop: string | number, val: Promise<any>, obj: T): Promise<T> {
  return val.then(value => {
    const result = { ...obj };
    (result as any)[prop] = value;
    return result;
  });
}

/**
 * Set to Path with promise
 * @param obj target object
 * @param val promise
 * @param path
 */
export function setPathPromise<T extends object>(obj: T, val: Promise<any>, ...path: (string | number)[]): Promise<T> {
  const idx = path[0];
  if (path.length > 1) {
    let nextObj = obj != null && hasProperty(idx, obj) ? (obj as any)[idx] : isInteger(path[1]) ? [] : {};
    val = setPathPromise(nextObj, val, ...Array.prototype.slice.call(path, 1));
  }
  return setPropPromise(idx, val, obj);
}

/**
 * Set to Path with promise using value
 * @param obj target object
 * @param val value
 * @param path
 */
export function setPathPromiseValue<T extends object>(obj: T, val: any, ...path: (string | number)[]): Promise<T> {
  return setPathPromise(obj, Promise.resolve(val), ...path);
}

/**
 * Set to Path without promise
 * @param obj target object
 * @param val value
 * @param path
 */
export function setPath<T extends object>(obj: T, val: any, ...path: (string | number)[]): T {
  const idx = path[0];
  if (path.length > 1) {
    let nextObj = obj != null && hasProperty(idx, obj) ? (obj as any)[idx] : isInteger(path[1]) ? [] : {};
    val = setPath(nextObj, val, ...Array.prototype.slice.call(path, 1));
  }
  return setProp(idx, val, obj);
}

/**
 * Getter
 * @param path
 */
export const getter = <T extends object, C extends Context, V>(...path: (string | number)[]): Getter<T, C, V> => {
  return obj => getPath(obj, ...path);
};

/**
 * Setter
 * @param path
 */
export const setter = <T extends object, C extends Context, V>(...path: (string | number)[]): Setter<T, C, V> => {
  return (obj, val) => setPath(obj, val, ...path);
};
