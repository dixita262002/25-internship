const routes = require("express").Router();
const notificationController = require("../controllers/NotificationController");

routes.post("/createNotification", notificationController.createNotification);
routes.get("/getNotificationsByUser/:userId", notificationController.getNotificationsByUser);
routes.put("/readNotification/:id", notificationController.markAsRead);
routes.delete("/deleteNotification/:id", notificationController.deleteNotification);

module.exports = routes;
