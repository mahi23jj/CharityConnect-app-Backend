// const mongoose = require('mongoose')

// const organizationschema  = new mongoose.Schema({
//     org_name: {
//                 type:String,
//                 required:true
//             },
//     org_email:{
//                 type:String,
//                 required:true
//             },
//     password:{
//                 type:String,
//                 required:true
//             },
     
// })

// const organization = mongoose.model('organization',organizationschema);
// module.exports = organization;
const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  org_name : {
    type: String,
    required: true
  },
  org_email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // Add any other optional fields here
});

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;
