import { log } from 'Utils';
import moment from 'moment';
import { Field } from 'Field';
import { Context } from 'Context';
import { ContextAccessor } from 'ContextAccessor';
import { BooleanFunction } from 'BooleanFunction';
import { NumberFunction } from 'NumberFunction';
import { StringFunction } from 'StringFunction';
import { Function, FunctionConstructor } from 'Function';
import { StepWhen } from 'StepWhen';
import { StepMap } from 'StepMap';
import { MappingRule } from 'MappingRule';
import { Mappings } from 'Mappings';
import { NaryMetadata } from 'NaryMetadata';
import { MATCH_ALL, MATCH_ANY, NONE_MATCH } from 'DefaultOperators';

export const doov = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    log('boop');
  }
  log('prod');
  log(moment().fromNow());
  return a + b;
};

export function f<T>(accessor: ContextAccessor<object, Context, T>): Function<T> {
  return Function.function(accessor);
}

export function field<T extends object, V>(...path: (string | number)[]): Field<T, Context, V> {
  return Field.field(...path);
}

export function lift<U, F extends Function<U>>(constructor: FunctionConstructor<U, F>, value: U): F {
  return Function.lift(constructor, value);
}

export function boolean(field: Field<object, Context, boolean>): BooleanFunction {
  return BooleanFunction.boolean(field);
}

export function string(field: Field<object, Context, string>): StringFunction {
  return StringFunction.string(field);
}

export function number(field: Field<object, Context, number>): NumberFunction {
  return NumberFunction.number(field);
}

export function when(condition: BooleanFunction): StepWhen {
  return new StepWhen(condition);
}

export function map<T>(input: Function<T>): StepMap<T> {
  return new StepMap(input);
}

export function mappings(...mappings: MappingRule[]): Mappings {
  return new Mappings(...mappings);
}

export function matchAny(...values: BooleanFunction[]): BooleanFunction {
  return new BooleanFunction(new NaryMetadata(values.map(value => value.metadata), MATCH_ANY), (obj, ctx) => {
    return values.some(value => {
      const v = value.get(obj, ctx);
      return v != null ? v : false;
    });
  });
}

export function matchAll(...values: BooleanFunction[]): BooleanFunction {
  return new BooleanFunction(new NaryMetadata(values.map(value => value.metadata), MATCH_ALL), (obj, ctx) => {
    return values.every(value => {
      const v = value.get(obj, ctx);
      return v != null ? v : false;
    });
  });
}

export function matchNone(...values: BooleanFunction[]): BooleanFunction {
  return new BooleanFunction(new NaryMetadata(values.map(value => value.metadata), NONE_MATCH), (obj, ctx) => {
    return values.every(value => {
      const v = value.get(obj, ctx);
      return v != null ? !v : false;
    });
  });
}
