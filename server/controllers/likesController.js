const likesModel = require('../models/likesModel');
const postsModel = require('../models/postsModel');


getLikes = async (req, res) => {
    try {
        let likes = await likesModel.getLikes(req.params.id);
        res.json(likes);
    } catch (error) {
        console.error('Error getting likes:', error);
        res.status(500).json({error: error});
    }
}

let addLike = async (req, res) => {
    const { userId, postId } = req.body;
    likesModel.addLike({ userId, postId })
        .then(like => res.json(like))
        .catch(error => res.status(500).json({error: error}));
}

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