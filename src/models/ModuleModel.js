const mongoose = require("mongoose")
 const Schema = mongoose.Schema;

 const moduleSchema = new Schema({
  moduleId:{
         type:String         
    },    
 moduleName:{
    type:String
   },
   projectId:{
    type:Schema.Types.ObjectId,
    ref:"project"
  },
   description:{
          type:String,
       default:true
  },
   status:{
    type:String,
    default:true
},
startDate:{
     type:Date

},
},{
    timestamps:true
 })

 module.exports = mongoose.model("module",moduleSchema)