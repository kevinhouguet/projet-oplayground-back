const { faker } = require('@faker-js/faker');
const db = require('../app/db');
const getRandomInt = require('../app/helpers/getRandomInt');

const getCommunes = require('./getCommunes');


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
const eventName = ['partie entre amis', 'sport entre amis', 'retrouvailles', ' le grand match'];


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
      city: communes[getRandomInt(0, communes.length)].nom,
    };
  },

  async createRandomPlayground(communes) {
    return {
      name: playgroundName[getRandomInt(0, playgroundName.length)],
      surface: groundNature[getRandomInt(0, groundNature.length)],
      address: faker.address.streetAddress(),
      zip_code: communes[getRandomInt(0, communes.length)].codesPostaux[0],
      city: communes[getRandomInt(0, communes.length)].nom,
      picture: '',

    };
  },

  async createRandomEvent() {
    const date = faker.date.soon();
    return {
      name: eventName[getRandomInt(0, eventName.length)],
      maxPlayer: 11,
      start_date: date,
      stop_date: date.setHours(date.getHours()+2)
    };
  },
};

const insertData = {
  async insertMember(member) {
    const query = `SELECT "insert_member"('${JSON.stringify(member)}');`;
    const result = await db.query(query);

    return result.rows;
  },

  async insertPlayground (playground) {
      const query = `SELECT "insert_playground"('${JSON.stringify(playground)}');`;
      const result = await db.query(query);

      return result.rows; 
  },

  async insertEvent (event) {
    const query = `SELECT "insert_encounter"('${JSON.stringify(event)}');`;
    const result = await db.query(query);
    return result.rows; 
  },
};

(async () => {
  const communes = await getCommunes();

  const member = await createData.createRandomMember(communes);
  const newMember = await insertData.insertMember(member);

  const playground = await createData.createRandomPlayground(communes);
  const newPlayground = await insertData.insertPlayground(playground);

  const event = await createData.createRandomEvent();
  console.log(event.start_date);
  console.log(Date(event.stop_date));
  const newEvent = await insertData.insertEvent(event);
})();