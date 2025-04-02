const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors())       //http port any request has come (*)
app.use(express.json()) //accept data jason

//router required...

const roleRoutes = require("./src/routes/RoleRoutes")
//sever // express //app
app.use(roleRoutes)

//userRouter............
//http://localhost:3000/user

const UserRoutes = require("./src/routes/UserRoutes")
app.use(UserRoutes)
//http://localhost:3000/user/getUserByRoleId/id

const ProjectRoutes = require("./src/routes/ProjectRoutes")
app.use("/project",ProjectRoutes)
//http://localhost:3000/addProject
//http://localhost:3000/project/addproject
//http://localhost:3000/project/getprojectbyuser/(userId)



const teamRoutes = require("./src/routes/TeamRoutes")
app.use("/team",teamRoutes)//http://localhost:3000/team/addteam


//const teamMembersRoutes = require("./src/routes/TeamMembersRoutes")
//app.use("/teammember",teamMembersRoutes)
const teamMembersRoutes = require("./src/routes/TeamMembersRoutes")
app.use("/teammember",teamMembersRoutes)



const taskRoutes = require("./src/routes/TaskRoutes")
app.use("/task",taskRoutes)
//http://localhost:3000/task/alltask

const userTaskRoutes = require("./src/routes/UserTaskRoutes")
app.use("/usertask",userTaskRoutes)
//http://localhost:3000/usertask/add

const moduleRoutes = require("./src/routes/ModuleRoutes")
app.use("/module",moduleRoutes)


const statuseRoutes = require("./src/routes/StatusRoutes")
app.use("/status",statuseRoutes)

const reportRoutes = require("./src/routes/ReportRoutes")
app.use("/report",reportRoutes)






//mongodb database connection
mongoose.connect("mongodb://127.0.0.1:27017/25_intern_node_new").then(()=>{
    console.log("database connected...")
})



//server create PORT
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server is running on port",PORT)
})
