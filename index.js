const express = require('express')
require('dotenv').config()
const dbConnect = require('./Config/dbConnect');
const path = require('path');
const router = require('./Router');
const app = express()
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.urlencoded({ extended: true }))
 app.use(express.json());
var cookieParser = require('cookie-parser')
app.use(cookieParser())
 app.use(router)
dbConnect()


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







 // mongodb connection passwords
// q2ewaG94bPO6MBgK