const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamMemberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: [ 'User', 'Developer', 'Designer', 'Tester','user'], // Default role is 'team_member'
      default: "user",
    },
    projectId: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project",
        required: true,
      },
    
    taskId: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "task",
        required: true,
      },
    
    completedTasksCount: { 
      type: Number, 
      default: 0
     },
    
  },
  {
    timestamps: true, // Auto-adds 'createdAt' and 'updatedAt'
  }
);

module.exports = mongoose.model("teamMember", TeamMemberSchema);
