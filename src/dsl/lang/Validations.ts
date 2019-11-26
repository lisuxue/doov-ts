import { ValidationRule } from './ValidationRule';
import { Context } from '../Context';
import { DefaultContext } from '../DefaultContext';
import { Result } from '../Result';
import { MultipleValidationsMetadata } from '../meta/MultipleValidationsMetadata';
import { flatMap } from '../../Utils';

export class Validations implements ValidationRule {
  readonly metadata: MultipleValidationsMetadata;
  readonly validations: ValidationRule[];

  constructor(...validations: (Validations | ValidationRule)[]) {
    this.validations = flatMap(validations);
    this.metadata = new MultipleValidationsMetadata(this.validations.map(value => value.metadata));
  }

  execute<M extends object>(model: M, ctx?: Context): Result {
    const context = ctx ? ctx : new DefaultContext();
    return (
      this.validations.map(rule => rule.execute(model, context)).find(result => result.value === true) ||
      new Result(false, context)
    );
  }
}
