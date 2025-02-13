const userModel = require('../models/userModel');

// This function fetches all users from the database and sends them as a response.
function getUsers(req, res, next) {
    userModel.getUsers()
        .then(client => res.json(client))
        .catch(err => {
            res.status(500);
            next(err);
        })
}

// This function fetches a single user from the database and sends it as a response.
function getUser(req, res, next) {
    userModel.getUser(req.params.id)
        .then(client => res.json(client))
        .catch(err => res.sendStatus(500))
}

// This function deletes a user from the database and sends a response.
function deleteUser(req, res, next) {
    userModel.deleteUser(req.params.id)
        .then(client => res.json(client))
        .catch(err => res.sendStatus(500))
}

// This function edits a user in the database and sends a response.
const editUser = (req, res, next) => {
    const id = req.params.id;
    const { name, surname, email, username, bio } = req.body;
    const avatar = req.file.buffer;

    userModel.editUser(id, { name, surname, email, username, bio, avatar })
        .then(result => {res.json(result)})
        .catch(err => {
            console.error('Error editing user:', err);
            res.sendStatus(500);
        });
};
module.exports = {
    getUsers,
    getUser,
    deleteUser,
    editUser
}