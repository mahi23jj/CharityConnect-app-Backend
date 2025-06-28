const content = require('../model/contentmodel')
const like = require('../model/likemodel')
const Event = require('../model/eventmodel')

module.exports={
    createContent:async(req,res)=>{
        const contents = await new content(req.body);
        contents.save()
        res.status(200).json({message:"content created"})
    },

    getcontet:async(req,res)=>{
        const userid = req.query.userid;
         const contents = await content
         .find()
         .populate({
            path:'creator_id',
            select:'org_name org_specilalization org_profilepic'
         });

         const contentIds = contents.map(c => c._id);
   
        const userlike =await like.find(
            {
                userid:userid,
                contentlike:{$in: contentIds}
            }
        ).select('contentlike')

        const likesCounts = await like.aggregate([
            { $match: { contentlike: { $in: contentIds } } },
            { $group: { _id: "$contentlike", count: { $sum: 1 } } }
            ]);

            const likesMap = {};
            likesCounts.forEach(item => {
                 likesMap[item._id.toString()] = item.count;
            });

      
         const likedSet = new Set(userlike.map(l => l.contentlike.toString()))


         const result = contents.map(content => {
            const contentId = content._id.toString();
            const likeCount = likesMap[contentId] || 0;
            return {
                ...content._doc,
                islikedbyuser: likedSet.has(contentId),
                likes: likeCount
            }
         });


         res.status(200).json(result)
    },
    
}


// 685da0009fb0345dcacbbf5b