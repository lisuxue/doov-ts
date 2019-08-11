import { Context, ValueAccess } from 'dsl/Context';
import { Metadata } from 'dsl/meta/Metadata';

export class DefaultContext implements Context {
  props: { [key: string]: string } = {};
  getValues: ValueAccess[] = [];
  setValues: ValueAccess[] = [];

  readonly shortCircuit: boolean;

  constructor(shortCircuit: boolean = true) {
    this.shortCircuit = shortCircuit;
  }

  addGetValue(metadata: Metadata, value: any) {
    this.getValues.push({ metadata, value });
  }

  addSetValue(metadata: Metadata, value: any) {
    this.setValues.push({ metadata, value });
  }
}
