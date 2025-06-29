const follow = require('../model/followmodel')

module.exports={
    togglefollow:async (req,res)=>{
        try{
            const contentid = req.params.id;
            const {userid} = req.body; 

            const exist = await follow.find({userid:userid});

            if(exist){
                   await follow.findOneAndDelete({userid:userid,contentfollow:contentid});
                    res.status(200).json({
                        follow:false
                    }
                    );
            }else{
                const followdata= await new follow(
                    {
                        contentfollow:contentid,
                        userid:userid
                    }
                )
              await followdata.save()
            res.status(200).json( {follow:true});
            }
        }catch (err){
            res.status(400).json({message:err.message})
        }
    },
    // followcontent: async (req,res)=>{
    //     try{
    //         const contentid = req.params.id;
    //         const {userid} = req.body; 
    //         const followdata= await new follow(
    //             {
    //                 contentfollow:contentid,
    //                 userid:userid
    //             }
    //         )
    //       await followdata.save()
    //     res.status(200).json(followdata)
    //     }catch (err){
    //         res.status(400).json({message:err.message})
    //     }
    // },
    // unfollowcontent: async (req,res)=>{
    //     try{
    //         const contentid = req.params.id;
    //         const {userid} = req.body; 
    //         await follow.findOneAndDelete({userid:userid,contentfollow:contentid});
    //         res.status(200);
    //     }catch (err){
    //         res.status(400).json({message:err.message})
    //     }
    // },

   
    getfollowers:async (req,res)=>{
        try{
        const contentid = req.params.id;
        const org = await follow.find({contentfollow:contentid}).sort({time:-1});
        res.status(200).json(org)
        }catch (err) {
      res.status(400).json({ message: err.message });
    }
    },
    getfollowed:async (req,res)=>{
        try{
        const userid = req.params.id;
        const org = await follow.find({userid:userid});
        res.status(200).json(org)
        }catch (err) {
    res.status(400).json({ message: err.message });
    }
    },
    
    countfollows:async (req,res)=>{
         try{
        const contentid = req.params.id;
        const count = await follow.countDocuments({contentfollow:contentid});
        res.status(200).json({
            follow:count
        })
        }catch (err) {
      res.status(400).json({ message: err.message });
    }
    },   
     countfollowing:async (req,res)=>{
         try{
        const userid = req.params.id;
        const count = await follow.countDocuments({userid:userid});
        res.status(200).json({
            following:count
        })
        }catch (err) {
      res.status(400).json({ message: err.message });
    }
    },     
}