
const controller = require('../controller/followcontroller')
const express = require('express')
const router = express.Router()



// router.get('/content/:id',controller.getfollows);
router.post('/content/:id',controller.togglefollow);
router.get('/content/count',controller.contentfollows);



module.exports = router;