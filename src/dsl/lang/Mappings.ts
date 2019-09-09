import { MappingRule } from './MappingRule';
import { Context } from '../Context';
import { MultipleMappingsMetadata } from '../meta/MultipleMappingsMetadata';

export class Mappings implements MappingRule {
  readonly metadata: MultipleMappingsMetadata;
  readonly mappings: MappingRule[];

  constructor(...mappings: (Mappings | MappingRule)[]) {
    this.mappings = mappings.flatMap(value => (value instanceof Mappings ? value.mappings : [value]));
    this.metadata = new MultipleMappingsMetadata(this.mappings.map(value => value.metadata));
  }

  execute<M extends object>(model: M, ctx?: Context): M {
    return this.mappings.reduce((mdl, mapping) => mapping.execute(mdl, ctx), model);
  }
}
