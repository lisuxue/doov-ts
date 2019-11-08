import { ValidationRule } from './ValidationRule';
import { Context } from '../Context';
import { DefaultContext } from '../DefaultContext';
import { Result } from '../Result';
import { MultipleValidationsMetadata } from '../meta/MultipleValidationsMetadata';

export class Validations implements ValidationRule {
  readonly metadata: MultipleValidationsMetadata;
  readonly validations: ValidationRule[];

  constructor(...validations: (Validations | ValidationRule)[]) {
    this.validations = validations.flatMap(value => (value instanceof Validations ? value.validations : [value]));
    this.metadata = new MultipleValidationsMetadata(this.validations.map(value => value.metadata));
  }

  execute<M extends object>(model: M, ctx?: Context): Result {
    const context = ctx ? ctx : new DefaultContext();
    return (
      this.validations.flatMap(rule => rule.execute(model, context)).find(result => !result.value) ||
      new Result(true, context)
    );
  }
}
