import { AbstractMetadata } from 'dsl/meta/AbstractMetadata';
import { Operator } from 'dsl/Operator';
import { Metadata } from 'dsl/meta/Metadata';

export class BinaryMetadata extends AbstractMetadata {
  readonly type = 'BINARY';
  readonly left: Metadata;
  readonly right: Metadata;

  public constructor(left: Metadata, operator: Operator, right: Metadata) {
    super(operator);
    this.left = left;
    this.right = right;
  }

  get readable(): string {
    return this.left.readable + ' ' + this.operator!.readable + ' ' + this.right.readable;
  }

  children(): Metadata[] {
    return [this.left, this.right];
  }
}
