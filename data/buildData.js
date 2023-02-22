const { faker } = require('@faker-js/faker');
const db = require('../app/db');
const getRandomInt = require('../app/helpers/getRandomInt');

const getCommunes = require('./getCommunes');

// const getPlayground = require ('./getPlayground');

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

  async function insertMember(member) {
    const query = `SELECT "INSERTMEMBER"('${JSON.stringify(member)}');`;
    const result = await db.query(query);

    return result.rows;
  }

  const member = await createRandomMember();
  const newMember = await insertMember(member);
  console.log(newMember);

  const playgroundName = [
    'stade Jean le Bon',
    'salle Jean-Claude Picard',
    'Complexe sportif Marcel Pigou',
    'stade Carpentier',
    'stade André Laurent',
    'stade Le Tiec',
    'stade Boutroux',
    'centre sportif Jules Noêl',
    'stade René Rousseau',
    'centre sportif La Plaine',
    'stade Paul Faber',
    'centre sportif Jesse Owens',
    'terrain de sport Lemercier',
    'centre sportif de Courcelles',
    'playground Daniel Narcisse',
    'stade municipal Nelson Paillou',
    'complexe sportif Jean Jaurès',
    'espace sportif Jean Pierre Rives',
  ];

  const groundNature = ['dur', 'parquet', 'terre battue', 'gazon', 'synthétique', 'moquette'];

  const eventName = ['partie entre amis', 'sport entre amis', 'retrouvailles', ' le grand match'];

  function createRandomPlayground() {
    return {
      name: playgroundName[getRandomInt(0, playgroundName.length)],
      groundNature: groundNature[getRandomInt(0, groundNature.length)],
      address: faker.address.streetAddress(),
      zip_code: communes[getRandomInt(0, communes.length)].codesPostaux[0],
      city: communes[getRandomInt(0, communes.length)].nom,
      picture: '',

    };
  }

  const playground = await createRandomPlayground();
  // console.log(playground);

  function createRandomEvent() {
    return {
      name: eventName[getRandomInt(0, eventName.length)],
      date: faker.date.soon(),
      maxPlayer: 11,
    };
  }

  const event = await createRandomEvent();
  // console.log(event);

  module.exports = {
    member,
    playground,
    event,
  };
})();
