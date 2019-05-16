import { getter, setter } from './path';
import { ContextAccessor } from 'ContextAccessor';
import { Context } from 'Context';
import { Getter } from 'Getter';
import { Setter } from 'Setter';

export class Field<T extends object, C extends Context, V> implements ContextAccessor<T, C, V> {
  public get: Getter<T, C, V>;
  public set: Setter<T, C, V>;

  public constructor(path: (string | number)[]) {
    this.get = getter(...path);
    this.set = setter(...path);
  }

  public static field<T extends object, V>(...path: (string | number)[]): Field<T, Context, V> {
    return new Field(path);
  }
}
