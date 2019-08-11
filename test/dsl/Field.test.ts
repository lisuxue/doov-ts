import { Model, User } from '../model';
import * as DOOV from 'doov';

let model: Model;
let user: User;

let stringField = DOOV.field<Model, string>('user', 'name');
let arrayField = DOOV.field<Model, string>('user', 'links', 0);

beforeEach(() => {
  model = new Model();
  user = new User(1);
  user.name = 'test';
  model.user = user;
});

describe('get field', () => {
  it('get from string field', () => {
    return expect(stringField.get(model)).toEqual('test');
  });

  it('get from array field undefined', () => {
    return expect(arrayField.get(model)).toBeNull();
  });

  it('get from field array not null', () => {
    user.links = [];
    return expect(arrayField.get(model)).toBeNull();
  });

  it('get from field array item', () => {
    user.links = [];
    user.links.push('test');
    return expect(arrayField.get(model)).toEqual('test');
  });
});

describe('set field', () => {
  it('set from string field', () => {
    let newModel: Model = stringField.set(model, 'test2');
    expect(newModel.user!.name).toEqual('test2');
  });

  it('set from array undefined field', () => {
    let str = arrayField.get(model);
    return expect(str).toBeNull();
  });

  it('set from array field', () => {
    let mdl = arrayField.set(model, 'test');
    expect(mdl.user!.links![0]).toEqual('test');
  });
});
