import { Function } from './Function';
import { Context } from '../Context';
import { DefaultContext } from '../DefaultContext';
import { MappingRule } from './MappingRule';
import { SingleMappingMetadata } from '../meta/SingleMappingMetadata';

export class SingleMappingRule<T> implements MappingRule {
  private input: Function<T>;
  private output: Function<T>;
  readonly metadata: SingleMappingMetadata;

  constructor(input: Function<T>, output: Function<T>) {
    this.input = input;
    this.output = output;
    this.metadata = new SingleMappingMetadata(input.metadata, output.metadata);
  }

  public execute<M extends object>(input: M, ctx?: Context): M {
    const context = ctx ? ctx : new DefaultContext();
    if (this.output.set) {
      return this.output.set(input, this.input.get(input, context), context) as M;
    } else {
      return input;
    }
  }

  public executeOn<M extends object, O extends object>(input: M, output: O, ctx?: Context): O {
    const context = ctx ? ctx : new DefaultContext();
    if (this.output.set) {
      return this.output.set(output, this.input.get(input, context), context) as O;
    } else {
      return output;
    }
  }
}
