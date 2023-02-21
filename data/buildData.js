const { faker } = require('@faker-js/faker');
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

  const member = await createRandomMember();
  //console.log(member);

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


const groundNature = ['dur', 'parquet','terre battue', 'gazon', 'synthétique','moquette'




]







  function createRandomPlayground() {
    return {
      name: playgroundName[getRandomInt(0, playgroundName.length)],
      groundNature: groundNature [getRandomInt(0,groundNature.length)],
      address: faker.address.streetAddress (),
      zip_code: communes[getRandomInt(0, communes.length)].codesPostaux[0],
      city: communes[getRandomInt(0, communes.length)].nom,
      picture: '',
     


    }

  }


  const playground = await createRandomPlayground();
  console.log(playground);








  // TODO :
  // faire pour le playground
  // faire pour les events -> attention aux cle etrangeres
  // anticiper envoie vers bdd
  // creation d'un type sql qui prend du json
})();
