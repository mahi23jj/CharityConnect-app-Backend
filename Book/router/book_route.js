
const controller = require('../controller/book_controller')
const express = require('express')
const router = express.Router()



router.get('/',controller.getallbooks);
router.get('/search', controller.searchbook);
router.get('/:id',controller.getbyid);
router.post('/',controller.addbook);
router.put('/:id',controller.updatebook);
router.patch('/:id/rent',controller.rentbook);
router.get('/sort',controller.sortbyyear);


module.exports = router;




