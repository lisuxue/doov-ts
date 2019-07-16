import { condition, Function } from 'Function';
import { Context } from 'Context';
import { ContextAccessor } from 'ContextAccessor';

export class BooleanFunction extends Function<boolean> {
  public static boolean(accessor: ContextAccessor<object, Context, boolean>): BooleanFunction {
    return new BooleanFunction(accessor.metadata, accessor.get, accessor.set);
  }

  public not(): BooleanFunction {
    return new BooleanFunction(this.metadata, condition(this, false, left => !left, false));
  }

  public and(right: BooleanFunction): BooleanFunction {
    return new BooleanFunction(this.metadata, (obj, ctx) => {
      if (ctx && ctx.shortCircuit) {
        const left = this.get(obj, ctx);
        if (left != null) {
          return left && right.get(obj, ctx);
        } else {
          return false;
        }
      } else {
        return condition(this, right, (l: boolean, r: boolean) => l && r, false)(obj, ctx);
      }
    });
  }

  public or(right: boolean | BooleanFunction): BooleanFunction {
    return new BooleanFunction(this.metadata, (obj, ctx) => {
      if (ctx && ctx.shortCircuit) {
        const left = this.get(obj, ctx);
        if (left != null) {
          if (right instanceof BooleanFunction) {
            return left || right.get(obj, ctx);
          } else {
            return left || right;
          }
        } else {
          return false;
        }
      } else {
        if (right instanceof BooleanFunction) {
          return condition(this, right, (l: boolean, r: boolean) => l || r, false)(obj, ctx);
        } else {
          return condition(this, right, (l: boolean, r: boolean) => l || r, false)(obj, ctx);
        }
      }
    });
  }
}
