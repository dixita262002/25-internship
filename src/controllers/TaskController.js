const taskModel = require("../models/TaskModel")

const addTask = async (req, res) =>{
    try{
        const savedTask = await taskModel.create(req.body);
        res.status(201).json({
            message:"task added successfully",
            data:savedTask
        });
        }catch(err){
            res.status(500).json({
                message:err.message
            });

        }

};

const getAllTasks = async(req,res)=>{
  try{
    const tasks = await taskModel.find().populate('moduleId').populate('projectId').populate('statusId');
    res.status(200).json({
        message:"task fetched successfully",
        data:tasks
    });
}
catch(err){
    res.status(500).json({
        message:err.message
    });
}
};
const getTaskById = async(req,res)=>{
    const foundTask = await taskModel.findById(req.params.id)
    res.json({
        message:"task fetched successfully",
        data:foundTask
    })
}
const deleteTask = async(req,res)=>{
    //delete frome task where id =?
    //req params
    //  //  console.log(req.params.id)  //params object
   const deleteTask = await taskModel.findByIdAndDelete(req.params.id)

    res.json({
        message:"task deleted successfully..",
        data:deleteTask
    })
}


module.exports= {
    addTask,
    getAllTasks,
    getTaskById,
    deleteTask
}