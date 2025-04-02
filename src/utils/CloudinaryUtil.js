const ProjectModel = require("../models/ProjectModel");

const cloudinary = require("cloudinary").v2;

const uploadFileToCloudinary = async(file) => {

    //conif
    const config = cloudinary.config({
        cloud_name:"dgmjg6vfs",
        api_key:"932958915592721",
        api_secret:"uRyJAZUfV-8NDTCo5B8_u92OSAM"
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloudinaryResponse;
}

const updateProject =  async(req,res)=>{
    //update tables set?.where id=?
    //update new data ==> req.body
    //id-->req.pqrqms.id
    try{
  const updateProject = await ProjectModel.findByIdAndUpdate(req.params.id)
    }catch(err){
        res.status(500).json({
            message:"error while update project",
            err:err
        })
    }
}


module.exports = {
    uploadFileToCloudinary,
}