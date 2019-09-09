import { Field } from './dsl/Field';
import { Context } from './dsl/Context';
import { ContextAccessor } from './dsl/ContextAccessor';
import { BooleanFunction } from './dsl/lang/BooleanFunction';
import { NumberFunction } from './dsl/lang/NumberFunction';
import { StringFunction } from './dsl/lang/StringFunction';
import { Function, FunctionConstructor } from './dsl/lang/Function';
import { StepWhen } from './dsl/lang/StepWhen';
import { StepMap } from './dsl/lang/StepMap';
import { MappingRule } from './dsl/lang/MappingRule';
import { Mappings } from './dsl/lang/Mappings';
import { NaryMetadata } from './dsl/meta/NaryMetadata';
import { MATCH_ALL, MATCH_ANY, NONE_MATCH } from './dsl/lang/DefaultOperators';
import { BiStepMap } from './dsl/lang/BiStepMap';
import { BiConverterFunction, BiTypeConverter } from './dsl/lang/BiTypeConverter';
import { NaryConverterFunction, NaryTypeConverter } from './dsl/lang/NaryTypeConverter';
import { NaryStepMap } from './dsl/lang/NaryStepMap';
import { DateFunction } from './dsl/lang/DateFunction';
import { IterableFunction } from './dsl/lang/IterableFunction';
import { ConverterFunction, TypeConverter } from './dsl/lang/TypeConverter';
import { ValueMetadata } from './dsl/meta/ValueMetadata';

export function f<T>(accessor: ContextAccessor<object, Context, T>): Function<T> {
  return Function.function(accessor);
}

export function field<T extends object, V>(...path: (string | number)[]): Field<T, Context, V> {
  return Field.field(...path);
}

export function lift<U, F extends Function<U>>(constructor: FunctionConstructor<U, F>, value: U): F {
  return Function.lift(constructor, value);
}

export function iterable<T>(field: ContextAccessor<object, Context, T[]>): IterableFunction<T> {
  return IterableFunction.iterable(field);
}

export function boolean(field: ContextAccessor<object, Context, boolean>): BooleanFunction {
  return BooleanFunction.boolean(field);
}

export function string(field: ContextAccessor<object, Context, string>): StringFunction {
  return StringFunction.string(field);
}

export function number(field: ContextAccessor<object, Context, number>): NumberFunction {
  return NumberFunction.number(field);
}

export function date(field: ContextAccessor<object, Context, Date>): DateFunction {
  return DateFunction.date(field);
}

export function dateIso(field: ContextAccessor<object, Context, string>): DateFunction {
  return DateFunction.dateIso(field);
}

export function when(condition: BooleanFunction): StepWhen {
  return new StepWhen(condition);
}

export function map<T, U>(input: T | Function<T>): StepMap<T>;
export function map<T, U>(input: T | Function<T>, input2: U | Function<U>): BiStepMap<T, U>;
export function map<T, U>(input: T | Function<T>, input2?: U | Function<U>) {
  if (input2) {
    return new BiStepMap(
      input instanceof Function ? input : new Function(new ValueMetadata(input), _ => input),
      input2 instanceof Function ? input2 : new Function(new ValueMetadata(input2), _ => input2)
    );
  } else {
    return new StepMap(input instanceof Function ? input : new Function(new ValueMetadata(input), _ => input));
  }
}

export function mapAll(...inputs: Function<any>[]): NaryStepMap {
  return new NaryStepMap(inputs);
}

export function converter<T, V>(converter: ConverterFunction<T, V>, description?: string): TypeConverter<T, V> {
  return new TypeConverter(converter, description);
}

export function biConverter<T, U, V>(
  converter: BiConverterFunction<T, U, V>,
  description?: string
): BiTypeConverter<T, U, V> {
  return new BiTypeConverter(converter, description);
}

export function naryConverter<V>(converter: NaryConverterFunction<V>, description?: string): NaryTypeConverter<V> {
  return new NaryTypeConverter(converter, description);
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

export { Function } from './dsl/lang/Function';
export { BooleanFunction } from './dsl/lang/BooleanFunction';
export { NumberFunction } from './dsl/lang/NumberFunction';
export { StringFunction } from './dsl/lang/StringFunction';
export { DateFunction } from './dsl/lang/DateFunction';
export { IterableFunction } from './dsl/lang/IterableFunction';
