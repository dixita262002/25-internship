const routes = require("express").Router();
const commentontroller = require("../controllers/CommentController")


routes.post('/add',commentontroller.addComment);

// Get comments by task
routes.get('/task/:taskId', commentontroller.getCommentsByTask);

module.exports = routes;