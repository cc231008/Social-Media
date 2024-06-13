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

function registerUser(req, res, next) {
    userModel.registerUser(req.body)
        .then(client => res.json(client))
        .catch(err => res.sendStatus(500))
}

function deleteUser(req, res, next) {
    userModel.deleteUser(req.params.id)
        .then(client => res.json(client))
        .catch(err => res.sendStatus(500))
}

module.exports = {
    getUsers,
    getUser,
    registerUser,
    deleteUser
}