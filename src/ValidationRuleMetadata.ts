import { AbstractMetadata } from 'AbstractMetadata';
import { WhenMetadata } from 'WhenMetadata';
import { VALIDATE } from 'DefaultOperators';
import { Metadata } from 'Metadata';

export class ValidationRuleMetadata extends AbstractMetadata {
  readonly type = 'VALIDATION';
  readonly when: WhenMetadata;

  constructor(when: WhenMetadata) {
    super(VALIDATE);
    this.when = when;
  }

  get readable(): string {
    return this.operator!.readable + ' ' + this.when.readable;
  }

  children(): Metadata[] {
    return [this.when];
  }
}
