const controller = require('../controller/registercontroller')

const express = require('express')

const router = express.Router() 

router.post('/',controller.registerUser)

module.exports = router
