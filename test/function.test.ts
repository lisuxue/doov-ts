import { Model, User } from './model';
import { BooleanFunction } from 'BooleanFunction';
import { Function } from 'Function';
import { DefaultContext } from 'DefaultContext';
import { FunctionMetadata } from 'FunctionMetadata';
import { StringFunction } from 'StringFunction';
import { NumberFunction } from 'NumberFunction';
import * as DOOV from 'doov';

let model: Model;
let user: User;

const trueFunction = DOOV.lift(BooleanFunction, true);
const someStrFunction = DOOV.lift(StringFunction, 'some');
const otherStrFunction = DOOV.lift(StringFunction, 'other');
const nullField = DOOV.boolean(DOOV.field<Model, boolean>('user', 'a'));
const booleanFunction = DOOV.f(DOOV.field<Model, boolean>('user', 'b'));

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
    expect(nullField.isNull().get(model)).toEqual(true);
  });

  it('is not null', () => {
    expect(someStrFunction.isNotNull().get(model)).toEqual(true);
    expect(nullField.isNotNull().get(model)).toEqual(false);
  });

  it('eq', () => {
    expect(someStrFunction.eq('some').get(model)).toEqual(true);
    expect(someStrFunction.eq(otherStrFunction).get(model)).toEqual(false);
    expect(nullField.eq(true).get(model)).toEqual(false);
    expect(nullField.eq(false).get(model)).toEqual(false);
    expect(nullField.eq(trueFunction).get(model)).toEqual(false);
  });

  it('not eq', () => {
    expect(someStrFunction.notEq('some other').get(model)).toEqual(true);
    expect(someStrFunction.notEq(otherStrFunction).get(model)).toEqual(true);
    expect(nullField.notEq(false).get(model)).toEqual(true);
    expect(nullField.notEq(true).get(model)).toEqual(true);
    expect(nullField.notEq(trueFunction).get(model)).toEqual(true);
  });

  it('match all', () => {
    expect(someStrFunction.matchAll('some').get(model)).toEqual(true);
    expect(someStrFunction.matchAll('some', 'some').get(model)).toEqual(true);
    expect(someStrFunction.matchAll('some', someStrFunction).get(model)).toEqual(true);
    expect(someStrFunction.matchAll('some', otherStrFunction).get(model)).toEqual(false);
    expect(nullField.matchAll(nullField).get(model)).toEqual(true);
    expect(nullField.matchAll(nullField, booleanFunction).get(model)).toEqual(false);
    expect(nullField.matchAll(false, booleanFunction).get(model)).toEqual(false);
  });

  it('match any', () => {
    expect(someStrFunction.matchAny('some').get(model)).toEqual(true);
    expect(someStrFunction.matchAny('some', 'some other').get(model)).toEqual(true);
    expect(someStrFunction.matchAny('some', someStrFunction).get(model)).toEqual(true);
    expect(someStrFunction.matchAny('some', otherStrFunction).get(model)).toEqual(true);
    expect(someStrFunction.matchAny('other', otherStrFunction).get(model)).toEqual(false);
    expect(nullField.matchAny(false, booleanFunction).get(model)).toEqual(false);
    expect(nullField.matchAny(true, booleanFunction).get(model)).toEqual(false);
  });

  it('none match', () => {
    expect(someStrFunction.noneMatch('some other').get(model)).toEqual(true);
    expect(someStrFunction.noneMatch('some other', otherStrFunction).get(model)).toEqual(true);
    expect(someStrFunction.noneMatch('some').get(model)).toEqual(false);
    expect(someStrFunction.noneMatch('some', 'other').get(model)).toEqual(false);
    expect(someStrFunction.noneMatch('some', 'other').get(model)).toEqual(false);
    expect(nullField.noneMatch(false).get(model)).toEqual(true);
    expect(nullField.noneMatch(true, booleanFunction).get(model)).toEqual(true);
  });
});
