import { ValuePredicate } from '../ValuePredicate';
import { PredicateBuilder } from '../../builder/PredicateBuilder';

export class NumberBetweenPredicate extends ValuePredicate<number> {
  constructor(parent: PredicateBuilder<number>, min: number, max: number) {
    super(parent, currentValue => currentValue >= min && currentValue <= max);
  }
}
