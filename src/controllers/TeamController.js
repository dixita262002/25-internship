const teamModel = require("../models/TeamModel");

const addTeam = async (req, res) =>{

    try{
        const savedTeam = await teamModel.create(req.body);
        res.status(201).json({
            message:"team added successfully",
            data:savedTeam,
        });
        }catch(err){
            res.status(500).json({
                message:err.message
            });

        }

};


const getAllTeams = async (req,res) => {
    try{
        const teams = await teamModel.find().populate("projectId");
                   res.status(404).json({
                message:"no teams found"
            });
           }catch(err){
        res.status(500).json({
            message:err.message
        });

    }
};
const getTeamtById = async(req,res)=>{
    const foundTeam = await teamModel.findById(req.params.id)
    res.json({
        message:"team fetched successfully",
        data:foundTeam
    })
}
const deleteTeam = async(req,res)=>{
    //delete frome project where id =?
    //req params
    //  //  console.log(req.params.id)  //params object
   const deleteTeam = await teamModel.findByIdAndDelete(req.params.id)

    res.json({
        message:"team deleted successfully..",
        data:deleteTeam
    })
}



//const getTeamByProjectId = async(req,res)=>{
  //   try{
    //   const teams = await teamModel.find().populate("projectId userId")
      // res.status(200).json({
        // message:"team found",
        //data:teams
     // })
 
    //}catch(err){
      //   res.status(500).json({
        //    message:err,
        //});
 
    // }
 //};
 
 module.exports = {
    addTeam,
    getAllTeams,
    getTeamtById,
    deleteTeam
 }