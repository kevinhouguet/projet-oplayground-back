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

    if (userId && isNaN(parseInt(userId, 10))) {
      return res.json({ error: 'userId obligatoire' });
    }

    const members = await datamapper.getOneMember(parseInt(userId, 10));

    res.json(members);
  },

  async addOneMember(req, res) {
    const user = req.body;
    const searchMemberEmail = await datamapper.getOneMemberByEmail(user.email);
    const searchMemberUsername = await datamapper.getOneMemberByUsername(user.username);

    if (searchMemberEmail || searchMemberUsername) {
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

    if (userId && isNaN(parseInt(userId, 10))) {
      throw new Error('userId obligatoire');
    }

    await datamapper.getOneMember(parseInt(userId, 10));

    await datamapper.deleteOneMember(parseInt(userId, 10));

    res.status(202).json({ message: 'user deleted successfully' });
  },
  async updateOneMember(req, res) {
    const { id: userId } = req.params;
    const user = req.body;

    if (userId && isNaN(parseInt(userId, 10))) {
      throw new Error('userId obligatoire');
    }

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    user.password = hashedPassword;

    let memberUpdated = await datamapper.updateOneMember(user, parseInt(userId, 10));

    memberUpdated = {
      id: memberUpdated.id,
      firstname: memberUpdated.firstname,
      lastname: memberUpdated.lastname,
      username: memberUpdated.username,
      email: memberUpdated.email,
      avatar: memberUpdated.avatar,
      age: memberUpdated.age,
      sexe: memberUpdated.sexe,
      city: memberUpdated.city,
    };

    res.status(200).json(memberUpdated);
  },

  async compareMember(req, res) {
    const user = req.body;

    let searchMemberEmail = await datamapper.getOneMemberByEmail(user.email);

    const match = await bcrypt.compare(user.password, searchMemberEmail.password);

    if (match) {
      searchMemberEmail = {
        id: searchMemberEmail.id,
        email: searchMemberEmail.email,
        username: searchMemberEmail.username,
        firstname: searchMemberEmail.firstname,
        lastname: searchMemberEmail.lastname,
        avatar: searchMemberEmail.avatar,
        age: searchMemberEmail.age,
        sexe: searchMemberEmail.sexe,
        city: searchMemberEmail.city,
        created_at: searchMemberEmail.created_at,
        updated_at: searchMemberEmail.updated_at,
      };

      res.status(200).json(searchMemberEmail);
    } else {
      throw new Error('user mail or password incorrect');
    }
  },
};
