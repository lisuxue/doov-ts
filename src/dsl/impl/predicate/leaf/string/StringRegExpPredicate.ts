import { ValuePredicate } from '../ValuePredicate';
import { PredicateBuilder } from '../../builder/PredicateBuilder';

export class StringRegExpPredicate extends ValuePredicate<string> {
  constructor(parent: PredicateBuilder<string>, regExp: RegExp) {
    super(parent, currentValue => regExp.test(currentValue));
  }
}
