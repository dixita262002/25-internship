const routes = require('express').Router();

const taskController = require("../controllers/TaskController");
//const { authenticate } = require('../middlewares/AuthMiddleware');

routes.post("/addtask",taskController.addTask)
routes.get("/all",taskController.getAllTasks)
routes.get("/tasks/:id",taskController.getTaskById)
routes.delete("/taskdelete/:id",taskController.deleteTask)
routes.put("/updatetask/:id",taskController.updateTask)
//routes.put("/assignTask",taskController.assignTask)
routes.put("/assignTask/:id", taskController.assignTask); 

routes.get("/getTasksByTeamMember/:teamMemberId",taskController.getTasksByTeamMemberId)
//routes.put("/updateStatus/:taskId",taskController.updateTaskStatus)
routes.put("/updateStatus/:taskId", taskController.updateTaskStatus);
routes.put("/complete/:id",taskController.markTaskComplete);
routes.post("/comment/:id",taskController.addComment);
routes.get('/tasks-with-team', taskController.getAllTasksWithTeam);

routes.post("/uploadWork/:taskId", taskController.uploadWork);
routes.get('/user/:userId',taskController.getTasksByUserId);
routes.get('/allTasks/:userId', taskController.getTasksByUser);

routes.get('/updates/:managerId',taskController.getAllTaskUpdates);
routes.get('/tasksMy',taskController.getTasksAssignedToUser);
routes.put("/approveUpload/:taskId/:uploadId", taskController.approveUpload);
routes.get('/getTasksByProject/:projectId', taskController.getTasksByProjectId);




module.exports = routes;