const express = require('express');
const router = express.Router();
const postController = require('../controllers/postsController');
const likesController = require('../controllers/likesController');
const authMiddleware = require('../services/authMiddleware');

// Routes for posts
router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.post('/add', authMiddleware.authenticateUser, postController.addPost);
router.patch('/:id/edit', authMiddleware.authenticateUser, postController.editPost);
router.delete('/:id/delete', authMiddleware.authenticateUser, postController.deletePost);
router.get('/:id/like', likesController.getLikes);
router.post('/:id/add/like', authMiddleware.authenticateUser, likesController.addLike)
router.post('/:id/remove/like', authMiddleware.authenticateUser, likesController.deleteLikes)

module.exports = router;