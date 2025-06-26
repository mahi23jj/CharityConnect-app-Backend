
const controller = require('../controller/commentcontroller')
const express = require('express')
const router = express.Router()



router.get('/get/:id',controller.getcomment);
router.post('/create/:id',controller.createcomment);





module.exports = router;