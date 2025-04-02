const routes = require("express").Router();

const userTaskController = require("../controllers/UserTaskController")

routes.post("/add",userTaskController.addUserTask)
routes.get("/allusertask",userTaskController.getAllUserTask)
routes.get("/usertask/:id",userTaskController.getUserTaskById)
routes.delete("/usertask/:id",userTaskController.deleteUserTask)



module.exports = routes;