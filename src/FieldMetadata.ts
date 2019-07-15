import { Metadata } from 'Metadata';
import { Operator } from 'Operator';
import { pathString } from './path';

export class FieldMetadata implements Metadata {
  private readonly path: string;

  constructor(path: (string | number)[]) {
    this.path = pathString(...path);
  }

  children(): Metadata[] {
    return [];
  }

  left(): Metadata[] {
    return [];
  }

  operator(): Operator | undefined {
    return undefined;
  }

  readable(): string {
    return this.path;
  }

  right(): Metadata[] {
    return [];
  }
}
