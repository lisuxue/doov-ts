import { Model, User } from '../../model';
import * as DOOV from 'doov';
import { Field } from 'dsl/Field';
import { ValidationRule } from 'dsl/lang/ValidationRule';
import { StringFunction } from 'dsl/lang/StringFunction';
import { DefaultContext } from 'dsl/DefaultContext';

let model: Model;
let user: User;

const B = DOOV.boolean(DOOV.field<Model, boolean>('user', 'b'));
const ID = DOOV.number(DOOV.field<Model, number>('user', 'id'));
const NAME: StringFunction = DOOV.string(Field.field<Model, string>('user', 'name'));
const LINK1 = DOOV.string(DOOV.field<Model, string>('user', 'links', 0));

beforeEach(() => {
  model = new Model();
  user = new User(1);
  user.name = 'test';
  user.b = true;
  model.user = user;
});

describe('context intercepts values', () => {
  it('get values', () => {
    const validationRule: ValidationRule = DOOV.when(B.and(ID.greaterOrEquals(0).or(NAME.endsWith('st')))).validate();
    const context = new DefaultContext(false);
    const result = validationRule.execute(model, context);
    expect(result.context.getValues).toContainEqual({ metadata: B.metadata, value: true });
    expect(result.context.getValues).toContainEqual({ metadata: ID.metadata, value: 1 });
    expect(result.context.getValues).toContainEqual({ metadata: NAME.metadata, value: 'test' });
  });

  it('get values with short circuit', () => {
    const validationRule: ValidationRule = DOOV.when(B.and(ID.greaterOrEquals(0).or(NAME.endsWith('st')))).validate();
    const context = new DefaultContext();
    const result = validationRule.execute(model, context);
    expect(result.context.getValues).toContainEqual({ metadata: B.metadata, value: true });
    expect(result.context.getValues).toContainEqual({ metadata: ID.metadata, value: 1 });
  });

  it('set values', () => {
    const mappings = DOOV.mappings(DOOV.map(NAME).to(LINK1), DOOV.map(NAME.length()).to(ID));
    const context = new DefaultContext(false);
    model = mappings.execute(model, context);
    expect(context.setValues).toContainEqual({ metadata: ID.metadata, value: 4 });
    expect(context.setValues).toContainEqual({ metadata: LINK1.metadata, value: 'test' });
    expect(model!.user!.id).toEqual(4);
    expect(model!.user!.links![0]).toEqual('test');
  });

  it('set values with short circuit', () => {
    const mappings = DOOV.mappings(DOOV.map(NAME).to(LINK1), DOOV.map(NAME.length()).to(ID));
    const context = new DefaultContext();
    model = mappings.execute(model, context);
    expect(context.setValues).toContainEqual({ metadata: ID.metadata, value: 4 });
    expect(context.setValues).toContainEqual({ metadata: LINK1.metadata, value: 'test' });
    expect(model!.user!.id).toEqual(4);
    expect(model!.user!.links![0]).toEqual('test');
  });
});
