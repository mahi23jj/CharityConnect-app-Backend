
const controller = require('../controller/user_controller')
const express = require('express')
const router = express.Router()



// router.get('/user/register',controller.getallbooks);
// router.get('/user/login', controller.searchbook);
// router.get('/user/logout',controller.getbyid);
router.post('/charity/register',controller.organizational_registration);
router.post('/user/register',controller.user_registration);
router.get('/charity/get/:id',controller.getorganizationbyid);
// router.patch('/charity/logout',controller.rentbook);



module.exports = router;