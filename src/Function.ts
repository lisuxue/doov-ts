import { ContextAccessor } from './ContextAccessor';
import { Context } from './Context';
import { Metadata } from './Metadata';
import { Getter } from './Getter';
import { Setter } from './Setter';
import { DslBuilder } from './DslBuilder';
import { BooleanFunction } from './BooleanFunction';
import { DefaultMetadata } from './DefaultMetadata';

export type FunctionConstructor<U, F extends Function<U>> = new (
  metadata: Metadata,
  getter: Getter<object, Context, U | null>,
  setter?: Setter<object, Context, U | null>
) => F;

export class Function<T> implements ContextAccessor<object, Context, T>, DslBuilder {
  get: Getter<object, Context, T | null>;
  set?: Setter<object, Context, T | null>;
  metadata: Metadata;

  public constructor(
    metadata: Metadata,
    getter: Getter<object, Context, T | null>,
    setter?: Setter<object, Context, T | null>
  ) {
    this.metadata = metadata;
    this.get = getter;
    this.set = setter;
  }

  public static function<T>(accessor: ContextAccessor<object, Context, T>): Function<T> {
    return new Function(accessor.metadata, accessor.get, accessor.set);
  }

  public static contextual<U>(metadata: Metadata, getter: Getter<object, Context, U | null>): Function<U> {
    return new Function(metadata, getter);
  }

  public static consumer<U>(metadata: Metadata, setter: Setter<object, Context, U | null>): Function<U> {
    return new Function(metadata, () => null, setter);
  }

  public static lift<U, F extends Function<U>>(constructor: FunctionConstructor<U, F>, value: U | Function<U>): F {
    if (value instanceof Function) {
      return new constructor(new DefaultMetadata(String(value)), value.get);
    } else {
      return new constructor(new DefaultMetadata(String(value)), () => value);
    }
  }

  public mapTo<U, F extends Function<U>>(constructor: FunctionConstructor<U, F>, f: { (v: T | null): U }): F {
    return new constructor(this.metadata, (obj, ctx) => f(this.get(obj, ctx)));
  }

  public isNull(): BooleanFunction {
    return new BooleanFunction(this.metadata, (obj, ctx) => this.get(obj, ctx) === null);
  }

  public isNotNull(): BooleanFunction {
    return new BooleanFunction(this.metadata, (obj, ctx) => this.get(obj, ctx) !== null);
  }

  public eq(value: T | Function<T>): BooleanFunction {
    if (value instanceof Function) {
      return new BooleanFunction(this.metadata, (obj, ctx) => this.get(obj, ctx) === value.get(obj, ctx));
    } else {
      return new BooleanFunction(this.metadata, (obj, ctx) => this.get(obj, ctx) === value);
    }
  }

  public notEq(value: T | Function<T>): BooleanFunction {
    if (value instanceof Function) {
      return new BooleanFunction(this.metadata, (obj, ctx) => this.get(obj, ctx) !== value.get(obj, ctx));
    } else {
      return new BooleanFunction(this.metadata, (obj, ctx) => this.get(obj, ctx) !== value);
    }
  }

  public matchAll(...values: (T | Function<T>)[]): BooleanFunction {
    return new BooleanFunction(this.metadata, (obj, ctx) => {
      return values.every(value => {
        if (value instanceof Function) {
          return this.get(obj, ctx) === value.get(obj, ctx);
        } else {
          return this.get(obj, ctx) === value;
        }
      });
    });
  }

  public noneMatch(...values: (T | Function<T>)[]): BooleanFunction {
    return new BooleanFunction(this.metadata, (obj, ctx) => {
      return values.every(value => {
        if (value instanceof Function) {
          return this.get(obj, ctx) !== value.get(obj, ctx);
        } else {
          return this.get(obj, ctx) !== value;
        }
      });
    });
  }

  public matchAny(...values: (T | Function<T>)[]): BooleanFunction {
    return new BooleanFunction(this.metadata, (obj, ctx) => {
      return values.some(value => {
        if (value instanceof Function) {
          return this.get(obj, ctx) === value.get(obj, ctx);
        } else {
          return this.get(obj, ctx) === value;
        }
      });
    });
  }
}

export function condition<T, F extends Function<T>, V>(
  left: F,
  right: T,
  predicate: { (left: T, right: T): V },
  nullCase: V
): Getter<object, Context, V>;
export function condition<T, F extends Function<T>, V>(
  left: F,
  right: F,
  predicate: { (left: T, right: T): V },
  nullCase: V
): Getter<object, Context, V>;
export function condition<T, F extends Function<T>, V>(
  left: F,
  right: T | F,
  predicate: { (left: T, right: T): V },
  nullCase: V
): Getter<object, Context, V> {
  if (right instanceof Function) {
    return (obj, ctx) => {
      const v = left.get(obj, ctx);
      if (v != null) {
        const searchString = right.get(obj, ctx);
        if (searchString != null) {
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
      if (v != null) {
        return predicate(v, right);
      } else {
        return nullCase;
      }
    };
  }
}
