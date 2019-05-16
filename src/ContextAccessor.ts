import { Context } from 'Context';
import { Getter, Setter } from 'doov';

export interface ContextAccessor<T extends object, C extends Context, V> {
  get: Getter<T, C, V>;
  set: Setter<T, C, V>;
}
