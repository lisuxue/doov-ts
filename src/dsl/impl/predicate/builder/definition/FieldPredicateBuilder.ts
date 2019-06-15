import { ValuePredicateBuilder } from '../value/ValuePredicateBuilder';
import { ReversedPredicateBuilder } from './ReversedPredicateBuilder';
import { PredicateBuilder } from '../../builder/PredicateBuilder';
import { FieldModel } from 'FieldModel';
import { FieldId } from 'FieldId';
import { Predicate } from 'dsl/Predicate';

export class FieldPredicateBuilder implements PredicateBuilder<any> {
  fieldId: FieldId;
  is: ValuePredicateBuilder;
  isNot: ValuePredicateBuilder;

  constructor(fieldId: FieldId) {
    this.fieldId = fieldId;
    this.is = new ValuePredicateBuilder(this);
    this.isNot = new ValuePredicateBuilder(new ReversedPredicateBuilder(this));
  }

  build(predicate: Predicate<any>) {
    return (model: FieldModel) => predicate(model[this.fieldId]);
  }
}
