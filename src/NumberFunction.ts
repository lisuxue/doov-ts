import { ContextAccessor } from './ContextAccessor';
import { Context } from './Context';
import { BooleanFunction } from './BooleanFunction';
import { condition, Function } from './Function';
import { DefaultMetadata } from './DefaultMetadata';

export class NumberFunction extends Function<number> {
  public static number(accessor: ContextAccessor<object, Context, number>): NumberFunction {
    return new NumberFunction(accessor.metadata, accessor.get, accessor.set);
  }

  public static min(...values: (number | NumberFunction)[]): NumberFunction {
    return new NumberFunction(new DefaultMetadata('min'), (obj, ctx) => {
      const f = (l: number, r: number) => (l < r ? l : r);
      return values.reduce((previousValue: number, currentValue) => {
        if (currentValue instanceof Function) {
          const value = currentValue.get(obj, ctx);
          if (value != null) {
            return f(value, previousValue);
          } else {
            return previousValue;
          }
        } else {
          return f(currentValue, previousValue);
        }
      }, Number.MAX_SAFE_INTEGER);
    });
  }

  public static max(...values: (number | NumberFunction)[]): NumberFunction {
    return new NumberFunction(new DefaultMetadata('max'), (obj, ctx) => {
      const f = (l: number, r: number) => (l > r ? l : r);
      return values.reduce((previousValue: number, currentValue) => {
        if (currentValue instanceof Function) {
          const value = currentValue.get(obj, ctx);
          if (value != null) {
            return f(value, previousValue);
          } else {
            return previousValue;
          }
        } else {
          return f(currentValue, previousValue);
        }
      }, Number.MIN_SAFE_INTEGER);
    });
  }

  public static sum(...values: (number | NumberFunction)[]): NumberFunction {
    return new NumberFunction(new DefaultMetadata('sum'), (obj, ctx) => {
      const f = (l: number, r: number) => l + r;
      return values.reduce((previousValue: number, currentValue) => {
        if (currentValue instanceof Function) {
          const value = currentValue.get(obj, ctx);
          if (value != null) {
            return f(value, previousValue);
          } else {
            return previousValue;
          }
        } else {
          return f(currentValue, previousValue);
        }
      }, 0);
    });
  }

  public lesserThan(value: number | NumberFunction): BooleanFunction {
    const predicate = (left: number, right: number) => left < right;
    if (value instanceof NumberFunction) {
      return new BooleanFunction(this.metadata, condition(this, value, predicate, false));
    } else {
      return new BooleanFunction(this.metadata, condition(this, value, predicate, false));
    }
  }

  public lesserOrEquals(value: number | NumberFunction): BooleanFunction {
    const predicate = (left: number, right: number) => left <= right;
    if (value instanceof NumberFunction) {
      return new BooleanFunction(this.metadata, condition(this, value, predicate, false));
    } else {
      return new BooleanFunction(this.metadata, condition(this, value, predicate, false));
    }
  }

  public greaterThan(value: number | NumberFunction): BooleanFunction {
    const predicate = (left: number, right: number) => left > right;
    if (value instanceof NumberFunction) {
      return new BooleanFunction(this.metadata, condition(this, value, predicate, false));
    } else {
      return new BooleanFunction(this.metadata, condition(this, value, predicate, false));
    }
  }

  public greaterOrEquals(value: number | NumberFunction): BooleanFunction {
    const predicate = (left: number, right: number) => left >= right;
    if (value instanceof NumberFunction) {
      return new BooleanFunction(this.metadata, condition(this, value, predicate, false));
    } else {
      return new BooleanFunction(this.metadata, condition(this, value, predicate, false));
    }
  }

  public between(minIncluded: number | NumberFunction, maxExcluded: number | NumberFunction): BooleanFunction {
    return this.greaterOrEquals(minIncluded).and(this.lesserThan(maxExcluded));
  }

  public plus(value: number | NumberFunction): NumberFunction {
    const f = (left: number, right: number) => left + right;
    if (value instanceof NumberFunction) {
      return new NumberFunction(this.metadata, condition(this, value, f, null));
    } else {
      return new NumberFunction(this.metadata, condition(this, value, f, null));
    }
  }

  public minus(value: number | NumberFunction): NumberFunction {
    const f = (left: number, right: number) => left - right;
    if (value instanceof NumberFunction) {
      return new NumberFunction(this.metadata, condition(this, value, f, null));
    } else {
      return new NumberFunction(this.metadata, condition(this, value, f, null));
    }
  }

  public times(value: number | NumberFunction): NumberFunction {
    const f = (left: number, right: number) => left * right;
    if (value instanceof NumberFunction) {
      return new NumberFunction(this.metadata, condition(this, value, f, null));
    } else {
      return new NumberFunction(this.metadata, condition(this, value, f, null));
    }
  }
}
