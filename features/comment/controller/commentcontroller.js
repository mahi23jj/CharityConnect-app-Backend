const comments = require('../model/commentmodel')

module.exports={
    createcomment: async (req,res)=>{
        try{
            const contentid = req.params.id;
            const {username,comment} = req.body; 
            const commentdata= await new comments({
                contentid:contentid,
                username:username,
                comment:comment
            })
            commentdata.save()
        res.status(200).json(commentdata)
        }catch (err){
            res.status(400).json({message:err})
        }
    },
   
    getcomment:async (req,res)=>{
        const contentid = req.param.id;
        const org = await comments.find({contentid:contentid});
        res.status(200).json(org)
    },
    getreplaycomment:async (req,res)=>{
        const replayid = req.params.id;
        const org = await comments.find({replayto:replayid}).sort({time:-1});
        res.status(200).json(org)
    },
     replaycomment:async (req,res)=>{
        try{
            const targetid = req.params.id;
            const {username,comment} = req.body; 
    
    
            const org = await new comments({
                comment:comment,
                username:username,
                replayto:targetid
            })
           await org.save();
            res.status(200).json(org)

        }catch(err){
             res.status(400).json({message:err})
        }
    }
}