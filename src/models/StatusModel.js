const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusSchema = new Schema({
     statusId:{
        type:String
     },
     statusName: {
      type: String,
      required: true,
      enum: ['Pending', 'In Progress', 'Completed'] // Define possible statuses
  }
    },{
        timestamps:true

})

module.exports = mongoose.model("status",statusSchema)