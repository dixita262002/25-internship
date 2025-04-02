const routes = require('express').Router();
const projectController = require('../controllers/ProjectController');

routes.post('/addproject',projectController.addProject);
routes.get('/all',projectController.getAllProjectes);

routes.delete("/project/:id",projectController.deleteProject)

routes.post('/addwithfile',projectController.addProjectWithFile)
//routes.get("/getprojectsbyuserid/:userId",projectController.getAllProjectesByUserId)
routes.put("/updateproject/:id",projectController.updateProject)
routes.get("/getprojectbyId/:id",projectController.getProjectById)


//routes.get("/getprojectbyuser/:userId",projectController.getProjectByUserId)
module.exports = routes;
