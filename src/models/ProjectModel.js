const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({ 
  // userId:{
    //  type:Schema.Types.ObjectId,
     // ref:"users"
   //},
   title:{
    type:String,
    required: true
   },
   description:{
    type:String,
   },
   technology:{
      type:String,      
   },
   startDate:{
      type:Date,
      required: true
   },
   completionDate:{
      type:Date,
      required: true
   },
   assignedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    
    
 imageURL:{
   type:String,
   }
},{
    timestamps:true

})
module.exports = mongoose.model('project',projectSchema);