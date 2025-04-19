const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "project_manager", "user"],
    required: true
  },
  //role: { type: String, default: 'users' },
  //roleId: {
   // type: Schema.Types.ObjectId,
  //  ref: "roles"
  //},
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'roles' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'project' },
  taskIds: { type: mongoose.Schema.Types.ObjectId, ref: 'task' },
  completedTasksCount: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
   // match: [/.+\@.+\..+/, "Please enter a valid email"]
  },
  assignedProjects: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'project'
   } ,
   
  assignedTasks: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task"
    }
  
}, {
  timestamps: true
});


module.exports = mongoose.model("users",userSchema)