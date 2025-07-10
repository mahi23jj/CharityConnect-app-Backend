const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    creator_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Organization'
    },
    eventname:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    image_url:{
        type:String,
        required:true
    },
    eventdate:{
        type:Date,
        required:true
    },
    eventlocation:{
        type:String,
        required:true
    }, 
    supportgroup:{
        type:String,
        required:true
    },
    eventcause:{
        type:String,
        required:true
    },
    memories:{
        type:[String] 
    },
    vipseat:{
        type: Number,
        default:0
    },
    Normalseat:{
        type:Number,
        default:0
    },
    Vipseatprice:{
        type:Number,
        default:0
    },
    Normalseatprice:{
        type:Number,
        default:0
    }
});
const event = mongoose.model('Event', EventSchema);

module.exports = event