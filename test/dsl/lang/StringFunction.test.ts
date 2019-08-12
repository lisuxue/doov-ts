import { Model, User } from '../../model';
import { StringFunction } from 'dsl/lang/StringFunction';
import * as DOOV from 'doov';

let model: Model;
let user: User;

const num4 = DOOV.lift(StringFunction, '#4');
const name = DOOV.string(DOOV.field<Model, string>('user', 'name'));
const link1 = DOOV.string(DOOV.field<Model, string>('user', 'links', 0));

beforeEach(() => {
  model = new Model();
  user = new User(1);
  user.name = 'test';
  user.b = true;
  model.user = user;
});

describe('string function', () => {
  it('string get eq', () => {
    expect(name.get(model)).toEqual('test');
    expect(name.isNotNull().get(model)).toEqual(true);
    expect(name.eq('test').get(model)).toEqual(true);
    const b = name
      .isNotNull()
      .and(name.eq('test'))
      .get(model);
    expect(b).toEqual(true);
  });
  it('string contains value', () => {
    expect(name.contains('tes').get(model)).toEqual(true);
  });
  it('string contains function', () => {
    expect(name.contains(link1).get(model)).toEqual(false);
  });
  it('string matches value', () => {
    expect(num4.matches('^#').get(model)).toEqual(true);
  });
  it('string starts with value', () => {
    expect(name.startsWith('tes').get(model)).toEqual(true);
  });
  it('string starts with function', () => {
    expect(name.startsWith(link1).get(model)).toEqual(false);
  });
  it('string ends with value', () => {
    expect(name.endsWith('est').get(model)).toEqual(true);
  });
  it('string ends with function', () => {
    expect(name.endsWith(link1).get(model)).toEqual(false);
  });
  it('string length', () => {
    expect(name.length().get(model)).toEqual(4);
    expect(num4.length().get(model)).toEqual(2);
  });
  it('string parse int', () => {
    model = link1.set!(model, '4');
    expect(link1.parseInt().get(model)).toEqual(4);
  });
  it('string trim', () => {
    model = name.set!(model, ' test ');
    expect(name.trim().get(model)).toEqual('test');
  });
  it('string replace all value', () => {
    model = name.set!(model, ' test ');
    expect(name.replaceAll('test', 'other').get(model)).toEqual(' other ');
  });
  it('string substring value', () => {
    model = name.set!(model, ' test ');
    expect(name.substring(3, 5).get(model)).toEqual('st');
  });
  it('string lower case', () => {
    model = link1.set!(model, 'TEST');
    expect(link1.localeLowerCase().get(model)).toEqual('test');
  });
  it('string upper case', () => {
    model = link1.set!(model, 'test');
    expect(link1.localeUpperCase().get(model)).toEqual('TEST');
  });
  it('string concat value', () => {
    expect(name.concat('2').get(model)).toEqual('test2');
  });
  it('string concat function', () => {
    expect(name.concat(link1).get(model)).toEqual(null);
    model = link1.set!(model, 'test');
    expect(
      name
        .concat(' ')
        .concat(link1)
        .get(model)
    ).toEqual('test test');
  });
  it('string composed', () => {
    expect(name.get(model)).toEqual('test');
    expect(link1.get(model)).toBeUndefined();
    model = link1.set!(model, 'test');
    expect(name.eq(link1).get(model)).toEqual(true);
    model = name.set!(model, 'other test');
    expect(name.endsWith(link1).get(model)).toEqual(true);
    expect(name.length().get(model)).toEqual(10);
    expect(name.matches('^o.+t$').get(model)).toEqual(true);
    expect(name.matches('^O.+t$').get(model)).toEqual(false);
    expect(
      name
        .matches('^o.+t$')
        .and(link1.eq('test'))
        .get(model)
    ).toEqual(true);
  });
});
