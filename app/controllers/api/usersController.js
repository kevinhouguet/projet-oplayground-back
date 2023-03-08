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
    // recuperation du token
    const { id: userId } = req.user;

    let member = await datamapper.getOneMember(parseInt(userId, 10));

    if (!member) {
      throw new NotFoundError();
    }

    member = {
      id: member.id,
      firstname: member.firstname,
      lastname: member.lastname,
      username: member.username,
      email: member.email,
      avatar: member.avatar,
      age: member.age,
      sexe: member.sexe,
      city: member.city,
    };

    res.json(member);
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
    const { id: userId } = req.user;

    const member = await datamapper.getOneMember(parseInt(userId, 10));

    if (!member) throw new NotFoundError();

    await datamapper.deleteOneMember(parseInt(userId, 10));

    res.status(200).end();
  },
  async updateOneMember(req, res) {
    const user = req.body;
    const { id: userId } = req.user;

    const userIsInDB = await datamapper.getOneMember(parseInt(userId, 10));
    if (!userIsInDB) throw new NotFoundError();

    if (user.password && user.password === '') delete user.password;
    if (user.password && user.password !== '') {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      user.password = hashedPassword;
    }

    const userFilled = { ...userIsInDB, ...user };

    let memberUpdated = await datamapper.updateOneMember(userFilled, parseInt(userId, 10));

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

    const searchMemberEmail = await datamapper.getOneMemberByEmail(user.email);

    if (!searchMemberEmail) throw new NotFoundError();

    const match = await bcrypt.compare(user.password, searchMemberEmail.password);

    if (match) {
      const member = { id: searchMemberEmail.id };
      // JWT : https://www.youtube.com/watch?v=mbsmsi7l3r4&t=804s
      const accessToken = jwt.sign(member, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({ accessToken });
    } else {
      throw new ApiError('Data Not Valid', 400, 'User credentials invalid');
    }
  },
};
