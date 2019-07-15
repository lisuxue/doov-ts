import { Readable } from 'Readable';

export interface Operator extends Readable {
  readable(): string;
}
