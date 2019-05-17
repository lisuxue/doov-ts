import { ContextAccessor } from 'ContextAccessor';
import { Context } from 'Context';
import { Getter } from 'Getter';
import { Setter } from 'Setter';

export class OuterFunction<T extends object, C extends Context, V> implements ContextAccessor<T, C, V> {
  public get: Getter<T, C, V>;
  public set: Setter<T, C, V>;

  public constructor(getter: (obj: T, ctx?: C) => V, setter: (obj: T, val: V, ctx?: C) => T) {
    this.get = (obj: T, ctx?: C) => Promise.resolve(getter(obj, ctx));
    this.set = (obj: T, val: V, ctx?: C) => Promise.resolve(setter(obj, val, ctx));
  }
}
