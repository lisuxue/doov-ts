import { FieldPredicateBuilder } from './definition/FieldPredicateBuilder';
import { FieldId } from 'FieldId';
import { TruePredicate } from '../leaf/TruePredicate';
import { FalsePredicate } from '../leaf/FalsePredicate';

export class Predicates {
  static field(field: FieldId) {
    return new FieldPredicateBuilder(field);
  }

  static true = new TruePredicate();

  static false = new FalsePredicate();
}
