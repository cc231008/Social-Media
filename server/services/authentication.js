const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

app.use(cookieParser());
const authenticateJWT = (req, res, next) => {
    const token = req.cookies['accessToken']; // Retrieve the token from the cookie

    if (!token) {
        return res.sendStatus(403); // Forbidden if no token is present
    }

    jwt.verify(token, accessTokenSecret, (err, client) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }

        req.client = client; // Attach the user info to the request object
        next();
    });
};

module.exports = authenticateJWT;