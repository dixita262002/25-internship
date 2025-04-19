const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const jwt = require("jsonwebtoken");
const secret = "secret"

/*const addUser = async (req, res) => {
  try {
    const { fullName, contact, role, roleId, email, password, status } = req.body;

    // Basic field validation
    if (!email || !password || !roleId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new userModel({
      fullName,
      contact,
      role,
      roleId,
      email,
      password: hashedPassword,
      status,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created", data: savedUser });

  } catch (error) {
    console.error("Error in addUser:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};      */

// ✅ Signup with hashed password, optional file & email
const signup = async (req, res) => {
  try {
    const { fullName, email, password, contact, role, roleId } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userData = {
      fullName,
      email,
      contact,
      role,
      roleId,
      password: hashedPassword,
    };

    if (req.file) {
      userData.profileImage = req.file.path;
    }

    const createdUser = await userModel.create(userData);

    const userResponse = { ...createdUser._doc };
    delete userResponse.password;

    await mailUtil.sendingMail(
      email,
      "Welcome to Project Management System",
      "Your account has been created. You can now log in!"
    );

    res.status(201).json({
      message: "User created successfully",
      data: userResponse,
    });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};
// ✅ Login
/*
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).populate("roleId");

  if (user) {
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      res.status(200).json({ message: "Login successful", data: user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
};*/

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


const loginuserWithToken = async(req,res)=>{

  const {email,password} = req.body;

  const foundUserFromEmail =  await userModel.findOne({email:email})
  if(foundUserFromEmail){
    const isMatch = bcrypt.compareSync(password,foundUserFromEmail.password)
    if(isMatch){

      //token...
      const token = jwt.sign(foundUserFromEmail.toObject(),secret)
      //const token = jwt.sign({id:foundUserFromEmail._id},secret)
      res.status(200).json({
        message:"user loggedin..",
        token:token
      })
      

    }
    else{
      res.status(420).json({
        message:"invalid cred..."
      })
    }

  }
  else{
    res.status(404).json({
      message:"user not found.."
    })
  }
}

// ✅ Add User (manual, from Admin panel)
/*const addUser = async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    res.status(201).json({ message: "User added", data: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; */

// ✅ Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate("roleId", "name").populate('projectId').populate('taskIds');
    res.status(200).json({ message: "Users fetched", data: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Single User
const getUserById = async (req, res) => {
  exports.getUserById = async (req, res) => {
    const userId = req.params.id; // Get user ID from route params
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      console.error("Error fetching user by ID:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
}
// ✅ Delete User
const deleteUserById = async (req, res) => {
  const deletedUser = await userModel.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted", data: deletedUser });
};
const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;

    const query = role ? { role } : {};
    const users = await User.find(query);

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users by role:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// ✅ Get User by Role ID
const getUserByRoleId = async (req, res) => {
  try {
    const users = await userModel.find({ roleId: req.params.roleId });
    res.status(200).json({ message: "Users by role", data: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ✅ Update User
/*const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "User updated", data: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Update error", error: err.message });
  }
};*/
const updateUser = async (req, res) => {
  const { id } = req.params; // Extract ID from route params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Update error", error: error.message });
  }
};
const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};
// ✅ Get All Team Members
const getTeamMembers = async (req, res) => {
  try {
    const members = await userModel.find({ role: "team_member" });
    res.status(200).json({ message: "Team Members", data: members });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getUserWithProjects = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if the user has any projects
    if (user.projects.length === 0) {
      return res.status(200).json({ message: 'User found, but no projects' });
    }

    const populatedUser = await userModel.findById(req.params.userId).populate('projects');
    res.status(200).json(populatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserByProjectId = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Find users who have the project ID in their projects array
    const users = await userModel.find({ projects: projectId });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found for this project' });
    }

    res.status(200).json(users); // Return the users who are linked to the project
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get User Profile by ID
const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).populate("roleId assignedProjects");
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};
const uploadProfileImage = async (req, res) => {
  const userId = req.params.id;
  const imageUrl = req.file.path;

  try {
    const user = await user.findByIdAndUpdate(userId, { profileImage: imageUrl }, { new: true });
    res.json({ message: 'Image uploaded', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
};
const getAllUsersWithDetails = async (req, res) => {
  try {
    const users = await userModel.find()
      .populate("assignedProjects")
      .populate("assignedTasks");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
};
const getUserDetailsById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findById(userId)
      .populate("assignedProjects")
      .populate({
        path: "assignedTasks",
        populate: { path: "projectId createdBy", model: "Project" }
      });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
};

// 👇 Add this method in your controller
const getAssignedDataByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findById(userId)
      .populate("assignedProjects")
      .populate({
        path: "assignedTasks",
        populate: { path: "projectId createdBy", model: "Project" },
      });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      userDetails: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        contact: user.contact,
        status: user.status,
      },
      assignedProjects: user.assignedProjects,
      assignedTasks: user.assignedTasks,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
};
const updateUserProfile = async (req, res) => {
    try {
      const updated = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ message: "Error updating profile", error: err });
    }
  };

const forgotPassword = async(req, res) =>{
  const email = req.body.email;
  const foundUser = await userModel.findOne({email:email})
  if(foundUser){
    const token = jwt.sign(foundUser.toObject(),secret)
    console.log(token)
    const url = 'http://localhost:5173/resetpassword/${token}'
    const mailContent = '<html> <a href = "${url}"> reset password </html>'
    
    
    //email.....
    //const mailresponse =
     await mailUtil.sendingMail(foundUser.email,"reaset password",mailContent)
     res.json({
      message:"reset password link send to mail."
     })
  }
  else{
    res.json({
      message:"user not found register first.."
    })
  }
}

const resetpassword = async(req,res) =>{
  const token = req.body.token; //decode --> email | id
  const newPassword = req.body.password;

  const userFromToken = jwt.verify(token,secret);
  //object -->email,id...
  //password encrypt...
  const salt = bcrypt.genSalt(10)
  const hashedPassword = bcrypt.hashSync(newPassword,salt)

  const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id,{password:hashedPassword})
  res.json({
    message:"password update successfully...",
  })
}

module.exports = {
  //addUser,
  signup,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  getUserByRoleId,
  updateUser,
  deleteUser,
  getTeamMembers,
  getUsersByRole,getUserWithProjects,getUserByProjectId  , getUserProfile  ,uploadProfileImage ,
  getAllUsersWithDetails, getUserDetailsById  ,getAssignedDataByUserId  ,
  
  updateUserProfile,
  forgotPassword,
  resetpassword,
  loginuserWithToken



};























{/*const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const jwt = require('jsonwebtoken')

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
        
{/*const signup = async(req,res)=>{
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
************************************************************************************************/}

/*const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Password encrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    // Profile image from Cloudinary (via Multer)
    if (req.file) {
      userData.profileImage = req.file.path;
    }

    const createdUser = await userModel.create(userData);

    // Remove password from response
    const userResponse = { ...createdUser._doc };
    delete userResponse.password;

    // Send welcome email
    await mailUtil.sendingMail(
      createdUser.email,
      "Welcome to Project Management",
      "Thanks for registering. Start managing your projects efficiently!"
    );

    res.status(201).json({
      message: "User successfully created.",
      data: userResponse,
    });

  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
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
    const users = await userModel.find().populate('roleId', 'name');
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

const updateUser = async (req, res) => {
 //update  tablename set ? where id=?
//update new datra  ...> req.body
//id ...> req.params.id

try{
const updatedUser = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
res.status(201).json({
    message:"user update successfully",
    data:updatedUser,
});
}catch(err){
    res.status(500).json({
        message:"error whil updatye user",
        err:err
    })
}

    };
 /*const getTeamMembers = async (req, res) => {
        const users = await userModel.find({ role: "Team Member" });
        res.status(200).json({
         data: users
         });
      };*/
/*const getTeamMembers = async (req, res) => {
        try {
          const members = await User.find({ role: "Team Member" });
          res.status(200).json({
            message: "Team members fetched successfully",
            data: members,
          });
        } catch (err) {
          res.status(500).json({
             message: err.message 
            });
        }
      };
      const addTeamMember = async (req, res) => {
        try {
          // Set role to Team Member if not specified
          if (!req.body.role) {
            req.body.role = "Team Member";
          }
      
          const savedUser = await userModel.create(req.body);
      
          res.status(201).json({
            message: "Team Member added successfully",
            data: savedUser,
          });
        } catch (err) {
          res.status(500).json({
            message: err.message,
          });
        }
      };
      const getAllTeamMembers = async (req, res) => {
        try {
          const teamMembers = await userModel.find({ role: "Team Member" });
          res.status(200).json({
            message: "Team members fetched successfully",
            data: teamMembers,
          });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };
      
      
      // Update user
      const updateUsers = async (req, res) => {
        const updatedData = req.body;
        if (req.file) {
          updatedData.profileImage = req.file.path;
        }
        const user = await userModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.json(user);
      };
module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    signup,
    loginUser,
    getUserByRoleId,
    updateUser,
    getTeamMembers ,addTeamMember,getAllTeamMembers,

    updateUser,
    updateUsers
};*/