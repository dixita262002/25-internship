const routes = require("express").Router();
const reportController = require("../controllers/ReportsController");

routes.post("/addreport",reportController.addReport)
routes.get("/allreports",reportController.getAllReports)




module.exports=routes;