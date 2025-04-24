// mongosse setup
const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;



mongoose.connect('mongodb://localhost:27017/taskplanner', 
//     {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }
).then(() => {
    console.log('connected to db')
}).catch((err) => {
    console.log(err)
})

// mongoose schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    // password: {
    //     required: true,
    //     type: String
    // }  
})

// mongoose model
const User = mongoose.model('User', userSchema)

const goalschema = new mongoose.Schema({
    title: {
        type:String,
        required: true   
    },
    time: {
        type:String,
        // required: true
        default: "00:00"
    }
})

const Goal = mongoose.model('Goal', goalschema)


app.post('/api/user/setup', async (req, res) => {
    
    
})

