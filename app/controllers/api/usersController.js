const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const datamapper = require('../../db/datamapper');
const ApiError = require('../../errors/ApiError');
const NotFoundError = require('../../errors/NotFound');

const saltRounds = 10;

module.exports = {
  async getAllMember(req, res) {
    const members = await datamapper.getAllMember();
    res.json(members);
  },

  async getOneMember(req, res) {
    const { userId } = req.params;

    if (!userId) {
      throw new ApiError('Data Not Valid', 400, 'At least one mandatory data in error');
    }

    let members = await datamapper.getOneMember(parseInt(userId, 10));

    if (!members) {
      throw new NotFoundError();
    }

    members = {
      id: members.id,
      firstname: members.firstname,
      lastname: members.lastname,
      username: members.username,
      email: members.email,
      avatar: members.avatar,
      age: members.age,
      sexe: members.sexe,
      city: members.city,
    };

    res.json(members);
  },

  async addOneMember(req, res) {
    const user = req.body;

    if (!user.email || !user.password) {
      throw new ApiError('Data Not Valid', 400, 'At least one mandatory data is not transmit');
    }

    const searchMemberEmail = await datamapper.getOneMemberByEmail(user.email);
    const searchMemberUsername = await datamapper.getOneMemberByUsername(user.username);

    if (searchMemberEmail || searchMemberUsername) {
      throw new ApiError('Already Exist', 400, 'User already exist');
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
    const { userId } = req.params;

    if (userId && isNaN(parseInt(userId, 10))) {
      throw new ApiError('Data Not Valid', 400, 'At least one mandatory data in error');
    }

    await datamapper.getOneMember(parseInt(userId, 10));

    await datamapper.deleteOneMember(parseInt(userId, 10));

    res.status(202).json({ message: 'user deleted successfully' });
  },
  async updateOneMember(req, res) {
    const { userId } = req.params;
    const user = req.body;

    if (userId && isNaN(parseInt(userId, 10))) {
      throw new ApiError('Data Not Valid', 400, 'At least one mandatory data in error');
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

  async connectMember(req, res) {
    const user = req.body;

    let searchMemberEmail = await datamapper.getOneMemberByEmail(user.email);

    if (!searchMemberEmail) {
      throw new NotFoundError();
    }

    const match = await bcrypt.compare(user.password, searchMemberEmail.password);

    if (match) {
      searchMemberEmail = {
        id: searchMemberEmail.id,
        username: searchMemberEmail.username,
      };
      // JWT : https://www.youtube.com/watch?v=mbsmsi7l3r4&t=804s
      const accessToken = jwt.sign(searchMemberEmail, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({ accessToken });
    } else {
      throw new ApiError('Data Not Valid', 400, 'At least one mandatory data in error');
    }
  },
};
