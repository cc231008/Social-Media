const express = require('express');
const app = express();
const port = 2999;
const bodyParser = require('body-parser');
const db = require('./services/database.js');
const usersRouter = require('./routes/users.js');
const authRouter = require('./routes/auth.js');

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/auth', authRouter);

//send a json object to the client
//use error handler (try, catch) to catch any errors that may occur
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});