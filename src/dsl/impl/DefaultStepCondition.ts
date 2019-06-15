import { StepCondition } from '../lang/StepCondition';
import { Metadata } from '../meta/Metadata';
import { ModelPredicate } from '../ModelPredicate';

export class DefaultStepCondition implements StepCondition {
  metadata: Metadata;
  predicate: ModelPredicate;

  constructor(metadata: Metadata, predicate: ModelPredicate) {
    this.metadata = metadata;
    this.predicate = predicate;
  }

  getPredicate() {
    return this.predicate;
  }
}
