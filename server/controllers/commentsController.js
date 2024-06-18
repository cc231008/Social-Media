const commentsModel = require("../models/commentsModel");

function getCommentsByPost(req, res, next) {
    const postId = req.params.postId;

    if (!postId) {
        return res.status(400).json({ error: 'Missing required field: postId' });
    }

    commentsModel.getCommentsByPost(postId)
        .then(comments => res.json(comments))
        .catch(err => res.status(500).json({ error: err }));
}

function addComments(req, res, next) {
    const { postId, userId, text } = req.body;
    if (!postId || !userId || !text) {
        return res.status(400).json({error: 'Missing required fields: postId, userId, text'});
    }
        commentsModel.addComments({ postId, userId, text })
            .then(comment => res.json(comment))
            .catch(err => res.status(500).json({ error: err.message }));
    }

module.exports = {
    getCommentsByPost,
    addComments
}