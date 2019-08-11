import { Metadata } from 'dsl/meta/Metadata';
import { WHEN } from 'dsl/lang/DefaultOperators';
import { Operator } from 'dsl/Operator';

export class WhenMetadata implements Metadata {
  readonly type = 'WHEN';
  readonly metadata: Metadata;
  readonly operator: Operator;

  public constructor(metadata: Metadata) {
    this.metadata = metadata;
    this.operator = WHEN;
  }

  get readable(): string {
    return this.operator.readable + ' ' + this.metadata.readable;
  }

  children(): Metadata[] {
    return [this.metadata];
  }
}
