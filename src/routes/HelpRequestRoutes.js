const routes = require ("express").Router();

const helpRequestController = require("../controllers/HelpRequestController");


routes.post("/sendhelprequest",helpRequestController.sendHelpRequest)
routes.get("/all",helpRequestController.getAllHelpRequests)

module.exports = routes;