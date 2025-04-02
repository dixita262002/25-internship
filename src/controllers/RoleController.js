//table---> roles----> represent----> roleModel ----> import----->required
const roleModel = require("../models/RoleModel")

const getAllRoles = async(req,res)=>{
    try{
    const roles = await roleModel.find();
    res.status(200).json({
        message:"roles fetched successfully...",
        data:roles,
    });
    }catch(err){
        res.status(500).json({
            message:err
        })

    }
};

const addRole = async(req,res)=>{
    //req.body,req.params,req.headers,req.query
    //console.log("request body.....",req.body);
    //database..
   try{
   const savedRole = await roleModel.create(req.body)
    res.status(201).json({
        message:"role created..",
        data:savedRole,
    });
}catch(err){
    res.status(500).json({
        message:err
    });
}
};

const deleteRole = async(req,res)=>{
    //delete frome role where id =?
    //req params
    //  //  console.log(req.params.id)  //params object
   const deleteRole = await roleModel.findByIdAndDelete(req.params.id)

    res.json({
        message:"role deleted successfully..",
        data:deleteRole
    })
}

const getRoleById = async (req,res)=>{
    //req.params.id
    const foundRole = await roleModel.findById(req.params.id)
    res.json({
        message:"role fatched...",
        data:foundRole
    })
}

module.exports ={
    getAllRoles,addRole,deleteRole,getRoleById
}