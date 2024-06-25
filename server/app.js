const express = require('express');
const app = express();
const port = 2999;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const usersRouter = require('./routes/users.js');
const postsRouter = require('./routes/posts.js');
const commentsRouter = require('./routes/comments.js');

const cors = require('cors'); // This is the middleware that allows the server to accept requests from the client or frontend.
const path = require('path');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: `${process.env.CLIENT_HOST}`, // This is the address of the frontend that the server will accept.
    credentials: true // This is to allow the server to set cookies in the client.

}));
app.use(cookieParser());

// These are the routes that the server will use to handle requests.
app.use('/users', usersRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});