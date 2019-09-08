import { Function } from './Function';
import { TypeConverter } from './TypeConverter';
import { BinaryMetadata } from '../meta/BinaryMetadata';
import { USING } from './DefaultOperators';
import { SingleMappingRule } from './SingleMappingRule';

export class StepMapping<T, U> extends Function<U> {
  public readonly input: Function<T>;
  public readonly converter: TypeConverter<T, U>;

  constructor(input: Function<T>, converter: TypeConverter<T, U>) {
    super(new BinaryMetadata(input.metadata, USING, converter.metadata), (obj, ctx) =>
      converter.convert(obj, input, ctx)
    );
    this.input = input;
    this.converter = converter;
  }

  public using<V>(converter: TypeConverter<U, V>): StepMapping<U, V> {
    return new StepMapping(this, converter);
  }

  public to(output: Function<U>) {
    return new SingleMappingRule(this, output);
  }
}
