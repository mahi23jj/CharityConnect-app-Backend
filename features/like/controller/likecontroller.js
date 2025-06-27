const like = require('../model/likemodel')

module.exports={
    likecontent: async (req,res)=>{
        try{
            const contentid = req.params.id;
            const {userid} = req.body; 
            const likedata= await new like({
                userid:userid,
                contentlike:contentid, 
               
            })
          await likedata.save()
        res.status(200).json(likedata)
        }catch (err){
            res.status(400).json({message:err.message})
        }
    },
    unlikecontent: async (req,res)=>{
        try{
            const contentid = req.params.id;
            const {userid} = req.body; 
            await like.findOneAndDelete({userid:userid,contentlike:contentid});
            res.status(200);
        }catch (err){
            res.status(400).json({message:err.message})
        }
    },

   
    getlikes:async (req,res)=>{
        try{
        const contentid = req.params.id;
        const org = await like.find({contentlike:contentid}).sort({time:-1});
        res.status(200).json(org)
        }catch (err) {
      res.status(400).json({ message: err.message });
    }
    },
    contentlikes:async (req,res)=>{
         try{
        const contentid = req.params.id;
        const count = await like.countDocuments({contentlike:contentid});
        res.status(200).json({
            liked:count
        })
        }catch (err) {
      res.status(400).json({ message: err.message });
    }


    },    
    commentlikes:async (req,res)=>{
        try{
        const contentid = req.params.id;
        const count = await like.countDocuments({commentlike:contentid});
        res.status(200).json({
            liked:count
        })
        }catch (err) {
      res.status(400).json({ message: err.message });
    }


    },
     likecomment:async (req,res)=>{
        try{
            const targetid = req.params.id;
            const {userid} = req.body; 

            const org = await new like({
              commentlike:targetid,
              userid:userid
            })
            await org.save();
            res.status(200).json(org)

        }catch(err){
             res.status(400).json({message:err.message})
        }
    },
    unlikecomment:async (req,res)=>{
        try{
            const targetid = req.params.id;
            const {userid} = req.body; 

            await like.findOneAndDelete({commentlike:targetid,userid:userid});
            res.status(200);

        }catch(err){
             res.status(400).json({message:err.message})
        }
    }
}