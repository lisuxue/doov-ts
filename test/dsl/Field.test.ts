import { Model, User } from '../model';
import * as DOOV from '../../src/doov';
import { DateFunction } from '../../src/dsl/lang/DateFunction';
import { Field } from '../../src/dsl/Field';
import { FieldMetadata } from '../../src/dsl/meta/FieldMetadata';
import { StringFunction } from '../../src/dsl/lang/StringFunction';

let model: Model;
let user: User;

const stringField = DOOV.field<string, Model>('user', 'name');
const arrayField = DOOV.field<string, Model>('user', 'links', 0);
const userIdField = DOOV.field<number, Model>('user', 'id')
  .withSiblings(['user', 'id2'])
  .withTags('id');
const birthDateField = DOOV.field<Date, Model>('user', 'birth').withPosition(1);
const birthDateFunction = DOOV.date(birthDateField);
const userIdFunction = DOOV.number(userIdField);
const liftedDateFunction = DOOV.lift(DateFunction, new Date());
const liftedStringFunction = DOOV.lift(StringFunction, 'name');

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
    return expect(arrayField.get(model)).toBeUndefined();
  });

  it('get from field array not null', () => {
    user.links = [];
    return expect(arrayField.get(model)).toBeUndefined();
  });

  it('get from field array null', () => {
    user.links = [];
    user.links.push(null as any);
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
    return expect(str).toBeUndefined();
  });

  it('set null from array field', () => {
    let mdl = arrayField.set(model, null);
    expect(mdl.user!.links![0]).toBeNull();
  });

  it('set from array field', () => {
    let mdl = arrayField.set(model, 'test');
    expect(mdl.user!.links![0]).toEqual('test');
  });

  describe('field position', () => {
    expect(stringField.position().get(model)).toEqual(-1);
    expect(arrayField.position().get(model)).toEqual(0);
    expect(userIdField.position().get(model)).toEqual(-1);
    expect(birthDateField.position().get(model)).toEqual(1);
  });

  describe('function position', () => {
    expect(new Field(birthDateFunction.metadata as FieldMetadata).position().get(model)).toEqual(1);
    expect(new Field(liftedDateFunction.metadata as FieldMetadata).position().get(model)).toBeUndefined();
  });

  describe('function tags', () => {
    expect(new Field(userIdFunction.metadata as FieldMetadata).tags().get(model)).toContain('id');
    expect(new Field(liftedStringFunction.metadata as FieldMetadata).tags().get(model)).toBeUndefined();
  });

  describe('field tags', () => {
    expect(userIdField.tags().get(model)).toEqual(['id']);
    expect(
      userIdField
        .tags()
        .contains('id')
        .get(model)
    ).toEqual(true);
  });

  describe('field siblings', () => {
    model = userIdField.set(model, 8);
    expect(model.user!.id).toBe(8);
    expect(model.user!.id2).toBe(8);
  });
});
