const express = require('express');
const app = express();
const port = 2999;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./services/authMiddleware.js');
const usersRouter = require('./routes/users.js');
const postsRouter = require('./routes/posts.js');
const commentsRouter = require('./routes/comments.js');
const db = require('./services/database.js');
const cors = require('cors');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true

}));
app.use(cookieParser());
app.use('/users', usersRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

//send a json object to the client
//use error handler (try, catch) to catch any errors that may occur
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});