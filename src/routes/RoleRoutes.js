//routes express
const routes = require("express").Router()
const { Router } = require("express")
//controller required...
const roleController = require("../controllers/RoleController")

//GET
routes.get("/roles",roleController.getAllRoles)
routes.post("/role",roleController.addRole)
routes.delete("/role/:id",roleController.deleteRole)
routes.get("/role/:id",roleController.getRoleById)

module.exports = routes