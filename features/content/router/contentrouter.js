const controller = require('../controller/contentcontroller')

const express = require('express')

const router = express.Router()

router.post('/create', controller.createContent)
router.get('/get', controller.getcontet)


module.exports = router