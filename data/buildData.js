const { faker } = require('@faker-js/faker');
const getRandomInt = require('../app/helpers/getRandomInt');

const getCommunes = require('./getCommunes');

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
  // faire pour le playground
  // faire pour les events -> attention aux cle etrangeres
  // anticiper envoie vers bdd
  // creation d'un type sql qui prend du json
})();
