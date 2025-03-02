const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ShortUrl = new Schema({
  url : {
    type : String ,
    required : true,
  },
  shortID : {
    type: String,
    required : true,
  },
  author:{
    ref : "user",
    type: Schema.Types.ObjectId,
  },
  visitHistory : [
    {
     clickedAt :{
       type : Date,
     }
    }
  ]

});

module.exports =  mongoose.model('ShortUrl', ShortUrl);