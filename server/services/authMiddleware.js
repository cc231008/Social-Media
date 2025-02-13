const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateUser(req, res, next) {
    const token = req.cookies['accessToken'] // Get the token from the accessToken cookie

    console.log('token', token);

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }
            req.user = user; // Attach the user object to the request
            next(); // Proceed to the next middleware or route handler
        });
    }
module.exports = {
    authenticateUser
};