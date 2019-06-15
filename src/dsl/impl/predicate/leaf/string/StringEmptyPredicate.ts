import { PredicateBuilder } from '../../builder/PredicateBuilder';
import { ValuePredicate } from '../ValuePredicate';

export class StringEmptyPredicate extends ValuePredicate<string> {
  constructor(parent: PredicateBuilder<string>) {
    super(parent, currentValue => currentValue.length === 0);
  }
}
