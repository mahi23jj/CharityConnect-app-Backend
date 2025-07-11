const mongoose = require("mongoose");


const rating = mongoose.Schema({
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    event_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Event' 
    },
    stars:{
        type : Number,
        required : true
    },
    // tags:{
    //     type : [String],
    //     // required : true
    // },
    createdat:{
        type : Date,
        default : new Date()
    }

});

const Rating = mongoose.model("Rating",rating)

module.exports = Rating;
