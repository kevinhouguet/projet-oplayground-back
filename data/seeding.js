const { faker } = require('@faker-js/faker');
const getRandomInt = require('../app/helpers/getRandomInt');

const getCommunes = require('./getData');

(async () => {
  const communes = await getCommunes();

  function createRandomMember() {
    return {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.internet.userName(this.firstName, this.lastName),
      password: 'qwerty',
      email: faker.internet.email(this.firstName, this.lastName),
      avatar: faker.internet.avatar(),
      age: getRandomInt(13, 80),
      sexe: faker.name.sex(),
      city: communes[getRandomInt(0, communes.length)].nom,
    };
  }

  const member = await createRandomMember();
  console.log(member);

  // TODO :
  // creation table de plusieurs membre pour anticiper envoie vers bdd
})();
