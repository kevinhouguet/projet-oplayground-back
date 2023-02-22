const datamapper = require('../../db/datamapper');

module.exports = {
  async getAllMember(req, res) {
    const members = await datamapper.getAllMember();
    res.json(members);
  },
};
