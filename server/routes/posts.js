const express = require('express');
const router = express.Router();
const postController = require('../controllers/postsController');
const likesController = require('../controllers/likesController');
const authMiddleware = require('../services/authMiddleware');

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.get('/:id/like', likesController.getLikes);
router.post('/:id/add/like', authMiddleware.authenticateUser, likesController.addLike)
router.post('/:id/remove/like', authMiddleware.authenticateUser, likesController.deleteLikes)

module.exports = router;