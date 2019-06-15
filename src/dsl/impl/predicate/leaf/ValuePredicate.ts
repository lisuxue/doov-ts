import { StepCondition } from '../../../lang/StepCondition';
import { PredicateBuilder } from '../builder/PredicateBuilder';

export abstract class ValuePredicate<T> implements StepCondition {
  parent: PredicateBuilder<T>;
  valuePredicate: (value: T) => boolean;

  constructor(parent: PredicateBuilder<T>, valuePredicate: (value: T) => boolean) {
    this.parent = parent;
    this.valuePredicate = valuePredicate;
  }

  getPredicate() {
    return this.parent.build(this.valuePredicate);
  }
}
