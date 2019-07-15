import { MappingRule } from 'MappingRule';
import { Metadata } from 'Metadata';
import { Context } from 'Context';
import { DefaultMetadata } from 'DefaultMetadata';

export class Mappings implements MappingRule {
  metadata: Metadata;
  mappings: MappingRule[];

  constructor(...mappings: MappingRule[]) {
    this.metadata = new DefaultMetadata('mappings');
    this.mappings = mappings;
  }

  execute<M extends object>(model: M, ctx?: Context): M {
    return this.mappings.reduce((mdl, mapping) => mapping.execute(mdl, ctx), model);
  }
}
