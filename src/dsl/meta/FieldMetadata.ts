import { pathString } from '../../Paths';
import { AbstractMetadata } from './AbstractMetadata';
import { isInteger } from '../../Utils';

export class FieldMetadata extends AbstractMetadata {
  readonly type = 'FIELD';
  readonly path: (string | number)[];
  readonly readable: string;
  readonly tags: string[];
  readonly position: number;
  readonly siblings: (string | number)[][];

  public constructor(
    path: (string | number)[],
    tags: string[] = [],
    position: number = -1,
    siblings: (string | number)[][] = []
  ) {
    super();
    this.readable = pathString(...path);
    this.path = [...path];
    this.tags = tags;
    const numbers = path.filter(value => isInteger(value)) as number[];
    this.position = position === -1 && numbers.length >= 1 ? numbers[numbers.length - 1] : position;
    this.siblings = [...siblings];
  }
}
