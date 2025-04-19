const projectModel = require('../models/ProjectModel')
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");


const storage = multer.diskStorage({
  destination:"./uploads",
  filename:function(req,file,cb){
      cb(null,file.originalname)
  }
});

//multer object.......
const upload = multer({
  storage:storage,
 // fileFilter
}).single("image")

//addProject
//getProject
const addProject = async (req, res) => {

  try{
      const savedProject = await projectModel.create(req.body)
      res.status(201).json({
          message:"project added successfully",
          data:savedProject
      })

  }catch(err){
      res.status(500).json({
          message: err,
      })
  }
};
const addProjectWithFile = async(req, res) =>{
  upload(req,res,async(err)=>{
      if(err){
          console.log(err)
          res.status(500).json({
              message:err.message
          })
      }
      else{
  // cloudinary
  const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
  console.log(cloudinaryResponse);
       console.log(req.body)
       console.log(req.file)

//store data in databadse
req.body.imageURL = cloudinaryResponse.secure_url;
const savedProject = await projectModel.create(req.body)


       res.status(200).json({
          message:"project saved successfully",
          data:savedProject
       });
      }
  });
  };

const updateProject = async (req, res) => {
//update  tablename set ? where id=?
//update new datra  ...> req.body
//id ...> req.params.id

try{
const updatedProject = await projectModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
res.status(201).json({
  message:"project update successfully",
  data:updatedProject,
});
}catch(err){
  res.status(500).json({
      message:"error whil updatye project",
      err:err
  })
}

  };

  //storage engine
const getAllProjectes = async (req, res) => {
  try{

     const projects = await projectModel.find();
      res.status(200).json({
          message:"All projects fetched successfully",
          data: projects
      })

  }catch(err){
      res.status(500).json({
          message:err.message
      })

  }
}

const getAllProjectesByUserId = async (req, res) => {
  try{

     const projects = await projectModel.find({userId:req.params.userId});
      res.status(200).json({
          message:"All projects fetched successfully",
          data: projects
      })

  }catch(err){
      res.status(500).json({
          message:err.message
      })

  }
}
const getProjectsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const projects = await projectModel.find({ assignedUserId: userId });
    res.status(200).json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching projects', error: err.message });
  }
};
const deleteProject = async(req,res)=>{
  //delete frome project where id =?
  //req params
  //  //  console.log(req.params.id)  //params object
 const deleteProject = await projectModel.findByIdAndDelete(req.params.id)

  res.json({
      message:"project deleted successfully..",
      data:deleteProject
  })
}
 
const getProjectById = async(req,res)=>{
  try{
  const foundProject = await projectModel.findById(req.params.id)
  if(!project){
  res.status(400).json({
      message:"no project found",});
  } else{
      res.status(200).json({
          message:"project found successfully",
          data:foundProject,
      });
  }
}catch(err){
  res.status(500).json({
      message:err.message
  })
}
}


  module.exports = {
 addProject ,
 addProjectWithFile,
 updateProject,
 getAllProjectes,
 getAllProjectesByUserId,
 getProjectsByUser,
 deleteProject,
 getProjectById

  }


