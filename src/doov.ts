import { log } from './util';
import moment from 'moment';

export const doov = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    log('boop');
  }
  log('prod');
  log(moment().fromNow());
  return a + b;
};
