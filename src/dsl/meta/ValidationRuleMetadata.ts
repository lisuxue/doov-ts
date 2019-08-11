import { AbstractMetadata } from 'dsl/meta/AbstractMetadata';
import { WhenMetadata } from 'dsl/meta/WhenMetadata';
import { VALIDATE } from 'dsl/lang/DefaultOperators';
import { Metadata } from 'dsl/meta/Metadata';

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
