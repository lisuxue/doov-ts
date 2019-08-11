import { Metadata, MetadataType } from 'dsl/meta/Metadata';
import { Operator } from 'dsl/Operator';

export abstract class AbstractMetadata implements Metadata {
  abstract readonly type: MetadataType;
  readonly operator?: Operator;
  abstract readonly readable: string;

  protected constructor(operator?: Operator) {
    this.operator = operator;
  }
}
