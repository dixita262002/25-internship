const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users",
    },
    projectId:{
        type:Schema.Types.ObjectId,
        ref:"project"
    },
   
},{
    timestamps:true
})

module.exports = mongoose.model('team',teamSchema);