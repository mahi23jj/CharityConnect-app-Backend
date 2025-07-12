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
        main:{
            type:[String],
               enum: [
                'Education Access',
                'Gender Equality',
                'Health & Wellness',
                'Mental Health Support',
                'Human Rights',
                'Environmental Justice',
                'Economic Empowerment',
                'Food Security',
                'Domestic Violence',
                // 'Drug & Alcohol',
            ], 
            required:true
        },
        sub:{
            type:[String],
             enum :[
                   'Cancer',
                   'HIV & AIDS',
                    'parkinson',
                    'Autism',
                    'FND',
                    'Anxiety',
                    'Depression',
                    'Parkinson',
                    'PTSD',
                    'Epilepsy',
                    'ADHD',
                    'Down Syndrome',
            ],
        }
    },
    eventcause:{
        type:[String],
          enum: [
           'Women & Girls',
            'Children',
            'Youth',
            'Elderly',
            'Disabilities',
            'Refugees & Migrants',
            'Indigenous Communities',
            'Veterans & Military Families',
            'Minority Communities',
            'Poverty',
            ],
        required:true
    },
    memories:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'memories'
    },
    relatedpic:{
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