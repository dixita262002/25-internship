const routes = require("express").Router();

const milestoneController = require("../controllers/MilestoneController");


routes.post("/addMilestone",milestoneController.addMilestone);
routes.get("/allMilestones",milestoneController.getAllMilestones);
routes.get("/getMilestoneById",milestoneController.getMilestoneById);
routes.put("/updateMilestone",milestoneController.updateMilestone);
routes.put("/markMilestoneComplete",milestoneController.markMilestoneComplete);
// Add a comment to milestone
routes.post("/addMilestoneComment/:id", milestoneController.addMilestoneComment);
routes.delete("/deleteMilestone",milestoneController.deleteMilestone)


module.exports = routes;
