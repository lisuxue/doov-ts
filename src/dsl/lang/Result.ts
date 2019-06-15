import { ReduceType } from './ReduceType';
import { Context } from './Context';
import { Metadata } from '../meta/Metadata';

/**
 * Interface for the execution result after a call to {@link ValidationRule#executeOn(FieldModel)}.
 */
export interface Result {
  /**
   * Returns true if the predicate evaluates to true.
   *
   * @return true if true predicate
   */
  value: () => boolean;

  /**
   * Returns the predicate reduction. This will reduce the syntax tree using execution values to output the minimum
   * tree.
   *
   * @param type the type of reduction
   * @return the reduce metadata
   */
  reduce: (type: ReduceType) => Metadata;

  /**
   * Returns the failure cause of the failed predicate. This will reduce the syntax tree using execution values to
   * output the minimum failed tree.
   *
   * @return the failure cause, if failed
   */
  getFailureCause: () => string;

  /**
   * Returns the predicate reduction. This will reduce the syntax tree using execution values to output the minimum
   * tree.
   * @param type the type of reduction
   * @return the reduce
   */
  reduceMessage: (type: ReduceType) => string;

  /**
   * Returns the context that contains the execution values.
   *
   * @return the context
   */
  getContext: () => Context;
}
