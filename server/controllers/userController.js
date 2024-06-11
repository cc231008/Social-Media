const userModel = require('../models/userModel');

function getUsers(req, res, next) {
    userModel.getUsers()
        .then(client => res.json(client))
        .catch(err => {
            res.status(500);
            next(err);
        })
}

module.exports = {
    getUsers,
}