const taskModel = require("../models/TaskModel")
const projectModel = require("../models/ProjectModel");

const getAllTaskUpdates = async (req, res) => {
  try {
    const { managerId } = req.params;

    // Step 1: Find projects belonging to this manager
    const managerProjects = await projectModel.find({ projectManager: managerId });

    // Step 2: Get their project IDs
    const projectIds = managerProjects.map(p => p._id);

    // Step 3: Find tasks belonging to those projects
    const tasks = await taskModel.find({ projectId: { $in: projectIds } })
      .populate('assignedTo', 'fullName email')
      .populate('comments.user', 'fullName email')
      .sort({ updatedAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching task updates:', error);
    res.status(500).json({ message: 'Error fetching task updates' });
  }
};

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

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find()
      .populate('projectId', 'title')

    const formattedTasks = tasks.map(task => ({
      _id: task._id,
      taskName: task.taskName,
      description: task.description,
      priority: task.priority,
      role: task.role,
      projectId: task.projectId?.title || 'N/A',
      author: task.author || 'A',
      assigneeImage: task.teamMemberId?.profileImage,
      dueDate: task.dueDate
    }));

    res.status(200).json(formattedTasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err });
  }
};

const getTaskById = async (req, res) => {
  try {
    console.log("Fetching task by ID:", req.params.id); // 🔍 Log the ID
    const task = await taskModel.findById(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    console.error("Error fetching task by ID:", err); // 🔍 Log full error
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async(req,res)=>{
    //delete frome task where id =?
    //req params
    //  //  console.log(req.params.id)  //params object
   const deleteTask = await taskModel.findByIdAndDelete(req.params.id)

    res.json({
        message:"task deleted successfully..",
        data:deleteTask
    })
};
/*const assignTask = async (req, res) => {
 //update  tablename set ? where id=?
//update new datra  ...> req.body
//id ...> req.params.id

try{
const updatedTask = await taskModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
res.status(201).json({
    message:"task update successfully",
    data:updatedTask,
});
}catch(err){
    res.status(500).json({
        message:"error whil updatye task",
        err:err
    })
}

    };*/
const assignTask = async (req, res) => {
      try {
        const { id } = req.params;
        const updatedTask = await taskModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Task assigned successfully", data: updatedTask });
      } catch (err) {
        res.status(500).json({ message: "Error assigning task", error: err.message });
      }
    };
    

const updateTask = async (req, res) => {
        //update  tablename set ? where id=?
       //update new datra  ...> req.body
       //id ...> req.params.id
       
       try{
       const updatedTask = await taskModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
       res.status(201).json({
           message:"task update successfully",
           data:updatedTask,
       });
       }catch(err){
           res.status(500).json({
               message:"error whil updatye task",
               err:err
           })
       }
       
           };
/*const getTasksByTeamMemberId = async(req,res)=>{
    //const roleId = req.params.roleId;
    try{
        const { teamMemberId } = req.params;
      const tasks = await taskModel.find({ teamMemberId }).populate("projectId", "title").populate("teamMemberId", "name"); 
      res.status(200).json({
        message:"task found",
        data:tasks
      })

    }catch(err){
      console.log(err)
        res.status(500).json({
            message:"task not found",
        });

    }
};*/
const getTasksByTeamMemberId = async (req, res) => {
  try {
    // Validate the presence of teamMemberId in parameters
    const { teamMemberId } = req.params;
    if (!teamMemberId) {
      return res.status(400).json({ message: 'Team member ID is required.' });
    }

    // Query for tasks and populate references for project and team member details
    const tasks = await taskModel
      .find({ teamMemberId: teamMemberId })
      .populate("projectId", "title")
      .populate("teamMemberId", "name");

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this team member.' });
    }

    return res.status(200).json({
      message: "Tasks found",
      data: tasks,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};




/*const updateTaskStatus = async (req, res) => {
    //update  tablename set ? where id=?
   //update new datra  ...> req.body
   //id ...> req.params.id
   
   try{
   const updatedTask = await taskModel.findByIdAndUpdate(taskId, { status, $push: { updates: { comment, date: new Date() } } },{ new: true })
   res.status(201).json({
       message:"Task status updated successfully",
       success: true,
       data:updatedTask,
   });
   }catch(err){
       res.status(500).json({
           message:"Error updating task status",
           err:err
       })
   }
   
       };*/
const updateTaskStatus = async (req, res) => {
        try {
          const { taskId } = req.params;
          const { status, comment } = req.body;
      
          const updatedTask = await taskModel.findByIdAndUpdate(
            taskId,
            {
              status,
              $push: { updates: { comment, date: new Date() } }
            },
            { new: true }
          );
      
          res.status(200).json({ message: "Task status updated", data: updatedTask });
        } catch (err) {
          res.status(500).json({ message: "Error updating status", error: err.message });
        }
      };
      
 const markTaskComplete = async (req, res) => {
        try {
          const updated = await taskModel.findByIdAndUpdate(req.params.id, {
            status: "Completed"
          }, { new: true });
      
          res.status(200).json({ message: "Task marked completed", data: updated });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };
 const addComment = async (req, res) => {
        try {
          const task = await taskModel.findById(req.params.id);
          task.comments.push({ text: req.body.text });
          await task.save();
      
          res.status(200).json({ message: "Comment added", data: task });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

      // Get all tasks with team member info (for monitoring)
const getAllTasksWithTeam = async (req, res) => {
    try {
      const tasks = await taskModel.find().populate('teamMemberId'); // joins team member data
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const uploadWork = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { workFileUrl } = req.body;
  
      const task = await taskModel.findById(taskId);
      if (!task) return res.status(404).json({ message: "Task not found" });
  
      task.workUploads.push({ url: workFileUrl, uploadedAt: new Date() });
      await task.save();
  
      res.status(200).json({ message: "Work uploaded", task });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
// controllers/taskController.js

const getTasksByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const tasks = await taskModel.find({ assignedTo: userId }).populate('comments');
    
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks for user', error });
  }
};

const getTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const tasks = await taskModel.find({ assignedTo: userId }).populate('assignedTo', 'fullName email');

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching user tasks:', error);
    res.status(500).json({ message: 'Server error while fetching tasks.' });
  }
};
const getTasksAssignedToUser = async (req, res) => {
  try {
    const tasks = await taskModel.find({ assignedTo: req.user._id }); // req.user._id is the logged-in user's ID
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const approveUpload = async (req, res) => {
  const { taskId, uploadId } = req.params;
  const { status } = req.body;
  const managerId = req.user?.id; // assuming you have manager auth

  try {
    const task = await taskModel.findById(taskId);
    const upload = task.workUploads.id(uploadId);

    if (!upload) return res.status(404).json({ error: "Upload not found" });

    upload.approvalStatus = status;
    upload.approvedByManager = managerId;

    await task.save();
    res.json({ message: "Upload status updated", upload });
  } catch (err) {
    res.status(500).json({ error: "Error updating status" });
  }
};

// Get tasks by project ID
const getTasksByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await taskModel.find({ projectId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks by project:", error);
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

module.exports= {
    addTask,
    getAllTasks,
    getTaskById,
    deleteTask,
    updateTask,
    assignTask,
    getTasksByTeamMemberId,
    updateTaskStatus,

    markTaskComplete,
    addComment,
    getAllTasksWithTeam,uploadWork,getTasksByUserId,getTasksByUser,
    getAllTaskUpdates ,      getTasksAssignedToUser, approveUpload,  getTasksByProjectId
}