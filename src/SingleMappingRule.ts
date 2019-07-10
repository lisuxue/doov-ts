import { Function } from './Function';
import { Metadata } from './Metadata';
import { DefaultMetadata } from './DefaultMetadata';
import { Context } from './Context';
import { DefaultContext } from './DefaultContext';
import { MappingRule } from './MappingRule';

export class SingleMappingRule<T> implements MappingRule {
  private input: Function<T>;
  private output: Function<T>;
  metadata: Metadata;

  constructor(input: Function<T>, output: Function<T>) {
    this.input = input;
    this.output = output;
    this.metadata = new DefaultMetadata('mapping');
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
