import { PredicateBuilder } from '../../builder/PredicateBuilder';
import { ValuePredicate } from '../ValuePredicate';

export class StringContainPredicate extends ValuePredicate<string> {
  constructor(parent: PredicateBuilder<string>, value: string) {
    super(parent, currentValue => currentValue.includes(value));
  }
}
