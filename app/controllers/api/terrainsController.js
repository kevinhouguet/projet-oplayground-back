module.exports = {

  playgroundList: async (req, res) => {
    const { inseeCode } = req.params;
    const url = `https://equipements.sports.gouv.fr/api/records/1.0/search/?dataset=data-es&q=codeinsee%3D${inseeCode}`;
    const httpResponse = await fetch(url);
    const data = await httpResponse.json();

    const renderData = data.records.map((element) => ({
      name: element.fields.nominstallation,
      surface: element.fields.caract167,
      address: element.fields.adresse,
      zipCode: element.fields.codepostal,
      city: element.fields.commune,
    }));
    // console.log(renderData);

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
