import { AbstractMetadata } from 'AbstractMetadata';
import { Metadata } from 'Metadata';
import { Operator } from 'Operator';

export class MultipleMappingsMetadata extends AbstractMetadata {
  readonly type = 'MULTIPLE_MAPPING';
  readonly mappings: Metadata[];

  constructor(mappings: Metadata[], operator?: Operator) {
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
