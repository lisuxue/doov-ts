import { Metadata } from 'Metadata';

export interface ValueAccess {
  metadata: Metadata;
  value: any;
}

export interface Context {
  props: { [key: string]: string };
  readonly shortCircuit: boolean;
  getValues: ValueAccess[];
  setValues: ValueAccess[];

  addGetValue(metadata: Metadata, value: any): void;
  addSetValue(metadata: Metadata, value: any): void;
}
