const Joi = require('joi');

// const zipCodeFRRule = Joi.string().pattern(new RegExp('^\\d{5}$'));

const playgroundSchemas = {
  post: Joi.object({
    name: Joi.string().required(),
    start_date: Joi.date().timestamp(),
    max_player: Joi.number().integer(),
    playgroundId: Joi.string(),
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
