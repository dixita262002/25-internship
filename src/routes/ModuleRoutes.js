const routes = require("express").Router();

const moduleController = require("../controllers/ModuleController");

routes.post("/add",moduleController.addModule);
routes.get("/allmodules",moduleController.getAllModules);
routes.get("/modules/:id",moduleController.getModuleById)
routes.delete("/moduledelete/:id",moduleController.deleteModule)
routes.put("/updatemodule/:id",moduleController.updateModule)

module.exports = routes;