const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const tackSchema = new Schema({
    taskName: {
        type: String,
      },
      description: {
        type: String,
    },
      projectId: {
        type:Schema.Types.ObjectId,
        ref: "projects"
      },
      moduleId:{
        type:Schema.Types.ObjectId,
        ref:"modules"
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'], 
  },
  statusId: {
         type:Schema.Types.ObjectId,
        ref:"status"       
      },
      endDate: {
        type: Date,
      },
      updatedDate: {
        type: Date,
    }
  },{
    timestamps:true
})

module.exports = mongoose.model("task",tackSchema)