import { AbstractMetadata } from 'AbstractMetadata';
import { Operator } from 'Operator';
import { Metadata } from 'Metadata';

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
