import { Predicate } from '../../../Predicate';
import { ModelPredicate } from '../../../ModelPredicate';

export interface PredicateBuilder<T extends any> {
  build: (predicate: Predicate<T>) => ModelPredicate;
}
