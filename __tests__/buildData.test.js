const { createData } = require('../data/buildData');
// const getCommunes = require('../data/getCommunes');

const communes = [{ nom: 'Paris', codesPostaux: ['75001'] }];

describe('createData.createRandomMember method', () => {
  it('should return a member type object', async () => {
    const generateRandomMember = await createData.createRandomMember(communes);
    expect(typeof generateRandomMember).toBe('object');
    expect(generateRandomMember).toHaveProperty('firstname');
    expect(generateRandomMember).toHaveProperty('lastname');
    expect(generateRandomMember).toHaveProperty('username');
    expect(generateRandomMember).toHaveProperty('password');
    expect(generateRandomMember).toHaveProperty('email');
    expect(generateRandomMember).toHaveProperty('avatar');
    expect(generateRandomMember).toHaveProperty('age');
    expect(generateRandomMember).toHaveProperty('sexe');
    expect(generateRandomMember).toHaveProperty('city');
  });
});
