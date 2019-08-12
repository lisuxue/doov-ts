import { Metadata } from 'dsl/meta/Metadata';
import { Operator } from 'dsl/Operator';

export class TypeConverterMetadata implements Metadata {
  readonly type: 'TYPE_CONVERTER';
  readonly body: string;
  readonly readable: string;
  readonly operator?: Operator;

  constructor(body: string, readable?: string, operator?: Operator) {
    this.type = 'TYPE_CONVERTER';
    this.operator = operator;
    this.body = body;
    this.readable = readable != undefined ? readable : body;
  }
}
