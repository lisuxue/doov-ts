import { Readable } from './Readable';
import { Operator } from './Operator';

export interface Metadata extends Readable {
  operator(): Operator | undefined;
  readable(): string;
  left(): Metadata[];
  right(): Metadata[];
  children(): Metadata[];
}
