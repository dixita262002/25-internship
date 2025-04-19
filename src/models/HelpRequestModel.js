// models/HelpRequest.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const helpRequestSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Resolved",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HelpRequest", helpRequestSchema);
