const comments = require('../model/commentmodel')
const contents = require('../../content/model/contentmodel')



module.exports={
    createcomment: async (req,res)=>{
        try{
            const {contentid} = req.param.id;
            const {username,comment} = req.body; 
            const commentdata= await new comments({
                contentid:contentid,
                username:username,
                comment:comment
            })
            commentdata.save()
        res.status(200).json(commentdata)
        }catch (err){
            res.status(400).json(err)
        }
    },
   
    getcomment:async (req,res)=>{
        const {contentid} = req.param.id;
        const org = await comments.find({contentid}).sort({time:-1});
        res.status(200).json(org)
    },
    //  getcommentbyid:async (req,res)=>{
    //     const org = await comment.findById(req.params.id);
    //     res.status(200).json(org)
    // }
}