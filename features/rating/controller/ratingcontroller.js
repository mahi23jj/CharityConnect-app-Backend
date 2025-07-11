const rating = require('../model/ratingmodel')
const event = require('../../Event/model/eventmodel')


module.exports = {
    addRating : async (req,res)=>{
        try{
            const exist = await rating.findOne({user_id:req.body.user_id,event_id:req.body.event_id})
            if(exist){
                res.status(400).json({message:"Rating Already Exist"})
            }else{
                const newRating = await new rating(req.body);
                newRating.save();
            }
            // const {user_id,event_id,stars,tags} = req.body
            res.status(200).json({message:"Rating Added Successfully",data:newRating})
        }catch(err){
         res.status(500).json({message:"Error in Adding Rating",error:err.message})
    }
    },

    summerizeRating: async (req, res) => {

        try {
            const { event_id } = req.body;

            const result = await rating.aggregate([
            {
                $match: { event_id: event_id }
            },
            {
                $group: {
                _id: "$event_id",
                averageRating: { $avg: "$stars" },
                }
            }
            ]);

            if (result.length === 0) {
            return res.status(404).json({ 
                rating: 0,
                message: "No ratings found for this event." });
            }

            // Optionally update the event model with these values
            // await Event.findByIdAndUpdate(event_id, {
            // averageRating: result[0].averageRating,
            // totalRatings: result[0].totalRatings
            // });

            res.status(200).json({
            averageRating: result[0].averageRating.toFixed(1),
            });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}


