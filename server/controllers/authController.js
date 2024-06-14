const authModel = require('../models/authModel');



function loginUser(req, res, next) {
    authModel.loginUser(req.body)
        .then(({client, token}) => {
            res.cookie('accessToken', token)
            res.json(client)
        })
        .catch(err => res.sendStatus(500))
}


function registerUser(req, res, next) {
    authModel.registerUser(req.body)
        .then(client => res.json(client))
        .catch(err => res.sendStatus(500))
}

module.exports = {
    loginUser,
    registerUser
}


