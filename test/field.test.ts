import { Model, User } from './model';
import { Field } from '../src/field';

let model: Model;
let user: User;

beforeEach(() => {
  model = new Model();
  user = new User(1);
  user.name = 'test';
  model.user = user;
});

describe('get field', () => {
  it('get from string field', () => {
    let stringField = Field.field<Model, string>('user', 'name');
    return expect(stringField.get(model)).resolves.toEqual('test');
  });

  it('get from array field undefined', () => {
    let arrayField = Field.field<Model, string>('user', 'links', 0);
    return expect(arrayField.get(model)).rejects.toBeUndefined();
  });

  it('get from field array not null', () => {
    let arrayField = Field.field<Model, string>('user', 'links', 0);
    user.links = [];
    return expect(arrayField.get(model)).rejects.toBeUndefined();
  });

  it('get from field array item', () => {
    let arrayField = Field.field<Model, string>('user', 'links', 0);
    user.links = [];
    user.links.push('test');
    return expect(arrayField.get(model)).resolves.toEqual('test');
  });
});

describe('set field', () => {
  it('set from string field', () => {
    let stringField = Field.field<Model, string>('user', 'name');
    let modelPromise = stringField.set(model, 'test2');
    return modelPromise.then(value => {
      expect(value.user!.name).toEqual('test2');
    });
  });

  it('set from array undefined field', () => {
    let arrayField = Field.field<Model, string>('user', 'links', 0);

    let stringPromise = arrayField.get(model);
    return stringPromise.catch(reason => expect(reason).toBeUndefined());
  });

  it('set from array field', () => {
    let arrayField = Field.field<Model, string>('user', 'links', 0);
    let modelPromise = arrayField.set(model, 'test');
    return modelPromise.then(value => {
      expect(value.user!.links![0]).toEqual('test');
    });
  });
});
