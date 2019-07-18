import { AbstractMetadata } from 'AbstractMetadata';
import { Metadata } from 'Metadata';

export class IterableMetadata extends AbstractMetadata {
  readonly type = 'ITERABLE';
  readonly values: Metadata[];

  public constructor(values: Metadata[]) {
    super();
    this.values = values;
  }

  get readable(): string {
    return '[' + this.values.map(m => m.readable).join(',') + ']';
  }

  children(): Metadata[] {
    return this.values;
  }
}
