
const controller = require('../controller/likecontroller')
const express = require('express')
const router = express.Router()



router.get('/content/get/:id',controller.getlikes);
router.post('/content/:id',controller.likecontent);
router.post('/comment/:id',controller.likecomment);
router.get('/content/count',controller.contentlikes);
router.get('/comment/count',controller.commentlikes);
router.post('/unlike/content/:id',controller.unlikecontent);
router.post('/unlike/comment/:id',controller.unlikecomment);







module.exports = router;