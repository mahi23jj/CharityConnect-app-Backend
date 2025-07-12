const mongoose = require('mongoose')

const registerschema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  seatType: {
    type: String,
    enum: ['VIP', 'Normal'],
    default: 'Normal',
    required: true
  },
  registeredAt: {
    type: Date,
    default: new Date()
  },

//   status: {
//     type: String,
//     enum: ['pending', 'confirmed', 'cancelled'],
//     default: 'confirmed'
//   }

});

const Register = mongoose.model('Register', registerschema)

module.exports = Register