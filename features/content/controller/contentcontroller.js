const content = require('../model/contentmodel')
const like = require('../../like/model/likemodel')
const Event = require('../model/eventmodel')
const follow = require('../../Follow/model/followmodel')

module.exports={
    createContent:async(req,res)=>{
        const contents = await new content(req.body);
        contents.save()
        res.status(200).json({message:"content created"})
    },

getcontet: async (req, res) => {
  try {
    const userid = req.query.userid;
    if (!userid) return res.status(400).json({ message: 'User ID is required' });

    const contents = await content.find().populate({
      path: 'creator_id',
      select: 'org_name org_specilalization org_profilepic'
    });

    const contentIds = contents.map(c => c._id);


   // to cheak whether user like it or not
    const userlike = await like.find({
      userid: userid,
      contentlike: { $in: contentIds }
    }).select('contentlike');
    
    const likedSet = new Set(userlike.map(l => l.contentlike.toString()));

    // to get content like
    const likesCounts = await like.aggregate([
      { $match: { contentlike: { $in: contentIds } } },
      { $group: { _id: "$contentlike", count: { $sum: 1 } } }
    ]);

    const likesMap = {};
    likesCounts.forEach(item => {
      likesMap[item._id.toString()] = item.count;
    });

    // to cheak whether user Follow or not the content
    const userFollow = await follow.find({
        userid:userid,
        contentfollow : {$in:contentIds}
    }).select('contentfollow');

    const followset = new set(userFollow.map(f=>f.contentfollow.toString()))

    const result = contents.map(content => {
      const contentId = content._id.toString();
      const likeCount = likesMap[contentId] || 0;
      return {
        ...content._doc,
        islikedbyuser: likedSet.has(contentId),
        isfollowedbyuser:followset.has(contentId),
        likes: likeCount
      };
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

    
}


// 685da0009fb0345dcacbbf5b