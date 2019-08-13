import { DslBuilder } from 'dsl/DslBuilder';
import { Context } from 'dsl/Context';
import { Metadata } from 'dsl/meta/Metadata';
import { TypeConverterMetadata } from 'dsl/meta/TypeConverterMetadata';
import { Function } from 'dsl/lang/Function';

export type NaryConverterFunction<V> = (obj: object, inputs: Function<any>[], context?: Context | undefined) => V;

export class NaryTypeConverter<O> implements DslBuilder {
  readonly metadata: Metadata;
  readonly convert: NaryConverterFunction<O>;

  constructor(converter: NaryConverterFunction<O>, description?: string) {
    this.convert = converter;
    this.metadata = new TypeConverterMetadata(converter.toString(), description);
  }
}
