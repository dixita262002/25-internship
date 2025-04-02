const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({ 
  // userId:{
    //  type:Schema.Types.ObjectId,
     // ref:"users"
   //},
   title:{
    type:String,
    uniqe:true
   },
   description:{
    type:String,
   },
   technology:{
      type:String,      
   },
   startDate:{
      type:Date
   },
   completionDate:{
      type:Date
   },
   imageURL:{
      type:String,
   }
},{
    timestamps:true

})
module.exports = mongoose.model('projects',projectSchema);