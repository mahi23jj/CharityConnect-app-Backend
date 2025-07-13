const organization = require('../model/organizations_model')
const users = require('../model/user_model')
const Event = require('../../Event/model/eventmodel')

module.exports={
    organizational_registration: async (req,res)=>{
        try{
        const org = await new organization(req.body);
        org.save()
        res.status(200).json(org)
        }catch (err){
            res.status(400).json(err)
        }
    },
    getorganization:async (req,res)=>{
        const org = await organization.find();
        res.status(200).json(org)
    },
    getorganizationbyid:async (req,res)=>{
     try {
         const orgId = req.params.id;
         
         const org = await organization.findById(orgId);
         const event = await Event.find({creator_id:orgId});

         res.status(200).json({
            org,
            event
         })  
     } catch (error) {
        res.status(400).json(error)
     }
    },
    user_registration: async (req,res)=>{
         try{
        const user = await new users(req.body);
        user.save()
        res.status(200).json(user)
        }catch (err){
            res.status(400).json(err)
        }
        
    },
     getuserbyid:async (req,res)=>{
        const user = await users.findById(req.params.id);
        res.status(200).json(user)
    },

}

// Challenge Friends – “I just donated \$5 to TreeNation. Can you match it?” 
// rating 
// share 
// notification
// get a coin
// propose idea .


