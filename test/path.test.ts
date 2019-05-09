import { getPath, getPathPromise, setPath, setProp } from '../src/path';
import { Model, MyMap, User } from './model';

describe('path', () => {
  let model: Model;
  let user: User;

  beforeEach(() => {
    model = new Model();
    user = new User(1);
    user.name = 'test';
    model.user = user;
  });

  it('get from path', () => {
    let path = getPath(model, 'user', 'name');
    expect(path).toEqual('test');
    expect(getPath(model, 'user', 'id')).toEqual(1);
  });

  it('get from path string promise', () => {
    expect(getPathPromise(model, 'user', 'name')).resolves.toEqual('test');
  });

  it('get from path number promise', () => {
    expect(getPathPromise(model, 'user', 'id')).resolves.toEqual(1);
  });

  it('get in map', () => {
    let map: MyMap = {
      t: 'test',
    };
    expect(getPathPromise(map, 't')).resolves.toEqual('test');
  });

  it('set in object', () => {
    let user = new User(1);
    expect(setProp('name', 'test', user).name).toEqual('test');
  });

  it('set in array', () => {
    let array: string[] = [];
    expect(setProp(0, 'test', array)[0]).toEqual('test');
  });

  it('set in map', () => {
    let map: MyMap = {
      t: 'test',
    };
    expect(setProp('t', 'test2', map)['t']).toEqual('test2');
  });

  it('set from path', () => {
    let model = new Model();
    let user = new User(1);
    user.name = 'test';
    model.user = user;
    expect(setPath(model, 'test2', 'user', 'name').user!.name).toEqual('test2');
    expect(setPath(model, 0, 'user', 'id').user!.id).toEqual(0);
    expect(setPath(model, 'array', 'user', 'links', 1).user!.links![1]).toEqual('array');
    expect(setPath(model, 'array', 'user', 'links', 1).user!.links![0]).toBeUndefined();
  });
});
