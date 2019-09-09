import { Operator } from '../Operator';
import { Metadata } from './Metadata';

export class FunctionMetadata implements Metadata {
  readonly type: 'FUNCTION';
  readonly body: string;
  readonly readable: string;
  readonly operator?: Operator;

  constructor(body: string, readable?: string, operator?: Operator) {
    this.type = 'FUNCTION';
    this.operator = operator;
    this.body = body;
    this.readable = readable != undefined ? readable : body;
  }
}
