import { MetadataType } from 'Metadata';
import { Operator } from 'Operator';
import { AbstractMetadata } from 'AbstractMetadata';

export class DefaultMetadata extends AbstractMetadata {
  readonly type: MetadataType;
  readonly readable: string;

  public constructor(readable: string, operator?: Operator) {
    super(operator);
    this.readable = readable;
    this.type = readable as MetadataType;
  }
}
