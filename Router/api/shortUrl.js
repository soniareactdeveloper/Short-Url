const express = require('express');
const makeShortUrl = require('../../Controllers/shorturl/makeShortUrl');
const shortUrlRoute = express.Router();

shortUrlRoute.post('/shortUrl', makeShortUrl)


module.exports = shortUrlRoute ;