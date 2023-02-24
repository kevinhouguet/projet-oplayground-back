const bcrypt = require('bcrypt');
const datamapper = require('../../db/datamapper');

const saltRounds = 10;

module.exports = {
  async getAllMember(req, res) {
    const members = await datamapper.getAllMember();
    res.json(members);
  },

  async getOneMember(req, res) {
    const { id: userId } = req.params;

    if (userId && isNaN(parseInt(userId))) {
      return res.json({ error: 'userId obligatoire' });
    }

    const members = await datamapper.getOneMember(parseInt(userId, 10));

    res.json(members);
  },

  async addOneMember(req, res) {
    const user = req.body;
    const searchMmemberEmail = await datamapper.getOneMemberByEmail(user.email);
    const searchMemberUsername = await datamapper.getOneMemberByUsername(user.username);

    if (searchMmemberEmail || searchMemberUsername) {
      throw new Error('user already exist');
    }

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    user.password = hashedPassword;

    let newUser = await datamapper.addOneMember(user);

    newUser = {
      id: newUser.id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
      age: newUser.age,
      sexe: newUser.sexe,
      city: newUser.city,
    };

    res.status(201).json(newUser);
  },
  async deleteOneMember(req, res) {
    const { id: userId } = req.params;

    if (userId && isNaN(parseInt(userId))) {
      return res.json({ error: 'userId obligatoire' });
    }

    const member = await datamapper.getOneMember(parseInt(userId, 10));

    if (!member) {
      throw new Error('user not found');
    }

    await datamapper.deleteOneMember(parseInt(userId, 10));

    res.status(202).json({ message: 'user deleted successfully' });
  },
};
