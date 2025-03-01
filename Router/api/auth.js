const express = require('express');
const login = require('../../Controllers/auth/login');
const registrations = require('../../Controllers/auth/registration');
const authRoute = express.Router();

authRoute.post('/registrations', registrations);

authRoute.post('/login', login)


module.exports = authRoute;