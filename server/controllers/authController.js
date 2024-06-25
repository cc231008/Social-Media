const authModel = require('../models/authModel');
const userModels = require('../models/userModel');
const upload = require('../services/multerAvatarConfig');

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
// The upload.single('avatar') middleware is used to upload a single file with the name avatar.
    upload.single('avatar')(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }

        const { name, surname, email, username, bio, password } = req.body;
        const avatar = req.file;

        if (!req.file) {
            return res.status(400).json({ error: 'No avatar uploaded' });
        }

const avatarPath = avatar.filename; // Get the filename of the uploaded avatar.

const imgUrls = avatarPath ? [{
    url: `${process.env.SERVER_HOST}/uploads/avatars/${avatarPath}`,
    filename: avatarPath
}] : [];

    authModel.registerUser({ name, surname, email, username, bio, avatar: avatarPath, password })
        .then(user => {
            // Combine result and imgUrls into a single response object.
            const response = {
                ...user,
                imgUrls: imgUrls
            };
            res.json(response);
        })

        .catch(err => {
            console.error('Register error:', err);
            res.status(500).json({ error: 'Registration failed' });
        });
    } );
}

module.exports = {
    loginUser,
    registerUser
}


