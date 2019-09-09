import { Function } from './Function';
import { SingleMappingRule } from './SingleMappingRule';
import { BinaryMetadata } from '../meta/BinaryMetadata';
import { MULTIPLE_INPUTS, USING } from './DefaultOperators';
import { NaryMetadata } from '../meta/NaryMetadata';
import { NaryTypeConverter } from './NaryTypeConverter';
import { TypeConverter } from './TypeConverter';
import { StepMapping } from './StepMapping';

export class NaryStepMapping<V> extends Function<V> {
  public readonly inputs: Function<any>[];
  public readonly converter: NaryTypeConverter<V>;

  constructor(inputs: Function<any>[], converter: NaryTypeConverter<V>) {
    super(
      new BinaryMetadata(new NaryMetadata(inputs.map(f => f.metadata), MULTIPLE_INPUTS), USING, converter.metadata),
      (obj, ctx) => converter.convert(obj, inputs, ctx)
    );
    this.inputs = inputs;
    this.converter = converter;
  }

  public using<W>(converter: TypeConverter<V, W>): StepMapping<V, W> {
    return new StepMapping(this, converter);
  }

  public to(output: Function<V>) {
    return new SingleMappingRule(this, output);
  }
}
