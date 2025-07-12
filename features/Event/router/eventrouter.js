const controller = require('../controller/eventcontroller')
const express = require('express')
const router = express.Router()

router.get('/get', controller.getAllEvents)
router.get('/get/:id', controller.getEventById )
router.post('/post', controller.postevent)
router.post('/register/:id' , controller.registerEvent)

module.exports = router

// http://localhost:5000/api/Event/get/upcomingevents