const Joi = require('joi');

const emailRule = Joi.string().min(2).pattern(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+.[a-z]+$/);

// const schema = Joi.object({
//   "email" "email"
//   "username"
//   "password"
//   "firstname"
//   "lastname"
//   "avatar"
//   "age"
//   "sexe"
//   "city"
// })
