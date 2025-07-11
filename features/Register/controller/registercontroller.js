const register = require('../model/registermodel')

module.exports = {
    registerUser: async (req, res) => {
        try {
            const registered = await register.create(req.body)
            res.status(200).json(registered)
            
        }catch(err){
            res.status(500).json(err)
        }   
    },

    updateseat :async (req, res) => {
        try {
            const updated = await register.updateOne(
                {user: req.body.userId, event: req.body.eventId}, 
                {$set: {seatType: req.body.seatType}})
        }catch(err){
            res.status(500).json(err)
        
    }
}
}
