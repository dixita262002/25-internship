const routes = require("express").Router();
const teamMembersController = require("../controllers/TeamMembersController")

routes.post("/createteammember",teamMembersController.createTeamMember);
routes.get("/allteammembers",teamMembersController.getAllTeamMembers);
routes.get("/teammember/:id",teamMembersController.getTeamMemberById);
routes.delete("/teammember/:id",teamMembersController.deleteTeamMemberById);
routes.put("/updateteammember/:id",teamMembersController.updateTeamMember);



module.exports = routes;