import { AbstractMetadata } from 'AbstractMetadata';
import { SingleMappingMetadata } from 'SingleMappingMetadata';
import { Metadata } from 'Metadata';
import { Operator } from 'Operator';

export class MultipleMappingsMetadata extends AbstractMetadata {
  readonly type = 'MULTIPLE_MAPPING';
  readonly mappings: SingleMappingMetadata[];

  constructor(operator: Operator, mappings: SingleMappingMetadata[]) {
    super(operator);
    this.mappings = mappings;
  }

  get readable(): string {
    return this.mappings.map(m => m.readable).join(',');
  }

  children(): Metadata[] {
    return this.mappings;
  }
}
