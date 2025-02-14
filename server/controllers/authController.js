const authModel = require('../models/authModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');

async function loginUser(req, res, next) {
    try {
        const {email, password} = req.body;
        const user = await authModel.loginUser(email)

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});

        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true
        });

        res.json(user);
    }
    catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
}


function registerUser(req, res, next) {
        const { name, surname, email, username, bio, password } = req.body;
        let avatar
    if (req.file) {
        avatar = req.file.buffer;
    }
    else {
        avatar = fs.readFileSync('defaultImage/defaultImage.jpg');
    }
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


