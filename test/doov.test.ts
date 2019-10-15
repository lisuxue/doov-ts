import { Model, User } from './model';
import { StringFunction } from '../src/dsl/lang/StringFunction';
import * as DOOV from '../src/doov';
import { NumberFunction } from '../src/doov';

let model: Model;
let user: User;

const name = DOOV.string(DOOV.field<string>('user', 'name'));
const a = DOOV.boolean(DOOV.field<boolean>('user', 'b'));
const id = DOOV.number(DOOV.field<number>('user', 'id'));
const link1 = DOOV.string(DOOV.field<string>('user', 'links', 0));
const link2 = DOOV.string(DOOV.field<string>('user', 'links', 1));

beforeEach(() => {
  model = new Model();
  user = new User(1);
  user.name = 'test';
  user.b = true;
  model.user = user;
});

describe('doov match all', () => {
  it('match all true', () => {
    expect(DOOV.matchAll(name.eq('test'), a.eq(true)).get(model)).toEqual(true);
  });

  it('match all false', () => {
    expect(DOOV.matchAll(name.eq('other'), a.eq(true)).get(model)).toEqual(false);
  });
});

describe('doov match any', () => {
  it('match any true', () => {
    expect(DOOV.matchAny(name.eq('test'), a.eq(false)).get(model)).toEqual(true);
  });

  it('match any false', () => {
    expect(DOOV.matchAny(name.eq('other'), a.eq(false)).get(model)).toEqual(false);
  });
});

describe('doov none match', () => {
  it('none match true', () => {
    expect(DOOV.matchNone(name.eq('other'), a.eq(false)).get(model)).toEqual(true);
  });

  it('none match false', () => {
    expect(DOOV.matchNone(name.eq('test'), a.eq(false)).get(model)).toEqual(false);
  });
});

describe('doov count', () => {
  it('count 0', () => {
    expect(DOOV.count(name.eq('other'), a.eq(false)).get(model)).toEqual(0);
  });

  it('count 1', () => {
    expect(DOOV.count(name.eq('test'), a.eq(false)).get(model)).toEqual(1);
  });

  it('count 2', () => {
    expect(DOOV.count(name.eq('test'), a.eq(true)).get(model)).toEqual(2);
  });
});

describe('doov when', () => {
  it('when validate execute result true', () => {
    const result = DOOV.when(name.eq('test'))
      .validate()
      .execute(model);
    expect(result.value).toEqual(true);
  });

  it('when validate execute result false', () => {
    const result = DOOV.when(DOOV.matchNone(name.eq('test'), a.eq(false)))
      .validate()
      .execute(model);
    expect(result.value).toEqual(false);
  });
});

describe('doov map', () => {
  it('map to execute', () => {
    const stringMapping = DOOV.map(id.mapTo(StringFunction, v => 'link of ' + v)).to(link1);
    model = stringMapping.execute(model);
    expect(link1.get(model)).toEqual('link of 1');
  });

  it('map to execute 2', () => {
    const stringMapping = DOOV.map(name).to(link2);
    model = stringMapping.execute(model);
    expect(link2.get(model)).toEqual('test');
  });

  it('map to with get only function execute', () => {
    const stringMapping = DOOV.map(name).to(DOOV.lift(StringFunction, undefined));
    const model2 = stringMapping.execute(model);
    expect(model2).toEqual(model);
  });

  it('when validate execute result false', () => {
    const booleanMapping = DOOV.map(DOOV.matchNone(name.eq('test'), a.eq(false))).to(a);
    model = booleanMapping.execute(model);
    expect(model!.user!.b).toEqual(false);
  });
});

describe('doov sum', () => {
  it('sum 1', () => {
    const sum = DOOV.sum(name.length());
    expect(sum.get(model)).toEqual(4);
  });

  it('sum 2', () => {
    const sum = DOOV.sum(id, name.length());
    expect(sum.get(model)).toEqual(5);
  });

  it('sum 3', () => {
    const sum = DOOV.sum(id, name.length(), DOOV.lift(NumberFunction, 6));
    expect(sum.get(model)).toEqual(11);
  });

  it('sum with null', () => {
    const sum = DOOV.sum(id, name.length(), DOOV.lift(NumberFunction, null));
    expect(sum.get(model)).toEqual(5);
  });
});
