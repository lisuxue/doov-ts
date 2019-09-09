import { ContextAccessor } from '../ContextAccessor';
import { Context } from '../Context';
import { Metadata } from '../meta/Metadata';
import { Getter, interceptGetter } from '../../Getter';
import { interceptSetter, Setter } from '../../Setter';
import { DslBuilder } from '../DslBuilder';
import { BooleanFunction } from './BooleanFunction';
import { FunctionMetadata } from '../meta/FunctionMetadata';
import { BinaryMetadata } from '../meta/BinaryMetadata';
import {
  EQ,
  FUNCTION,
  HAS_VALUE,
  IS_DEFINED,
  IS_NOT_NULL,
  IS_NULL,
  IS_UNDEFINED,
  MATCH_ALL,
  MATCH_ANY,
  NONE_MATCH,
  NOT_EQ,
} from './DefaultOperators';
import { UnaryMetadata } from '../meta/UnaryMetadata';
import { ValueMetadata } from '../meta/ValueMetadata';
import { IterableMetadata } from '../meta/IterableMetadata';

export type FunctionConstructor<U, F extends Function<U>> = new (
  metadata: Metadata,
  getter: Getter<object, Context, U | null | undefined>,
  setter?: Setter<object, Context, U | null | undefined>
) => F;

export class Function<T> implements ContextAccessor<object, Context, T>, DslBuilder {
  get: Getter<object, Context, T | null | undefined>;
  set?: Setter<object, Context, T | null | undefined>;
  readonly metadata: Metadata;

  public constructor(
    metadata: Metadata,
    getter: Getter<object, Context, T | null | undefined>,
    setter?: Setter<object, Context, T | null | undefined>
  ) {
    this.metadata = metadata;
    this.get = interceptGetter(metadata, getter);
    this.set = setter ? interceptSetter(metadata, setter) : undefined;
  }

  public static function<T>(accessor: ContextAccessor<object, Context, T>): Function<T> {
    return new Function(accessor.metadata, accessor.get, accessor.set);
  }

  public static contextual<U>(metadata: Metadata, getter: Getter<object, Context, U | null>): Function<U> {
    return new Function(metadata, getter);
  }

  public static consumer<U>(metadata: Metadata, setter: Setter<object, Context, U | null | undefined>): Function<U> {
    return new Function(metadata, () => null, setter);
  }

  public static lift<U, F extends Function<U>>(constructor: FunctionConstructor<U, F>, value: U | null | undefined): F {
    return new constructor(new ValueMetadata(value), () => value);
  }

  public mapTo<U, F extends Function<U>>(
    constructor: FunctionConstructor<U, F>,
    f: { (v: T | null | undefined): U },
    description?: string
  ): F {
    return new constructor(
      new BinaryMetadata(this.metadata, FUNCTION, new FunctionMetadata(description ? description : f.toString())),
      (obj, ctx) => f(this.get(obj, ctx))
    );
  }

  public hasValue(): BooleanFunction {
    return new BooleanFunction(new UnaryMetadata(this.metadata, HAS_VALUE), (obj, ctx) => {
      const value = this.get(obj, ctx);
      return value !== undefined && value !== null;
    });
  }

  public isNullOrUndefined(): BooleanFunction {
    return this.isNull().or(this.isUndefined());
  }

  public isDefined(): BooleanFunction {
    return new BooleanFunction(new UnaryMetadata(this.metadata, IS_DEFINED), (obj, ctx) => {
      const value = this.get(obj, ctx);
      return value !== undefined;
    });
  }

  public isUndefined(): BooleanFunction {
    return new BooleanFunction(
      new UnaryMetadata(this.metadata, IS_UNDEFINED),
      (obj, ctx) => this.get(obj, ctx) === undefined
    );
  }

  public isNull(): BooleanFunction {
    return new BooleanFunction(new UnaryMetadata(this.metadata, IS_NULL), (obj, ctx) => this.get(obj, ctx) === null);
  }

  public isNotNull(): BooleanFunction {
    return new BooleanFunction(
      new UnaryMetadata(this.metadata, IS_NOT_NULL),
      (obj, ctx) => this.get(obj, ctx) !== null
    );
  }

  public eq(value: T | Function<T>): BooleanFunction {
    if (value instanceof Function) {
      return new BooleanFunction(
        new BinaryMetadata(this.metadata, EQ, value.metadata),
        (obj, ctx) => this.get(obj, ctx) === value.get(obj, ctx)
      );
    } else {
      return new BooleanFunction(
        new BinaryMetadata(this.metadata, EQ, new ValueMetadata(value)),
        (obj, ctx) => this.get(obj, ctx) === value
      );
    }
  }

  public notEq(value: T | Function<T>): BooleanFunction {
    if (value instanceof Function) {
      return new BooleanFunction(
        new BinaryMetadata(this.metadata, NOT_EQ, value.metadata),
        (obj, ctx) => this.get(obj, ctx) !== value.get(obj, ctx)
      );
    } else {
      return new BooleanFunction(
        new BinaryMetadata(this.metadata, NOT_EQ, new ValueMetadata(value)),
        (obj, ctx) => this.get(obj, ctx) !== value
      );
    }
  }

  public matchAll(...values: (T | Function<T>)[]): BooleanFunction {
    const metadata = values.map(value => (value instanceof Function ? value.metadata : new ValueMetadata(value)));
    return new BooleanFunction(
      new BinaryMetadata(this.metadata, MATCH_ALL, new IterableMetadata(metadata)),
      (obj, ctx) => {
        return values.every(value => {
          if (value instanceof Function) {
            return this.get(obj, ctx) === value.get(obj, ctx);
          } else {
            return this.get(obj, ctx) === value;
          }
        });
      }
    );
  }

  public noneMatch(...values: (T | Function<T>)[]): BooleanFunction {
    const metadata = values.map(value => (value instanceof Function ? value.metadata : new ValueMetadata(value)));
    return new BooleanFunction(
      new BinaryMetadata(this.metadata, NONE_MATCH, new IterableMetadata(metadata)),
      (obj, ctx) => {
        return values.every(value => {
          if (value instanceof Function) {
            return this.get(obj, ctx) !== value.get(obj, ctx);
          } else {
            return this.get(obj, ctx) !== value;
          }
        });
      }
    );
  }

  public matchAny(...values: (T | Function<T>)[]): BooleanFunction {
    const metadata = values.map(value => (value instanceof Function ? value.metadata : new ValueMetadata(value)));
    return new BooleanFunction(
      new BinaryMetadata(this.metadata, MATCH_ANY, new IterableMetadata(metadata)),
      (obj, ctx) => {
        return values.some(value => {
          if (value instanceof Function) {
            return this.get(obj, ctx) === value.get(obj, ctx);
          } else {
            return this.get(obj, ctx) === value;
          }
        });
      }
    );
  }
}

export function condition<T, U, E extends Function<T>, F extends Function<U>, V>(
  left: E,
  right: U,
  predicate: { (left: T, right: U): V },
  nullCase: V
): Getter<object, Context, V>;
export function condition<T, U, E extends Function<T>, F extends Function<U>, V>(
  left: E,
  right: F,
  predicate: { (left: T, right: U): V },
  nullCase: V
): Getter<object, Context, V>;
export function condition<T, U, E extends Function<T>, F extends Function<U>, V>(
  left: E,
  right: U | F,
  predicate: { (left: T, right: U): V },
  nullCase: V
): Getter<object, Context, V> {
  if (right instanceof Function) {
    return (obj, ctx) => {
      const v = left.get(obj, ctx);
      if (v != undefined || v != null) {
        const searchString = right.get(obj, ctx);
        if (searchString != undefined || searchString != null) {
          return predicate(v, searchString);
        } else {
          return nullCase;
        }
      } else {
        return nullCase;
      }
    };
  } else {
    return (obj, ctx) => {
      const v = left.get(obj, ctx);
      if (v != undefined || v != null) {
        return predicate(v, right);
      } else {
        return nullCase;
      }
    };
  }
}
