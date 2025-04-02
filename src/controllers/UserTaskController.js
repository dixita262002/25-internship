const userTaskModel = require("../models/UserTaskModel")

const addUserTask = async (req, res) =>{

    try{
        const savedUserTask = await userTaskModel.create(req.body)
        res.status(201).json({
            message:"usertask added successfully",
            data:savedUserTask,
        });
        }catch(err){
            res.status(500).json({
                message:err.message
            });

        }

};

const getAllUserTask = async(req,res)=>{
  try{
    const userTasks = await userTaskModel.find().populate("taskId").populate("userId")
    res.status(200).json({
        message:"userTask fetched successfully",
        data:userTasks
    });
}
catch(err){
    res.status(500).json({
        message:err
    });
}
};
const getUserTaskById = async(req,res)=>{
    const foundUserTask = await UserTaskModel.findById(req.params.id)
    res.json({
        message:"usertask fetched successfully",
        data:foundUserTask
    })
}
const deleteUserTask = async(req,res)=>{
    //delete frome Usertask where id =?
    //req params
    //  //  console.log(req.params.id)  //params object
   const deleteUserTask = await UserTaskModel.findByIdAndDelete(req.params.id)

    res.json({
        message:"usertask deleted successfully..",
        data:deleteUserTask
    })
}


module.exports = {
    addUserTask,
    getAllUserTask,
    getUserTaskById,
    deleteUserTask
}