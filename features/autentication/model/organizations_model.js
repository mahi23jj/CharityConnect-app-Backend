const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  org_name: {
    type: String,
    required: true
  },
  org_email: {
    type: String,
    required: true
  },
  org_phoneno: {
    type: [Number],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
      message: 'At least one phone number is required'
    }
  },
  org_profilepic: {
    type: String,
    default: null
  },
  org_discription: {
    type: String,
    required: true
  },
  org_validation: {
    type: String,
    required: true
  },
  org_specilalization: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
      message: 'At least one specialization is required'
    }
  },
  bank_accounts: {
    type: [
      {
        bank_name: String,
        account_number: Number
      }
    ],
    default: []
  },
  is_verified: {
    type: Boolean,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  certifications :{
    type : [String],
  },
  address:{ 
    type:[
      {
    country: String,
    city: String,
    sub_city: String,
    postal_code: String
  }
]
},
  website_url: String,
  org_telegram: String,
  org_facebook: String,
  org_instagram: String,
  org_whatsapp: String
});

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;
