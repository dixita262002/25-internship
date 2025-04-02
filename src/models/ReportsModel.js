const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const reportsSchema = new Schema({
  reportId:{
    type:String
  },   
  efficiencyScore: {
     type: Number, 
     },
     issuesCount: {
     type: Number,
    },
  completedOnTime: { 
    type: Boolean,
    
     },
  remarks: {
     type: String
     },

       userId:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
     projectId: {
            type:Schema.Types.ObjectId,
            ref: 'project', // Reference to the Project collection            
          },
     taskId:{
            type:Schema.Types.ObjectId,
            ref:'task',
        },
    },{
        timestamps:true

})

module.exports = mongoose.model("report",reportsSchema)