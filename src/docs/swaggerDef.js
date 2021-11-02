const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Template API documentation',
    version,
    description:
      'This is an API document for Events Marketing - Template projects. Read README.md to setup something before start.',
    license: {
      name: 'MIT',
    },
    contact: {
      email: 'caochientp1@gmail.com',
    },
  },
  servers: [
    {
      url: `${config.server.URL_DEPLOY}`,
      description: 'Online',
    },
    {
      url: `http://localhost:${config.port}`,
      description: 'Local',
    },
  ],
  tags: [
    {
      name: 'auth',
      description: 'Authentication for account.',
    },
    { name: 'user', description: 'Everything about user' },
  ],
};

module.exports = swaggerDef;
