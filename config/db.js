const mongoose = require('mongoose')

const db = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/Charity')
        console.log('Database connected')
    }catch(err){
        console.log(err)
    }
}

module.exports=db;