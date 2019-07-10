import { Context } from './Context';
import { ContextAccessor } from './ContextAccessor';
import { BooleanFunction } from './BooleanFunction';
import { NumberFunction } from './NumberFunction';
import { condition, Function } from './Function';

export class StringFunction extends Function<string> {
  public static string(accessor: ContextAccessor<object, Context, string>): StringFunction {
    return new StringFunction(accessor.metadata, accessor.get, accessor.set);
  }

  public contains(value: string | StringFunction): BooleanFunction {
    const predicate = (value: string, str: string) => value.includes(str);
    if (value instanceof StringFunction) {
      return new BooleanFunction(this.metadata, condition(this, value, predicate, false));
    } else {
      return new BooleanFunction(this.metadata, condition(this, value, predicate, false));
    }
  }

  public matches(regex: string | StringFunction): BooleanFunction {
    const predicate = (value: string, str: string) => {
      const match = value.match(str);
      return match != null && match.length >= 1;
    };
    if (regex instanceof StringFunction) {
      return new BooleanFunction(this.metadata, condition(this, regex, predicate, false));
    } else {
      return new BooleanFunction(this.metadata, condition(this, regex, predicate, false));
    }
  }

  public startsWith(value: string | StringFunction): BooleanFunction {
    const predicate = (value: string, str: string) => value.startsWith(str);
    if (value instanceof StringFunction) {
      return new BooleanFunction(this.metadata, condition(this, value, predicate, false));
    } else {
      return new BooleanFunction(this.metadata, condition(this, value, predicate, false));
    }
  }

  public endsWith(value: string | StringFunction): BooleanFunction {
    const predicate = (value: string, str: string) => value.endsWith(str);
    if (value instanceof StringFunction) {
      return new BooleanFunction(this.metadata, condition(this, value, predicate, false));
    } else {
      return new BooleanFunction(this.metadata, condition(this, value, predicate, false));
    }
  }

  public length(): NumberFunction {
    return new NumberFunction(this.metadata, condition(this, '', (value: string, _) => value.length, 0));
  }

  public parseInt(): NumberFunction {
    return new NumberFunction(this.metadata, condition(this, '', (value: string, _) => parseInt(value), null));
  }

  public trim(): StringFunction {
    return new StringFunction(this.metadata, condition(this, '', (value: string, _) => value.trim(), null));
  }

  // TODO version Function
  public replaceAll(regex: string, replace: string): StringFunction {
    return new StringFunction(
      this.metadata,
      condition(this, '', (value: string, _) => value.replace(regex, replace), null)
    );
  }

  // TODO version Function
  public substring(beginIndex: number, endIndex: number): StringFunction {
    return new StringFunction(
      this.metadata,
      condition(this, '', (value: string, _) => value.substring(beginIndex, endIndex), null)
    );
  }

  public localeUpperCase(): StringFunction {
    return new StringFunction(
      this.metadata,
      condition(this, '', (value: string, _) => value.toLocaleUpperCase(), null)
    );
  }

  public localeLowerCase(): StringFunction {
    return new StringFunction(
      this.metadata,
      condition(this, '', (value: string, _) => value.toLocaleLowerCase(), null)
    );
  }

  // TODO handle case when value function returns null
  public concat(value: string | StringFunction): StringFunction {
    if (value instanceof StringFunction) {
      return new StringFunction(
        this.metadata,
        condition(this, value, (left: string, right: string) => left + right, null)
      );
    } else {
      return new StringFunction(
        this.metadata,
        condition(this, value, (left: string, right: string) => left + right, null)
      );
    }
  }
}
