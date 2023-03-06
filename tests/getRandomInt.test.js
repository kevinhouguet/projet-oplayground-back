const getRandomInt = require('../app/helpers/getRandomInt');

describe('getRandomInt function', () => {
  it('should return a number in range of min and max', () => {
    expect(getRandomInt(1, 5)).toBeGreaterThanOrEqual(1);
    expect(getRandomInt(1, 5)).toBeLessThanOrEqual(5);
  });
});
