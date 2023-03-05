const Joi = require('joi');

const zipCodeFRRule = Joi.string().pattern(new RegExp('^\\d{5}$'));

const playgroundSchemas = {
  post: Joi.object({
    terrain: {
      name: Joi.string().required(),
      surface: Joi.string().required(),
      type: Joi.string(),
      address: Joi.string().required(),
      zipCode: zipCodeFRRule,
      city: Joi.string().required(),
      playgroundId: Joi.string().required(),
    },
    event: {
      name: Joi.string().required(),
      start_date: Joi.date().timestamp(),
      max_player: Joi.number().integer(),
    },
  }),
  patch: Joi.object({
    name: Joi.string(),
    start_date: Joi.date().timestamp(),
    max_player: Joi.number().integer(),
    playground_id: Joi.string(),
    member_id: Joi.number().integer(),
  }),
};

module.exports = playgroundSchemas;
