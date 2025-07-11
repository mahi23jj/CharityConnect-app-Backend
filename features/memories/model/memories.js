const mongoose = require('mongoose');

const memoriesSchema = new mongoose.Schema({
    event_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Event'
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    photos:{
        type:
        {
            photo:{
                type:[String],
                required:true
            },
            discription:{
                type:String,
            }
        }
    
},

});

const memories = mongoose.model('memories', memoriesSchema);

module.exports = memories;