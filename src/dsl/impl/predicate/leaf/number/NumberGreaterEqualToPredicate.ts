import { ValuePredicate } from '../ValuePredicate';
import { PredicateBuilder } from '../../builder/PredicateBuilder';

export class NumberGreaterEqualToPredicate extends ValuePredicate<number> {
  constructor(parent: PredicateBuilder<number>, value: number) {
    super(parent, currentValue => currentValue >= value);
  }
}
