const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamMemberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["team_member"], // Default role is 'team_member'
      default: "team_member",
    },
    ProjectId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    taskId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true, // Auto-adds 'createdAt' and 'updatedAt'
  }
);

module.exports = mongoose.model("teamMember", TeamMemberSchema);
