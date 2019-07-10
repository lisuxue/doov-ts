import { StepWhen } from './StepWhen';
import { Context } from './Context';
import { Result } from './Result';
import { DefaultContext } from './DefaultContext';
import { DslBuilder } from './DslBuilder';
import { Metadata } from './Metadata';
import { DefaultMetadata } from './DefaultMetadata';

export class ValidationRule implements DslBuilder {
  when: StepWhen;
  metadata: Metadata;

  constructor(when: StepWhen) {
    this.when = when;
    this.metadata = new DefaultMetadata('validate');
  }

  execute(model: object = {}, ctx?: Context): Result {
    const context = ctx ? ctx : new DefaultContext();
    return new Result(this.when.condition.get(model, context), context);
  }
}
