import { Metadata } from './meta/Metadata';

export interface ValueAccess {
  metadata: Metadata;
  value: unknown;
}

export interface Context {
  props: { [key: string]: string };
  readonly shortCircuit: boolean;
  getValues: ValueAccess[];
  setValues: ValueAccess[];

  addGetValue(metadata: Metadata, value: unknown): void;
  addSetValue(metadata: Metadata, value: unknown): void;
}
