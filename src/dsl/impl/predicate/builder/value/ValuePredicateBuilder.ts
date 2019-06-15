import { StringPredicateBuilder } from './StringPredicateBuilder';
import { NumberPredicateBuilder } from './NumberPredicateBuilder';
import { ValueDefinedPredicate } from '../../leaf/value/ValueDefinedPredicate';
import { PredicateBuilder } from '../PredicateBuilder';

export class ValuePredicateBuilder {
  parent: PredicateBuilder<any>;
  aString: StringPredicateBuilder;
  aNumber: NumberPredicateBuilder;
  defined: ValueDefinedPredicate;

  constructor(parent: PredicateBuilder<any>) {
    this.parent = parent;
    this.aString = new StringPredicateBuilder(this.parent);
    this.aNumber = new NumberPredicateBuilder(this.parent);
    this.defined = new ValueDefinedPredicate(this.parent);
  }
}
