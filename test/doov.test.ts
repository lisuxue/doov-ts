import { Model, User } from './model';
import { StringFunction } from 'StringFunction';
import * as DOOV from 'doov';

let model: Model;
let user: User;

const name = DOOV.string(DOOV.field<Model, string>('user', 'name'));
const a = DOOV.boolean(DOOV.field<Model, boolean>('user', 'b'));
const id = DOOV.number(DOOV.field<Model, number>('user', 'id'));
const link1 = DOOV.string(DOOV.field<Model, string>('user', 'links', 0));
const link2 = DOOV.string(DOOV.field<Model, string>('user', 'links', 1));

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

  it('map to execute', () => {
    const stringMapping = DOOV.map(name).to(link2);
    model = stringMapping.execute(model);
    expect(link2.get(model)).toEqual('test');
  });

  it('when validate execute result false', () => {
    const booleanMapping = DOOV.map(DOOV.matchNone(name.eq('test'), a.eq(false))).to(a);
    model = booleanMapping.execute(model);
    expect(model!.user!.b).toEqual(false);
  });
});
