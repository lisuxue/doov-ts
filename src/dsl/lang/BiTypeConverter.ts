import { DslBuilder } from '../DslBuilder';
import { Context } from '../Context';
import { Metadata } from '../meta/Metadata';
import { TypeConverterMetadata } from '../meta/TypeConverterMetadata';
import { Function } from './Function';

export type BiConverterFunction<T, U, V> = (
  obj: object,
  input: Function<T>,
  input2: Function<U>,
  context?: Context | undefined
) => V;

export class BiTypeConverter<I, J, O> implements DslBuilder {
  readonly metadata: Metadata;
  readonly convert: BiConverterFunction<I, J, O>;

  constructor(converter: BiConverterFunction<I, J, O>, description?: string) {
    this.convert = converter;
    this.metadata = new TypeConverterMetadata(converter.toString(), description);
  }
}
