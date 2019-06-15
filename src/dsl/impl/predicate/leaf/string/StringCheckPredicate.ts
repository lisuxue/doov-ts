import { ValuePredicate } from '../ValuePredicate';
import { PredicateBuilder } from '../../builder/PredicateBuilder';
import { Predicate } from '../../../../Predicate';

export class StringCheckPredicate extends ValuePredicate<string> {
  constructor(parent: PredicateBuilder<string>, test: Predicate<string>) {
    super(parent, test);
  }
}
