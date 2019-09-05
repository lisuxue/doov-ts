import { condition, Function } from 'dsl/lang/Function';
import { ContextAccessor } from 'dsl/ContextAccessor';
import { Context } from 'dsl/Context';
import { BooleanFunction } from 'dsl/lang/BooleanFunction';
import { BinaryMetadata } from 'dsl/meta/BinaryMetadata';
import { ValueMetadata } from 'dsl/meta/ValueMetadata';
import { CONTAINS, CONTAINS_ALL, HAS_NOT_SIZE, HAS_SIZE, IS_EMPTY, IS_NOT_EMPTY } from 'dsl/lang/DefaultOperators';
import { IterableMetadata } from 'dsl/meta/IterableMetadata';
import { UnaryMetadata } from 'dsl/meta/UnaryMetadata';
export class IterableFunction<T> extends Function<T[]> {
  public static iterable<T>(accessor: ContextAccessor<object, Context, T[]>): IterableFunction<T> {
    return new IterableFunction(accessor.metadata, accessor.get, accessor.set);
  }

  public contains(value: T | Function<T>): BooleanFunction {
    const predicate = (left: T[], right: T) => left.some(v => v === right);
    if (value instanceof Function) {
      return new BooleanFunction(
        new BinaryMetadata(this.metadata, CONTAINS, value.metadata),
        condition(this, value, predicate, false)
      );
    } else {
      return new BooleanFunction(
        new BinaryMetadata(this.metadata, CONTAINS, new ValueMetadata(value)),
        condition(this, value, predicate, false)
      );
    }
  }

  public containsAll(value: T[] | Function<T[]>): BooleanFunction {
    const predicate = (left: T[], right: T[]) => left.some(l => right.some(r => r === l));
    if (value instanceof Function) {
      return new BooleanFunction(
        new BinaryMetadata(this.metadata, CONTAINS_ALL, value.metadata),
        condition(this, value, predicate, false)
      );
    } else {
      return new BooleanFunction(
        new BinaryMetadata(this.metadata, CONTAINS_ALL, new IterableMetadata(value.map(v => new ValueMetadata(v)))),
        condition(this, value, predicate, false)
      );
    }
  }

  public isEmpty(): BooleanFunction {
    return new BooleanFunction(
      new UnaryMetadata(this.metadata, IS_EMPTY),
      condition(this, undefined, (left: T[]) => left.length === 0, null)
    );
  }

  public isNotEmpty(): BooleanFunction {
    return new BooleanFunction(
      new UnaryMetadata(this.metadata, IS_NOT_EMPTY),
      condition(this, undefined, (left: T[]) => left.length !== 0, null)
    );
  }

  public hasSize(value: number | Function<number>): BooleanFunction {
    const predicate = (left: T[], right: number) => left.length === right;
    if (value instanceof Function) {
      return new BooleanFunction(new UnaryMetadata(this.metadata, HAS_SIZE), condition(this, value, predicate, null));
    } else {
      return new BooleanFunction(new UnaryMetadata(this.metadata, HAS_SIZE), condition(this, value, predicate, null));
    }
  }

  public hasNotSize(value: number | Function<number>): BooleanFunction {
    const predicate = (left: T[], right: number) => left.length !== right;
    if (value instanceof Function) {
      return new BooleanFunction(
        new UnaryMetadata(this.metadata, HAS_NOT_SIZE),
        condition(this, value, predicate, null)
      );
    } else {
      return new BooleanFunction(
        new UnaryMetadata(this.metadata, HAS_NOT_SIZE),
        condition(this, value, predicate, null)
      );
    }
  }
}
