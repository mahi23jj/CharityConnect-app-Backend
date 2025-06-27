const content = require('../model/contentmodel')
const Event = require('../model/eventmodel')

module.exports={
    createContent:async(req,res)=>{
        const contents = await new content(req.body);
        contents.save()
        res.status(200).json({message:"content created"})
    },

    getcontet:async(req,res)=>{
         const contents = await content.find()
         res.status(200).json(contents)
    },
    
}


// 685da0009fb0345dcacbbf5b