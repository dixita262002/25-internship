const commentModel = require('../models/CommentModel');

const UserModel = require('../models/UserModel');


const addComment = async (req, res) => {
    try {
      const { taskId, userId, comment } = req.body;
  
      const newComment = new commentModel({
        taskId,
        userId,
        comment
      });
  
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      console.error("Add comment error:", error); // Add this for debugging
      res.status(500).json({ message: "Failed to add comment", error });
    }
  };

const getCommentsByTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const comments = await commentModel.find({ taskId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error });
  }
};

module.exports = {
    addComment,getCommentsByTask
}