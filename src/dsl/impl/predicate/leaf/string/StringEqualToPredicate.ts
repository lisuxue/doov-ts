import { ValuePredicate } from '../ValuePredicate';
import { PredicateBuilder } from '../../builder/PredicateBuilder';

export class StringEqualToPredicate extends ValuePredicate<string> {
  constructor(parent: PredicateBuilder<string>, value: string) {
    super(parent, currentValue => currentValue === value);
  }
}
