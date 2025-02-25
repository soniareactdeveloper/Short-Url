const express = require('express')
require('dotenv').config()
const dbConnect = require('./Config/dbConnect');
const path = require('path');
const router = require('./Router');
const app = express()
const port = 8000
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.urlencoded({ extended: true }))
app.use(router)
dbConnect()


app.listen(port, () => {
  console.log(`server is running on ${port}`)
})


// mongodb connection passwords
// q2ewaG94bPO6MBgK