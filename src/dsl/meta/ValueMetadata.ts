import { AbstractMetadata } from './AbstractMetadata';

export class ValueMetadata extends AbstractMetadata {
  readonly type = 'VALUE';
  readonly value: unknown | null;
  readonly readable: string;

  public constructor(value: unknown | null) {
    super();
    this.readable = String(value);
    this.value = value;
  }
}
