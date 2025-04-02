const routes = require('express').Router();

const teamController = require('../controllers/TeamController');
routes.post('/addteam',teamController.addTeam)
routes.get('/allteam',teamController.getAllTeams)
routes.get("/team/:id",teamController.getTeamtById)
routes.delete("/team/:id",teamController.deleteTeam)

//routes.get("/getteambyproject/:projectId",teamController.getTeamByProjectId)

module.exports = routes;