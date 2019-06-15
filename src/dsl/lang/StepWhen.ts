import { StepCondition } from './StepCondition';
import { ValidationRule } from './ValidationRule';
import { MappingRule } from './MappingRule';
import { ConditionalMappingRule } from './ConditionalMappingRule';

/**
 * Interface for the when step that encapsulates the root condition of the syntax tree and the validation rule.
 */
export interface StepWhen {
  /**
   * Returns the root when node of this rule.
   *
   * @return the step when
   */
  stepCondition: () => StepCondition;

  /**
   * Returns a validation rule.
   *
   * @return the validation rule
   */
  validate: () => ValidationRule;

  /**
   * Return a conditional mapping rule containing all the given mapping rules. The conditional mapping rule will
   * execute when this validation rule is valid.
   *
   * @param mapRule mapping rules
   * @return the conditional mapping rule
   */
  then: (...mapRule: MappingRule[]) => ConditionalMappingRule;
}
