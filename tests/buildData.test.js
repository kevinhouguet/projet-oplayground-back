const { createData } = require('../data/buildData');
// const getCommunes = require('../data/getCommunes');

const communes = [{ nom: 'Paris', codesPostaux: ['75001'] }];
const generateRandomMember = createData.createRandomMember(communes);

describe('createData.createRandomMember method', () => {
  it('should return a member object', () => {
    expect(typeof generateRandomMember).toBe('object');
    expect(generateRandomMember).objectContaining({
      firstname: expect.any(String),
    });
  });
});
