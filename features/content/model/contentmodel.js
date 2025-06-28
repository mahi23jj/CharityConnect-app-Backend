const mongoose = require('mongoose')
const commentSchema = require('../../comment/model/commentmodel')

const contentSchema = new mongoose.Schema({
    creator_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Organization'
    },
    discription: String,
    image_url:String,
    likes:{
        type:[String],
        default:[]
    },
    Follow:{
        type:[String],
        default:[]
    }
    
});
const Content = mongoose.model('Content', contentSchema);

module.exports = Content
// catagory:{
//     type:String,
//     default:'info'
// }