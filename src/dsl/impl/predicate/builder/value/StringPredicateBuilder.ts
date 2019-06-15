import { StringEqualToPredicate } from '../../leaf/string/StringEqualToPredicate';
import { StringCheckPredicate } from '../../leaf/string/StringCheckPredicate';
import { StringEmptyPredicate } from '../../leaf/string/StringEmptyPredicate';
import { StringContainPredicate } from '../../leaf/string/StringContainPredicate';
import { StringRegExpPredicate } from '../../leaf/string/StringRegExpPredicate';
import { StringStartWithPredicate } from '../../leaf/string/StringStartWithPredicate';
import { StringEndWithPredicate } from '../../leaf/string/StringEndWithPredicate';
import { PredicateBuilder } from '../PredicateBuilder';
import { Predicate } from '../../../../Predicate';

export class StringPredicateBuilder implements PredicateBuilder<string> {
  parent: PredicateBuilder<any>;

  constructor(parent: PredicateBuilder<any>) {
    this.parent = parent;
  }

  equalTo(value: string) {
    return new StringEqualToPredicate(this, value);
  }

  checking(predicate: (value: string) => boolean) {
    return new StringCheckPredicate(this, predicate);
  }

  empty() {
    return new StringEmptyPredicate(this);
  }

  containing(value: string) {
    return new StringContainPredicate(this, value);
  }

  startingWith(value: string) {
    return new StringStartWithPredicate(this, value);
  }

  endingWith(value: string) {
    return new StringEndWithPredicate(this, value);
  }

  matching(regExp: RegExp) {
    return new StringRegExpPredicate(this, regExp);
  }

  build(predicate: Predicate<string>) {
    return this.parent.build(value => predicate(value as string));
  }
}
