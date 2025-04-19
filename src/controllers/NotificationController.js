const notificationModel = require("../models/NotificationModel");

const createNotification = async (req, res) => {
  try {
    const notification = await notificationModel.create(req.body);
    res.status(201).json({ 
        message: "Notification created",
         data: notification });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getNotificationsByUser = async (req, res) => {
  try {
    const notifications = await notificationModel.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json({ data: notifications });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const updated = await notificationModel.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.status(200).json({ message: "Marked as read", data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    await notificationModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports ={
    createNotification,getNotificationsByUser,markAsRead,deleteNotification
}