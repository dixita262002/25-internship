const moduleModel = require("../models/ModuleModel")

const addModule = async(req, res)=>{
    try{
    const savedModule = await moduleModel.create(req.body)
    res.status(201).json({
        message:"module add successfully",
        data:savedModule,
    });
}catch(err){
    res.status(500).json({
        message:err.message,
    });
}
};

const getAllModules = async(req,res) =>{
    try{
    const modules = await moduleModel.find().populate("projectId");
    res.status(201).json({
        message:"modules fetched successfully",
        data:modules,
    })
}catch(err){
    res.status(500).json({
        message:err.message
    })
}
}
const getModuleById = async(req,res)=>{
    const foundModule = await moduleModel.findById(req.params.id)
    res.json({
        message:"module fetched successfully",
        data:foundModule
    })
}
const deleteModule = async(req,res)=>{
    //delete frome module where id =?
    //req params
    //  //  console.log(req.params.id)  //params object
   const deleteModule = await moduleModel.findByIdAndDelete(req.params.id)

    res.json({
        message:"module deleted successfully..",
        data:deleteModule
    })
}


module.exports = {
    addModule,
    getAllModules,
    getModuleById,
    deleteModule
}