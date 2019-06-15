import { NumberEqualToPredicate } from '../../leaf/number/NumberEqualToPredicate';
import { NumberCheckPredicate } from '../../leaf/number/NumberCheckPredicate';
import { NumberLowerThanPredicate } from '../../leaf/number/NumberLowerThanPredicate';
import { NumberLowerEqualToPredicate } from '../../leaf/number/NumberLowerEqualToPredicate';
import { NumberGreaterThanPredicate } from '../../leaf/number/NumberGreaterThanPredicate';
import { NumberGreaterEqualToPredicate } from '../../leaf/number/NumberGreaterEqualToPredicate';
import { NumberBetweenPredicate } from '../../leaf/number/NumberBetweenPredicate';
import { PredicateBuilder } from '../../builder/PredicateBuilder';
import { Predicate } from '../../../../Predicate';

export class NumberPredicateBuilder implements PredicateBuilder<number> {
  parent: PredicateBuilder<any>;

  constructor(parent: PredicateBuilder<any>) {
    this.parent = parent;
  }

  equalTo(value: number) {
    return new NumberEqualToPredicate(this, value);
  }

  checking(predicate: (value: number) => boolean) {
    return new NumberCheckPredicate(this, predicate);
  }

  lowerThan(value: number) {
    return new NumberLowerThanPredicate(this, value);
  }

  lowerOrEqualTo(value: number) {
    return new NumberLowerEqualToPredicate(this, value);
  }

  greaterThan(value: number) {
    return new NumberGreaterThanPredicate(this, value);
  }

  greaterOrEqualTo(value: number) {
    return new NumberGreaterEqualToPredicate(this, value);
  }

  between(min: number, max: number) {
    return new NumberBetweenPredicate(this, min, max);
  }

  build(predicate: Predicate<number>) {
    return this.parent.build(value => predicate(value as number));
  }
}
