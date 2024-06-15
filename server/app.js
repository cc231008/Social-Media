const express = require('express');
const app = express();
const port = 2999;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users.js');
const authRouter = require('./routes/auth.js');
const db = require('./services/database.js');


const cors = require('cors');

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/users', usersRouter);


//send a json object to the client
//use error handler (try, catch) to catch any errors that may occur
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});