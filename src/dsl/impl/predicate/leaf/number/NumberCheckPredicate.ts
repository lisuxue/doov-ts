import { ValuePredicate } from '../ValuePredicate';
import { PredicateBuilder } from '../../builder/PredicateBuilder';
import { Predicate } from '../../../../Predicate';

export class NumberCheckPredicate extends ValuePredicate<number> {
  constructor(parent: PredicateBuilder<number>, test: Predicate<number>) {
    super(parent, test);
  }
}
