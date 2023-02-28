module.exports = {

  playgroundList: async (req, res) => {
    const { commune, codepostal } = req.query;
    const url = `https://equipements.sports.gouv.fr/api/records/1.0/search/?dataset=data-es&q=nom_commune%3D${commune}`;
    const httpResponse = await fetch(url);
    const data = await httpResponse.json();

    const renderData = [];

    // Voir doc api data-es : https://equipements.sports.gouv.fr/explore/dataset/data-es/information/
    data.records.forEach((element) => {
      // On ajoute une condition sur le code postal pour retrouver l'exacte commune que l'on veut.
      if (element.fields.codepostal === codepostal || !codepostal) {
        // On retire les salles seulement pour les écoles.
        const onlySchool = element.fields.caract159 === 'Scolaires, universités';
        if (!onlySchool) {
          renderData.push({
            name: element.fields.nominstallation,
            surface: element.fields.caract167,
            type: element.fields.typequipement,
            address: element.fields.adresse,
            zipCode: element.fields.codepostal,
            city: element.fields.commune,
            public: element.fields.caract159,
          });
        }
      }
    });

    // res.json(data.records[0].fields.nominstallation);
    res.json(renderData);
  },

  // playgroundById: (req, res) => {
  //   res.json({ message: 'voici les infos sur le terrain demandé' });
  // },

  playgroundEvent: (req, res) => {
    res.json({ message: 'bienvenue dans mes events' });
  },
};
