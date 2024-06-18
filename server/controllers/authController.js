const authModel = require('../models/authModel');
const userModels = require('../models/userModel');



function loginUser(req, res, next) {
    // Pass the users in the authModel.loginUser function
    authModel.loginUser(req.body, userModels.getUsers())
        .then(({ client, token }) => {
            if (!client || !token) {
                console.error('Invalid login response from authModel:', { client, token });
                throw new Error('Invalid login response from authModel');
            }
            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict'
            });
            res.json(client)
        })
        .catch(err => {
            console.error('Login error:', err);
            res.status(500).json({ error: 'Login failed' });
        });
}


function registerUser(req, res, next) {
    authModel.registerUser(req.body)
        .then(client => res.status(201).json(client))
        .catch(err => {
            console.error('Registration error:', err);
            res.status(500).json({ error: 'Registration failed' });
        });
}

module.exports = {
    loginUser,
    registerUser
}


