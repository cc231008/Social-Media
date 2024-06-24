const likesModel = require('../models/likesModel');

// This function fetches all likes from the database and sends them as a response.
getLikes = async (req, res) => {
    try {
        let likes = await likesModel.getLikes(req.params.id);
        res.json(likes);
    } catch (error) {
        console.error('Error getting likes:', error);
        res.status(500).json({error: error});
    }
}

// This function adds a like to the database and sends a response.
let addLike = async (req, res) => {
    const { userId, postId } = req.body;
    likesModel.addLike({ userId, postId })
        .then(like => res.json(like))
        .catch(error => res.status(500).json({error: error}));
}

// This function deletes a like from the database and sends a response.
let deleteLikes = async (req, res) => {
    const { userId, postId } = req.body;
    likesModel.deleteLike({ userId, postId })
        .then(like => res.json(like))
        .catch(error => res.status(500).json({error: error}));
}

module.exports = {
    addLike,
    getLikes,
    deleteLikes
}