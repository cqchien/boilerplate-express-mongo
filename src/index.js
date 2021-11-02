const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

// Server listen on port
const server = app.listen(config.port, () => {
  logger.info(`Listening on port ${config.port}`);
});

// Connect to db
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error(`Connected failure with error: ${error.message}`);
  });

// Close server and log
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server is closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// log error and close server when have error
const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
