import { AbstractMetadata } from './AbstractMetadata';
import { Metadata } from './Metadata';
import { Operator } from '../Operator';

export class NaryMetadata extends AbstractMetadata {
  readonly type = 'NARY';
  readonly values: Metadata[];

  public constructor(values: Metadata[], operator: Operator) {
    super(operator);
    this.values = values;
  }

  get readable(): string {
    return this.values.map(m => m.readable).join(',');
  }

  children(): Metadata[] {
    return this.values;
  }
}
