const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const {authenticateUser} = require("../services/authMiddleware");
const uploadAvatar = require('../services/multerAvatarConfig');

// Routes for users
router.post('/login', authController.loginUser); // The loginUser function is called when a POST request is made to the /login endpoint.
router.post('/register', authController.registerUser);

router.get('/', userController.getUsers); // The getUsers function is called when a GET request is made to the / endpoint.

router.get('/:id', userController.getUser); // The getUser function is called when a GET request is made to the /:id endpoint.

// The authenticateUser middleware is called before the getUser function is called to check if the user is authenticated.
router.get('/me', authenticateUser, (req, res) => {
    res.json(req.user);
});

router.patch('/:id', uploadAvatar.single('avatar'), userController.editUser); // The editUser function is called when a PATCH request is made to the /:id endpoint.

router.delete('/:id', userController.deleteUser); // The deleteUser function is called when a DELETE request is made to the /:id endpoint.



module.exports = router;
