import { flatMap } from '../src/Utils';

describe('flat array', () => {
  it('should be identity if flat', () => {
    const flatArray = [1, 2, 3, 4, 5];
    expect(flatMap(flatArray)).toStrictEqual(flatArray);
  });

  it('should work with one level', () => {
    const flatArray = [1, 2, 3, 4, 5];
    const arrayToFlatten = [1, 2, [3, 4, 5]];
    expect(flatMap(arrayToFlatten)).toStrictEqual(flatArray);
  });
});
