const express = require('express');
const authRoute = require('./auth');
const shortUrlRoute = require('./shortUrl');
const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);

apiRoute.use('/generate', shortUrlRoute)

module.exports = apiRoute;