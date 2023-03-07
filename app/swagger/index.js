const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = require('./swagger.options');

const openapiSpecification = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  openapiSpecification,
};
