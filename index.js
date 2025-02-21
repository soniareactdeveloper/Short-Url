const express = require('express')
const dbConnect = require('./Config/dbConnect');
const path = require('path');
const router = require('./Router');
const app = express()
const port = 8000
app.set("view engine", "ejs");

dbConnect()
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Public')));
app.use(router)


app.listen(port, () => {
  console.log(`server is running on ${port}`)
})


// mongodb connection passwords
// q2ewaG94bPO6MBgK