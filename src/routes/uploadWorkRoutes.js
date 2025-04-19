const routes = require('express').Router()
const uploadWorkController=  require("../controllers/uploadWorkController")

routes.post('/upload', uploadWorkController.uploadWork);
routes.post('/addwithfile',uploadWorkController.uploadWorkWithFile)

module.exports = routes;