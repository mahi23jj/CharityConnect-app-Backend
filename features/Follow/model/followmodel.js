const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  contentfollow:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Content',
    required:true
  },
  userid : {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required:true
   }
  // Add any other optional fields here
});

followSchema.index({userid:1,contentfollow:1}, {unique:true});

const follow = mongoose.model('follow', followSchema);
module.exports = follow;