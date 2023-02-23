const datamapper = require('../../db/datamapper');

module.exports = {
  async getAllMember(req, res) {
    const members = await datamapper.getAllMember();
    res.json(members);
  },

  async getOneMember(req, res) {
    const { id: userId } = req.params;

    if (userId && isNaN(parseInt(userId))) {
      return res.json({error: "userId obligatoire"});
    }

    const members = await datamapper.getOneMember(parseInt(userId));

    res.json(members);
  },
};
