const userModel = require('../models/userModel');

function getUsers(req, res, next) {
    userModel.getUsers()
        .then(client => res.json(client))
        .catch(err => {
            res.status(500);
            next(err);
        })
}

function getUser(req, res, next) {
    userModel.getUser(req.params.id)
        .then(client => res.json(client))
        .catch(err => res.sendStatus(500))
}

module.exports = {
    getUsers,
    getUser
}