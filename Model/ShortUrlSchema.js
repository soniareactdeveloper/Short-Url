const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ShortUrl = new Schema({
  url : {
    type : String ,
    required : true,
  },
  shortId : String,

});

module.exports =  mongoose.model('ShortUrl', ShortUrl);