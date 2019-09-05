import { Function } from 'dsl/lang/Function';
import { SingleMappingRule } from 'dsl/lang/SingleMappingRule';
import { TypeConverter } from 'dsl/lang/TypeConverter';
import { StepMapping } from 'dsl/lang/StepMapping';

export class StepMap<T> {
  private readonly input: Function<T>;
  constructor(input: Function<T>) {
    this.input = input;
  }

  public to(output: Function<T>) {
    return new SingleMappingRule(this.input, output);
  }

  public using<U>(converter: TypeConverter<T, U>): StepMapping<T, U> {
    return new StepMapping(this.input, converter);
  }
}
