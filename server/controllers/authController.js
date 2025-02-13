const authModel = require('../models/authModel');
const userModels = require('../models/userModel');

function loginUser(req, res, next) {
    authModel.loginUser(req.body, userModels.getUsers())
        .then(({ client, token }) => {
            if (!client || !token) {
                console.error('Invalid login response from authModel:', { client, token });
                throw new Error('Invalid login response from authModel');
            }
            // Set the token as a cookie in the response
            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict'
            });
            // Send the client object as a response
            res.json(client)
        })
        .catch(err => {
            console.error('Login error:', err);
            res.status(500).json({ error: 'Login failed' });
        });
}


function registerUser(req, res, next) {
        const { name, surname, email, username, bio, password } = req.body;
        const avatar = req.file.buffer;
    authModel.registerUser({ name, surname, email, username, bio, avatar, password })
        .then(user => {res.json(user);
        })

        .catch(err => {
            console.error('Register error:', err);
            res.status(500).json({ error: 'Registration failed' });
        });
}

module.exports = {
    loginUser,
    registerUser
}


