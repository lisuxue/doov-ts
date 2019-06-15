import { PredicateBuilder } from '../PredicateBuilder';
import { FieldModel } from 'FieldModel';
import { Context } from '../../../../lang/Context';
import { Predicate } from '../../../../Predicate';

export class ReversedPredicateBuilder implements PredicateBuilder<any> {
  parent: PredicateBuilder<any>;

  constructor(parent: PredicateBuilder<any>) {
    this.parent = parent;
  }

  build(predicate: Predicate<any>) {
    return (model: FieldModel, context: Context) => !this.parent.build(predicate)(model, context);
  }
}
