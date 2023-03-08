const datamapper = require('../../db/datamapper');

module.exports = {

  playgroundList: async (req, res) => {
    const { commune, codepostal } = req.query;
    const url = `https://equipements.sports.gouv.fr/api/records/1.0/search/?dataset=data-es&q=nom_commune%3D${commune}`;
    const httpResponse = await fetch(url);
    const data = await httpResponse.json();

    const apiDataArray = [];

    data.records.forEach((playground) => {
      if (playground.fields.codepostal.length < 5) playground.fields.codepostal = `0${playground.fields.codepostal}`;
      // On ajoute une condition sur le code postal pour retrouver l'exacte commune que l'on veut.
      if (playground.fields.codepostal === codepostal || !codepostal) {
        const playgroundFormat = {
          // Voir doc api data-es : https://equipements.sports.gouv.fr/explore/dataset/data-es/information/
          name: playground.fields.nomequipement,
          surface: playground.fields.caract167,
          type: playground.fields.typequipement,
          address: playground.fields.adresse,
          zipCode: playground.fields.codepostal,
          city: playground.fields.commune,
          public: playground.fields.caract159,
          playgroundId: playground.recordid,
        };
        // On retire les salles seulement pour les écoles.
        const onlySchool = playground.fields.caract159 === 'Scolaires, universités';

        if (!onlySchool) {
          apiDataArray.push(playgroundFormat);
        }
      }
    });

    res.json(apiDataArray);
  },

  playgroundById: async (req, res) => {
    const { playgroundId } = req.params;
    const url = `https://equipements.sports.gouv.fr/api/records/1.0/search/?dataset=data-es&q=recordid%3D${playgroundId}`;
    const httpResponse = await fetch(url);
    const data = await httpResponse.json();

    const apiDataArray = [];

    await Promise.all(data.records.map(async (playground) => {
      if (playground.fields.codepostal.length < 5) playground.fields.codepostal = `0${playground.fields.codepostal}`;

      const playgroundFormat = {
        // Voir doc api data-es : https://equipements.sports.gouv.fr/explore/dataset/data-es/information/
        name: playground.fields.nomequipement,
        surface: playground.fields.caract167,
        type: playground.fields.typequipement,
        address: playground.fields.adresse,
        zipCode: playground.fields.codepostal,
        city: playground.fields.commune,
        public: playground.fields.caract159,
        playgroundId: playground.recordid,
        events: [],
      };
      const isPlaygroundAlreadyInDB = await datamapper.isPlaygroundAlreadyInDB(playgroundId);
      if (isPlaygroundAlreadyInDB) {
        const getEvents = await datamapper.getAllEventByPlaygroundId(isPlaygroundAlreadyInDB.id);
        if (getEvents) {
          playgroundFormat.events = getEvents;
        }
      }
      // On retire les salles seulement pour les écoles.
      const onlySchool = playground.fields.caract159 === 'Scolaires, universités';

      if (!onlySchool) {
        apiDataArray.push(playgroundFormat);
      }
    }));
    res.json(apiDataArray[0]);
  },

  // playgroundEvent: (req, res) => {
  //   res.json({ message: 'bienvenue dans mes events' });
  // },
};
