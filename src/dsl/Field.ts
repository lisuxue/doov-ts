import { getter, setter } from 'Paths';
import { ContextAccessor } from 'dsl/ContextAccessor';
import { Context } from 'dsl/Context';
import { Getter } from 'Getter';
import { Setter } from 'Setter';
import { FieldMetadata } from 'dsl/meta/FieldMetadata';
import { NumberFunction } from 'dsl/lang/NumberFunction';
import { UnaryMetadata } from 'dsl/meta/UnaryMetadata';
import { POSITION, TAGS } from 'dsl/lang/DefaultOperators';
import { IterableFunction } from 'dsl/lang/IterableFunction';

export class Field<T extends object = object, C extends Context = Context, V = {}> implements ContextAccessor<T, C, V> {
  public get: Getter<T, C, V | null | undefined>;
  public set: Setter<T, C, V | null | undefined>;
  public readonly metadata: FieldMetadata;

  public constructor(metadata: FieldMetadata) {
    this.get = getter(...metadata.path);
    this.set = setter(...metadata.path);
    this.metadata = metadata;
  }

  public static field<T extends object, V>(...path: (string | number)[]): Field<T, Context, V> {
    return new Field(new FieldMetadata(path));
  }

  public withPosition(value: number): Field<T, C, V> {
    return new Field(new FieldMetadata(this.metadata.path, this.metadata.tags, value));
  }

  public withTags(...value: string[]): Field<T, C, V> {
    return new Field(new FieldMetadata(this.metadata.path, value, this.metadata.position));
  }

  public position(): NumberFunction {
    return new NumberFunction(new UnaryMetadata(this.metadata, POSITION), () => {
      return this.metadata.position;
    });
  }

  public tags(): IterableFunction<string> {
    return new IterableFunction(new UnaryMetadata(this.metadata, TAGS), () => {
      return this.metadata.tags;
    });
  }
}
