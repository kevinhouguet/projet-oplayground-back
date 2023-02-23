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

  async addOneMember(req, res) {
    const users = req.body;
    const searchMmemberEmail = await datamapper.getOneMemberByEmail(users.email);
    const searchMemberUsername = await datamapper.getOneMemberByUsername(users.username);

    if(searchMmemberEmail || searchMemberUsername){
      throw new Error('test');
    } 

    const newUser = await datamapper.addOneMember(users);

    res.json(newUser);
  }
};
