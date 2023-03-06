const { faker } = require('@faker-js/faker');
const crypto = require('node:crypto');
const db = require('../app/db');

const getRandomInt = require('../app/helpers/getRandomInt');

// FAKE DATA DEPENDANCIES
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
const eventName = ['partie entre amis', 'sport entre amis', 'retrouvailles', 'le grand match'];

const createData = {
  async createRandomMember(communes) {
    return {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.internet.userName(this.firstName, this.lastName),
      password: 'qwerty',
      email: faker.internet.email(this.firstName, this.lastName),
      avatar: faker.internet.avatar(),
      age: getRandomInt(13, 80),
      sexe: faker.name.sex(),
      city: communes[getRandomInt(0, communes.length - 1)].nom.replaceAll("'", "''"),
    };
  },

  async createRandomPlayground(communes) {
    return {
      playgroundId: crypto.randomUUID(),
      name: playgroundName[getRandomInt(0, playgroundName.length - 1)],
      surface: groundNature[getRandomInt(0, groundNature.length - 1)],
      address: faker.address.streetAddress().replaceAll("'", "''"),
      zipCode: communes[getRandomInt(0, communes.length - 1)].codesPostaux[0],
      city: communes[getRandomInt(0, communes.length - 1)].nom.replaceAll("'", "''"),
      picture: '',

    };
  },

  async createRandomEvent() {
    const date = faker.date.soon();
    return {
      name: eventName[getRandomInt(0, eventName.length - 1)],
      max_player: 11,
      start_date: date,
      // https://www.scaler.com/topics/timestamp-to-date-javascript/
      stop_date: new Date(date.setHours(date.getHours() + 2)).toJSON(),
    };
  },
};

const insertData = {
  async insertMember(member) {
    const query = `SELECT * FROM "insert_member"('${JSON.stringify(member)}');`;
    const result = await db.query(query);
    return result.rows;
  },

  async insertPlayground(playground) {
    const query = `SELECT * FROM "insert_playground"('${JSON.stringify(playground)}');`;
    const result = await db.query(query);

    return result.rows;
  },

  async insertEvent(event) {
    const querySelectOneMember = 'SELECT * FROM "member" ORDER BY random() LIMIT 1;';
    const resultOfSelect = await db.query(querySelectOneMember);

    const querySelectOnePlayground = 'SELECT * FROM "playground" ORDER BY random() LIMIT 1;';
    const resultOfSelectOnePlayground = await db.query(querySelectOnePlayground);

    event.member_id = resultOfSelect.rows[0].id;
    event.playground_id = resultOfSelectOnePlayground.rows[0].id;

    const queryInsertEvent = `SELECT * FROM "insert_encounter"('${JSON.stringify(event)}');`;
    const resultOfInsertion = await db.query(queryInsertEvent);

    // const result = await Promise.all([resultOfSelect, resultOfInsertion]);
    return resultOfInsertion.rows;
  },
};

module.exports = {
  createData,
  insertData,
};
