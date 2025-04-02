const routes = require("express").Router();
const statusController = require("../controllers/StatusController")

routes.post("/add",statusController.addStatus)
routes.get("/all",statusController.getAllStatus)

module.exports = routes