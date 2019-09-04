import { pathString } from 'Paths';
import { AbstractMetadata } from 'dsl/meta/AbstractMetadata';

export class FieldMetadata extends AbstractMetadata {
  readonly type = 'FIELD';
  readonly path: (string | number)[];
  readonly readable: string;
  readonly tags: string[];
  readonly position: number;

  public constructor(path: (string | number)[], tags: string[] = [], position: number = -1) {
    super();
    this.readable = pathString(...path);
    this.path = [...path];
    this.tags = tags;
    this.position = position;
  }
}
