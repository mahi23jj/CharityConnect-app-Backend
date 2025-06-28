const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  contentlike:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Content',
    default:null
  },
  commentlike:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'comment',
     default:null
  },
  userid : {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required:true
   },
  time: {
    type: Date,
    default: Date.now
  },
  // Add any other optional fields here
});

// likeSchema.index({userid:1},{unique:true})

const like = mongoose.model('like', likeSchema);
module.exports = like;