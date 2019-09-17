import { BooleanFunction } from './BooleanFunction';
import { Metadata } from '../meta/Metadata';
import { Context } from '../Context';
import { MappingRule } from './MappingRule';
import { ConditionalMappingMetadata } from '../meta/ConditionalMappingMetadata';
import { WhenMetadata } from '../meta/WhenMetadata';
import { MultipleMappingsMetadata } from '../meta/MultipleMappingsMetadata';
import { ELSE, THEN } from './DefaultOperators';
import { DefaultContext } from '../DefaultContext';

export class ConditionalMapping implements MappingRule {
  condition: BooleanFunction;
  metadata: ConditionalMappingMetadata;
  mappings: MappingRule[];
  elseMappings?: MappingRule[];

  constructor(condition: BooleanFunction, ...mappings: MappingRule[]) {
    this.condition = condition;
    this.mappings = mappings;
    const map: Metadata[] = mappings.map(m => m.metadata);
    this.metadata = new ConditionalMappingMetadata(
      new WhenMetadata(condition.metadata),
      new MultipleMappingsMetadata(map, THEN)
    );
  }

  execute<M extends object>(input: M, ctx?: Context): M {
    const context = ctx ? ctx : new DefaultContext();
    if (this.condition.get(input, ctx)) {
      return this.mappings.reduce((mdl, mapping) => mapping.execute(mdl, context), input);
    } else if (this.elseMappings) {
      return this.elseMappings.reduce((mdl, mapping) => mapping.execute(mdl, context), input);
    } else {
      return input;
    }
  }

  executeOn<M extends object, O extends object>(input: M, output: O, ctx?: Context): O {
    const context = ctx ? ctx : new DefaultContext();
    if (this.condition.get(input, ctx)) {
      this.mappings.forEach(m => {
        output = m.executeOn(input, output, context);
      });
      return output;
    } else if (this.elseMappings) {
      this.elseMappings.forEach(m => {
        output = m.executeOn(input, output, context);
      });
      return output;
    } else {
      return output;
    }
  }

  otherwise(...mappings: MappingRule[]): this {
    this.elseMappings = mappings;
    const map: Metadata[] = mappings.map(m => m.metadata);
    this.metadata = new ConditionalMappingMetadata(
      this.metadata.whenMetadata,
      this.metadata.thenMetadata,
      new MultipleMappingsMetadata(map, ELSE)
    );
    return this;
  }
}
