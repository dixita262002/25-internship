const milestoneModel = require('../models/MilestoneModel');


// ➕ Add a new milestone
/*const addMilestone = async (req, res) => {
  try {
    const savedMilestone = await milestoneModel.create(req.body);

    // Push to project if needed
    await projectModel.findByIdAndUpdate(req.body.projectId, {
      $push: { milestones: savedMilestone._id }
    });

    res.status(201).json({
      message: 'Milestonce added successfully',
      data: savedMilestone
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error adding milestone',
      error: err.message
    });
  }
};*/
/*const addMilestone = async (req, res) => {
  try {
   /* const { title, description, dueDate, projectId } = req.body;

    // Optional: Basic validation
    if (!title || !dueDate || !projectId) {
      return res.status(400).json({
        message: "Internal Server Error",
          error: "Cast to ObjectId failed for value ..."
      });
    }*/

   /* const newMilestone = await milestoneModel.create({
      title,
      description,
      dueDate,
      projectId,
    });

    res.status(201).json({
      message: "Milestone added successfully",
      data: newMilestone,
    });
  } catch (err) {
    console.error("Error adding milestone:", err.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};*/
const addMilestone = async (req, res) => {
  try {
    const milestone = await milestoneModel.create(req.body);
    res.status(201).json({
      message:"mileston created successfully",
      data:milestone,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create milestone", error });
  }
}

// 🧾 Get all milestones
const getAllMilestones = async (req, res) => {
  try {
    const milestones = await milestoneModel.find()
      .populate('projectId', 'title')
      .populate('teamMemberId', 'name email');

    res.status(200).json({
      message: 'Milestones fetched',
      data: milestones
    });
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Error fetching milestones', error: err });
  }
};

// 📄 Get milestone by ID
const getMilestoneById = async (req, res) => {
  try {
    const milestone = await milestoneModel.findById(req.params.id)
      .populate('projectId', 'title')
      .populate('createdBy', 'name');

    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }

    res.status(200).json(milestone);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update milestone
const updateMilestone = async (req, res) => {
  try {
    const updated = await milestoneModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ message: 'Milestone updated', data: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating milestone', error: err });
  }
};

// ✅ Mark milestone as completed
const markMilestoneComplete = async (req, res) => {
  try {
    const updated = await milestoneModel.findByIdAndUpdate(
      req.params.id,
      { status: 'Completed' },
      { new: true }
    );

    res.status(200).json({ message: 'Milestone marked complete', data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 💬 Add comment to milestone
const addMilestoneComment = async (req, res) => {
  try {
    const milestone = await milestoneModel.findById(req.params.id);
    milestone.comments.push({ text: req.body.text, date: new Date() });
    await milestone.save();

    res.status(200).json({ message: 'Comment added', data: milestone });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🗑️ Delete milestone
const deleteMilestone = async (req, res) => {
  try {
    const deleted = await milestoneModel.findByIdAndDelete(req.params.id);

    // Optional: remove reference from project
    if (deleted) {
      await projectModel.findByIdAndUpdate(deleted.projectId, {
        $pull: { milestones: deleted._id }
      });
    }

    res.status(200).json({ message: 'Milestone deleted', data: deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addMilestone,
  getAllMilestones,
  getMilestoneById,
  updateMilestone,
  markMilestoneComplete,
  addMilestoneComment,
  deleteMilestone
};
