import { Model, User } from '../../model';
import * as DOOV from '../../../src/doov';
import { DateFunction } from '../../../src/dsl/lang/DateFunction';
import { newUTCDate } from '../../../src/DateUtils';
import { NumberFunction } from '../../../src/dsl/lang/NumberFunction';

let model: Model;
let user: User;

const date = new Date(2019, 8, 11);
const birthDate = new Date(2000, 0, 2);
const dateFunction = DOOV.lift(DateFunction, date);
const dateField = DOOV.date(DOOV.field<Date>('user', 'birth'));
const nameField = DOOV.string(DOOV.field<string>('user', 'name'));
const dateNameField = DOOV.dateIso(nameField);

beforeEach(() => {
  model = new Model();
  user = new User(1);
  user.name = 'test';
  user.b = true;
  user.birth = birthDate;
  model.user = user;
  jest.spyOn(global.Date, 'now').mockImplementation(() => new Date('2018-05-14T00:00:00.000Z').valueOf());
});

describe('date function', () => {
  it('get date', () => {
    expect(dateFunction.get(model)).toEqual(date); // 2019-09-10T22:00:00.000Z
  });
  it('date eq', () => {
    const equalty = dateFunction.eq(date);
    expect(equalty.get(model)).toEqual(true);
    const equaltyNull = dateFunction.eq(DOOV.lift(DateFunction, null));
    expect(equaltyNull.get(model)).toEqual(false);
  });
  it('format iso date', () => {
    expect(dateFunction.formatISO().get(model)).toEqual('20190911');
  });
  it('this year', () => {
    expect(DateFunction.thisYear().get(model)).toEqual(2018);
  });
  it('this month', () => {
    expect(DateFunction.thisMonth().get(model)).toEqual(5);
  });
  it('today', () => {
    expect(DateFunction.today().get(model)).toEqual(new Date('2018-05-14T00:00:00.000Z'));
  });
  it('tomorrow', () => {
    expect(DateFunction.tomorrow().get(model)).toEqual(new Date('2018-05-15T00:00:00.000Z'));
  });
  it('parse date', () => {
    const actual = DateFunction.dateFrom('20190501').get(model);
    const expected = new Date(2019, 4, 1, 0, 0, 0);
    expect(actual).toEqual(expected);
  });
  it('new date', () => {
    const expected = newUTCDate(2019, 4, 1);
    expect(DateFunction.newDate(2019, 4, 1).get(model)).toEqual(expected);
  });
  it('new local date', () => {
    const expected = new Date(2019, 4, 1);
    expect(DateFunction.newLocalDate(2019, 4, 1).get(model)).toEqual(expected);
  });
  it('date field', () => {
    expect(dateField.get(model)).toEqual(birthDate);
  });
  it('year of', () => {
    expect(dateField.yearOf().get(model)).toEqual(2000);
  });
  it('year of', () => {
    expect(dateField.monthOf().get(model)).toEqual(0);
  });
  it('date of', () => {
    expect(dateField.dateOf().get(model)).toEqual(2);
  });
  it('last day of last year', () => {
    const lastDayOfLastYear = new Date(1999, 11, 31);
    expect(dateField.withLastDayOfLastYear().get(model)).toEqual(lastDayOfLastYear);
  });
  it('first day of next year', () => {
    const firstDayOfNextYear = new Date(2001, 0, 1);
    expect(dateField.withFirstDayOfNextYear().get(model)).toEqual(firstDayOfNextYear);
  });
  it('with year', () => {
    expect(dateField.withYear(1990).get(model)).toEqual(new Date(1990, 0, 2));
    expect(dateField.withYear(DOOV.lift(NumberFunction, 2000)).get(model)).toEqual(new Date(2000, 0, 2));
  });
  it('with month', () => {
    expect(dateField.withMonth(3).get(model)).toEqual(new Date(2000, 3, 2));
    expect(dateField.withMonth(DOOV.lift(NumberFunction, 4)).get(model)).toEqual(new Date(2000, 4, 2));
  });
  it('with day', () => {
    expect(dateField.withDayOfMonth(28).get(model)).toEqual(new Date(2000, 0, 28));
    expect(dateField.withDayOfMonth(DOOV.lift(NumberFunction, 2)).get(model)).toEqual(new Date(2000, 0, 2));
  });
  it('format ISO', () => {
    expect(dateField.formatISO().get(model)).toEqual('20000102');
  });
  it('format day month year', () => {
    expect(dateField.dayMonthYear().get(model)).toEqual('02012000');
  });
  it('minus years value', () => {
    expect(dateField.minusYears(3).get(model)).toEqual(new Date(1997, 0, 2));
  });
  it('minus years function', () => {
    expect(dateField.minusYears(DOOV.lift(NumberFunction, 4)).get(model)).toEqual(new Date(1996, 0, 2));
  });
  it('plus years value ', () => {
    expect(dateField.plusYears(3).get(model)).toEqual(new Date(2003, 0, 2));
  });
  it('plus years function', () => {
    expect(dateField.plusYears(DOOV.lift(NumberFunction, 4)).get(model)).toEqual(new Date(2004, 0, 2));
  });
  it('minus months value', () => {
    expect(dateField.minusMonths(3).get(model)).toEqual(new Date(1999, 9, 2));
  });
  it('minus months function', () => {
    expect(dateField.minusMonths(DOOV.lift(NumberFunction, 4)).get(model)).toEqual(new Date(1999, 8, 2));
  });
  it('plus months value', () => {
    expect(dateField.plusMonths(14).get(model)).toEqual(new Date(2001, 2, 2));
  });
  it('plus months function', () => {
    expect(dateField.plusMonths(DOOV.lift(NumberFunction, 15)).get(model)).toEqual(new Date(2001, 3, 2));
  });
  it('minus days value', () => {
    expect(dateField.minusDays(3).get(model)).toEqual(new Date(1999, 11, 30));
  });
  it('minus days function', () => {
    expect(dateField.minusDays(DOOV.lift(NumberFunction, 4)).get(model)).toEqual(new Date(1999, 11, 29));
  });
  it('plus days value', () => {
    expect(dateField.plusDays(14).get(model)).toEqual(new Date(2000, 0, 16));
  });
  it('plus days function', () => {
    expect(dateField.plusDays(DOOV.lift(NumberFunction, 15)).get(model)).toEqual(new Date(2000, 0, 17));
  });
  it('before value', () => {
    expect(dateField.before(new Date(2000, 0, 3)).get(model)).toEqual(true);
    expect(dateField.beforeOrEquals(new Date(2000, 0, 2)).get(model)).toEqual(true);
  });
  it('before function', () => {
    expect(dateField.before(DateFunction.newDate(2000, 0, 3)).get(model)).toEqual(true);
    expect(dateField.beforeOrEquals(DateFunction.newLocalDate(2000, 0, 2)).get(model)).toEqual(true);
  });
  it('after value', () => {
    expect(dateField.after(new Date(1999, 11, 31)).get(model)).toEqual(true);
    expect(dateField.afterOrEquals(new Date(2000, 0, 2)).get(model)).toEqual(true);
  });
  it('after function', () => {
    expect(dateField.after(DateFunction.newDate(1999, 11, 31)).get(model)).toEqual(true);
    expect(dateField.afterOrEquals(DateFunction.newLocalDate(2000, 0, 2)).get(model)).toEqual(true);
  });
  it('max', () => {
    model = dateField.set!(model, null);
    const max = DateFunction.max(
      new Date(2100, 0, 2),
      DateFunction.dateFrom('20010203'),
      DateFunction.newDate(1993, 4, 7),
      dateField
    );
    expect(max.get(model)).toEqual(new Date(2100, 0, 2));
  });
  it('min', () => {
    model = dateField.set!(model, null);
    const min = DateFunction.min(
      DateFunction.newDate(1993, 4, 7),
      new Date(2100, 0, 2),
      DateFunction.dateFrom('20010203'),
      dateField
    );
    expect(min.get(model)).toEqual(newUTCDate(1993, 4, 7));
  });
  it('between value', () => {
    const between = dateField.between(DateFunction.dateFrom('19660203'), new Date(2100, 0, 2));
    expect(between.get(model)).toEqual(true);
  });
  it('number of months since', () => {
    const monthsSince = DateFunction.nbFullMonthsSince(DateFunction.dateFrom('20010203'));
    expect(monthsSince.get(model)).toEqual(207);
    const monthsSince2 = DateFunction.nbFullMonthsSince(DateFunction.dateFrom('20010329'));
    expect(monthsSince2.get(model)).toEqual(205);
    const monthsSince3 = DateFunction.nbFullMonthsSince(DateFunction.dateFrom('20010215'));
    expect(monthsSince3.get(model)).toEqual(206);
  });
  it('number of years between', () => {
    const monthsSince = DateFunction.nbFullYearsBetween(DateFunction.dateFrom('20010203'), new Date(2010, 9, 30));
    expect(monthsSince.get(model)).toEqual(9);
    const monthsSince2 = DateFunction.nbFullYearsBetween(
      DateFunction.dateFrom('20001003'),
      DateFunction.dateFrom('201010301003')
    );
    expect(monthsSince2.get(model)).toEqual(10);
  });
  it('number of months between value', () => {
    const monthsSince = DateFunction.nbFullMonthsBetween(DateFunction.dateFrom('20010203'), new Date(2010, 9, 30));
    expect(monthsSince.get(model)).toEqual(116);
  });
  it('number of months between function', () => {
    const dateFunction = DateFunction.newDate(2010, 9, 30);
    const monthsSince = DateFunction.nbFullMonthsBetween(DateFunction.dateFrom('20010203'), dateFunction);
    expect(monthsSince.get(model)).toEqual(116);
  });
  it('number of years between function', () => {
    const birthday = DateFunction.dateFrom('20010203');
    const yearsSince = birthday.ageAt(DateFunction.newDate(2010, 9, 30));
    expect(yearsSince.get(model)).toEqual(9);
    const birthday2 = DateFunction.dateFrom('20011003');
    const yearsSince2 = birthday2.ageAt(DateFunction.newDate(2010, 9, 30));
    expect(yearsSince2.get(model)).toEqual(9);
    const birthday3 = DateFunction.dateFrom('20011010');
    const yearsSince3 = birthday3.ageAt(new Date(2010, 9, 3));
    expect(yearsSince3.get(model)).toEqual(8);
  });
});

describe('date iso function', () => {
  const newDate = new Date(2019, 6, 24);
  model = dateNameField.set!(model, newDate);
  expect(model.user!.name).toEqual('20190724');
  expect(nameField.get(model)).toEqual('20190724');
  expect(dateNameField.get(model)).toEqual(newDate);
});

describe('date iso function get set null', () => {
  model = dateNameField.set!(model, null);
  expect(dateNameField.get(model)).toBeNull();
  expect(model.user!.name).toBeNull();
});
