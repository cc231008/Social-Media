const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentsController');
const authMiddleware = require('../services/authMiddleware');

// Routes for comments
router.post('/add', authMiddleware.authenticateUser, commentController.addComments);
router.delete('/delete/:commentId', authMiddleware.authenticateUser, commentController.deleteComment);
router.patch('/update/:commentId', authMiddleware.authenticateUser, commentController.updateComment);
router.get('/:postId', commentController.getCommentsByPost);

module.exports = router;