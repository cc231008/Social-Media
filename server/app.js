const express = require('express');
const app = express();
const port = 3000;
const db = require('./services/database.js');

const cors = require('cors');

app.use(cors());

app.get('/getData', (req, res) => {
    res.send({ message: 'Hello from the server!' });
});
//send a json object to the client
//use error handler (try, catch) to catch any errors that may occur
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});