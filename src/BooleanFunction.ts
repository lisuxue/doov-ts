import { condition, Function } from 'Function';
import { Context } from 'Context';
import { ContextAccessor } from 'ContextAccessor';
import { UnaryMetadata } from 'UnaryMetadata';
import { AND, NOT, OR } from 'DefaultOperators';
import { BinaryMetadata } from 'BinaryMetadata';
import { ValueMetadata } from 'ValueMetadata';

export class BooleanFunction extends Function<boolean> {
  public static boolean(accessor: ContextAccessor<object, Context, boolean>): BooleanFunction {
    return new BooleanFunction(accessor.metadata, accessor.get, accessor.set);
  }

  public not(): BooleanFunction {
    return new BooleanFunction(new UnaryMetadata(this.metadata, NOT), condition(this, false, left => !left, false));
  }

  public and(right: BooleanFunction): BooleanFunction {
    return new BooleanFunction(new BinaryMetadata(this.metadata, AND, right.metadata), (obj, ctx) => {
      if (ctx && ctx.shortCircuit) {
        const left = this.get(obj, ctx);
        if (left != null) {
          if (!left) {
            return false;
          }
          const rValue = right.get(obj, ctx);
          return left && (rValue != null ? rValue : false);
        } else {
          return false;
        }
      } else {
        return condition(this, right, (l: boolean, r: boolean) => l && r, false)(obj, ctx);
      }
    });
  }

  public or(right: boolean | BooleanFunction): BooleanFunction {
    return new BooleanFunction(
      new BinaryMetadata(
        this.metadata,
        OR,
        right instanceof BooleanFunction ? right.metadata : new ValueMetadata(right)
      ),
      (obj, ctx) => {
        if (ctx && ctx.shortCircuit) {
          const left = this.get(obj, ctx);
          if (left != null) {
            if (left) {
              return true;
            }
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
      }
    );
  }
}
