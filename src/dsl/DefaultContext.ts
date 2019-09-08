import { Context, ValueAccess } from './Context';
import { Metadata } from './meta/Metadata';

export class DefaultContext implements Context {
  props: { [key: string]: string } = {};
  getValues: ValueAccess[] = [];
  setValues: ValueAccess[] = [];

  readonly shortCircuit: boolean;

  constructor(shortCircuit: boolean = true) {
    this.shortCircuit = shortCircuit;
  }

  addGetValue(metadata: Metadata, value: unknown) {
    this.getValues.push({ metadata, value });
  }

  addSetValue(metadata: Metadata, value: unknown) {
    this.setValues.push({ metadata, value });
  }
}
