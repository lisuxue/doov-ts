import { ValuePredicate } from '../ValuePredicate';
import { PredicateBuilder } from '../../builder/PredicateBuilder';

export class StringStartWithPredicate extends ValuePredicate<string> {
  constructor(parent: PredicateBuilder<string>, value: string) {
    super(parent, currentValue => currentValue.startsWith(value));
  }
}
