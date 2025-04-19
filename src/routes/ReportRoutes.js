const routes = require("express").Router();
const reportController = require("../controllers/ReportsController");

routes.post("/addreport",reportController.addReport)
routes.get("/allreports",reportController.getAllReports)
routes.get('/user/:userId',reportController.getReportsByUserId);




module.exports=routes;