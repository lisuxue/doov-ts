import { Function } from 'dsl/lang/Function';
import { ConverterFunction, TypeConverter } from 'dsl/lang/TypeConverter';
import { BiStepMapping } from 'dsl/lang/BiStepMapping';

export class BiStepMap<T, U> {
  private readonly input: Function<T>;
  private readonly input2: Function<U>;

  constructor(input: Function<T>, input2: Function<U>) {
    this.input = input;
    this.input2 = input2;
  }

  public using<V>(converter: ConverterFunction<T, U, V> | TypeConverter<T, U, V>): BiStepMapping<T, U, V>;
  public using<V>(converter: TypeConverter<T, U, V>): BiStepMapping<T, U, V>;
  public using<V>(converter: ConverterFunction<T, U, V> | TypeConverter<T, U, V>) {
    if (converter instanceof TypeConverter) {
      return new BiStepMapping(this.input, this.input2, converter);
    } else {
      return new BiStepMapping(this.input, this.input2, new TypeConverter<T, U, V>(converter));
    }
  }
}
