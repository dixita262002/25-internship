const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    //fileds..//gets
    name:{
        type:String,
    },
    description:{
        type:String
    }

})

//roleSchema == roles..25_intern_node_new
module.exports = mongoose.model("roles",roleSchema)
//roles[roleSchema]