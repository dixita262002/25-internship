const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName:{
        type:String
    },
    contact:{
        type:Number
    },
   role:{
    type:String,
    enum:["admin","project_manager","team_member"],
    default:"team__member",
   },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"roles"
    },
    password:{
        type:String,
    },
    email:{
        type:String
    
    },
    status:{
        type:Boolean,
        default:true
    },

},{
    timestamps:true

    })


module.exports = mongoose.model("users",userSchema)