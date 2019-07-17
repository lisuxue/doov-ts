import { AbstractMetadata } from 'AbstractMetadata';
import { MultipleMappingsMetadata } from 'MultipleMappingsMetadata';
import { WhenMetadata } from 'WhenMetadata';
import { Metadata } from 'Metadata';

export class ConditionalMappingMetadata extends AbstractMetadata {
  readonly type = 'CONDITIONAL_MAPPING';
  readonly readable: string;
  readonly whenMetadata: WhenMetadata;
  readonly thenMetadata: MultipleMappingsMetadata;
  readonly elseMetadata?: MultipleMappingsMetadata;

  constructor(
    whenMetadata: WhenMetadata,
    thenMetadata: MultipleMappingsMetadata,
    elseMetadata?: MultipleMappingsMetadata
  ) {
    super();
    this.whenMetadata = whenMetadata;
    this.thenMetadata = thenMetadata;
    this.elseMetadata = elseMetadata;
    this.readable =
      this.whenMetadata.readable +
      ' ' +
      this.thenMetadata.readable +
      ' ' +
      (this.elseMetadata != undefined ? this.elseMetadata.readable : '');
  }

  children(): Metadata[] {
    const children = [this.whenMetadata, this.thenMetadata];
    return this.elseMetadata != undefined ? children.concat(this.elseMetadata) : children;
  }
}
