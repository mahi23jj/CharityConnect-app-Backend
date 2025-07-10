const event = require('../model/eventmodel')

module.exports = {
    // help for posting events for creators
    postevent: async (req, res) => {
        try {
            const newEvent = new event(req.body)
            await newEvent.save()
            res.status(200).json(newEvent)
          
        }catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    },

    // this is for getting all the upcaming events
    getupcomingEvent: async (req, res) => {
        try {

            const events = await event
            .find({eventdate: {$gte: new Date()}})
            .populate({
                path: 'creator_id',
                select: 'org_name org_profilepic'
            });

          const result = event.map((event) => {
            const id = event._id;
            const eventUrl = `https://charity.com/events/${id}`;
            const encodedUrl = encodeURIComponent(eventUrl);
            const encodedTitle = encodeURIComponent(event.eventname);

            return {
                ...event._doc,
                whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
                telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
                twitter:  `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
            };
});


            res.status(200).json(result)
        }catch(err) {
            res.status(500).json({
                message: err.message
            })
    }
    }

}