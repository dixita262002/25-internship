// controllers/helpController.js
const helpRequestMosel = require("../models/HelpRequestModel");

const sendHelpRequest = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const newRequest = await helpRequestMosel.create({ userId, message });

    res.status(201).json({
      message: "Help request sent successfully",
      data: newRequest,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to send request", error: err.message });
  }
};

const getAllHelpRequests = async (req, res) => {
  try {
    const requests = await helpRequestMosel.find().populate("userId", "fullName email");
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests", error: err.message });
  }
};

module.exports = {
    sendHelpRequest,
    getAllHelpRequests
}