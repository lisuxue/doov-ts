import { Context } from 'Context';
import { Metadata } from 'Metadata';
import { hasProperty } from 'Utils';

export interface Getter<T extends object = object, C extends Context = Context, V = any> {
  (obj: T, ctx?: C): V;
}

export function interceptGetter<T extends object = object, C extends Context = Context, V = any>(
  metadata: Metadata,
  getter: Getter<T, C, V>
): Getter<T, C, V> {
  if (hasProperty('interceptor', getter)) {
    return getter;
  } else {
    const g = (obj: T, ctx?: C) => {
      const value = getter(obj, ctx);
      if (ctx) {
        ctx.addGetValue(metadata, value);
      }
      return value;
    };
    (g as any)['interceptor'] = true;
    return g;
  }
}
