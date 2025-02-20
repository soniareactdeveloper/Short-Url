const express = require('express')
const dbConnect = require('./Config/dbConnect');
const router = require('./Router');

const app = express()
const port = 8000

dbConnect()
app.use(express.json());
app.use(router)


app.listen(port, () => {
  console.log(`server is running on ${port}`)
})


// mongodb connection passwords
// q2ewaG94bPO6MBgK