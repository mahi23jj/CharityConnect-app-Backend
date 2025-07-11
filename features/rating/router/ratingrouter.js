const controller = require('../controller/ratingcontroller')
const router = require('express').Router()

router.post('/', controller.addRating)
router.get('/average', controller.summerizeRating)

module.exports = router