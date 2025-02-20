const express = require('express');
const makeShortUrl = require('../../Controllers/shorturl/makeShortUrl');
const shortUrlRoute = express.Router();

shortUrlRoute.get('/shortUrl', makeShortUrl)


module.exports = shortUrlRoute ;