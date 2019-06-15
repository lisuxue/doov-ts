import { ValidationRule } from './ValidationRule';
import { MappingRule } from './MappingRule';

/**
 * Conditional mapping rule
 * The conditional mapping rule will execute when this validation rule is valid.
 */
export interface ConditionalMappingRule {
  /**
   * Validation rule
   *
   * @return validation rule
   */
  validation: () => ValidationRule;

  /**
   * Adds rules to execute when the validation rule is invalid
   *
   * @param mappingRule mapping rules
   * @return itself
   */
  otherwise: (...mappingRule: MappingRule[]) => ConditionalMappingRule;
}
