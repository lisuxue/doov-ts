import { Metadata, MetadataType } from 'Metadata';
import { Operator } from 'Operator';

export abstract class AbstractMetadata implements Metadata {
  abstract readonly type: MetadataType;
  readonly operator?: Operator;
  abstract readonly readable: string;

  protected constructor(operator?: Operator) {
    this.operator = operator;
  }
}
