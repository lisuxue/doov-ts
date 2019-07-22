import { AbstractMetadata } from 'AbstractMetadata';
import { Metadata } from 'Metadata';
import { SINGLE_MAPPING } from 'DefaultOperators';

export class SingleMappingMetadata extends AbstractMetadata {
  readonly type = 'SINGLE_MAPPING';
  readonly sourceMetadata: Metadata;
  readonly targetMetadata: Metadata;

  constructor(source: Metadata, target: Metadata) {
    super(SINGLE_MAPPING);
    this.sourceMetadata = source;
    this.targetMetadata = target;
  }

  get readable(): string {
    return this.sourceMetadata.readable + ' ' + this.operator!.readable + ' ' + this.targetMetadata.readable;
  }

  children(): Metadata[] {
    return [this.sourceMetadata, this.targetMetadata];
  }
}
