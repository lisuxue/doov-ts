import { Context } from 'Context';
import { Metadata } from 'Metadata';
import { hasProperty } from 'Utils';

export interface Setter<T extends object = object, C extends Context = Context, V = any> {
  (obj: T, val: V, ctx?: C): T;
}

export function interceptSetter<T extends object = object, C extends Context = Context, V = any>(
  metadata: Metadata,
  setter: Setter<T, C, V>
): Setter<T, C, V> {
  if (hasProperty('interceptor', setter)) {
    return setter;
  } else {
    const s = (obj: T, val: V, ctx?: C) => {
      if (ctx) {
        ctx.addSetValue(metadata, val);
      }
      return setter(obj, val, ctx);
    };
    (s as any)['interceptor'] = true;
    return s;
  }
}
