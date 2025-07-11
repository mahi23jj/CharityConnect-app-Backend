const route = require('express').Router()
const controller = require('../controller/memoriescontroller')

route.post('/create', controller.createMemory)
route.get('/getAll', controller.getMemoriesofEvent)
route.get('/getOne/:id', controller.getMemoriesbyid)

module.exports = route;
