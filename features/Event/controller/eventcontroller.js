const Event = require('../model/eventmodel'); // Use singular, PascalCase
const Register = require('../../Register/model/registermodel'); // Use PascalCase

module.exports = {
  /**
   * POST /api/events
   * Allows organizations to post a new event
   */
  createEvent: async (req, res) => {
    try {
      const newEvent = new Event(req.body);
      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  /**
   * GET /api/events
   * Fetch all events with optional filters
   */
  getAllEvents: async (req, res) => {
    try {
      const {
        type: filterType,
        search,
        location,
        supportgroup,
        category,
      } = req.query;

      let filter = {};

      // Filter by time
      if (filterType === 'upcoming') {
        filter.eventdate = { $gte: new Date() };
      } else if (filterType === 'past') {
        filter.eventdate = { $lt: new Date() };
      }

      // Search by event name
      if (search) {
        filter.eventname = { $regex: search, $options: 'i' };
      }

      // Filter by location
      if (location) {
        filter.eventlocation = { $regex: location, $options: 'i' };
      }

      // Filter by support group
      if (supportgroup) {
        const groups = Array.isArray(supportgroup)
          ? supportgroup
          : supportgroup.split(',');
        filter['supportgroup.main'] = { $in: groups };
      }

      // Filter by category (event cause)
      if (category) {
        filter.eventcause = { $in: [category] };
      }

      const events = await Event.find(filter).populate({
        path: 'creator_id',
        select: 'org_name org_profilepic',
      });

      res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  /**
   * GET /api/events/:id
   * Fetch event details by ID
   */
  getEventById: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id).populate({
        path: 'creator_id',
        select: 'org_name org_profilepic',
      });

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      res.status(200).json(event);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  /**
   * POST /api/events/:id/register
   * Register a user to an event (Normal or VIP)
   */
  registerToEvent: async (req, res) => {
    try {
      const { user, seatType } = req.body;
      const eventId = req.params.id;

      if (!user || !seatType) {
        return res
          .status(400)
          .json({ message: 'User ID and seat type are required' });
      }

      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Prevent duplicate registration
      const alreadyRegistered = await Register.findOne({
        user_id: user,
        event_id: event._id,
      });

      if (alreadyRegistered) {
        return res
          .status(400)
          .json({ message: 'Already registered for this event' });
      }

      // Prevent registration for past events
      if (new Date(event.eventdate) < new Date()) {
        return res
          .status(400)
          .json({ message: 'Cannot register for past events' });
      }

      // Handle seat allocation
      if (seatType === 'VIP') {
        if (event.vipseat <= 0) {
          return res.status(400).json({ message: 'VIP seats are sold out' });
        }
        event.vipseat--;
      } else if (seatType === 'Normal') {
        if (event.Normalseat <= 0) {
          return res
            .status(400)
            .json({ message: 'Regular seats are sold out' });
        }
        event.Normalseat--;
      } else {
        return res.status(400).json({ message: 'Invalid seat type' });
      }

      await event.save(); // Update seat counts

      const registration = await Register.create({
        user: user,
        event: event._id,
        seatType: seatType,
      });

      res.status(201).json(registration);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};


// const Events = require('../model/eventmodel')
// const register = require('../../Register/model/registermodel')



// module.exports = {
//     // help for posting events for creators
//     postevent: async (req, res) => {
//         try {
//             const newEvent = new Events(req.body)
//             await newEvent.save()
//             res.status(200).json(newEvent)
          
//         }catch (err) {
//             res.status(500).json({
//                 message: err.message
//             });
//         }
//     },

//   getAllEvents: async (req, res) => {
//     try {
//         const {
//             type: filterType,
//             search,
//             location,
//             supportgroup, 
//             category       
//          } = req.query;

//           let filter = {};
//           if (filterType== 'upcoming') {
//               filter.eventdate = {$gte: new Date()}; 
//           }else if (filterType == 'past') {
//               filter.eventdate = {$lt: new Date()};
//           }

//            if (search) {
//       filter.eventname = { $regex: search, $options: 'i' };
//     }

//      if (location) {
//       filter.eventlocation = { $regex: location, $options: 'i' };
//     }


//      if (supportgroup) {
//       const groups = Array.isArray(supportgroup)
//         ? supportgroup
//         : supportgroup.split(',');
//       filter.supportgroup = { $in: groups };
//     }


//       if (category) {
//       filter.eventcause = { $in: [category] }; 
//     }


//     const events = await events
//         .find(filter)
//         .populate({
//             path: 'creator_id',
//             select: 'org_name org_profilepic'
//         });


//     res.status(200).json(events);
//     }catch (err) {
//       res.status(500).json({
//         message: err.message,
//       })
//     }
//   },


//   // get event by id 
//   getEventById: async (req, res) => {
//     try {
//       const eventdetail= await events.findById(req.params.id)
//         .populate({
//           path: 'creator_id',
//           select: 'org_name org_profilepic'
//         })
//         res.status(200).json(eventdetail);
//     }catch (err) {
//       res.status(500).json({
//         message: err.message,
//       })
//     }
//   },


// // const participants = await Register.countDocuments({ event_id: eventId });


//   registerEvent: async (req, res) => {
//   try {
//     const {user,seatType} = req.body;
//     const event = await events.findById(req.params.id);


//     if (!user || !seatType) {
//       return res.status(400).json({ message: 'User ID and seat type are required' });
//     }

//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }

//     // 🔐 Prevent repitative regsitartion
//     const exists = await register.findOne({ user_id: user, event_id: event._id });
//     if (exists) return res.status(400).json({ message: 'Already registered for this event' });


//     // 🔐 Prevent registration for past events
//     if (new Date(event.eventdate) < new Date()) {
//       return res.status(400).json({ message: 'Cannot register for past events' });
//     }

//     // 🪑 Check seat availability
//     if (seatType === 'VIP') {
//       if (event.vipseat <= 0) {
//         return res.status(400).json({ message: 'VIP seats are not available' });
//       }
//       event.vipseat--;
//     } else if (seatType === 'Normal') {
//       if (event.Normalseat <= 0) {
//         return res.status(400).json({ message: 'Regular seats are not available' });
//       }
//       event.Normalseat--;
//     } else {
//       return res.status(400).json({ message: 'Invalid seat type' });
//     }

//     // ✅ Save updated seat count
//     await event.save();

//     // 📝 Create registration
//     const registered = await register.create({
//         user: user,
//         event: event._id,
//         seatType: seatType,
//     });

//     res.status(200).json(registered);

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// },













//     // this is for getting all the upcaming events
// //     getupcomingEvent: async (req, res) => {
// //         try {
// //             const user = req.query.user;
// //             if (!user) return res.status(400).json({ message: 'User ID is required' });
            
// //             // to get the list of all upcoming events
// //             const events = await event
// //             .find({eventdate: {$gte: new Date()}})
// //             .populate({
// //                 path: 'creator_id',
// //                 select: 'org_name org_profilepic'
// //             });

// //             const eventids= events.map((event) => event._id);

            
// //             // to get what user registered for
// //             const registereduser = await register.find({
// //                 user_id: user,
// //                 event_id: {$in: eventids}
// //             }).select('event_id');

           
// //       const registeredset = new set(registereduser.map((event) => event.event_id));
            

// //           const result = events.map((event) => {
// //             const id = event._id;
// //             const eventUrl = `https://charity.com/events/${id}`;
// //             const encodedUrl = encodeURIComponent(eventUrl);
// //             const encodedTitle = encodeURIComponent(event.eventname);

// //             return {
// //                 ...event._doc,
// //                 whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
// //                 facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
// //                 telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
// //                 twitter:  `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
// //                 isregirtered: registeredset.has(id)
// //             };
// // });


// //             res.status(200).json(result)
// //         }catch(err) {
// //             res.status(500).json({
// //                 message: err.message
// //             })
// //     }
// //     }

// // }
// }