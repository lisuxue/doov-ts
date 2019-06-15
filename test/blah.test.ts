import { doov } from '../src/doov';
import { Predicates } from '../src/dsl/impl/predicate/builder/Predicates';

describe('blah', () => {
  it('works', () => {
    expect(doov(1, 1)).toEqual(2);
  });
  it('test', () => {
    console.log(Predicates.true.getPredicate()());
    console.log(Predicates.false.getPredicate()());
    console.log(
      Predicates.field('test')
        .is.aString.startingWith('azer')
        .getPredicate()({ ['test']: 'azert' }, {})
    );
    console.log(
      Predicates.field('test')
        .isNot.aString.startingWith('azer')
        .getPredicate()({ ['test']: 'azert' }, {})
    );
    expect(Predicates.true.getPredicate()()).toEqual(true);
  });
});
