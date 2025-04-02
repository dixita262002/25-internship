//router
const routes = require("express").Router()

const userController = require("../controllers/UserController")

//get
//routes.post("/user",userController.addUser)
routes.post("/user",userController.signup)
routes.get("/users",userController.getAllUsers)
routes.get("/user/:id",userController.getUserById)
routes.delete("/user/:id",userController.deleteUserById)
routes.post("/user/login",userController.loginUser)
routes.get("/getuserbyrole/:roleId",userController.getUserByRoleId)




module.exports = routes