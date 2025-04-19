
const teamMembersModel = require("../models/TeamMembersModel")
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");

const storage = multer.diskStorage({
  destination:"./uploads",
  filename:function(req,file,cb){
      cb(null,file.originalname)
  }
});

const upload = multer({
  storage:storage,
 // fileFilter
}).single("image")

const addTeamMemberWithFile = async(req, res) =>{
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
          message:"teammember saved successfully",
          data:savedProject
       });
      }
  });
  };


{/*const createTeamMember = async(req, res) =>{
    try{
        const newTeamMember = await teamMembersModel.create(req.body);
        res.status(201).json({
            message:"teammember added successfully",
            data:newTeamMember,
        })

    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

const getAllTeamMembers = async(req, res) =>{
    try{
        const teamMembers = await teamMembersModel.find()
        res.status(201).json({
            message:"fetch all teammembers",
            data:teamMembers,
        })

    }catch(err){
        res.status(500).jason({
        message:err.message
        
        })
    }
}

const getTeamMemberById = async(req, res) =>{
    try{
     const foundTeamMember = await teamMembersModel.findById(req.params.id)
        res.status(201).json({
            message:"team members fetched successfully",
            data:foundTeamMember,
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })

    }
    
}

 const deleteTeamMemberById = async(req,res)=>{
try{
    const deletedTeamMember = await teamMembersModel.findByIdAndDelete(req.params.id)
    res.status(201).json({
        message:"team member deleted successfully",
        data:deletedTeamMember,
    })
}catch(err){
    res.status(500).json({
        message:err.message
    })

}
 }

 const updateTeamMember = async (req, res) => {
  //update  tablename set ? where id=?
 //update new datra  ...> req.body
 //id ...> req.params.id
 
 try{
 const updatedTeamMember = await teamMembersModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
 res.status(201).json({
     message:"team member update successfully",
     data:updatedTeamMember,
 });
 }catch(err){
     res.status(500).json({
         message:"error whil updatye project",
         err:err
     })
 }
 
     };       */}

     
// Create Team Member
const createTeamMember = async (req, res) => {
  try {
    const newTeamMember = await teamMembersModel.create(req.body);
    res.status(201).json({
         message: "Team member added successfully",
          data: newTeamMember 
        });
  } catch (err) {
    res.status(500).json({
         message: err.message 
        });
  }
};

// Get All Team Members
const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await teamMembersModel.find().populate("projectId").populate("taskId").populate("role");
    res.status(200).json({teamMembers});
  } catch (err) {
    res.status(500).json({ 
        message: err.message 
    });
  }
};

// Get Team Member by ID
const getTeamMemberById = async (req, res) => {
  try {
    const member = await teamMembersModel.findById(req.params.id).populate("projectId").populate("taskId");
    if (!member) return res.status(404).json({ message: "Team member not found" });
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Team Member
const updateTeamMember = async (req, res) => {
  try {
    const updatedMember = await teamMembersModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedMember) return res.status(404).json({ message: "Team member not found" });
    res.status(200).json({ message: "Updated successfully", data: updatedMember });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Team Member
const deleteTeamMember = async (req, res) => {
  try {
    const deleted = await teamMembersModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Team member not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTeamMemberByRoleId = async(req,res)=>{
    //const roleId = req.params.roleId;
    try{
      const teamMembers = await teamMembersModel.find()
      res.status(200).json({
        message:"teamMember found",
        data:teamMembers
      })

    }catch(err){
      console.log(err)
        res.status(500).json({
            message:"teamMember not found",
        });

    }
};


// Get all team members and their assigned tasks
const getTeamStatus = async (req, res) => {
  try {
    const team = await teamMembersModel.find();
   // const tasks = await Task.find().populate('assignedTo');

    res.status(200).json({ team, tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

{/*const getTeamMemberProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await teamMembersModel.findById(id)
      .populate('projectId')
      .populate('taskId');

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(200).json({
      name: member.name,
      email: member.email,
      role: member.role,
      project: member.projectId,
      task: member.taskId,
      completedTasksCount: member.completedTasksCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
}; */}

const getTeamMemberProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await teamMembersModel.findById(id).populate('projectId').populate('taskId');

    if (!member) return res.status(404).json({ message: 'Member not found' });

    res.json({
      name: member.name,
      email: member.email,
      role: member.role,
      projectsCount: member.projectId ? 1 : 0,
      assignedTasks: member.taskId ? 1 : 0,
      completedTasks: member.completedTasksCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// GET settings
const allSettings= async (req, res) => {
  try {
      const member = await teamMembersModel.findOne({ email: req.params.email });
      if (!member) return res.status(404).json({ error: "Not found" });

      res.json({
          email: member.email,
          notifications: member.notifications,
          theme: member.theme,
          language: member.language
      });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
}


// PUT settings
const updateSettings = async (req, res) => {
  try {
      const updated = await teamMembersModel.findOneAndUpdate(
          { email: req.params.email },
          { $set: req.body },
          { new: true }
      );
      if (!updated) return res.status(404).json({ error: "Not found" });

      res.json(updated);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
}

const getTeamMemberByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await teamMembersModel.find({ projectId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks by project:", error);
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};






     
module.exports = {
   
    createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
  getTeamMemberProfile,
  getTeamMemberByRoleId,allSettings,updateSettings,             addTeamMemberWithFile,getTeamMemberByProjectId
}