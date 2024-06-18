const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentsController');
const authMiddleware = require('../services/authMiddleware');

router.post('/add', authMiddleware.authenticateUser, commentController.addComments);
router.get('/:postId', commentController.getCommentsByPost);

module.exports = router;