import { AbstractMetadata } from 'dsl/meta/AbstractMetadata';
import { MultipleMappingsMetadata } from 'dsl/meta/MultipleMappingsMetadata';
import { WhenMetadata } from 'dsl/meta/WhenMetadata';
import { Metadata } from 'dsl/meta/Metadata';
import { ELSE, THEN } from 'dsl/lang/DefaultOperators';

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
