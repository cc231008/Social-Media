const jwt = require('jsonwebtoken');
require('dotenv').config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());
function authenticateUser(req, res, next) {

    const token = req.cookies['accessToken']
    console.log('token', token);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        req.user = jwt.verify(token, ACCESS_TOKEN_SECRET);
        next();
    }
    catch (error) {
        console.log('token', token);
        console.error('JWT verification error:', error);
        return res.status(403).json({ error: 'Invalid token' });
    }
}
module.exports = {
    authenticateUser
};