const jwt = require('jsonwebtoken');
require('dotenv').config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

// This middleware function checks if the user is authenticated by checking if the JWT token is present in the request.
// If the token is present, the user is authenticated and the next middleware function is called. If the token is not present, an error is returned.
// The JWT token is stored in a cookie called accessToken.
app.use(cookieParser());
function authenticateUser(req, res, next) {

    const token = req.cookies['accessToken'] // Get the token from the accessToken cookie
    console.log('token', token);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        req.user = jwt.verify(token, ACCESS_TOKEN_SECRET); // By using jwt.verify, we compare the token with the ACCESS_TOKEN_SECRET to check if it is valid.
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