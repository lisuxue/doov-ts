import { pathString } from 'Paths';
import { AbstractMetadata } from 'dsl/meta/AbstractMetadata';

export class FieldMetadata extends AbstractMetadata {
  readonly type = 'FIELD';
  readonly path: (string | number)[];
  readonly readable: string;

  public constructor(path: (string | number)[]) {
    super();
    this.readable = pathString(...path);
    this.path = [...path];
  }
}
