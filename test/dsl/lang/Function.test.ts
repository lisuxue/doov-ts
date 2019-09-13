import { Model, User } from '../../model';
import { BooleanFunction } from '../../../src/dsl/lang/BooleanFunction';
import { Function } from '../../../src/dsl/lang/Function';
import { DefaultContext } from '../../../src/dsl/DefaultContext';
import { FunctionMetadata } from '../../../src/dsl/meta/FunctionMetadata';
import { StringFunction } from '../../../src/dsl/lang/StringFunction';
import { NumberFunction } from '../../../src/dsl/lang/NumberFunction';
import * as DOOV from '../../../src/doov';

let model: Model;
let user: User;

const trueFunction = DOOV.lift(BooleanFunction, true);
const someStrFunction = DOOV.lift(StringFunction, 'some');
const nullField = DOOV.lift(StringFunction, null as any);
const otherStrFunction = DOOV.lift(StringFunction, 'other');
// re-wrap function, to test getter/setter interception
const nameField = DOOV.f(DOOV.string(DOOV.field<string, Model>('user', 'name')));
const undefinedField = DOOV.boolean(DOOV.field<boolean, Model>('user', 'a'));
const booleanFunction = DOOV.f(DOOV.field<boolean, Model>('user', 'b'));

beforeEach(() => {
  model = new Model();
  user = new User(1);
  user.name = 'test';
  user.b = true;
  model.user = user;
});

describe('generic function contextual', () => {
  const contextual = Function.contextual<string>(new FunctionMetadata('ctx ? ctx.props["prop"] : ""'), (_, ctx) =>
    ctx ? ctx.props['prop'] : ''
  );
  it('should return empty value without context', () => {
    expect(contextual.get(model)).toEqual('');
  });
  it('should return value from context', () => {
    const ctx = new DefaultContext();
    ctx.props['prop'] = 'something';
    expect(contextual.get(model, ctx)).toEqual('something');
  });
});

describe('generic function consumer', () => {
  const consumer = Function.consumer<string>(new FunctionMetadata('ctx.props["prop"] = val'), (obj, val, ctx) => {
    if (val && ctx) {
      ctx.props['prop'] = val;
    }
    return obj;
  });

  it('should return empty value without context', () => {
    const ctx = new DefaultContext();
    consumer.set!(model, '');
    expect(ctx.props['prop']).toBeUndefined();
  });
  it('should return value from context', () => {
    const ctx = new DefaultContext();
    consumer.set!(model, 'something', ctx);
    expect(ctx.props['prop']).toEqual('something');
  });
});

describe('generic function mapTo', () => {
  const someValueFunction = Function.lift(StringFunction, 'some value');
  it('mapTo function', () => {
    const countWhitespace = someValueFunction.mapTo(NumberFunction, v => (v ? v.split(' ').length - 1 : 0));
    expect(countWhitespace.get(model)).toEqual(1);
    expect(countWhitespace.metadata.children).toBeDefined();
    const metadata = countWhitespace.metadata.children!()[1] as FunctionMetadata;
    expect(metadata!.body).toEqual("function (v) { return (v ? v.split(' ').length - 1 : 0); }");
  });
});

describe('generic function', () => {
  it('is null', () => {
    expect(someStrFunction.isNull().get(model)).toEqual(false);
    expect(nameField.isNull().get(model)).toEqual(false);
    expect(undefinedField.isNull().get(model)).toEqual(false);
    expect(nullField.isNull().get(model)).toEqual(true);
  });

  it('is not null', () => {
    (user as any).name = null;
    expect(someStrFunction.isNotNull().get(model)).toEqual(true);
    expect(nameField.isNull().get(model)).toEqual(true);
    expect(undefinedField.isNotNull().get(model)).toEqual(true);
  });

  it('is defined', () => {
    expect(someStrFunction.isDefined().get(model)).toEqual(true);
    expect(nameField.isDefined().get(model)).toEqual(true);
    expect(undefinedField.isDefined().get(model)).toEqual(false);
    expect(nullField.isDefined().get(model)).toEqual(true);
  });

  it('is undefined', () => {
    model = nameField.set!(model, null);
    expect(someStrFunction.isUndefined().get(model)).toEqual(false);
    expect(nameField.isUndefined().get(model)).toEqual(false);
    expect(undefinedField.isUndefined().get(model)).toEqual(true);
  });

  it('has value', () => {
    model = nameField.set!(model, null);
    expect(someStrFunction.hasValue().get(model)).toEqual(true);
    expect(nameField.hasValue().get(model)).toEqual(false);
    expect(undefinedField.hasValue().get(model)).toEqual(false);
    expect(undefinedField.hasValue().get(model)).toEqual(false);
  });

  it('is null or undefined', () => {
    model = nameField.set!(model, null);
    expect(someStrFunction.isNullOrUndefined().get(model)).toEqual(false);
    expect(nameField.isNullOrUndefined().get(model)).toEqual(true);
    expect(undefinedField.isNullOrUndefined().get(model)).toEqual(true);
    expect(undefinedField.isNullOrUndefined().get(model)).toEqual(true);
  });

  it('eq', () => {
    expect(someStrFunction.eq('some').get(model)).toEqual(true);
    expect(someStrFunction.eq(otherStrFunction).get(model)).toEqual(false);
    expect(nameField.eq('test').get(model)).toEqual(true);
    expect(undefinedField.eq(true).get(model)).toEqual(false);
    expect(undefinedField.eq(false).get(model)).toEqual(false);
    expect(undefinedField.eq(trueFunction).get(model)).toEqual(false);
  });

  it('not eq', () => {
    expect(someStrFunction.notEq('some other').get(model)).toEqual(true);
    expect(someStrFunction.notEq(otherStrFunction).get(model)).toEqual(true);
    expect(nameField.notEq('other').get(model)).toEqual(true);
    expect(undefinedField.notEq(false).get(model)).toEqual(true);
    expect(undefinedField.notEq(true).get(model)).toEqual(true);
    expect(undefinedField.notEq(trueFunction).get(model)).toEqual(true);
  });

  it('match all', () => {
    expect(someStrFunction.matchAll('some').get(model)).toEqual(true);
    expect(someStrFunction.matchAll('some', 'some').get(model)).toEqual(true);
    expect(someStrFunction.matchAll('some', someStrFunction).get(model)).toEqual(true);
    expect(someStrFunction.matchAll('some', otherStrFunction).get(model)).toEqual(false);
    expect(undefinedField.matchAll(undefinedField).get(model)).toEqual(true);
    expect(undefinedField.matchAll(undefinedField, booleanFunction).get(model)).toEqual(false);
    expect(undefinedField.matchAll(false, booleanFunction).get(model)).toEqual(false);
  });

  it('match any', () => {
    expect(someStrFunction.matchAny('some').get(model)).toEqual(true);
    expect(someStrFunction.matchAny('some', 'some other').get(model)).toEqual(true);
    expect(someStrFunction.matchAny('some', someStrFunction).get(model)).toEqual(true);
    expect(someStrFunction.matchAny('some', otherStrFunction).get(model)).toEqual(true);
    expect(someStrFunction.matchAny('other', otherStrFunction).get(model)).toEqual(false);
    expect(undefinedField.matchAny(false, booleanFunction).get(model)).toEqual(false);
    expect(undefinedField.matchAny(true, booleanFunction).get(model)).toEqual(false);
  });

  it('none match', () => {
    expect(someStrFunction.noneMatch('some other').get(model)).toEqual(true);
    expect(someStrFunction.noneMatch('some other', otherStrFunction).get(model)).toEqual(true);
    expect(someStrFunction.noneMatch('some').get(model)).toEqual(false);
    expect(someStrFunction.noneMatch('some', 'other').get(model)).toEqual(false);
    expect(someStrFunction.noneMatch('some', 'other').get(model)).toEqual(false);
    expect(undefinedField.noneMatch(false).get(model)).toEqual(true);
    expect(undefinedField.noneMatch(true, booleanFunction).get(model)).toEqual(true);
  });
});
