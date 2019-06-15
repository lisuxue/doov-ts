import { FieldModel } from 'FieldModel';
import { Context } from './Context';

/**
 * Mapping rule
 */
export interface MappingRule {
  /**
   * Verifies the mapping rule for given in/out models
   *
   * @param inModel in model
   * @param outModel out model
   * @return true if this rule can execute on the in/out models
   */
  validate: (inModel: FieldModel, outModel: FieldModel) => boolean;

  /**
   * Execute the mapping rule on in/out models
   *
   * @param inModel in model
   * @param outModel out model
   * @return context
   */
  executeOnIO: (inModel: FieldModel, outModel: FieldModel) => Context;

  /**
   * Execute the mapping rule on the same model
   *
   * @param model in and out model
   * @return context
   */
  executeOnI: (model: FieldModel) => Context;

  /**
   * Execute the mapping rule on in/out models with given context
   *
   * @param inModel in model
   * @param outModel out model
   * @param <C> context type
   * @param context context
   * @return context
   */
  executeOnIOC: <C extends Context>(inModel: FieldModel, outModel: FieldModel, context: C) => C;

  /**
   * Execute the mapping rule on the same model with given context
   *
   * @param model in and out model
   * @param <C> context type
   * @param context context
   * @return context
   */
  executeOnIC: <C extends Context>(inModel: FieldModel, context: C) => C;
}
