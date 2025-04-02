const routes = require('express').Router();

const taskController = require("../controllers/TaskController");

routes.post("/addtask",taskController.addTask)
routes.get("/alltasks",taskController.getAllTasks)
routes.get("/tasks/:id",taskController.getTaskById)
routes.delete("/task/:id",taskController.deleteTask)





module.exports = routes;