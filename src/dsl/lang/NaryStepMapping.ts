import { Function } from 'dsl/lang/Function';
import { SingleMappingRule } from 'dsl/lang/SingleMappingRule';
import { BinaryMetadata } from 'dsl/meta/BinaryMetadata';
import { MULTIPLE_INPUTS, USING } from 'dsl/lang/DefaultOperators';
import { NaryMetadata } from 'dsl/meta/NaryMetadata';
import { NaryTypeConverter } from 'dsl/lang/NaryTypeConverter';

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

  public to(output: Function<V>) {
    return new SingleMappingRule(this, output);
  }
}
