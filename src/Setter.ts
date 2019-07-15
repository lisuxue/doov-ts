import { Context } from 'Context';

export interface Setter<T extends object = object, C extends Context = Context, V = any> {
  (obj: T, val: V, ctx?: C): T;
}
