import { Function } from './Function';
import { Context } from '../Context';
import { DslBuilder } from '../DslBuilder';
import { Metadata } from '../meta/Metadata';
import { TypeConverterMetadata } from '../meta/TypeConverterMetadata';

export type ConverterFunction<T, V> = (obj: object, input: Function<T>, context?: Context | undefined) => V;

export class TypeConverter<I, O> implements DslBuilder {
  readonly metadata: Metadata;
  readonly convert: ConverterFunction<I, O>;

  constructor(converter: ConverterFunction<I, O>, description?: string) {
    this.convert = converter;
    this.metadata = new TypeConverterMetadata(converter.toString(), description);
  }
}
