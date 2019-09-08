import { AbstractMetadata } from './AbstractMetadata';
import { MultipleMappingsMetadata } from './MultipleMappingsMetadata';
import { WhenMetadata } from './WhenMetadata';
import { Metadata } from './Metadata';
import { ELSE, THEN } from '../lang/DefaultOperators';

export class ConditionalMappingMetadata extends AbstractMetadata {
  readonly type = 'CONDITIONAL_MAPPING';
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
  }

  children(): Metadata[] {
    const children = [this.whenMetadata, this.thenMetadata];
    return this.elseMetadata != undefined ? children.concat(this.elseMetadata) : children;
  }

  get readable(): string {
    return (
      this.whenMetadata.readable +
      ' ' +
      THEN.readable +
      ' ' +
      this.thenMetadata.readable +
      (this.elseMetadata != undefined ? ' ' + ELSE.readable + ' ' + this.elseMetadata.readable : '')
    );
  }
}
