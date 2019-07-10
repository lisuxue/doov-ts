import { Model, User } from './model';
import { Field } from '../src/Field';
import { NumberFunction } from '../src/NumberFunction';
import { StringFunction } from '../src/StringFunction';
import { Function } from '../src/Function';

let model: Model;
let user: User;

const num = Function.lift(NumberFunction, 3);
const id = NumberFunction.number(Field.field<Model, number>('user', 'id'));

beforeEach(() => {
  model = new Model();
  user = new User(1);
  user.name = 'test';
  user.b = true;
  model.user = user;
});

describe('number function', () => {
  it('number get', () => {
    expect(id.get(model)).toEqual(1);
    expect(id.isNotNull().get(model)).toEqual(true);
    expect(id.eq(1).get(model)).toEqual(true);
    const b = id
      .isNotNull()
      .and(id.eq(1))
      .and(id.greaterThan(0))
      .get(model);
    expect(b).toEqual(true);
    const s: StringFunction = id.mapTo(StringFunction, v => v!.toString());
    expect(s.eq('1').get(model)).toEqual(true);
  });

  it('number greater than value', () => {
    expect(id.greaterThan(0).get(model)).toEqual(true);
  });

  it('number greater than function', () => {
    expect(id.greaterThan(num).get(model)).toEqual(false);
  });

  it('number greater or equals than value', () => {
    expect(id.greaterOrEquals(1).get(model)).toEqual(true);
  });

  it('number greater or equals than function', () => {
    expect(num.greaterThan(id).get(model)).toEqual(true);
  });

  it('number lesser than value', () => {
    expect(id.lesserThan(num).get(model)).toEqual(true);
  });

  it('number lesser than function', () => {
    expect(id.lesserThan(num).get(model)).toEqual(true);
  });

  it('number lesser or equals than value', () => {
    expect(id.lesserOrEquals(1).get(model)).toEqual(true);
    expect(id.lesserOrEquals(-5).get(model)).toEqual(false);
  });

  it('number lesser or equals than function', () => {
    expect(id.lesserOrEquals(num).get(model)).toEqual(true);
  });

  it('number between than', () => {
    expect(id.between(0, num).get(model)).toEqual(true);
  });

  it('number max', () => {
    expect(NumberFunction.max(num, id, 15).get(model)).toEqual(15);
  });

  it('number min', () => {
    expect(NumberFunction.min(num, id, -2).get(model)).toEqual(-2);
  });

  it('number sum', () => {
    expect(NumberFunction.sum(num, id, 31).get(model)).toEqual(35);
  });

  it('number minus value', () => {
    expect(num.minus(-2).get(model)).toEqual(5);
  });

  it('number minus function', () => {
    expect(num.minus(id).get(model)).toEqual(2);
  });

  it('number plus value', () => {
    expect(num.plus(-2).get(model)).toEqual(1);
  });

  it('number plus function', () => {
    expect(id.plus(num).get(model)).toEqual(4);
  });

  it('number times value', () => {
    expect(num.times(-2).get(model)).toEqual(-6);
  });

  it('number times function', () => {
    expect(num.times(num).get(model)).toEqual(9);
  });

  it('number composed function', () => {
    expect(
      num
        .times(num.plus(4))
        .minus(-1)
        .get(model)
    ).toEqual(22);
  });
});
