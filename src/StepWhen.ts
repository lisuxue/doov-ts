import { BooleanFunction } from 'BooleanFunction';
import { ValidationRule } from 'ValidationRule';
import { DslBuilder } from 'DslBuilder';
import { Metadata } from 'Metadata';
import { DefaultMetadata } from 'DefaultMetadata';
import { MappingRule } from 'MappingRule';
import { ConditionalMapping } from 'ConditionalMapping';

export class StepWhen implements DslBuilder {
  condition: BooleanFunction;
  metadata: Metadata;

  public constructor(condition: BooleanFunction) {
    this.condition = condition;
    this.metadata = new DefaultMetadata('when');
  }

  public validate(): ValidationRule {
    return new ValidationRule(this);
  }

  public then(...mappings: MappingRule[]): ConditionalMapping {
    return new ConditionalMapping(this.condition, ...mappings);
  }
}
