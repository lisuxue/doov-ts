import { condition, Function } from './Function';
import { Context } from './Context';
import { ContextAccessor } from './ContextAccessor';

export class BooleanFunction extends Function<boolean> {
  public static boolean(accessor: ContextAccessor<object, Context, boolean>): BooleanFunction {
    return new BooleanFunction(accessor.metadata, accessor.get, accessor.set);
  }

  public not(): BooleanFunction {
    return new BooleanFunction(this.metadata, condition(this, false, left => !left, false));
  }

  public and(right: BooleanFunction): BooleanFunction {
    return new BooleanFunction(this.metadata, condition(this, right, (l: boolean, r: boolean) => l && r, false));
  }

  public or(right: boolean | BooleanFunction): BooleanFunction {
    if (right instanceof BooleanFunction) {
      return new BooleanFunction(this.metadata, condition(this, right, (l: boolean, r: boolean) => l || r, false));
    } else {
      return new BooleanFunction(this.metadata, condition(this, right, (l: boolean, r: boolean) => l || r, false));
    }
  }
}
