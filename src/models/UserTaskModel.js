const mongoose = require("mongoose");
const { schema } = require("./TeamModel");
const Schema = mongoose.Schema;

const userTaskSchema = new Schema({

    userTaskId:{
        type:String
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users",
    },
    taskId:{
        type:Schema.Types.ObjectId,
        ref:"task",
    },
})

module.exports =mongoose.model("usertak",userTaskSchema)