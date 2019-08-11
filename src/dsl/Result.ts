import { Context } from 'dsl/Context';

export class Result {
  value: boolean | null | undefined;
  context: Context;

  constructor(value: boolean | null | undefined, context: Context) {
    this.value = value;
    this.context = context;
  }
}
