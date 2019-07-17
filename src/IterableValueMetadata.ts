import { Metadata } from 'Metadata';
import { ValueMetadata } from 'ValueMetadata';
import { AbstractMetadata } from 'AbstractMetadata';

export class IterableValueMetadata extends AbstractMetadata {
  readonly type = 'ITERABLE_VALUE';
  readonly values: ValueMetadata[];

  public constructor(values: ValueMetadata[]) {
    super();
    this.values = values;
  }

  get readable(): string {
    return this.values.map(m => m.readable).join(',');
  }

  children(): Metadata[] {
    return this.values;
  }
}
