import { Model, User } from '../../model';
import * as DOOV from '../../../src/doov';
import { Function } from '../../../src/dsl/lang/Function';
import { IterableFunction } from '../../../src/dsl/lang/IterableFunction';
import { NumberFunction } from '../../../src/dsl/lang/NumberFunction';
import { StringFunction } from '../../../src/dsl/lang/StringFunction';

let model: Model;
let user: User;

const emptyFunction = DOOV.lift(IterableFunction, []);
const numberFunction = DOOV.lift(NumberFunction, 2);
const stringFunction = DOOV.lift(StringFunction, 'link1');
const iterableFunction = DOOV.lift(IterableFunction, [true, false] as boolean[]);
const undefinedIterable = DOOV.lift(IterableFunction, undefined);
const linksField = DOOV.iterable(DOOV.field<Model, string[]>('user', 'links'));

beforeEach(() => {
  model = new Model();
  user = new User(1);
  user.name = 'test';
  user.b = true;
  model.user = user;
});

describe('iterable function', () => {
  it('get eq', () => {
    expect(emptyFunction.get(model)).toEqual([]);
    expect(emptyFunction.isNotNull().get(model)).toEqual(true);
    expect(emptyFunction.isEmpty().get(model)).toEqual(true);
    const b = emptyFunction
      .isNotNull()
      .and(emptyFunction.isEmpty())
      .get(model);
    expect(b).toEqual(true);
  });

  it('contains', () => {
    expect(iterableFunction.contains(true).get(model)).toEqual(true);
  });

  it('contains all', () => {
    expect(iterableFunction.containsAll([false, true]).get(model)).toEqual(true);
  });

  it('undefined ', () => {
    expect(undefinedIterable.isUndefined().get(model)).toEqual(true);
  });

  it('iterable empty', () => {
    expect(linksField.isUndefined().get(model)).toEqual(true);
    model = linksField.set!(model, ['link1', 'link2']);
    expect(linksField.isDefined().get(model)).toEqual(true);
    expect(linksField.isEmpty().get(model)).toEqual(false);
    expect(linksField.isNotEmpty().get(model)).toEqual(true);
  });
  it('iterable size', () => {
    expect(linksField.isUndefined().get(model)).toEqual(true);
    model = linksField.set!(model, ['link1', 'link2']);
    expect(linksField.hasSize(2).get(model)).toEqual(true);
    expect(linksField.hasSize(numberFunction).get(model)).toEqual(true);
    expect(linksField.hasNotSize(3).get(model)).toEqual(true);
    expect(linksField.hasNotSize(numberFunction).get(model)).toEqual(false);
    expect(linksField.get(model)).toEqual(['link1', 'link2']);
  });
  it('iterable contains all', () => {
    expect(linksField.isUndefined().get(model)).toEqual(true);
    model = linksField.set!(model, ['link1', 'link2']);
    expect(linksField.containsAll(['link1', 'link2']).get(model)).toEqual(true);
    const f = DOOV.lift(IterableFunction, ['link1', 'link2'] as string[]) as Function<string[]>;
    expect(linksField.containsAll(f).get(model)).toEqual(true);
  });
  it('iterable contains', () => {
    expect(linksField.isUndefined().get(model)).toEqual(true);
    model = linksField.set!(model, ['link1', 'link2']);
    expect(linksField.contains('link2').get(model)).toEqual(true);
    expect(linksField.contains(stringFunction).get(model)).toEqual(true);
  });
});
