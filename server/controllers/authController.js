const authModel = require('../models/authModel');



function loginUser(req, res, next) {
    authModel.loginUser(req.body)
        .then(({client, token}) => {
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


