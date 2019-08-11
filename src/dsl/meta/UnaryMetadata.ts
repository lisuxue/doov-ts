import { Metadata } from 'dsl/meta/Metadata';
import { Operator } from 'dsl/Operator';
import { AbstractMetadata } from 'dsl/meta/AbstractMetadata';

export class UnaryMetadata extends AbstractMetadata {
  readonly type = 'UNARY';
  readonly operator: Operator;
  readonly metadata: Metadata;

  public constructor(metadata: Metadata, operator: Operator) {
    super();
    this.metadata = metadata;
    this.operator = operator;
  }

  get readable(): string {
    return this.metadata.readable + ' ' + this.operator.readable;
  }

  children(): Metadata[] {
    return [this.metadata];
  }
}
