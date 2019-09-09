import { Function } from './Function';
import { NaryStepMapping } from './NaryStepMapping';
import { NaryConverterFunction, NaryTypeConverter } from './NaryTypeConverter';

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
