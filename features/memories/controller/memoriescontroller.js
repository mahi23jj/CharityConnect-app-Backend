const memories = require('../model/memories')

module.exports = {
    createMemory: async (req, res) => {
        try {
            const newMemory = new memories({ 
                user_id:req.body.user_id,
                event_id: req.body.event_id,
                photos:{
                    photo: req.body.photo,
                    discription: req.body.description
                }
             })
            await newMemory.save()
            res.status(201).json({ message: 'Memory created successfully' })
        }catch (error) {
            res.status(500).json({ message: 'Error creating memory', error })
           
        }
    },
    getMemoriesofEvent: async (req, res) => {
        try {
            const eventid = req.query.event_id;
            const Memory = await memories.find({event_id: eventid})
            res.status(200).json(Memory)
        }catch (error) {
            res.status(500).json({ message: 'Error getting memories', error })
        }   
    },
    getMemoriesbyid: async (req, res) => {
        try {
            const Memory = await memories.findById(req.params.id)
            res.status(200).json(Memory)
        }catch (error) {
            res.status(500).json({ message: 'Error getting memories', error }) 
        }
    }
}


