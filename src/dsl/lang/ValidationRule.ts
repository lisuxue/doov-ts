import { StepWhen } from 'dsl/lang/StepWhen';
import { Context } from 'dsl/Context';
import { Result } from 'dsl/Result';
import { DefaultContext } from 'dsl/DefaultContext';
import { DslBuilder } from 'dsl/DslBuilder';
import { ValidationRuleMetadata } from 'dsl/meta/ValidationRuleMetadata';

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
