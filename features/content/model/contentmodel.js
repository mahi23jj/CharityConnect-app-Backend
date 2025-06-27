const mongoose = require('mongoose')
const commentSchema = require('../../comment/model/commentmodel')

const contentSchema = new mongoose.Schema({
    creator_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Organization'
    },
    discription: String,
    image_url:String,
    catagory:{
        type:String,
        default:'info'
    }
    
});
const Content = mongoose.model('Content', contentSchema);

module.exports = Content