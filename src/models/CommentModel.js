const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'task',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },

}, {
  timestamps: true
});

module.exports = mongoose.model('comment', commentSchema);
