import { Metadata } from './Metadata';
import { Operator } from './Operator';

export class DefaultMetadata implements Metadata {
  _readable: string;
  _operator?: Operator;

  public constructor(readable: string, operator?: Operator) {
    this._readable = readable;
    this._operator = operator;
  }

  children(): Metadata[] {
    return [];
  }

  left(): Metadata[] {
    return [];
  }

  operator(): Operator | undefined {
    return this._operator;
  }

  readable(): string {
    return this._readable;
  }

  right(): Metadata[] {
    return [];
  }
}
