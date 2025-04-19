const mongoose = require("mongoose")
const Schema = mongoose.Schema

const milestoneSchema = new Schema({
   title: {
      type: String,
      required: true
    },
    description:{ 
      type:String,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    teamMemberId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "teamMember",
                required: true
              },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending'
    },
    
  }, { timestamps: true });
  
module.exports= mongoose.model('milestone', milestoneSchema);
