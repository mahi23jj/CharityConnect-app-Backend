const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  username : {
    type: String,
    required: true
  },
  useremail: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // Add any other optional fields here
});

const user = mongoose.model('user', userschema);
module.exports = user;