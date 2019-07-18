import { StepWhen } from 'StepWhen';
import { Context } from 'Context';
import { Result } from 'Result';
import { DefaultContext } from 'DefaultContext';
import { DslBuilder } from 'DslBuilder';
import { ValidationRuleMetadata } from 'ValidationRuleMetadata';

export class ValidationRule implements DslBuilder {
  readonly when: StepWhen;
  readonly metadata: ValidationRuleMetadata;

  constructor(when: StepWhen) {
    this.when = when;
    this.metadata = new ValidationRuleMetadata(when.metadata);
  }

  execute(model: object = {}, ctx?: Context): Result {
    const context = ctx ? ctx : new DefaultContext();
    return new Result(this.when.condition.get(model, context), context);
  }
}
