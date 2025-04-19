const routes = require("express").Router();
const projectController = require("../controllers/ProjectController");

// Routes for Projects
routes.post('/addproject', projectController.addProject);
routes.get('/allprojects', projectController.getAllProjectes);
//router.get('/assigned-projects/:userId', projectController.getProjectsByUser);
routes.delete('/deleteproject/:id', projectController.deleteProject);
routes.put('/updateproject/:id', projectController.updateProject);
routes.get('/projectbyuser/:userId', projectController.getProjectsByUser);
routes.post('/addwithfile',projectController.addProjectWithFile)

module.exports = routes;
















{/*const routes = require('express').Router();
const projectController = require('../controllers/ProjectController');
const userController = require('../controllers/UserController')

routes.post('/addproject',projectController.addProject);
routes.get('/all',projectController.getAllProjectes);

routes.delete("/projectdelete/:id",projectController.deleteProject)

routes.post('/addwithfile',projectController.addProjectWithFile)
//routes.get("/getprojectsbyuserid/:userId",projectController.getAllProjectesByUserId)
routes.put("/updateproject/:id",projectController.updateProject)
routes.get("/getprojectbyId/:id",projectController.getProjectById)

// New route to fetch projects assigned to a specific team member
routes.get("/team-member/:teamMemberId", projectController.getProjectsByTeamMember);



// Assign Manager
routes.post('/add', projectController.assignManager);

// Update Manager
routes.put('/update-manager', projectController.updateManager);

// Remove Manager
routes.put('/remove-manager', projectController.removeManager);

// (optional) Get All Projects
routes.get("/all",projectController.getAllProjecte)
routes.get("/assigned-projects/:userId", projectController.getProjectByUserId);




// Assign Project to User
routes.post('/assignproject', projectController.assignProjectToUser);

module.exports = routes;
*/}