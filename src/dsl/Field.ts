import { getter, setter } from 'Paths';
import { ContextAccessor } from 'dsl/ContextAccessor';
import { Context } from 'dsl/Context';
import { Getter } from 'Getter';
import { Setter } from 'Setter';
import { FieldMetadata } from 'dsl/meta/FieldMetadata';

export class Field<T extends object = object, C extends Context = Context, V = {}> implements ContextAccessor<T, C, V> {
  public get: Getter<T, C, V | null>;
  public set: Setter<T, C, V | null>;
  public readonly metadata: FieldMetadata;

  public constructor(path: (string | number)[]) {
    this.get = getter(...path);
    this.set = setter(...path);
    this.metadata = new FieldMetadata(path);
  }

  public static field<T extends object, V>(...path: (string | number)[]): Field<T, Context, V> {
    return new Field(path);
  }
}
