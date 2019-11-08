import { BooleanFunction } from './BooleanFunction';
import { ValidationRule } from './ValidationRule';
import { DslBuilder } from '../DslBuilder';
import { MappingRule } from './MappingRule';
import { ConditionalMapping } from './ConditionalMapping';
import { WhenMetadata } from '../meta/WhenMetadata';
import { SingleValidationRule } from './SingleValidationRule';

export class StepWhen implements DslBuilder {
  readonly condition: BooleanFunction;
  readonly metadata: WhenMetadata;

  public constructor(condition: BooleanFunction) {
    this.condition = condition;
    this.metadata = new WhenMetadata(condition.metadata);
  }

  public validate(): ValidationRule {
    return new SingleValidationRule(this);
  }

  public then(...mappings: MappingRule[]): ConditionalMapping {
    return new ConditionalMapping(this.condition, ...mappings);
  }
}
