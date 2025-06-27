
const controller = require('../controller/commentcontroller')
const express = require('express')
const router = express.Router()



router.get('/get/:id',controller.getcomment);
router.get('/replay/:id',controller.getreplaycomment);
router.post('/create/:id',controller.createcomment);
router.post('/replay/:id',controller.replaycomment)





module.exports = router;