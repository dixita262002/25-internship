const teamMembersModel = require("../models/TeamMembersModel")

const createTeamMember = async(req, res) =>{
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
 
     };
     
module.exports = {
    createTeamMember,
    getAllTeamMembers,
    getTeamMemberById,
    deleteTeamMemberById,
    updateTeamMember
}