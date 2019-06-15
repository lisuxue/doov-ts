import { ValuePredicate } from '../ValuePredicate';
import { PredicateBuilder } from '../../builder/PredicateBuilder';

export class ValueDefinedPredicate extends ValuePredicate<any> {
  constructor(parent: PredicateBuilder<any>) {
    super(parent, (value: any) => value !== undefined && value !== null);
  }
}
