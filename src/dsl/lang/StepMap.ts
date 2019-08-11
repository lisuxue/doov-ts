import { Function } from 'dsl/lang/Function';
import { SingleMappingRule } from 'dsl/lang/SingleMappingRule';

export class StepMap<T> {
  private readonly input: Function<T>;
  constructor(input: Function<T>) {
    this.input = input;
  }

  public to(output: Function<T>) {
    return new SingleMappingRule(this.input, output);
  }
}
