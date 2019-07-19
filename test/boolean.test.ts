import { Model, User } from './model';
import { Field } from 'Field';
import { BooleanFunction } from 'BooleanFunction';
import { Function } from 'Function';

let model: Model;
let user: User;

const A = Function.lift(BooleanFunction, true);
const B = BooleanFunction.boolean(Field.field<Model, boolean>('user', 'b'));

beforeEach(() => {
  model = new Model();
  user = new User(1);
  user.name = 'test';
  user.b = true;
  model.user = user;
});

describe('boolean function', () => {
  it('boolean get eq', () => {
    expect(B.get(model)).toEqual(true);
    expect(B.isNotNull().get(model)).toEqual(true);
    expect(B.eq(true).get(model)).toEqual(true);
    const b = B.isNotNull()
      .and(B.eq(true))
      .get(model);
    expect(b).toEqual(true);
  });

  it('boolean and', () => {
    expect(B.and(A).get(model)).toEqual(true);
  });

  it('boolean or', () => {
    expect(B.or(false).get(model)).toEqual(true);
  });
});
