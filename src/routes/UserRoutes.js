const routes = require("express").Router();
const userController = require("../controllers/UserController");
const upload = require("../middlewares/Upload"); // for future file/image upload


// ✅ User APIs
routes.post("/signup",upload.single("profileImage"),userController.signup);
//routes.post("/login",userController.loginUser);
routes.post("/user/login",userController.loginUser)
//routes.post("/user",userController.addUser);
routes.get("/users",userController.getAllUsers);
routes.get("/user/:id",userController.getUserById);
routes.delete("/user/:id",userController.deleteUserById);
routes.get("/getUserByRoleId/:roleId",userController.getUserByRoleId);
routes.get("/getUserByRole", userController.getUsersByRole);
routes.put("/user/:id",userController.updateUser);
routes.delete('/deletUser/:id', userController.deleteUser);
// ✅ Team Member-specific
routes.get("/team-members", userController.getTeamMembers);
routes.get('/getUserwith-projects',userController.getUserWithProjects);
routes.get("/getUserByProject/:projectId",userController.getUserByProjectId)
routes.get("/userprofile/:id",userController.getUserProfile);
routes.post('/upload-image/:id', upload.single('profileImage'),userController.uploadProfileImage);
routes.get("/userDetails", userController.getAllUsersWithDetails);
routes.get("/userDetailId/:id/details", userController.getUserDetailsById);
// 👇 Add this new route
routes.get("/user/:userId/assigned-data", userController.getAssignedDataByUserId);
routes.put("/userupdate/:id",userController.updateUserProfile);

//routes.post("/user/login",userController.loginuserWithToken)
routes.post("/user/forgotpassword",userController.forgotPassword)
routes.post("/user/resetpassword",userController.resetpassword)



module.exports = routes;











//router
{/*const routes = require("express").Router()

const userController = require("../controllers/UserController")

//get
routes.post("/user",userController.addUser)
routes.post("/user",userController.signup)
routes.get("/users",userController.getAllUsers)
routes.get("/user/:id",userController.getUserById)
routes.delete("/user/:id",userController.deleteUserById)
routes.post("/user/login",userController.loginUser)
routes.get("/getuserbyrole/:roleId",userController.getUserByRoleId)
routes.put("/updateuser/:id",userController.updateUser)

routes.get('/team-members',userController.getTeamMembers)
routes.post("/addteammember",userController.addTeamMember)
routes.get("/getallteammembers",userController.getAllTeamMembers)

//routes.put('user/:id', auth, upload.single('profileImage'), userController.updateUsers)



module.exports = routes     */}