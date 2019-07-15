import { BooleanFunction } from 'BooleanFunction';
import { Metadata } from 'Metadata';
import { DefaultMetadata } from 'DefaultMetadata';
import { Context } from 'Context';
import { MappingRule } from 'MappingRule';

export class ConditionalMapping implements MappingRule {
  condition: BooleanFunction;
  metadata: Metadata;
  mappings: MappingRule[];
  elseMappings?: MappingRule[];

  constructor(condition: BooleanFunction, ...mappings: MappingRule[]) {
    this.condition = condition;
    this.mappings = mappings;
    this.metadata = new DefaultMetadata('conditional');
  }

  execute<M extends object>(model: M, ctx?: Context): M {
    if (this.condition.get(model, ctx)) {
      return this.mappings.reduce((mdl, mapping) => mapping.execute(mdl, ctx), model);
    } else if (this.elseMappings) {
      return this.elseMappings.reduce((mdl, mapping) => mapping.execute(mdl, ctx), model);
    } else {
      return model;
    }
  }

  otherwise(...mappings: MappingRule[]): ConditionalMapping {
    this.elseMappings = mappings;
    return this;
  }
}
