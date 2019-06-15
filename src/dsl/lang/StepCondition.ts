import {ModelPredicate} from '../ModelPredicate';

/**
 * Interface for the condition which corresponds to a node in the syntax tree.
 * <p>
 * A condition is represented by a predicate {@link #predicate()} and a {@link #metadata()} describing the node.
 */
export interface StepCondition {
  /**
   * Returns the predicate for this node value.
   *
   * @return the predicate
   */
  predicate: () => ModelPredicate;

  /**
   * Returns a condition checking if the node predicate and the given condition predicate evaluate to true.
   *
   * @param condition the right side condition
   * @return the step condition
   */
  and: (condition: StepCondition) => StepCondition;

  /**
   * Returns a condition checking if the node predicate or the given condition predicate evaluate to true.
   *
   * @param condition the right side condition
   * @return the step condition
   */
  or: (condition: StepCondition) => StepCondition;

  /**
   * Returns a condition checking if the node predicate does not evaluate to true.
   *
   * @return the step condition
   */
  not: (condition: StepCondition) => StepCondition;
}
