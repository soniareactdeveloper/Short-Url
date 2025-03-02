const express = require('express')
require('dotenv').config()
const dbConnect = require('./Config/dbConnect');
const path = require('path');
const router = require('./Router');
const app = express()
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.urlencoded({ extended: true }))
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(router)
dbConnect()


app.listen(8000, () => {
  console.log(`server is running on 8000`)
})


// mongodb connection passwords
// q2ewaG94bPO6MBgK