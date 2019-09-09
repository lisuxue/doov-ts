import { DslBuilder } from '../DslBuilder';
import { Context } from '../Context';
import { Metadata } from '../meta/Metadata';
import { TypeConverterMetadata } from '../meta/TypeConverterMetadata';
import { Function } from './Function';

export type NaryConverterFunction<V> = (obj: object, inputs: Function<any>[], context?: Context | undefined) => V;

export class NaryTypeConverter<O> implements DslBuilder {
  readonly metadata: Metadata;
  readonly convert: NaryConverterFunction<O>;

  constructor(converter: NaryConverterFunction<O>, description?: string) {
    this.convert = converter;
    this.metadata = new TypeConverterMetadata(converter.toString(), description);
  }
}
