const Joi = require('joi');
require('dotenv').config();

// const emailRule = Joi.string().pattern(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+.[a-z]+$/);
const emailRule = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });

const passwordRule = Joi.string().pattern(new RegExp(process.env.PASSWORD_RULE));

const userSchemas = {
  post: Joi.object({
    email: emailRule.required(),
    username: Joi.string().alphanum().required(),
    password: passwordRule.required(),
    firstname: Joi.string().alphanum(),
    lastname: Joi.string().alphanum(),
    avatar: Joi.string().alphanum(),
    age: Joi.number().integer(),
    sexe: Joi.string().alphanum(),
    city: Joi.string().alphanum(),
  }),
  patch: Joi.object({
    username: Joi.string().alphanum(),
    password: passwordRule,
    firstname: Joi.string().alphanum(),
    lastname: Joi.string().alphanum(),
    avatar: Joi.string().alphanum(),
    age: Joi.number().integer(),
    sexe: Joi.string().alphanum(),
    city: Joi.string().alphanum(),
  }),
  signin: Joi.object({
    email: emailRule.required(),
    password: passwordRule.required(),
  }),
};

module.exports = userSchemas;
