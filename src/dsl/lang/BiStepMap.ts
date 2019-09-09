import { Function } from './Function';
import { BiConverterFunction, BiTypeConverter } from './BiTypeConverter';
import { BiStepMapping } from './BiStepMapping';

export class BiStepMap<T, U> {
  private readonly input: Function<T>;
  private readonly input2: Function<U>;

  constructor(input: Function<T>, input2: Function<U>) {
    this.input = input;
    this.input2 = input2;
  }

  public using<V>(converter: BiConverterFunction<T, U, V> | BiTypeConverter<T, U, V>): BiStepMapping<T, U, V>;
  public using<V>(converter: BiTypeConverter<T, U, V>): BiStepMapping<T, U, V>;
  public using<V>(converter: BiConverterFunction<T, U, V> | BiTypeConverter<T, U, V>) {
    if (converter instanceof BiTypeConverter) {
      return new BiStepMapping(this.input, this.input2, converter);
    } else {
      return new BiStepMapping(this.input, this.input2, new BiTypeConverter<T, U, V>(converter));
    }
  }
}
