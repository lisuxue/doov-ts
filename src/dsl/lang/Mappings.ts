import { MappingRule } from './MappingRule';
import { Context } from '../Context';
import { MultipleMappingsMetadata } from '../meta/MultipleMappingsMetadata';
import { DefaultContext } from '../DefaultContext';

export class Mappings implements MappingRule {
  readonly metadata: MultipleMappingsMetadata;
  readonly mappings: MappingRule[];

  constructor(...mappings: (Mappings | MappingRule)[]) {
    this.mappings = mappings.flatMap(value => (value instanceof Mappings ? value.mappings : [value]));
    this.metadata = new MultipleMappingsMetadata(this.mappings.map(value => value.metadata));
  }

  execute<M extends object>(input: M, ctx?: Context): M {
    const context = ctx ? ctx : new DefaultContext();
    return this.mappings.reduce((mdl, mapping) => mapping.execute(mdl, context), input);
  }

  executeOn<M extends object, O extends object>(input: M, output: O, ctx?: Context): O {
    const context = ctx ? ctx : new DefaultContext();
    this.mappings.forEach(m => {
      output = m.executeOn(input, output, context);
    });
    return output;
  }
}
