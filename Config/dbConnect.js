const mongoose = require('mongoose');
const dbConnect =()=>{
   mongoose.connect('mongodb+srv://ShortUrl:q2ewaG94bPO6MBgK@shorturl-cluster.h5yan.mongodb.net/ShortUrl?retryWrites=true&w=majority&appName=shortUrl-cluster')
  .then(() => console.log('DB Connect!'));
}

module.exports = dbConnect;