const { Router } = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../docs/swaggerDef');

const router = Router();

const options = {
  swaggerDefinition,
  apis: ['src/docs/*.yml', './src/routes/*.js'],
};

const openApiSpecification = swaggerJsdoc(options);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(openApiSpecification, { explorer: true }));

module.exports = router;
