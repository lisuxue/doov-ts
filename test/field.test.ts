import { Model, User } from './model';
import { Field } from '../src/field';

describe('field', () => {
  it('get from field', () => {
    let model = new Model();
    let user = new User(1);
    user.name = 'test';
    model.user = user;
    let stringField = Field.field<Model, string>('user', 'name');
    stringField.get(model).then(value => expect(value).toEqual('test'));

    let arrayField = Field.field<Model, string>('user', 'links', 0);
    arrayField.get(model).catch(reason => expect(reason).toEqual(null));
    user.links = [];
    arrayField.get(model).catch(reason => expect(reason).toEqual(null));
    user.links.push('test');
    arrayField.get(model).then(value => expect(value).toEqual('test'));
  });

  it('set from field', () => {
    let model = new Model();
    let user = new User(1);
    user.name = 'test';
    model.user = user;
    let stringField = Field.field<Model, string>('user', 'name');
    expect(stringField.set(model, 'test2').user!.name).toEqual('test2');

    let arrayField = Field.field<Model, string>('user', 'links', 0);
    arrayField.get(model).catch(reason => expect(reason).toEqual(null));
    let newClass = arrayField.set(model, 'test');
    arrayField.get(model).catch(reason => expect(reason).toEqual(null));
    expect(newClass.user!.links![0]).toEqual('test');
  });
});
