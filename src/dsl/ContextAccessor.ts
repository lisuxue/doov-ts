import { Context } from 'dsl/Context';
import { Getter } from 'Getter';
import { Setter } from 'Setter';
import { DslBuilder } from 'dsl/DslBuilder';

export interface ContextAccessor<T extends object, C extends Context, V> extends DslBuilder {
  get: Getter<T, C, V | null | undefined>;
  set?: Setter<T, C, V | null | undefined>;
}
