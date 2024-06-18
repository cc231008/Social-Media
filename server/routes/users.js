const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const {authenticateUser} = require("../services/authMiddleware");

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.get('/me', authenticateUser, (req, res) => {
    res.json(req.user);
});
router.patch('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);



module.exports = router;
