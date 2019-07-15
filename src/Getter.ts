import { Context } from 'Context';

export interface Getter<T extends object = object, C extends Context = Context, V = any> {
  (obj: T, ctx?: C): V;
}
