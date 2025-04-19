const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  description: String,

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },

  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },

  comments: [commentSchema],

  attachments: [String],

  startDate: Date,
  dueDate: Date,
  endDate: Date,

  approvedByManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },

  approvalStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  updates: [
    {
      comment: String,
      status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  workUploads: [
    {
      url: String,
      originalName: String,
      mimeType: String,
      uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
},
{
  timestamps: true,
});

module.exports = mongoose.model("task", taskSchema);
