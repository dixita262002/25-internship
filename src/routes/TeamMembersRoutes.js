const routes = require("express").Router();
const teamMembersController = require("../controllers/TeamMembersController")


routes.post("/createteammember",teamMembersController.createTeamMember);
routes.get("/allteammembers",teamMembersController.getAllTeamMembers);

routes.get("/getall/:id",teamMembersController.getTeamMemberById);
routes.put("/updateteammember/:id",teamMembersController.updateTeamMember);

routes.delete("/deleteteammember/:id",teamMembersController.deleteTeamMember);

routes.get('/profile/:id',teamMembersController.getTeamMemberProfile);

routes.get("/getTeamMemberByRole/:roleId",teamMembersController.getTeamMemberByRoleId)
routes.get("/settings/:email ",teamMembersController.allSettings);
routes.put("updateEmail/:email",teamMembersController.updateSettings)
routes.post('/addwithfile',teamMembersController.addTeamMemberWithFile)
routes.get('/getTeammemberByProject/:projectId', teamMembersController.getTeamMemberByProjectId);

module.exports = routes;