import { StepWhen } from './StepWhen';
import { Result } from './Result';
import { Context } from './Context';
import { FieldModel } from 'FieldModel';

/**
 * Interface for the validation rule that encapsulates the validation algorithm and data.
 * <p>
 * This class should be used when keeping references to specific rules.
 */
export interface ValidationRule {
  /**
   * Returns the root when node of this rule.
   *
   * @return the step when
   */
  getStepWhen: () => StepWhen;

  /**
   * Returns a validation rule with the given short circuit.
   *
   * @param shortCircuit the short circuit
   * @return the validation rule
   */
  withShortCircuit: (shortCircuit: boolean) => StepWhen;

  /**
   * Executes the validation rule on a null model.
   *
   * @return the result
   */
  execute: () => Result;

  /**
   * Executes the validation rule on the given model.
   *
   * @param model the model
   * @return the result
   */
  executeOn: (model: FieldModel) => Result;

  /**
   * Executes the validation rule on the given model.
   *
   * @param model the model
   * @param context custom context
   * @return the result
   */
  executeOnWithContext: (model: FieldModel, context: Context) => Result;
}
