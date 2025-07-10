const controller = require('../controller/eventcontroller')
const express = require('express')
const router = express.Router()

router.get('/get/upcomingevents', controller.getupcomingEvent)
router.post('/post', controller.postevent)

module.exports = router

// http://localhost:5000/api/Event/get/upcomingevents