import { Context } from 'Context';

export class Result {
  value: boolean | null;
  context: Context;

  constructor(value: boolean | null, context: Context) {
    this.value = value;
    this.context = context;
  }
}
