const mongoose = require('mongoose');

const Bookschema=  new mongoose.Schema({
            id:1,
            title: {
                type:String,
                required:true
            },
            auther:{
                type:String,
                required:true
            },
            publishyear:{
                type:Number,
                required:true
            },
            gener:{
                type:String,
                required:true
            },
            rented:{
                type:Boolean,
                default:false
            }

})

const Books = mongoose.model('Books',Bookschema)
module.exports=Books