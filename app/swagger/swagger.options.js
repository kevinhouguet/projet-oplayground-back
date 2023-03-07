module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "O'playground API",
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3002/api',
        description: "O'playground API",
      },
    ],
  },
  apis: ['app/*/*/*.js'], // files containing annotations as above
};
