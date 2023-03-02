const nodemailer = require('nodemailer');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const NotFoundError = require('../../errors/NotFound');
const UserInputError = require('../../errors/UserInputError');
const datamapper = require('../../db/datamapper');
const ApiError = require('../../errors/ApiError');

module.exports = {
  async process(req, res) {
    const { email } = req.body;

    if (!email) {
      throw new UserInputError();
    }

    const searchMemberEmail = await datamapper.getOneMemberByEmail(email);
    if (!searchMemberEmail) {
      throw new NotFoundError();
    }
    const resetPasswordToken = jwt.sign({ email }, process.env.ASK_RESET_PASSWORD_TOKEN);

    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'k.houguet@gmail.com', // generated ethereal user
        pass: '75fgU81hzn6Xap3M', // generated ethereal password
      },
    });

    const info = await transporter.sendMail({
      from: '"Admin Oplayground" <no-reply@oplayground.com>', // sender address
      to: `${email}`, // list of receivers
      subject: 'Asking to reset your password', // Subject line
      text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
      + 'Please click on the following link, or paste this into your browser to complete the process:\n\n'
      + `http://${req.headers.host}/resetpassword/${resetPasswordToken}\n\n`
      + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
      + 'Please click on the following link, or paste this into your browser to complete the process:\n\n'
      + `http://${req.headers.host}/resetpassword/${resetPasswordToken}\n\n`
      + 'If you did not request this, please ignore this email and your password will remain unchanged.\n', // html body
    });

    res.send('Forget Password');
  },

  reset(req, res) {
    const token = req.params;
    if (token == null) {
      throw new ApiError('Access Token Null', 401, 'Please add a token');
    }
    console.log(token);
    jwt.verify(token, process.env.ASK_RESET_PASSWORD_TOKEN, (err, user) => {
      if (err) {
        throw new ApiError('Forbidden Request', 403, 'Forbidden');
      }
      req.user = user;
    });

    console.log(user);

    res.send('coucou');
  },
};
