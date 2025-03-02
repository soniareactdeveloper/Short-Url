const express = require('express');
const authRoute = require('./auth');
const shortUrlRoute = require('./shortUrl');
const validateUser = require('../../middleware/AuthValidation');
const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);

apiRoute.use('/generate', validateUser, shortUrlRoute)

module.exports = apiRoute;