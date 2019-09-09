import { Function } from './Function';
import { SingleMappingRule } from './SingleMappingRule';
import { TypeConverter } from './TypeConverter';
import { StepMapping } from './StepMapping';

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
