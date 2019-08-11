import { AbstractMetadata } from 'dsl/meta/AbstractMetadata';
import { Metadata } from 'dsl/meta/Metadata';
import { SINGLE_MAPPING, TO } from 'dsl/lang/DefaultOperators';

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
    return this.sourceMetadata.readable + ' ' + TO.readable + ' ' + this.targetMetadata.readable;
  }

  children(): Metadata[] {
    return [this.sourceMetadata, this.targetMetadata];
  }
}
