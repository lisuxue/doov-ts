import { Model, User } from './model';
import * as DOOV from 'doov';
import { Metadata } from 'Metadata';
import { fieldsOf } from 'MetadataUtils';
import { path } from 'Paths';

let model: Model;
let user: User;
let metadata: Metadata | undefined;

const nameField = DOOV.field<Model, string>('user', 'name');
let name = DOOV.string(nameField);
let link1 = DOOV.string(DOOV.field<Model, string>('user', 'links', 0));
let id = DOOV.number(DOOV.field<Model, number>('user', 'id'));

beforeEach(() => {
  model = new Model();
  user = new User(1);
  user.name = 'test';
  model.user = user;
});

afterEach(() => {
  if (metadata) {
    console.log(metadata.readable);
  }
});

describe('metadata', () => {
  it('fields', () => {
    expect(name.metadata.readable).toEqual('user.name');
    expect(nameField.metadata.readable).toEqual('user.name');
    expect(link1.metadata.readable).toEqual('user.links.0');
    expect(id.metadata.readable).toEqual('user.id');
  });
  it('when', () => {
    metadata = DOOV.when(name.length().greaterThan(id)).metadata;
    expect(metadata.readable).toEqual('when user.name length > user.id');
  });
  it('validation rule', () => {
    metadata = DOOV.when(name.length().greaterThan(id)).validate().metadata;
    expect(metadata.readable).toEqual('validate when user.name length > user.id');
  });

  it('fields of', () => {
    metadata = DOOV.when(name.length().greaterThan(id)).validate().metadata;
    const fields = fieldsOf(metadata);
    expect(fields).toContain(nameField.metadata.path);
    expect(fields).toContainEqual(path(id.metadata.readable));
  });
});
