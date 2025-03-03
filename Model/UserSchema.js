const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  fullname:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  shortUrls: {
    ref: "ShortUrl",
    type: [Schema.Types.ObjectId],
  }
});

module.exports =  mongoose.model('user', UserSchema);