const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil")

const loginUser = async(req,res) =>{
    const email = req.body.email;
    const password = req.body.password;

    const foundUserFromEmail = await userModel.findOne({email:email}).populate("roleId")
    console.log(foundUserFromEmail)

    if(foundUserFromEmail != null){
        //password
        const isMatch = bcrypt.compareSync(password,foundUserFromEmail.password)
        
        if(isMatch == true){
            res.status(200).json({
                message:"login success",
                data:foundUserFromEmail
            })
        }
        else{
            res.status(404).json({
                message:"invalid cred..",
            })
        }

        
    }
    else{
        res.status(404).json({
            message:"Email not found.."
        })
    }
    
}
        
const signup = async(req,res)=>{
    //try catch if else...
    try{

        //password encrypt
       const salt = bcrypt.genSaltSync(10);
       const hashedpassword = bcrypt.hashSync(req.body.password,salt);
       req.body.password = hashedpassword;
        const createdUser = await userModel.create(req.body);

     //sending mail to user....
     //const mailresponse = await mailUtil.sendingMail(createdUser.email,"welcome to project management","this is welcome mail")
    await mailUtil.sendingMail(createdUser.email,"welcome to project management","this is welcome mail")


        res.status(201).json({
            message:"user crreated...",
            data:createdUser,
        });

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"error",
            data:err,
        });
    }
};



const addUser = async(req,res)=>{
    try{
    const savedUser = await userModel.create(req.body)
    res.status(201).json({
        message:"user added successfully",
        data:savedUser,
    });
}catch (err) {
    res.status(500).json({
        message:err.message
    });
}
};
const getAllUsers = async(req,res)=>{
  try{
    const users = await userModel.find().populate("roleId");
    res.status(200).json({
        message:"user fetched successfully",
        data:users
    });
}
catch(err){
    res.status(500).json({
        message:err
    });
}
};
const getUserById = async(req,res)=>{
    const foundUser = await userModel.findById(req.params.id)
    res.json({
        message:"user fetched successfully",
        data:foundUser
    })
}
 const deleteUserById = async(req,res)=>{

    const deletedUser = await userModel.findByIdAndDelete(req.params.id)
    res.json({
        message:"user deleted successfully",
        data:deletedUser
    })
 }



const getUserByRoleId = async(req,res)=>{
    //const roleId = req.params.roleId;
    try{
      const users = await userModel.find({roleId:req.params.roleId})
      res.status(200).json({
        message:"user found",
        data:users
      })

    }catch(err){
        res.status(500).json({
            message:"user not found",
        });

    }
};

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    signup,
    loginUser,
    getUserByRoleId

    
};