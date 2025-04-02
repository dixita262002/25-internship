const routes = require("express").Router();

const moduleController = require("../controllers/ModuleController");

routes.post("/add",moduleController.addModule);
routes.get("/allmodules",moduleController.getAllModules);
routes.get("/modules/:id",moduleController.getModuleById)
routes.delete("/module/:id",moduleController.deleteModule)

module.exports = routes;