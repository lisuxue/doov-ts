import { Context } from './Context';

export class DefaultContext implements Context {
  [key: string]: string;
}
