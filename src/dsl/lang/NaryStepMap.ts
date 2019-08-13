import { Function } from 'dsl/lang/Function';
import { NaryStepMapping } from 'dsl/lang/NaryStepMapping';
import { NaryConverterFunction, NaryTypeConverter } from 'dsl/lang/NaryTypeConverter';

export class NaryStepMap {
  private readonly inputs: Function<any>[];

  constructor(inputs: Function<any>[]) {
    this.inputs = inputs;
  }

  public using<V>(converter: NaryConverterFunction<V> | NaryTypeConverter<V>): NaryStepMapping<V>;
  public using<V>(converter: NaryTypeConverter<V>): NaryStepMapping<V>;
  public using<V>(converter: NaryConverterFunction<V> | NaryTypeConverter<V>) {
    if (converter instanceof NaryTypeConverter) {
      return new NaryStepMapping(this.inputs, converter);
    } else {
      return new NaryStepMapping(this.inputs, new NaryTypeConverter<V>(converter));
    }
  }
}
