const mongoose = require('mongoose');
const dbConnect =()=>{
   mongoose.connect(process.env.DB_URL)
  .then(() => console.log('DB Connect!'));
}

module.exports = dbConnect;