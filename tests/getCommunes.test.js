const getCommunes = require('../data/getCommunes');

describe('getCommunes function', () => {
  it('should return an array of communes <Object>', async () => {
    const communesList = await Promise.resolve(getCommunes());
    console.log(communesList[0]);
    expect(typeof communesList).toBe('object');
  });
});
