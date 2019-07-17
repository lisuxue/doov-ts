import { AbstractMetadata } from 'AbstractMetadata';
import { WhenMetadata } from 'WhenMetadata';
import { VALIDATE } from 'DefaultOperators';

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
}
