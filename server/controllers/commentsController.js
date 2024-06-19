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

    function deleteComment (req, res, next) {
    const { commentId } = req.params;
        commentsModel.deleteComment(commentId)
            .then(result => res.json(result))
            .catch(err => res.status(500).json({ error: err }));
    }

    function updateComment (req, res, next) {
    const { id, text } = req.body;
        commentsModel.updateComment({ id, text })
            .then(result => res.json(result))
            .catch(err => res.status(500).json({ error: err }));
    }

module.exports = {
    getCommentsByPost,
    addComments,
    deleteComment,
    updateComment
}