import { Function } from 'dsl/lang/Function';
import { BiTypeConverter } from 'dsl/lang/BiTypeConverter';
import { SingleMappingRule } from 'dsl/lang/SingleMappingRule';
import { BinaryMetadata } from 'dsl/meta/BinaryMetadata';
import { AND, USING } from 'dsl/lang/DefaultOperators';
import { TypeConverter } from 'dsl/lang/TypeConverter';
import { StepMapping } from 'dsl/lang/StepMapping';

export class BiStepMapping<T, U, V> extends Function<V> {
  public readonly input: Function<T>;
  public readonly input2: Function<U>;
  public readonly converter: BiTypeConverter<T, U, V>;

  constructor(input: Function<T>, input2: Function<U>, converter: BiTypeConverter<T, U, V>) {
    super(
      new BinaryMetadata(new BinaryMetadata(input.metadata, AND, input2.metadata), USING, converter.metadata),
      (obj, ctx) => converter.convert(obj, input, input2, ctx)
    );
    this.input = input;
    this.input2 = input2;
    this.converter = converter;
  }

  public using<W>(converter: TypeConverter<V, W>): StepMapping<V, W> {
    return new StepMapping(this, converter);
  }

  public to(output: Function<V>) {
    return new SingleMappingRule(this, output);
  }
}
