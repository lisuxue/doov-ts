import { Model, User } from '../../model';
import { StringFunction } from '../../../src/dsl/lang/StringFunction';
import * as DOOV from '../../../src/doov';
import { ValidationRule } from '../../../src/doov';
import { DefaultContext } from '../../../src/doov';
import { Field } from '../../../src/doov';

let model: Model;
let user: User;

const B = DOOV.boolean(DOOV.field<boolean, Model>('user', 'b'));
const ID = DOOV.number(DOOV.field<number, Model>('user', 'id'));
const NAME: StringFunction = DOOV.string(Field.field<string, Model>('user', 'name'));

beforeEach(() => {
  model = new Model();
  user = new User(1);
  user.name = 'test';
  user.b = true;
  model.user = user;
});

describe('validations', () => {
  it('single validation rule', () => {
    const validationRule: ValidationRule = DOOV.when(B.and(ID.greaterOrEquals(0).or(NAME.endsWith('st')))).validate();
    const context = new DefaultContext(false);
    const result = validationRule.execute(model, context);
    expect(result.value).toBeTruthy();
    expect(result.context.getValues).toContainEqual({ metadata: B.metadata, value: true });
    expect(result.context.getValues).toContainEqual({ metadata: ID.metadata, value: 1 });
    expect(result.context.getValues).toContainEqual({ metadata: NAME.metadata, value: 'test' });
  });

  it('multiple validation rules', () => {
    const validationRule: ValidationRule = DOOV.validations(
      DOOV.when(B.and(ID.greaterOrEquals(0))).validate(),
      DOOV.when(B.and(NAME.endsWith('st'))).validate()
    );
    const context = new DefaultContext();
    const result = validationRule.execute(model, context);
    expect(result.value).toBeTruthy();
    expect(result.context.getValues).toContainEqual({ metadata: B.metadata, value: true });
    expect(result.context.getValues).toContainEqual({ metadata: ID.metadata, value: 1 });
  });

  it('should fail on first rule', () => {
    const validationRule: ValidationRule = DOOV.validations(
      DOOV.when(B.and(ID.greaterOrEquals(2))).validate(),
      DOOV.when(B.and(NAME.endsWith('st'))).validate()
    );
    const context = new DefaultContext();
    const result = validationRule.execute(model, context);
    expect(result.value).toBeFalsy();
    expect(result.context.getValues).toContainEqual({ metadata: B.metadata, value: true });
    expect(result.context.getValues).toContainEqual({ metadata: ID.metadata, value: 1 });
  });

  it('should fail on second rule', () => {
    const validationRule: ValidationRule = DOOV.validations(
      DOOV.when(B.and(ID.greaterOrEquals(0))).validate(),
      DOOV.when(B.and(NAME.endsWith('ts'))).validate()
    );
    const context = new DefaultContext();
    const result = validationRule.execute(model, context);
    expect(result.value).toBeFalsy();
    expect(result.context.getValues).toContainEqual({ metadata: B.metadata, value: true });
    expect(result.context.getValues).toContainEqual({ metadata: ID.metadata, value: 1 });
  });

  it('should fail on the first falsy rule', () => {
    const validationRule: ValidationRule = DOOV.validations(
      DOOV.when(B.and(ID.greaterOrEquals(2))).validate(),
      DOOV.when(B.and(NAME.endsWith('ts'))).validate()
    );
    const context = new DefaultContext();
    const result = validationRule.execute(model, context);
    expect(result.value).toBeFalsy();
    expect(result.context.getValues).toContainEqual({ metadata: B.metadata, value: true });
    expect(result.context.getValues).toContainEqual({ metadata: ID.metadata, value: 1 });
  });
});
