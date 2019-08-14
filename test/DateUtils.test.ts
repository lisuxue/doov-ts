import {
  formatddMMYYYY,
  formatEEEEddMMMM,
  formatMMMMYYYY,
  formatReadable,
  formatTime,
  formatYYYYMMdd,
  newUTCDate,
  parse,
  clone,
} from 'DateUtils';

describe('format dates', () => {
  it('format YYYYMMdd', () => {
    const date = new Date(2019, 10, 2);
    expect(formatYYYYMMdd(date)).toEqual('20191102');

    const date2 = new Date(2019, 3, 28);
    expect(formatYYYYMMdd(date2)).toEqual('20190428');
  });
  it('format ddMMYYYY', () => {
    const date = new Date(2019, 10, 2);
    expect(formatddMMYYYY(date)).toEqual('02112019');

    const date2 = new Date(2019, 3, 28);
    expect(formatddMMYYYY(date2)).toEqual('28042019');
  });
  it('format readable', () => {
    const date = new Date(2019, 10, 2);
    expect(formatReadable(date)).toEqual('02/11/2019');

    const date2 = new Date(2019, 3, 28);
    expect(formatReadable(date2)).toEqual('28/04/2019');
  });
  it('format MMMMYYYY', () => {
    const date = new Date(2019, 10);
    expect(formatMMMMYYYY(date)).toEqual('November 2019');

    const date2 = new Date(2019, 3, 28);
    expect(formatMMMMYYYY(date2)).toEqual('April 2019');
  });
  it('format MMMMYYYY French', () => {
    const date = new Date(2019, 3, 28);
    expect(formatMMMMYYYY(date, 'fr-FR')).toEqual('avril 2019');

    const date2 = new Date(2019, 11);
    expect(formatMMMMYYYY(date2, 'fr-FR')).toEqual('décembre 2019');
  });
  it('format EEEEddMMMM', () => {
    const date = new Date(2019, 10);
    expect(formatEEEEddMMMM(date)).toEqual('Friday 01 November');

    const date2 = new Date(2019, 3, 28);
    expect(formatEEEEddMMMM(date2)).toEqual('Sunday 28 April');
  });
  it('format EEEEddMMMM French', () => {
    const date = new Date(2019, 3, 28);
    expect(formatEEEEddMMMM(date, 'fr-FR')).toEqual('dimanche 28 avril');

    const date2 = new Date(2019, 11);
    expect(formatEEEEddMMMM(date2, 'fr-FR')).toEqual('dimanche 01 décembre');
  });
  it('format time', () => {
    const date = new Date(2019, 3, 28);
    expect(formatTime(date)).toEqual('000000');

    const date2 = new Date(2019, 11, 12, 12, 10, 11);
    expect(formatTime(date2)).toEqual('121011');
  });
  it('parse yyyyMMdd', () => {
    const expected = newUTCDate(2019, 3, 28);
    expect(parse('20190428')).toEqual(expected);

    const expected2 = newUTCDate(2019, 11, 3);
    expect(parse('20191203')).toEqual(expected2);
  });

  it('format and parse yyyyMMdd', () => {
    const expected = newUTCDate(2019, 3, 28);
    expect(parse(formatYYYYMMdd(expected))).toEqual(expected);

    const expected2 = newUTCDate(2019, 11, 3);
    expect(parse(formatYYYYMMdd(expected2))).toEqual(expected2);

    const expected3 = newUTCDate(2019, 11);
    expect(parse(formatYYYYMMdd(expected3))).toEqual(expected3);
  });
  it('clone date', () => {
    const date = new Date();
    const polly = clone(date);
    const molly = clone(polly);
    expect(polly).toEqual(molly);
  });
  it('new UTC date', () => {
    const utcDate = newUTCDate(2019, 9, 5);
    const date = new Date(2019, 9, 5);
    const timezoneOffset = date.getTimezoneOffset();
    expect(utcDate.toISOString()).not.toEqual(date.toISOString());
    expect(utcDate.valueOf()).toEqual(date.valueOf() - timezoneOffset * 60000);
  });
});
