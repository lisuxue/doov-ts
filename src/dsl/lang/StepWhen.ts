import { BooleanFunction } from 'dsl/lang/BooleanFunction';
import { ValidationRule } from 'dsl/lang/ValidationRule';
import { DslBuilder } from 'dsl/DslBuilder';
import { MappingRule } from 'dsl/lang/MappingRule';
import { ConditionalMapping } from 'dsl/lang/ConditionalMapping';
import { WhenMetadata } from 'dsl/meta/WhenMetadata';

export class StepWhen implements DslBuilder {
  readonly condition: BooleanFunction;
  readonly metadata: WhenMetadata;

  public constructor(condition: BooleanFunction) {
    this.condition = condition;
    this.metadata = new WhenMetadata(condition.metadata);
  }

  public validate(): ValidationRule {
    return new ValidationRule(this);
  }

  public then(...mappings: MappingRule[]): ConditionalMapping {
    return new ConditionalMapping(this.condition, ...mappings);
  }
}
