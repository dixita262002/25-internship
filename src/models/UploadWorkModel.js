const mongoose = require('mongoose');

const uploadWorkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  /*taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'task',
    required: true,
  },*/
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('uploadWork', uploadWorkSchema);
