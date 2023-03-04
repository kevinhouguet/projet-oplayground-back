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
    firstname: Joi.string(),
    lastname: Joi.string(),
    avatar: Joi.string(),
    age: Joi.number().integer(),
    sexe: Joi.string().alphanum(),
    city: Joi.string(),
  }),
  patch: Joi.object({
    username: Joi.string().alphanum(),
    password: passwordRule.allow(''),
    firstname: Joi.string(),
    lastname: Joi.string(),
    avatar: Joi.string(),
    age: Joi.number().integer(),
    sexe: Joi.string().alphanum(),
    city: Joi.string(),
  }),
  signin: Joi.object({
    email: emailRule.required(),
    password: passwordRule.required(),
  }),
};

module.exports = userSchemas;
