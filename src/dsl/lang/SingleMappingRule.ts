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

  public execute<M extends object>(model: M, ctx?: Context): M {
    const context = ctx ? ctx : new DefaultContext();
    if (this.output.set) {
      return this.output.set(model, this.input.get(model, context), context) as M;
    } else {
      return model;
    }
  }
}
