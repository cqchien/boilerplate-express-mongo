const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const httpStatus = require('http-status');
const router = require('./routes');
const Exception = require('./utils/exception');
const { convertException, handleException } = require('./middlewares/exception.middleware');

const app = express();

// Config Passport
require('./config/passport');

// Set security HTTP headers
app.use(helmet());

// Parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// API routes
app.use('/', router);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new Exception(httpStatus.NOT_FOUND, 'API Not Found'));
});

// Convert other error to Exception
app.use(convertException);

// Handle error to send to user
app.use(handleException);
module.exports = app;
